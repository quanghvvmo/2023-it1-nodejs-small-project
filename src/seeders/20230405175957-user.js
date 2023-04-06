'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user',[{
      username:'hoanghip108',
      password:'123456',
      age:18,
      email:'hoanghip108@gmail.com',
      phone:'0333804202',
      address:'Ha Noi',
      isActive:1,
      createdBy:'Admin',
      createdAt:new Date(),
      updatedAt:new Date(),
      updatedBy:'Admin',
  }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user',null,{});
  }
};
