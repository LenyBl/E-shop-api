const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

router.post('/register', UserController.registerUser);
router.get('/:id',  protect, restrictTo('admin'), UserController.getUserById);
router.put('/:id', protect, restrictTo('admin'), UserController.updateUser);
router.delete('/:id', protect, restrictTo('admin'), UserController.deleteUser);
router.get('/', protect, restrictTo('admin'), UserController.getAllUsers);

module.exports = router;