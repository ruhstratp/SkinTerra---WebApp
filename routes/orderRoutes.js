const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/:orderId', orderController.getOrder);
router.get('/', orderController.getOrders);
router.put('/:orderId', orderController.updateOrder);
router.patch('/:orderId', orderController.updateOrderStatus);
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;