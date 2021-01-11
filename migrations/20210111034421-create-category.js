'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable('ArticleCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ArticleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Articles',
          key: 'id',
        },
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
    });
    await queryInterface.addColumn('Articles', 'categories', {
      type: Sequelize.INTEGER,
      references: {
        model: 'ArticleCategories',
        key: 'id',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Articles', 'categories');
    await queryInterface.dropTable('ArticleCategories');
    await queryInterface.dropTable('Categories');
  },
};
