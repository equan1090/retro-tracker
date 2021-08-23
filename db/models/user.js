'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
