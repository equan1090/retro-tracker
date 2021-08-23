'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    title: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    rating: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    gameId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, {foreignKey: "userId"});
    Review.belongsTo(models.Game, {foreignKey: "gameId"});
  };
  return Review;
};
