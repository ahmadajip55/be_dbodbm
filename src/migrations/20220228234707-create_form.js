'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('forms', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      formType: {
        type: Sequelize.STRING,
        field: 'form_type',
        allowNull: false
      },
      reportId: {
        type: Sequelize.INTEGER,
        field: 'reportId',
        allowNull: false
      },
      questionId: {
        type: Sequelize.INTEGER,
        field: 'questionId',
        allowNull: false
      },
      isCheck: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
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
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('forms');
  }
};
