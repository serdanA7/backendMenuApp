const express = require('express');
const ordersController = require('../controllers/orders.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

// Static and special routes first
router.get('/active', ordersController.getActiveOrder);
router.get('/history', ordersController.getOrderHistory);
router.post('/checkout', ordersController.checkoutOrder);
router.post('/repeat/:orderId', ordersController.repeatOrder);
router.post('/cart/add', ordersController.addToCart);
router.post('/cart/remove', ordersController.removeFromCart);
router.post('/cart/clear', ordersController.clearCart);

// Then dynamic and general routes
router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getOrderById);
router.post('/', ordersController.createOrder);
router.put('/:id', ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router; 