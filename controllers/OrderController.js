const Order = require('../models/OrderModel');

exports.createOrder = async (req, res) => {
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
		res.status(400).json({ message: error.message });
	}
};

exports.getOrderById = async (req, res) => {
	try {
		const order = await Order.findById(req.params.orderId).populate('user').populate('products.product');
		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}
		res.status(200).json(order);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find().populate('user').populate('products.product');
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getProductsInOrderById = async (req, res) => {
	try {
		const order = await Order.findById(req.params.orderId).populate('products.product');
		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}	
		res.status(200).json(order.products);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.addProductToOrder = async (req, res) => {
	try {
		const order = await Order.findById(req.params.orderId);
		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}	
		order.products.push({
			product: req.body.productId,
			quantity: req.body.quantity
		});
		order.updatedAt = Date.now();
		const updatedOrder = await order.save();
		res.status(200).json(updatedOrder);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.removeProductFromOrder = async (req, res) => {
	try {
		const order = await Order.findById(req.params.orderId);
		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}
		order.products = order.products.filter(
			item => item.product.toString() !== req.body.productId
		);
		order.updatedAt = Date.now();
		const updatedOrder = await order.save();
		res.status(200).json(updatedOrder);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.updateOrderStatus = async (req, res) => {
	try {
		const order = await Order.findById(req.params.orderId);
		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}
		order.status = req.body.status;
		order.updatedAt = Date.now();
		const updatedOrder = await order.save();
		res.status(200).json(updatedOrder);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.deleteOrder = async (req, res) => {
	try {
		const order = await Order.findByIdAndDelete(req.params.orderId);
		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}
		res.status(204).json();
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
