'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameCollectionConnection = sequelize.define('GameCollectionConnection', {
    collectionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    gameId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  GameCollectionConnection.associate = function(models) {
    // associations can be defined here
  };
  return GameCollectionConnection;
};
