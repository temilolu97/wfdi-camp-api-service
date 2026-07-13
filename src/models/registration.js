const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Guardian = require('./guardian');

const REGISTRATION_STATUS = require("../constants/registrationStatusEnums");

module.exports = (sequelize, DataTypes) => {
    const Registration = sequelize.define('Registration', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        guardianId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "Guardians", key: 'id' }, // string, no require needed
        },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        dateOfBirth: { type: DataTypes.DATE, allowNull: false },
        gender: { type: DataTypes.STRING, allowNull: false },
        shirtSize: { type: DataTypes.STRING, allowNull: false },
        homeAddress: { type: DataTypes.STRING, allowNull: false },
        medicalCondition: { type: DataTypes.STRING, allowNull: false },
        emergencyContactName: { type: DataTypes.STRING, allowNull: false },
        emergencyContactPhone: { type: DataTypes.STRING, allowNull: false },
        registrationStatus: {
            type: DataTypes.ENUM(...Object.values(REGISTRATION_STATUS)),
            allowNull: false,
            defaultValue: REGISTRATION_STATUS.PENDING_PAYMENT,
        },
    }, {
        tableName: "registrations",
        timestamps: true,
    });

    return Registration;
};