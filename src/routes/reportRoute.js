const router = require('express').Router();
const { reportController } = require('../controllers/index');

router.get('/', reportController.getReportsByType);
router.get('/:id', reportController.getReportById);
router.post('/', reportController.saveReport);
router.post('/download/:id', reportController.downloadReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;