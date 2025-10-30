const express = require('express');
const OrderController = require('../controllers/OrderController');
const {protect, restrictTo} = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, OrderController.createOrder);
router.get('/:orderId', protect, OrderController.getOrderById);
router.get('/', protect, restrictTo('admin'), OrderController.getAllOrders);
router.get('/:orderId/products', protect, OrderController.getProductsInOrderById);
router.put('/:orderId/status', protect, restrictTo('admin'), OrderController.updateOrderStatus);
router.put('/:orderId/products', protect, restrictTo('admin'), OrderController.addProductToOrder);
router.delete('/:orderId/products/remove', protect, restrictTo('admin'), OrderController.removeProductFromOrder);
router.delete('/:orderId', protect, restrictTo('admin'), OrderController.deleteOrder);

module.exports = router;