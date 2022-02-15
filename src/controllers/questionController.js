const questionService = require('../services/questionService');

module.exports = {
    async getQuestions(req,res){
        try {
            const questions = await questionService.getQuestions()
            res.json({
                status: "success",
                data: questions
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
            res.status(400)
            res.json({
                status: "failed",
                message: error.message
            })
        }
    }
}