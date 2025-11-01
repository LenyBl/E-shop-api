const Product = require('../models/ProductModel');
const AppError = require('../utils/AppError');

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        return next(new AppError('Error fetching products', 500));
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return next(new AppError('Product not found', 404));
        res.json(product);
    } catch (error) {
        return next(new AppError('Error fetching product', 500));
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        return next(new AppError('Error creating product', 500));
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProduct) return next(new AppError('Product not found', 404));
        res.json(updatedProduct);
    } catch (error) {
        return next(new AppError('Error updating product', 500));
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return next(new AppError('Product not found', 404));
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        return next(new AppError('Error deleting product', 500));
    }
};

