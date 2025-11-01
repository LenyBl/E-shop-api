const Category = require('../models/CategoryModel');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }   
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findByIdAndUpdate(
            req.params.categoryId,
            { name },
            { new: true }
        );  
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }   
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }   
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }   
};

