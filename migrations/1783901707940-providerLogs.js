module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("providerLogs", {
      id: {
        type: Sequelize.INTEGER,

        primaryKey: true,

        autoIncrement: true,
      },

      type: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      requestContent: {
        type: Sequelize.STRING,
      },

      Status: {
        type: Sequelize.STRING,

        defaultValue: "Received",
      },

      Message: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("providerLogs");
  },
};

