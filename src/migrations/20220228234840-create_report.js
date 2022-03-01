'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reports', {
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
      team: {
        type: Sequelize.STRING,
        field: 'team',
        allowNull: false
      },
      leader: {
        type: Sequelize.STRING,
        field: 'leader',
        allowNull: false
      },
      driller: {
        type: Sequelize.STRING,
        field: 'driller',
        allowNull: false
      },
      member1: {
        type: Sequelize.STRING,
        field: 'member1',
        allowNull: false
      },
      member2: {
        type: Sequelize.STRING,
        field: 'member2',
        allowNull: false
      },
      note: {
        type: Sequelize.STRING,
        field: 'note',
        allowNull: false
      },
      score: {
        type: Sequelize.DECIMAL,
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
    await queryInterface.dropTable('reports');
  }
};
