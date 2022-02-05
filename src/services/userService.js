const { db, User } = require('../models/dbConfig')

module.exports = {
    async getUser(id) {
        const user = await User.findOne({
            where: {id},
            attributes: ['id', 'fullName']
        })
        return user
    },
    async getUsers() {
        const users = await User.findAll()
        return users
    },
    async addUser(data) {
        const t = await db.transaction()
        return User.create({
            fullName: data.fullName
        })
    }
}