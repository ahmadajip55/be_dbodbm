'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      userName: {
        type: DataTypes.STRING,
        field: 'user_name',
        unique: true,
        allowNull: false
      },
      fullName: {
        type: DataTypes.STRING,
        field: 'full_name',
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdDate: {
        type: DataTypes.DATE,
        field: 'created_date',
        allowNull: false
      },
      createdBy: {
        type: DataTypes.STRING,
        field: 'created_by',
        allowNull: false
      },
      modifiedDate: {
        type: DataTypes.DATE,
        field: 'modified_date',
        allowNull: true
      },
      modifiedBy: {
        type: DataTypes.STRING,
        field: 'modified_by',
        allowNull: true
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};