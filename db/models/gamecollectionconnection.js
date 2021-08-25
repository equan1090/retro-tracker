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
    //We added a connection to Collection for our on delete.
    // REMEMBER TO ADD APPROPRIATE CONNECTION!!!!
    // REMEMBER TO ADD APPROPRIATE CONNECTION!!!!
    // REMEMBER TO ADD APPROPRIATE CONNECTION!!!!
    // REMEMBER TO ADD APPROPRIATE CONNECTION!!!!
    // REMEMBER TO ADD APPROPRIATE CONNECTION!!!!
    // REMEMBER TO ADD APPROPRIATE CONNECTION!!!!

  };
  return GameCollectionConnection;
};
