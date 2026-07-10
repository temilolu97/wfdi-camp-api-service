const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const REGISTRATION_STATUS = require("../constants/registrationStatusEnums");


const Registration = sequelize.define('Registration', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shirtSize: {
        type: DataTypes.STRING,
        allowNull: false
    },
    guardianName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    guardianPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    guardianEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    homeAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    childRelationShipToGuardian: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amountDue: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    medicalCondition: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emergencyContactName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emergencyContactPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registrationStatus: {
        type: DataTypes.ENUM(...Object.values(REGISTRATION_STATUS)),
        allowNull: false,
        default: REGISTRATION_STATUS.PENDING_PAYMENT
    },
    transactionReference: {
        type: DataTypes.STRING,
        allowNull: false
    },


}, {
    tableName:"registrations",
    timestamps: true, // Automatically manages createdAt and updatedAt fields
});

module.exports = Registration;
