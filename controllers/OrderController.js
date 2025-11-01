const Order = require('../models/OrderModel');
const AppError = require('../utils/AppError');

exports.createOrder = async (req, res, next) => {
	try {
		const orderData = {
			numberOfOrder: Math.floor(Math.random() * (9999 - 0 + 1)) + 0,
			user: req.user._id,
			products: req.body.products,
			totalPrice: req.body.totalPrice
		};
		const order = new Order(orderData);
		const savedOrder = await order.save();
		res.status(201).json(savedOrder);
	} catch (error) {
		return next(new AppError('Error creating order', 500));
	}
};

exports.getOrderById = async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.orderId).populate('user').populate('products.product');
		if (!order) {
			return next(new AppError('Order not found', 404));
		}
		res.status(200).json(order);
	} catch (error) {
		return next(new AppError('Error fetching order', 500));
	}
};

exports.getAllOrders = async (req, res, next) => {
	try {
		const orders = await Order.find().populate('user').populate('products.product');
		res.status(200).json(orders);
	} catch (error) {
		return next(new AppError('Error fetching orders', 500));
	}
};

exports.getProductsInOrderById = async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.orderId).populate('products.product');
		if (!order) {
			return next(new AppError('Order not found', 404));
		}
		res.status(200).json(order.products);
	} catch (error) {
		return next(new AppError('Error fetching products in order', 500));
	}
};

exports.addProductToOrder = async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.orderId);
		if (!order) {
			return next(new AppError('Order not found', 404));
		}
		order.products.push({
			product: req.body.productId,
			quantity: req.body.quantity
		});
		order.updatedAt = Date.now();
		const updatedOrder = await order.save();
		res.status(200).json(updatedOrder);
	} catch (error) {
		return next(new AppError('Error adding product to order', 500));
	}
};

exports.removeProductFromOrder = async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.orderId);
		if (!order) {
			return next(new AppError('Order not found', 404));
		}
		order.products = order.products.filter(
			item => item.product.toString() !== req.body.productId
		);
		order.updatedAt = Date.now();
		const updatedOrder = await order.save();
		res.status(200).json(updatedOrder);
	} catch (error) {
		return next(new AppError('Error removing product from order', 500));
	}
};

exports.updateOrderStatus = async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.orderId);
		if (!order) {
			return next(new AppError('Order not found', 404));
		}
		order.status = req.body.status;
		order.updatedAt = Date.now();
		const updatedOrder = await order.save();
		res.status(200).json(updatedOrder);
	} catch (error) {
		return next(new AppError('Error updating order status', 500));
	}
};

exports.deleteOrder = async (req, res, next) => {
	try {
		const order = await Order.findByIdAndDelete(req.params.orderId);
		if (!order) {
			return next(new AppError('Order not found', 404));
		}
		res.status(204).json();
	} catch (error) {
		return next(new AppError('Error deleting order', 500));
	}
};
