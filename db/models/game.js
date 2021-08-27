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
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Game.associate = function(models) {
    Game.belongsToMany(models.Collection, {
      through: "GameCollectionConnection",
      otherKey: "collectionId",
      foreignKey: "gameId"
    });
    Game.hasMany(models.Review, {foreignKey: "gameId"});

  };
  return Game;
};
