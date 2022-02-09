const { db, User } = require('../models/dbConfig')
const bcrypt = require("bcrypt");

module.exports = {
    async getUser(id) {
        const user = await User.findOne({
            where: {id},
            attributes: ['id', 'fullName']
        })
        return user
    },
    async getUsers() {
        const users = await User.findAll({
            attributes: ['id', 'fullName']
        })
        return users
    },
    async addUser(data) {
        const t = await db.transaction()
        const user = await User.findOne({
            where: {userName: data.userName},
            attributes: ['id', 'fullName']
        })
        console.log(user);
        if (user) {
            throw Error('username is already exist')
        }
        const createdDate = Date.now()
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(data.password, salt);
        return User.create({
            fullName: data.fullName,
            userName: data.userName,
            password,
            createdBy: data.createdBy,
            createdDate
        }, t)
    },
    async editUser(id, data) {
        const t = await db.transaction()
        let password
        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(data.password, salt);
        }
        const user = User.findOne({
            where: {id},
            attributes: ['id', 'fullName']
        })
        await User.update({
            fullName: data.fullName ? data.fullName : user.fullName,
            userName: data.userName ? data.userName : user.userName,
            password: password ? password : user.password,
            modifiedBy: data.modifiedBy,
            modifiedDate: Date.now()
        },
        {
            where: {id}
        }, t)
        return User.findOne({
            where: {id},
            attributes: ['id', 'fullName']
        })
    },
    async deleteUser(id) {
        const t = await db.transaction()
        await User.destroy({
            where: {id}
        }, t)
    }
}