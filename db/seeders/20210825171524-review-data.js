'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Reviews', [
     {title: "Good", rating: 3, content: "I am a gen z so the graphics suck.", gameId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date()},
     {title: "Fantastic", rating: 5, content: "Greatest story of all time!!", gameId: 2, userId: 1,createdAt: new Date(), updatedAt: new Date()},
     {title: "Could be better", rating: 4, content: "I like it, just wish the story was a little better", gameId: 3, userId: 1,createdAt: new Date(), updatedAt: new Date()},
     {title: "Pretty meh", rating: 2, content: "Berrr I am mike suckerberg and theis game sucks", gameId: 2, userId: 3,createdAt: new Date(), updatedAt: new Date()},
     {title: "Waaahhh", rating: 1, content: "So mad waaaah cant play on my way to expensive mac waaaaa!", gameId: 1, userId: 2,createdAt: new Date(), updatedAt: new Date()},
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
