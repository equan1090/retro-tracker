'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    platform: {
      allowNull: false,
      type: DataTypes.STRING(25)
    },
    publisher: {
      allowNull: false,
      type: DataTypes.STRING(50)
    }
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};
