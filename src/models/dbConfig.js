const { Sequelize } = require("sequelize");
const UserModel = require('./User');
 
const db = new Sequelize('db_dbodbm', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

const User = UserModel(db, Sequelize);
 
module.exports = { db, User };