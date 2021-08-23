'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      gameId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Games"}
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Users"}
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
    return queryInterface.dropTable('Reviews');
  }
};
