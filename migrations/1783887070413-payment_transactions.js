module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("payment_transactions", {
      id: {
        type: Sequelize.INTEGER,

        primaryKey: true,

        autoIncrement: true,
      },

      registrationId: {
        type: Sequelize.INTEGER,

        allowNull: false,

        references: {
          model: "registrations",
          key: "id",
        },
      },

      reference: {
        type: Sequelize.STRING,

        allowNull: false,

        unique: true,
      },

      providerReference: {
        type: Sequelize.STRING,

        allowNull: true,
      },

      amount: {
        type: Sequelize.DECIMAL,

        allowNull: false,
      },

      currency: {
        type: Sequelize.STRING,

        allowNull: false,

        defaultValue: "NGN",
      },

      status: {
        type: Sequelize.ENUM('Initiated','Pending','Successful','Failed'),

        allowNull: false,

        defaultValue: "Initiated",
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
    await queryInterface.dropTable("payment_transactions");
  },
};

