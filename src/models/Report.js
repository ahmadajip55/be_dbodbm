'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Report.init({
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
  }, {
    sequelize,
    modelName: 'reports',
  });
  return Report;
};
