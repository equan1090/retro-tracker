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
          "name": "Completed",
          "userId": 1,
          createdAt: new Date(),
          updatedAt: new Date()
       },
       {
        "name": "Wishlist",
        "userId": 2,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        "name": "Playing",
        "userId": 2,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        "name": "Completed",
        "userId": 2,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      "name": "Wishlist",
      "userId": 3,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      "name": "Playing",
      "userId": 3,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      "name": "Completed",
      "userId": 3,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
    "name": "Wishlist",
    "userId": 4,
    createdAt: new Date(),
    updatedAt: new Date()
 },
 {
    "name": "Playing",
    "userId": 4,
    createdAt: new Date(),
    updatedAt: new Date()
 },
 {
    "name": "Completed",
    "userId": 4,
    createdAt: new Date(),
    updatedAt: new Date()
 }
     ], {});
    },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    await queryInterface.bulkDelete('GameCollectionConnections', null, {});
    return queryInterface.bulkDelete('Collections', null, {});
  }
};
