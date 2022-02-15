const { Sequelize } = require("sequelize");
const UserModel = require('./User');
const QuestionModel = require('./Question');

let db = new Sequelize('db_dbodbm', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

// if app running on heroku server
if (process.env.DATABASE_URL) {
    console.log("running on heroku server");
    db = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        protocol: "postgres",
        port: 5432,
        host: "<heroku host>",
        logging: true, //false
        dialectOptions: {
            ssl: {
              rejectUnauthorized: false,
              require: true,
            }
        }
    })
}

const User = UserModel(db, Sequelize);
const Question = QuestionModel(db, Sequelize)
 
module.exports = { db, User, Question };