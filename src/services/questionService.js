const { db, Question } = require('../models/dbConfig')

module.exports = {
    async getQuestions() {
        const users = await Question.findAll({
            attributes: ['id', 'formType', 'question', 'isActive']
        })
        return users
    },
    async getQuestionByFormType(data) {
        const {formType} = data
        console.log('formType', formType, data)
        return Question.findAll({
            where: {formType: undefined},
            attributes: ['id', 'formType', 'question', 'isActive']
        })
    },
    async addQuestion(data) {
        const t = await db.transaction()
        const createdDate = Date.now()
        return Question.create({
            formType: data.formType,
            question: data.question,
            isActive: true,
            createdBy: data.createdBy,
            createdDate
        }, t)
    }
}