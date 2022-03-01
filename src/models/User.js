'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
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
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return User;
};
