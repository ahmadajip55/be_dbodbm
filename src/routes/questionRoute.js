const router = require('express').Router();
const { question } = require('../controllers');

router.post('/', question.addQuestion);
router.get('/all', question.getQuestions);
router.get('/', question.getQuestionByFormType);
router.delete('/:id', question.deleteQuestion);
router.patch('/:id', question.editQuestion);

module.exports = router;