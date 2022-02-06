const { User } = require('../models/dbConfig')
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

module.exports = {
    async getUserByUsername(userName) {
        const user = await User.findOne({
            where: {userName},
            attributes: ['id', 'fullName', 'password']
        })
        return user
    },
    async doLogin({userName, password}) {
        const user = await this.getUserByUsername(userName)
        if (bcrypt.compare(password, user.password)) {
            return jwt.sign({ fullName: user.fullName, userName }, process.env.JWT_KEY);
        }
        return
    }
}