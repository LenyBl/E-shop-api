const User = require('../models/UserModel');
const Cart = require('../models/CartModel');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');

exports.registerUser = async (req, res, next) => {
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
        return next(new AppError('Error registering user', 500));
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password').populate('cart');
        if (!user) return next(new AppError('User not found', 404));
        res.json(user);
    } catch (error) {
        return next(new AppError('Error fetching user', 500));
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const updates = req.body;   
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        if (!updatedUser) return next(new AppError('User not found', 404));
        res.json(updatedUser);
    } catch (error) {
        return next(new AppError('Error updating user', 500));
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return next(new AppError('User not found', 404));
        await Cart.findByIdAndDelete(deletedUser.cart);
        res.json({ message: 'User and associated cart deleted successfully' });
    } catch (error) {
        return next(new AppError('Error deleting user', 500));
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password').populate('cart');
        res.json(users);
    } catch (error) {
        return next(new AppError('Error fetching users', 500));
    }       
};
