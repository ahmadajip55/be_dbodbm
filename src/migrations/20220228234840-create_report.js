'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reports', {
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
      team: {
        type: DataTypes.STRING,
        field: 'team',
        allowNull: false
      },
      leader: {
        type: DataTypes.STRING,
        field: 'leader',
        allowNull: false
      },
      driller: {
        type: DataTypes.STRING,
        field: 'driller',
        allowNull: false
      },
      member1: {
        type: DataTypes.STRING,
        field: 'member1',
        allowNull: false
      },
      member2: {
        type: DataTypes.STRING,
        field: 'member2',
        allowNull: false
      },
      note: {
        type: DataTypes.STRING,
        field: 'note',
        allowNull: false
      },
      score: {
        type: DataTypes.DECIMAL,
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
    await queryInterface.dropTable('reports');
  }
};
