const Cart = require('../models/CartModel');
const User = require('../models/UserModel');

exports.getCartByUserId = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate({
            path: 'cart',
            populate: { path: 'items.product' }
        });
        if (!user || !user.cart) return res.status(404).json({ message: 'Cart not found' });
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

exports.addItemToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = await User.findById(req.params.userId).populate('cart');
        if (!user || !user.cart) return res.status(404).json({ message: 'Cart not found' });        
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
        res.status(500).json({ message: error.message });
    }   
};

exports.removeItemFromCart = async (req, res) => {  
    try {
        const { userId, itemId } = req.params;
        const user = await User.findById(userId).populate('cart');
        if (!user || !user.cart) return res.status(404).json({ message: 'Cart not found' });
        const cart = user.cart;
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        await cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('cart');
        if (!user || !user.cart) return res.status(404).json({ message: 'Cart not found' });
        const cart = user.cart;
        cart.items = [];
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }       
};

exports.updateItemQuantity = async (req, res) => {
    try {   
        const { userId, itemId } = req.params;
        const { quantity } = req.body;
        const user = await User.findById(userId).populate('cart');
        if (!user || !user.cart) return res.status(404).json({ message: 'Cart not found' });
        const cart = user.cart;
        const item = cart.items.find(item => item._id.toString() === itemId);
        if (!item) return res.status(404).json({ message: 'Item not found in cart' });
        item.quantity = quantity;
        await cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

