const router = require('express').Router();
const { userController } = require('../controllers/index');

router.get('/all', userController.getUsers);
router.get('/:id', userController.getUserById);
router.get('/', userController.getUsersByRole);
router.patch('/:id', userController.editUser);
router.post('/', userController.addUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;