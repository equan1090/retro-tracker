'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GameCollectionConnections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      collectionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Collections"}
      },
      gameId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Games"}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GameCollectionConnections');
  }
};
