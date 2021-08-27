'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [
    {
      username: "demo",
      hashedPassword: "$2a$10$gRJXfcj4BhPcd5i1hGyGv.SG6tfC/rH3wuvc5QG0vdi0cbaclTvcW",
      email: "demoUser@demo.com",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "Bill Gates",
      hashedPassword: "OneRichBoi1",
      email: "iamtheonewhoownsmsft@microsoft.com",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "Steven Jobs",
      hashedPassword: "TheRichAppleThatWasn'teaten",
      email: "suckstobedeadrn@apple.com",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "Mark Suckerberg",
      hashedPassword: "Shhh...IAmAZizardPerson10",
      email:"totallynormalperson@fb.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ], {});
  },

  down: async(queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   
   return queryInterface.bulkDelete('Users', null, {});
  }
};
