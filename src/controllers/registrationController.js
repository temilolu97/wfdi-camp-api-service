const REGISTRATION_STATUS = require("../constants/registrationStatusEnums");
const Registration = require("../models/registrationModel")
const { initiatePayment } = require('../integrations/BudpayIntegration');
const { generateReference } = require("../helpers/commonHelper");
const initiateRegistration = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            shirtSize,
            guardianName,
            guardianPhone,
            guardianEmail,
            homeAddress,
            childRelationShipToGuardian,
            amountDue,
            medicalCondition,
            emergencyContactName,
            emergencyContactPhone,
        } = req.body;

        // Perform programmatic baseline verification checks
        if (!firstName || !lastName || !guardianEmail ) {
            return res.status(400).json({
                status: "failed",
                message: "Missing critical registration parameters."
            });
        }

        var reference = generateReference();

        // Persist the structured data record into your MySQL database table
        const newRegistration = await Registration.create({
            firstName,
            lastName,
            dateOfBirth,
            gender,
            shirtSize,
            guardianName,
            guardianPhone,
            guardianEmail,
            homeAddress,
            childRelationShipToGuardian,
            amountDue,
            medicalCondition,
            emergencyContactName,
            emergencyContactPhone,
            transactionReference: reference,
            // Automatically falls back to 'PENDING_PAYMENT' via schema definition if omitted
            registrationStatus: REGISTRATION_STATUS.PENDING_PAYMENT
        });



        var budpayResponse = await initiatePayment(newRegistration.guardianEmail, newRegistration.amountDue, reference);

        // Respond with success to client
        return res.status(201).json({
            status: "success",
            message: "Registration initiated successfully.",
            data: budpayResponse
        });
    }
    catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
}



module.exports = {
    initiateRegistration
}