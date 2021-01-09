'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        firstname: 'Demo',
        lastname: 'user',
        email: 'email@demo.com',
        password: 'aaAA11!!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    return queryInterface.bulkInsert(
      'Articles',
      [
        {
          title: 'Demo title',
          content:
            'This is demo content so we can see what things look like yay woo!!',
          slug: 'demo_title',
          UserId: 1,
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
