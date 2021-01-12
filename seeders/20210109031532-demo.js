'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'React',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Node',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    return queryInterface.bulkInsert('Articles', [
      {
        title: 'Demo title',
        content:
          'This is demo content so we can see what things look like yay woo!!',
        slug: 'demo_title',
        UserId: 1,
        description: 'This is a description yay',
        draft: false,
        CategoryId: 1,
        publish_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Demo title 2',
        content:
          'This is demo content so we can see what things like like yay w000!!!',
        slug: 'demo_title_2',
        UserId: 1,
        description: ' this is a description yay',
        draft: true,
        CategoryId: 2,
        publish_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Demo title 3',
        content:
          'This is demo content so we can see what things like like yay w000!!!',
        slug: 'demo_title_3',
        UserId: 1,
        description: ' this is a description yay',
        draft: false,
        CategoryId: 2,
        publish_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Demo title 4',
        content:
          'This is demo content so we can see what things like like yay w000!!!',
        slug: 'demo_title_4',
        UserId: 1,
        description: ' this is a description yay',
        draft: true,
        CategoryId: 2,
        publish_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Demo title 5',
        content:
          'This is demo content so we can see what things like like yay w000!!!',
        slug: 'demo_title_5',
        UserId: 1,
        description: ' this is a description yay',
        draft: false,
        CategoryId: 2,
        publish_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Demo title 6',
        content:
          'This is demo content so we can see what things like like yay w000!!!',
        slug: 'demo_title_6',
        UserId: 1,
        description: ' this is a description yay',
        draft: false,
        CategoryId: 1,
        publish_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
