const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const REGISTRATION_STATUS = require("../constants/registrationStatusEnums");

module.exports = (sequelize, DataTypes) => {
    const Guardian = sequelize.define('Guardian', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        FullName: { type: DataTypes.STRING, allowNull: false },
        PhoneNumber: { type: DataTypes.STRING, allowNull: false },
        Email: { type: DataTypes.STRING, allowNull: false },
        RelationShipToChild: { type: DataTypes.STRING, allowNull: false },
    }, {
        tableName: "Guardians",
        timestamps: true,
        indexes: [
            { unique: true, fields: [sequelize.fn('lower', sequelize.col('Email'))] }
        ],
    });

    return Guardian;
};

