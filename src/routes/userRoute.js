const router = require('express').Router();
const { user } = require('../controllers');

router.get('/', user.getUsers);
router.get('/:id', user.getUserById);
router.post('/', user.addUser);

module.exports = router;