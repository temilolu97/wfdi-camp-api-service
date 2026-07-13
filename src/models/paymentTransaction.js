const { DataTypes } = require('sequelize');
const Registration = require('./registration');

module.exports = (sequelize, DataTypes) => {
    const PaymentTransaction = sequelize.define('PaymentTransaction', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        registrationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "registrations", key: 'id' }, // matches tableName above
        },
        reference: { type: DataTypes.STRING, allowNull: false, unique: true },
        providerReference: { type: DataTypes.STRING, allowNull: true },
        amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        currency: { type: DataTypes.STRING, allowNull: false, defaultValue: 'NGN' },
        status: {
            type: DataTypes.ENUM('Initiated', 'Success', 'Failed', 'Abandoned'),
            allowNull: false,
            defaultValue: 'Initiated',
        }
    }, {
        tableName: "payment_transactions",
        timestamps: true,
    });

    return PaymentTransaction;
};