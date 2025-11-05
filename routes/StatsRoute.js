const express = require('express');
const router = express.Router();
const StatsController = require('../controllers/StatsController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

router.get('/stats-order-total-price', protect, restrictTo('admin'), StatsController.getOrderTotalPriceStats);
router.get('/stats-top-products', protect, restrictTo('admin'), StatsController.getTopProductsBySales);
router.get('/stats-user-order-counts', protect, restrictTo('admin'), StatsController.getUserOrderCounts);
router.get('/number-of-user-registration', protect, restrictTo('admin'), StatsController.getNumberOfUserRegistrations);
router.get('/product-category-distribution', protect, restrictTo('admin'), StatsController.getProductCategoryDistribution);
router.get('/monthly-order-counts', protect, restrictTo('admin'), StatsController.getMonthlyOrderCounts);
router.get('/average-products-per-order', protect, restrictTo('admin'), StatsController.getAverageProductsPerOrder);
router.get('/order-status-distribution', protect, restrictTo('admin'), StatsController.getOrderStatusDistribution);
router.get('/daily-sales-figures', protect, restrictTo('admin'), StatsController.getDailySalesFigures);
router.get('/repeat-customer-rate', protect, restrictTo('admin'), StatsController.getRepeatCustomerRate);
router.get('/average-order-processing-time', protect, restrictTo('admin'), StatsController.getAverageOrderProcessingTime);

module.exports = router;