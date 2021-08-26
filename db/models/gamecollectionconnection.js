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
    GameCollectionConnection.belongsTo(models.Collection, {foreignKey: "collectionId", })
  };
  return GameCollectionConnection;
};
