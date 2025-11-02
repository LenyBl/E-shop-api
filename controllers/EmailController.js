const emailService = require('../config/nodemail');
const AppError = require('../utils/AppError');

exports.sendWelcomeEmail = async (req, res, next) => {
    const { to, name } = req.body;

    if (!to || !name) {
        return next(new AppError('Missing required fields: to, name', 400));
    }
    try {
        const subject = 'Welcome to Our Service!';
        const text = `Hello ${name},\n\nThank you for joining our service. We're excited to have you on board!\n\nBest regards,\nThe Team`;
        await emailService.sendEmail({ to, subject, text });
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return next(new AppError('Failed to send welcome email', 500));
    }
};

exports.sendOrderConfirmationEmail = async (req, res, next) => {
    const { to, orderId, orderDetails } = req.body;
    if (!to || !orderId || !orderDetails) {
        return next(new AppError('Missing required fields: to, orderId, orderDetails', 400));
    }
    try {
        const subject = `Order Confirmation - Order #${orderId}`;
        const text = `Hello,\n\nThank you for your order! Here are your order details:\n\nOrder ID: ${orderId}\n${orderDetails}\n\nWe appreciate your business and hope you enjoy your purchase!\n\nBest regards,\nThe Team`;
        await emailService.sendEmail({ to, subject, text });
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        return next(new AppError('Failed to send order confirmation email', 500));
    }
};

exports.sendOrderShippedEmail = async (req, res, next) => {
    const { to, orderId } = req.body;
    if (!to || !orderId) {
        return next(new AppError('Missing required fields: to, orderId, trackingLink', 400));
    }
    try {
        const subject = `Your Order #${orderId} Has Shipped!`;
        const text = `Hello,\n\nGood news! Your order #${orderId} has been shipped.\n\nThank you for shopping with us!\n\nBest regards,\nThe Team`;
        await emailService.sendEmail({ to, subject, text });
    } catch (error) {
        console.error('Error sending order shipped email:', error);
        return next(new AppError('Failed to send order shipped email', 500));
    }
};

exports.sendOrderDeliveredEmail = async (req, res, next) => {
    const { to, orderId } = req.body;
    if (!to || !orderId) {
        return next(new AppError('Missing required fields: to, orderId', 400));
    }
    try {
        const subject = `Your Order #${orderId} Has Been Delivered!`;
        const text = `Hello,\n\nWe're happy to inform you that your order #${orderId} has been delivered. We hope you enjoy your purchase!\n\nIf you have any questions or need further assistance, feel free to reach out to our support team.\n\nBest regards,\nThe Team`;
        await emailService.sendEmail({ to, subject, text });
    } catch (error) {
        console.error('Error sending order delivered email:', error);
        return next(new AppError('Failed to send order delivered email', 500));
    }
};

exports.sendCustomEmail = async (req, res, next) => {
    const { to, subject, text } = req.body;
    if (!to || !subject || !text) {
        return next(new AppError('Missing required fields: to, subject, text', 400));
    }
    try {
        await emailService.sendEmail({ to, subject, text });
    } catch (error) {
        console.error('Error sending custom email:', error);
        return next(new AppError('Failed to send custom email', 500));
    }
};


