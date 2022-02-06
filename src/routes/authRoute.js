const router = require('express').Router();
const { auth } = require('../controllers');

router.post('/', auth.doLogin);

module.exports = router;