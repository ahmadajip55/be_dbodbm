const userService = require('../services/userService');

module.exports = {
    async getUserById(req,res){
        try {
            const id = req.params.id
            const user = await userService.getUser(id)
            res.json(user)         
        } catch (error) {
            console.log(error)
            res.json(error.message)
            res.status(400)
        }
    },
    async getUsers(req,res){
        try {
            const user = await userService.getUsers()
            res.json(user)         
        } catch (error) {
            console.log(error)
            res.json(error.message)
            res.status(400)
        }
    },
    async addUser(req,res){
        try {
            const user = await userService.addUser(req.body)
            res.json(user)         
        } catch (error) {
            console.log(error)
            res.json(error.message)
            res.status(400)
        }
    }
}