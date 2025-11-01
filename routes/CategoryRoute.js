const express = require('express')
const CategoryController = require('../controllers/CategoryController')
const {protect, restrictTo} = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/', protect, restrictTo('admin'), CategoryController.createCategory)
router.get('/', CategoryController.getAllCategories)
router.get('/:categoryId', CategoryController.getCategoryById)
router.put('/:categoryId', protect, restrictTo('admin'), CategoryController.updateCategory)
router.delete('/:categoryId', protect, restrictTo('admin'), CategoryController.deleteCategory)

module.exports = router