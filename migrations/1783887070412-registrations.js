module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("registrations", {
      id: {
        type: Sequelize.INTEGER,

        primaryKey: true,

        autoIncrement: true,
      },

      guardianId: {
        type: Sequelize.INTEGER,

        allowNull: false,

        references: {
          model: "Guardians",
          key: "id",
        },
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

        allowNull: false,
      },

      gender: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      shirtSize: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      homeAddress: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      medicalCondition: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      emergencyContactName: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      emergencyContactPhone: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      registrationStatus: {
        type: Sequelize.ENUM('PENDING_PAYMENT','REGISTERED', 'CANCELLED'),

        allowNull: false,

        defaultValue: "PENDING_PAYMENT",
      },

      createdAt: {
        type: Sequelize.DATE,

        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,

        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("registrations");
  },
};

