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
            where: {isActive: true},
            attributes: ['id', 'fullName']
        })
        return users
    },
    async getUsersByRole(data) {
        const {role} = data
        const users = await User.findAll({
            where: {role, isActive: true},
            attributes: ['id', 'fullName', 'userName', 'createdDate']
        })
        return users
    },
    async addUser(data) {
        const user = await User.findOne({
            where: {userName: data.userName, isActive: true},
            attributes: ['id', 'fullName']
        })
        if (user) {
            throw Error('username is already exist')
        }
        const createdDate = Date.now()
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(data.password, salt);
        return User.create({
            role: data.role,
            fullName: data.fullName,
            userName: data.userName,
            password,
            isActive: true,
            createdBy: data.createdBy,
            createdDate
        })
    },
    async editUser(id, data) {
        let password
        const user = await User.findOne({
            where: {id},
            attributes: ['id', 'fullName', 'password', 'role', 'isActive']
        })
        if (data.password) {
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
            if (oldPassword && !isPasswordValid) {
                throw new Error("Password Wrong")
            }
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(data.password, salt);
        }
        await User.update({
            fullName: data.fullName ? data.fullName : user.fullName,
            userName: data.userName ? data.userName : user.userName,
            password: password ? password : user.password,
            role: data.role ? data.role : user.role,
            isActive: data.isActive !== undefined ? data.isActive : user.isActive,
            modifiedBy: data.modifiedBy,
            modifiedDate: Date.now()
        },
        {
            where: {id}
        },)
        return User.findOne({
            where: {id},
            attributes: ['id', 'fullName', 'userName']
        })
    },
    async deleteUser(id) {
        await User.destroy({
            where: {id}
        })
    }
}