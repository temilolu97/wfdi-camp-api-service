'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('registrations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shirtSize: {
        type: Sequelize.STRING,
        allowNull: false
      },
      guardianName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      guardianPhone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      guardianEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      homeAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      childRelationShipToGuardian: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amountDue: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      medicalCondition: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emergencyContactName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emergencyContactPhone: {
        type: Sequelize.STRING,
        allowNull: false
      },
       registrationStatus: {
        // Hardcoded matching strings from your specific constants dictionary mapping
        type: Sequelize.ENUM('PENDING_PAYMENT', 'REGISTERED', 'CANCELLED'), 
        allowNull: false,
        defaultValue: 'PENDING_PAYMENT'
      },
      transactionReference: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('registrations')
  }
};
