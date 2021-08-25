'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Games', [
     {name: "Super Mario Bros", description: "A plumber must save a princess from a giant lizard", platform: "NES", publisher: "Nintendo", createdAt: new Date(), updatedAt: new Date()},
     {name: "Kingdom Hearts", description: "Boy with key sword trying to save childhood friend", platform: "PlayStation 2", publisher: "Square Enix", createdAt: new Date(), updatedAt: new Date()},
     {name: "Halo: Combat Evolved", description: "After an alien invasion, you, the master chief, have to save humanity", platform: "XBox", publisher: "Bungie/Microsoft", createdAt: new Date(), updatedAt: new Date()}
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
