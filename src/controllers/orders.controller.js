const ordersService = require('../services/orders.service');

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await ordersService.getAllOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await ordersService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { items, ...orderData } = req.body;
    const order = await ordersService.createOrder(orderData, items || []);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await ordersService.updateOrder(req.params.id, req.body);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    await ordersService.deleteOrder(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.getActiveOrder = async (req, res, next) => {
  try {
    const userId = req.user && req.user.id;
    console.log('getActiveOrder userId:', userId); // Debug log
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const order = await ordersService.getActiveOrder(userId);
    if (!order) {
      // Defensive: return an empty cart object instead of 404
      return res.json({ OrderItems: [] });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.getOrderHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await ordersService.getOrderHistory(userId);
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.checkoutOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const order = await ordersService.checkoutOrder(userId);
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

exports.repeatOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;
    const newOrder = await ordersService.repeatOrder(userId, orderId);
    res.json(newOrder);
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { menu_item_id, quantity, ingredients } = req.body;
    const result = await ordersService.addToCart(userId, menu_item_id, quantity, ingredients);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { menu_item_id } = req.body;
    const result = await ordersService.removeFromCart(userId, menu_item_id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await ordersService.clearCart(userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
}; 