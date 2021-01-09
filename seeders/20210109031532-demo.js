'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'posts',
      [
        {
          title: 'Demo title',
          content:
            'This is demo content so we can see what things look like yay woo!!',
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
    return queryInterface.bulkDelete('posts', null, {});
  },
};
