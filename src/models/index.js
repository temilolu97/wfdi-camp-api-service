// models/index.js
const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const Guardian = require('./guardian')(sequelize, DataTypes);
const Registration = require('./registration')(sequelize, DataTypes);
const PaymentTransaction = require('./paymentTransaction')(sequelize, DataTypes);
const ProviderLog = require('./providerLog')(sequelize,DataTypes)

Guardian.hasMany(Registration, { foreignKey: 'guardianId', onDelete: 'CASCADE' });
Registration.belongsTo(Guardian, { foreignKey: 'guardianId' });
Registration.hasMany(PaymentTransaction, { foreignKey: 'registrationId', onDelete: 'CASCADE' });
PaymentTransaction.belongsTo(Registration, { foreignKey: 'registrationId' });

module.exports = { sequelize, Guardian, Registration, PaymentTransaction,ProviderLog };