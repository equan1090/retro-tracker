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
    //NOTE THAT THERE WILL BE NO ASSOCIATIONS HERE!!
  };
  return GameCollectionConnection;
};
