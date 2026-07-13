const REGISTRATION_STATUS = require("../constants/registrationStatusEnums");
const { initiatePayment } = require('../integrations/BudpayIntegration');
const { generateReference } = require("../helpers/commonHelper");
const { Guardian, Registration, PaymentTransaction, sequelize } = require('../models');
const { where, fn, col } = require("sequelize");
const initiateRegistration = async (req, res) => {
    const payload = req.body;
    const t = await sequelize.transaction();
    console.log(payload);
    
    try {
        const [guardian] = await Guardian.findOrCreate({
            where:  {
                Email:payload.guardianEmail.trim().toLowerCase(),
            },
            defaults: {
                FullName: payload.guardianName,
                PhoneNumber: payload.guardianPhone,
                Email: payload.guardianEmail.toLowerCase().trim(),
                RelationShipToChild: payload.relationship,
            },
            transaction: t,
        });

        const registration = await Registration.create({
            guardianId: guardian.id,
            firstName: payload.firstName,
            lastName: payload.lastName,
            dateOfBirth: payload.dateOfBirth,
            gender: payload.gender,
            shirtSize: payload.shirtSize,
            homeAddress: payload.homeAddress,
            medicalCondition: payload.medicalCondition,
            emergencyContactName: payload.emergencyContactName,
            emergencyContactPhone: payload.emergencyContactPhone,
            registrationStatus: 'PENDING_PAYMENT',
        }, { transaction: t });

        const reference = `WFDI-${registration.id}-${Date.now()}`;

        const paymentTx = await PaymentTransaction.create({
            registrationId: registration.id,
            reference,
            amount: payload.amountDue,
            currency: 'NGN',
            status: 'Initiated',
        }, { transaction: t });

        await t.commit();

        const budpayResponse = await initiatePayment(guardian.Email, paymentTx.amount, paymentTx.reference,
            `${process.env.APP_URL}/payment/callback`);

        return res.json({ paymentUrl: budpayResponse.data.authorization_url });
    }
    catch (err) {
        (await t).rollback();
        return res.status(500).json({ error: 'Registration failed', detail: err.message })
    }

}



module.exports = {
    initiateRegistration
}