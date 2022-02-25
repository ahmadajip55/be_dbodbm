const { db, Question } = require('../models/dbConfig')

module.exports = {
    async getQuestion(id) {
        const question = await Question.findOne({
            where: {id, isActive: true},
            attributes: ['id', 'formType', 'question', 'isActive']
        })
        return question
    },
    async getQuestions() {
        const questions = await Question.findAll({
            where: {isActive: true},
            attributes: ['id', 'formType', 'question', 'isActive']
        })
        return questions
    },
    async getQuestionByFormType(data) {
        const {formType} = data
        const questions = await Question.findAll({
            where: {formType: formType, isActive: true},
            attributes: ['id', 'formType', 'question', 'isActive']
        })
        return questions
    },
    async addQuestion(data) {
        const createdDate = Date.now()
        console.log(data)
        return Question.create({
            formType: data.formType,
            question: data.question,
            isActive: true,
            createdBy: data.createdBy,
            createdDate
        })
    },
    async editQuestion(id, data) {
        const question = await Question.findOne({
            where: {id},
            attributes: ['id', 'formType', 'question', 'isActive']
        })
        console.log('id, data', id, data, data.isActive === undefined, data.isActive === undefined ?  question.isActive : data.isActive)
        await Question.update({
            formType: data.formType ? data.formType : question.formType,
            question: data.question ? data.question : question.question,
            isActive: data.isActive === undefined ?  question.isActive : data.isActive,
            modifiedBy: data.modifiedBy,
            modifiedDate: Date.now()
        },
        {
            where: {id}
        })
        return Question.findOne({
            where: {id},
            attributes: ['id', 'formType', 'question', 'isActive']
        })
    },
    async deleteQuestion(id) {
        await Question.destroy({
            where: {id}
        })
    }
}