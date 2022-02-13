const userService = require('../services/userService');

module.exports = {
    async getUserById(req,res){
        try {
            const id = req.params.id
            const user = await userService.getUser(id)
            if (!user){
                res.status(404)
                res.json({
                    status: "failed",
                    message: "User Not Found"
                })
                return
            }
            res.json({
                status: "success",
                data: user
            })          
        } catch (error) {
            console.log(error)
            res.status(400)
            res.json({
                status: "failed",
                message: error.message
            })
        }
    },
    async getUsers(req,res){
        try {
            const users = await userService.getUsers()
            res.json({
                status: "success",
                data: users
            })         
        } catch (error) {
            console.log(error)
            res.status(400)
            res.json({
                status: "failed",
                message: error.message
            })
        }
    },
    async addUser(req,res){
        try {
            const {id, fullName, userName} = await userService.addUser(req.body)
            res.json({
                status: "success",
                data: {id, fullName, userName}
            })         
        } catch (error) {
            res.status(400)
            res.json({
                status: "failed",
                message: error.message
            })
        }
    },
    async editUser(req,res){
        try {
            const id = req.params.id
            const user = await userService.getUser(id)
            if (!user){
                res.status(404)
                res.json({
                    status: "failed",
                    message: "User Not Found"
                }) 
                return
            }
            const userEdited = await userService.editUser(id, req.body)
            console.log('userEdited', userEdited)
            res.json({
                status: "success",
                data: userEdited
            })        
        } catch (error) {
            console.log(error)
            res.status(400)
            res.json({
                status: "failed",
                message: error.message
            })
        }
    },
    async deleteUser(req,res){
        try {
            const id = req.params.id
            const user = await userService.getUser(id)
            if (!user){
                res.status(404)
                res.json({
                    status: "failed",
                    message: "User Not Found"
                }) 
                return
            }
            await userService.deleteUser(id)
            res.json({
                status: "success",
                message: "user deleted"
            })        
        } catch (error) {
            console.log(error)
            res.status(400)
            res.json({
                status: "failed",
                message: error.message
            })
        }
    }
}