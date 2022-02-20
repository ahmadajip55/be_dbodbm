const router = require('express').Router();
const { user } = require('../controllers');

router.get('/:id', user.getUserById);
router.get('/all', user.getUsers);
router.get('/', user.getUsersByRole);
router.patch('/:id', user.editUser);
router.post('/', user.addUser);
router.delete('/:id', user.deleteUser);

module.exports = router;