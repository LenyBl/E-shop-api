const Category = require('../models/CategoryModel');
const AppError = require('../utils/AppError');

exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        return next(new AppError('Error creating category', 500));
    }
};

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        return next(new AppError('Error fetching categories', 500));
    }
};

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        return next(new AppError('Error fetching categories', 500));
    }   
};

exports.getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            return next(new AppError('Category not found', 404));
        }
        res.status(200).json(category);
    } catch (error) {
        return next(new AppError('Error fetching category', 500));
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await Category.findByIdAndUpdate(
            req.params.categoryId,
            { name },
            { new: true }
        );  
        if (!category) {
            return next(new AppError('Category not found', 404));
        }   
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        return next(new AppError('Error updating category', 500));
    }   
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.categoryId);
        if (!category) {
            return next(new AppError('Category not found', 404));
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        return next(new AppError('Error deleting category', 500));
    }   
};

