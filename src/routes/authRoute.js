const router = require('express').Router();
const { authController } = require('../controllers/index');

router.post('/', authController.doLogin);

module.exports = router;