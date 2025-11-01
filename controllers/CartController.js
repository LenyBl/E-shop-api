const Cart = require('../models/CartModel');
const User = require('../models/UserModel');
const AppError = require('../utils/AppError');

exports.getCartByUserId = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).populate({
            path: 'cart',
            populate: { path: 'items.product' }
        });
        if (!user || !user.cart) return next(new AppError('Cart not found', 404));
        res.json(user.cart);
    } catch (error) {
        return next(new AppError('Error fetching cart', 500));
    }   
};

exports.addItemToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const user = await User.findById(req.params.userId).populate('cart');
        if (!user || !user.cart) return next(new AppError('Cart not found', 404));
        const cart = user.cart;
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        return next(new AppError('Error adding item to cart', 500));
    }   
};

exports.removeItemFromCart = async (req, res, next) => {  
    try {
        const { userId, itemId } = req.params;
        const user = await User.findById(userId).populate('cart');
        if (!user || !user.cart) return next(new AppError('Cart not found', 404));
        const cart = user.cart;
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        return next(new AppError('Error removing item from cart', 500));
    }
};

exports.clearCart = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).populate('cart');
        if (!user || !user.cart) return next(new AppError('Cart not found', 404));
        const cart = user.cart;
        cart.items = [];
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        return next(new AppError('Error clearing cart', 500));
    }       
};

exports.updateItemQuantity = async (req, res) => {
    try {   
        const { userId, itemId } = req.params;
        const { quantity } = req.body;
        const user = await User.findById(userId).populate('cart');
        if (!user || !user.cart) return next(new AppError('Cart not found', 404));
        const cart = user.cart;
        const item = cart.items.find(item => item._id.toString() === itemId);
        if (!item) return next(new AppError('Item not found in cart', 404));
        item.quantity = quantity;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        return next(new AppError('Error updating item quantity', 500));
    }
};

