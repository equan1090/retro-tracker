'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Collection.associate = function(models) {
    Collection.belongsTo(models.User, {foreignKey: "userId"});
    Collection.belongsToMany(models.Game, {
      through: "GameCollectionConnection",
      otherKey: "gameId",
      foreignKey: "collectionId"
    });
    Collection.hasMany(models.GameCollectionConnection, {foreignKey: "collectionId", onDelete: 'CASCADE', hooks: true })
  };
  return Collection;
};
