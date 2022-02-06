module.exports = (sequelize, type) => {
    const model = sequelize.define('users', {
        id: {
          type: type.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        userName: {
          type: type.STRING,
          field: 'user_name',
          unique: true,
          allowNull: false
        },
        fullName: {
          type: type.STRING,
          field: 'full_name',
          allowNull: true
        },
        password: {
          type: type.STRING,
          allowNull: false
        },
        createdDate: {
          type: type.DATE,
          field: 'created_date',
          allowNull: false
        },
        createdBy: {
          type: type.STRING,
          field: 'created_by',
          allowNull: false
        },
        modifiedDate: {
          type: type.DATE,
          field: 'modified_date',
          allowNull: true
        },
        modifiedBy: {
          type: type.STRING,
          field: 'modified_by',
          allowNull: true
        },
        }, {
            tableName: 'users',
            timestamps: false
        }
    )
    return model
};
