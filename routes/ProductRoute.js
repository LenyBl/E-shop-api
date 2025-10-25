const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

router.post('/', protect, restrictTo('admin'), ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.put('/:id', protect, restrictTo('admin'), ProductController.updateProduct);
router.delete('/:id', protect, restrictTo('admin'), ProductController.deleteProduct);

module.exports = router;
