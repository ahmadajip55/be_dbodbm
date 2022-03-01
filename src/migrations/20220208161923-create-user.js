'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      userName: {
        type: Sequelize.STRING,
        field: 'user_name',
        unique: true,
        allowNull: false
      },
      fullName: {
        type: Sequelize.STRING,
        field: 'full_name',
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdDate: {
        type: Sequelize.DATE,
        field: 'created_date',
        allowNull: false
      },
      createdBy: {
        type: Sequelize.STRING,
        field: 'created_by',
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      modifiedDate: {
        type: Sequelize.DATE,
        field: 'modified_date',
        allowNull: true
      },
      modifiedBy: {
        type: Sequelize.STRING,
        field: 'modified_by',
        allowNull: true
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};