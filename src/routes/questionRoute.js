const router = require('express').Router();
const { question } = require('../controllers');

router.post('/', question.addQuestion);
router.get('/', question.getQuestions);
router.get('/', question.getQuestionByFormType);

module.exports = router;