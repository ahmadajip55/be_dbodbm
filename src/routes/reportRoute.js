const router = require('express').Router();
const { reportController } = require('../controllers/index');

router.get('/', reportController.getReportsByType);
router.post('/', reportController.saveReport);
router.post('/download/:id', reportController.downloadReport);
router.delete('/', reportController.deleteReport);

module.exports = router;