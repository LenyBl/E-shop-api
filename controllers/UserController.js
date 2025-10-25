const User = require('../models/UserModel');
const Cart = require('../models/CartModel');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, role: role || 'user' });
        const newCart = new Cart({ user: newUser._id, items: [] });
        newUser.cart = newCart._id;
        const savedUser = await newUser.save();
        await newCart.save();
        res.status(201).json({ message: 'User registered successfully', userId: savedUser._id });
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password').populate('cart');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updates = req.body;   
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        await Cart.findByIdAndDelete(deletedUser.cart);
        res.json({ message: 'User and associated cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').populate('cart');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }       
};
