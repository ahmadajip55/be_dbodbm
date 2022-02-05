module.exports = (sequelize, type) => {
    const model = sequelize.define('users', {
        id: {
          type: type.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        fullName: {
          type: type.STRING,
          field: 'full_name'
        }
        }, {
            tableName: 'users',
            timestamps: false
        }
    )
    return model
};
