'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Games', [
     {name: "Super Mario Bros", description: "A plumber must save a princess from a giant lizard", platform: "NES", publisher: "Nintendo", image: "https://upload.wikimedia.org/wikipedia/en/0/03/Super_Mario_Bros._box.png", createdAt: new Date(), updatedAt: new Date()},
     {name: "Kingdom Hearts", description: "Boy with key sword trying to save childhood friend", platform: "PlayStation 2", publisher: "Square Enix", image: "https://upload.wikimedia.org/wikipedia/en/8/85/Kingdom_Hearts.jpg", createdAt: new Date(), updatedAt: new Date()},
     {name: "Halo: Combat Evolved", description: "After an alien invasion, you, the master chief, have to save humanity", platform: "XBox", publisher: "Bungie/Microsoft", image: "https://upload.wikimedia.org/wikipedia/en/8/80/Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg", createdAt: new Date(), updatedAt: new Date()}
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
