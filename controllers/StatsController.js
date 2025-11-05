const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const AppError = require('../utils/AppError');

exports.getOrderTotalPriceStats = async (req, res, next) => {
	try {
		const stats = await Order.aggregate([
			{
				$group: {
					_id: null,
					totalRevenue: { $sum: '$totalPrice' },
					averageOrderValue: { $avg: '$totalPrice' },
					minOrderValue: { $min: '$totalPrice' },
					maxOrderValue: { $max: '$totalPrice' }
				}
			}
		]);
		res.status(200).json(stats[0]);
	} catch (error) {
		next(new AppError('Error fetching order total price stats', 500));
	}
};

exports.getTopProductsBySales = async (req, res, next) => {
	try {
		const topProducts = await Order.aggregate([
			{ $unwind: '$products' },
			{
				$group: {
					_id: '$products.product',
					totalSold: { $sum: '$products.quantity' }
				}
			},
			{ $sort: { totalSold: -1 } },
			{ $limit: 5 },
			{
				$lookup: {
					from: 'products',
					localField: '_id',
					foreignField: '_id',
					as: 'productDetails'
				}
			},
			{ $unwind: '$productDetails' },
			{
				$project: {
					_id: 0,
					productId: '$_id',
					productName: '$productDetails.name',
					totalSold: 1
				}
			}
		]);
		res.status(200).json(topProducts);
	} catch (error) {
		next(new AppError('Error fetching top products by sales', 500));
	}
};

exports.getUserOrderCounts = async (req, res, next) => {
	try {
		const userOrderCounts = await Order.aggregate([
			{ $group: {
					_id: '$user',
					orderCount: { $sum: 1 }
				}
			}
		]);
		res.status(200).json(userOrderCounts);
	} catch (error) {
		next(new AppError('Error fetching user order counts', 500));
	}
};

exports.getNumberOfUserRegistrations = async (req, res, next) => {
	try {
		const userRegistrations = await User.countDocuments();
		res.status(200).json({ totalRegistrations: userRegistrations });
	} catch (error) {
		next(new AppError('Error fetching user registration count', 500));
	}
};

exports.getProductCategoryDistribution = async (req, res, next) => {
	try {
		const categoryDistribution = await Product.aggregate([
			{
				$group: {
					_id: '$category',
					count: { $sum: 1 }
				}
			}
		]);
		res.status(200).json(categoryDistribution);
	} catch (error) {
		next(new AppError('Error fetching product category distribution', 500));
	}
};

exports.getMonthlyOrderCounts = async (req, res, next) => {
	try {
		const monthlyOrderCounts = await Order.aggregate([
			{
				$group: {
					_id: { $month: '$createdAt' },
					orderCount: { $sum: 1 }
				}
			},
			{ $sort: { '_id': 1 } }
		]);
		res.status(200).json(monthlyOrderCounts);
	} catch (error) {
		next(new AppError('Error fetching monthly order counts', 500));
	}
};

exports.getAverageProductsPerOrder = async (req, res, next) => {
	try {
		const averageProducts = await Order.aggregate([
			{ $unwind: '$products' },
			{
				$group: {
					_id: '$_id',
					productCount: { $sum: 1 }
				}
			},
			{ $group: {
					_id: null,
					averageProductsPerOrder: { $avg: '$productCount' }
				}
			}
		]);
		res.status(200).json(averageProducts[0]);
	} catch (error) {
		next(new AppError('Error fetching average products per order', 500));
	}
};

exports.getOrderStatusDistribution = async (req, res, next) => {
	try {
		const statusDistribution = await Order.aggregate([
			{ $group: {
					_id: '$status',
					count: { $sum: 1 }
				}
			}
		]);
		res.status(200).json(statusDistribution);
	} catch (error) {
		next(new AppError('Error fetching order status distribution', 500));
	}
};

exports.getDailySalesFigures = async (req, res, next) => {
	try {
		const dailySales = await Order.aggregate([
			{ $group: {
					_id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
					totalSales: { $sum: '$totalPrice' }
				}
			}
		]);
		res.status(200).json(dailySales);
	} catch (error) {
		next(new AppError('Error fetching daily sales figures', 500));
	}
};

exports.getRepeatCustomerRate = async (req, res, next) => {
	try {
		const repeatCustomers = await Order.aggregate([
			{ $group: {
					_id: '$user',
					orderCount: { $sum: 1 }
				}
			},
			{ $match: { orderCount: { $gt: 1 } } },
			{ $count: 'repeatCustomerCount' }
		]);
		res.status(200).json(repeatCustomers);
	} catch (error) {
		next(new AppError('Error fetching repeat customer rate', 500));
	}
};

exports.getAverageOrderProcessingTime = async (req, res, next) => {
	try {
		const processingTimes = await Order.aggregate([
			{ $project: {
					processingTime: { $subtract: ['$updatedAt', '$createdAt'] }
				}
			},
			{ $group: {
					_id: null,	
					averageProcessingTime: { $avg: '$processingTime' }
				}
			}
		]);
		res.status(200).json(processingTimes[0]);
	}
	catch (error) {
		next(new AppError('Error fetching average order processing time', 500));
	}		
};



