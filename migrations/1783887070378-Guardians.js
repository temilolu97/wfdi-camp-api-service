module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Guardians", {
      id: {
        type: Sequelize.INTEGER,

        primaryKey: true,

        autoIncrement: true,
      },

      FullName: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      PhoneNumber: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      Email: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      RelationShipToChild: {
        type: Sequelize.STRING,

        allowNull: false,
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
    await queryInterface.dropTable("Guardians");
  },
};

