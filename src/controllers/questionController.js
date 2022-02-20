const questionService = require('../services/questionService');

module.exports = {
    async getQuestions(req,res){
        try {
            const questions = await questionService.getQuestions()
            res.json({
                status: "success",
                questions
            })         
        } catch (error) {
            res.status(400)
            res.json({
                status: "failed",
                message: error.message
            })
        }
    },
    async getQuestionByFormType(req,res) {
        try {
            const questions = await questionService.getQuestionByFormType(req.query)
            res.json({
                status: "success",
                questions
            })         
        } catch (error) {
            res.status(400)
            res.json({
                status: "failed",
                message: error.message
            })
        }
    },
    async addQuestion(req,res) {
        try {
            const question = await questionService.addQuestion(req.body)
            res.json({
                status: "success",
                question
            })         
        } catch (error) {
            console.log('error', error)
            res.status(400)
            res.json({
                status: "failed",
                message: error.message
            })
        }
    },
    async editQuestion(req,res){
        try {
            const id = req.params.id
            const question = await questionService.getQuestion(id)
            if (!question){
                res.status(404)
                res.json({
                    status: "failed",
                    message: "Question Not Found"
                }) 
                return
            }
            const questionEdited = await questionService.editQuestion(id, req.body)
            res.json({
                status: "success",
                question: questionEdited
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
    async deleteQuestion(req,res){
        try {
            const id = req.params.id
            const question = await questionService.getQuestion(id)
            if (!question){
                res.status(404)
                res.json({
                    status: "failed",
                    message: "Question Not Found"
                }) 
                return
            }
            await questionService.deleteQuestion(id)
            res.json({
                status: "success",
                message: "question deleted"
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