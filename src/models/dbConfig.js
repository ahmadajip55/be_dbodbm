const { Sequelize } = require("sequelize");
const UserModel = require('./User');
const QuestionModel = require('./Question');
const ReportModel = require('./Report');
const FormModel = require('./Form');

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
        host: "ec2-54-156-110-139.compute-1.amazonaws.com",
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
const Question = QuestionModel(db, Sequelize);
const Report = ReportModel(db, Sequelize);
const Form = FormModel(db, Sequelize);

User.hasMany(Report, {foreignKey: 'createdBy', sourceKey: 'id'});
Report.belongsTo(User, {foreignKey: 'createdBy', targetKey: 'id'});
Report.hasMany(Form, {foreignKey: 'reportId', targetKey: 'id'});
Form.belongsTo(Report, {foreignKey: 'reportId', sourceKey: 'id'});
 
module.exports = { db, Sequelize, User, Question, Report, Form };