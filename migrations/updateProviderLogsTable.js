'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('providerLogs', 'requestContent', {
            type: Sequelize.TEXT,
            allowNull: false,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('providerLogs', 'requestContent', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },
};