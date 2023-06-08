const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getCart);
router.post('/add/:productId', cartController.addToCart);
router.put('/update/:cartItemId', cartController.updateCartItem);
router.delete('/delete/:cartItemId', cartController.deleteCartItem);

module.exports = router;