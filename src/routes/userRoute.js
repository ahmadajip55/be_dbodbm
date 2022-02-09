const router = require('express').Router();
const { user } = require('../controllers');

router.get('/', user.getUsers);
// router.get('/:id', user.getUserById);
// router.patch('/:id', user.editUser);
router.post('/', user.addUser);
// router.delete('/:id', user.deleteUser);

module.exports = router;