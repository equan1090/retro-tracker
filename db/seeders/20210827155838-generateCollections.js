'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkInsert('Collections', [
       {
          "name": "Wishlist",
          "userId": 1,
          createdAt: new Date(),
          updatedAt: new Date()
       },
       {
          "name": "Playing",
          "userId": 1,
          createdAt: new Date(),
          updatedAt: new Date()
       },
       {
          "name": "Played",
          "userId": 1,
          createdAt: new Date(),
          updatedAt: new Date()
       }
     ], {});
    },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Collections', null, {});
  }
};
