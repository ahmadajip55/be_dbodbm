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
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new Error("Password Wrong")
        }
        return jwt.sign({ id:user.id, fullName: user.fullName, userName }, process.env.JWT_KEY);
    }
}