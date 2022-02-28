'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('forms', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      formType: {
        type: DataTypes.STRING,
        field: 'form_type',
        allowNull: false
      },
      reportId: {
        type: DataTypes.INTEGER,
        field: 'reportId',
        allowNull: false
      },
      questionId: {
        type: DataTypes.INTEGER,
        field: 'questionId',
        allowNull: false
      },
      isCheck: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
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
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('forms');
  }
};
