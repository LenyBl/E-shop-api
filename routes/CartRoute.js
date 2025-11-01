const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.get('/:userId', CartController.getCartByUserId);
router.post('/:userId/:idItems', CartController.addItemToCart);
router.delete('/:userId/items/:itemId', CartController.removeItemFromCart);
router.delete('/:userId/clear', CartController.clearCart);
router.put('/:userId/items/:itemId', CartController.updateItemQuantity);

module.exports = router;