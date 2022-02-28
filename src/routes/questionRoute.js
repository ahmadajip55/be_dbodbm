const router = require('express').Router();
const { questionController } = require('../controllers/index');

router.post('/', questionController.addQuestion);
router.get('/all', questionController.getQuestions);
router.get('/', questionController.getQuestionByFormType);
router.delete('/:id', questionController.deleteQuestion);
router.patch('/:id', questionController.editQuestion);

module.exports = router;