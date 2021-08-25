'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Games', [
     {name: "Super Mario Bros", description: "A plumber must save a princess from a giant lizard", platform: "NES", createdAt: new Date(), updatedAt: new Date()},
     {createdAt: new Date(), updatedAt: new Date()},
     {createdAt: new Date(), updatedAt: new Date()}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Games', null, {});
  }
};
