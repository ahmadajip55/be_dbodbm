const authService = require('../services/authService');

module.exports = {
    async doLogin(req,res){
        try {
            const {userName} = req.body
            const user = await authService.getUserByUsername(userName)
            if (!user){
                res.status(404)
                res.json({
                    status: "failed",
                    message: "user not found"
                }) 
            }
            const token = await authService.doLogin(req.body)
            if (!token) {
                res.status(400)
                res.json({
                    status: "failed",
                    message: "password wrong"
                }) 
            }
            res.json({
                status: "success",
                token
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