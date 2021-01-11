'use strict';

const { query } = require('../server');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Articles',
      [
        {
          title: 'Demo title',
          content:
            'This is demo content so we can see what things look like yay woo!!',
          slug: 'demo_title',
          UserId: 1,
          description: 'This is a description yay',
          draft: false,
          publish_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      [
        {
          title: 'Demo title 2',
          content:
            'This is demo content so we can see what things like like yay w000!!!',
          slug: 'demo_title_2',
          UserId: 1,
          description: ' this is a description yay',
          draft: true,
          publish_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Articles', null, {});
    return queryInterface.bulkDelete('Users', null, {});
  },
};
