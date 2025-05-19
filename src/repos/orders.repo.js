const { Order, OrderItem, CustomOrderIngredient, MenuItem } = require('../models');

const getAllOrders = async (filter = {}, options = {}) => Order.findAll({ where: filter, ...options });
const getOrderById = async (id) => Order.findByPk(id, {
  include: [
    {
      model: OrderItem,
      include: [
        { model: MenuItem },
        { model: CustomOrderIngredient }
      ]
    }
  ]
});
const createOrder = async (data, items = []) => {
  const order = await Order.create(data);
  if (items.length) {
    for (const item of items) {
      await OrderItem.create({ ...item, order_id: order.id });
    }
  }
  return order;
};
const updateOrder = async (id, updates) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  return order.update(updates);
};
const deleteOrder = async (id) => Order.destroy({ where: { id } });

const getActiveOrder = async (userId) => {
  return Order.findOne({
    where: { user_id: userId, status: 'cart' },
    include: [{
      model: OrderItem,
      include: [
        { model: MenuItem },
        { model: CustomOrderIngredient }
      ]
    }]
  });
};

const getOrderHistory = async (userId) => {
  return Order.findAll({
    where: { user_id: userId, status: 'completed' },
    order: [['created_at', 'DESC']],
    include: [{
      model: OrderItem,
      include: [
        { model: MenuItem },
        { model: CustomOrderIngredient }
      ]
    }]
  });
};

const checkoutOrder = async (userId) => {
  const order = await Order.findOne({ where: { user_id: userId, status: 'cart' } });
  if (!order) return null;
  order.status = 'completed';
  await order.save();
  return order;
};

const repeatOrder = async (userId, orderId) => {
  // Find the previous order
  const prevOrder = await Order.findByPk(orderId, {
    include: [{ model: OrderItem }]
  });
  if (!prevOrder) return null;
  // Find or create a new cart order
  let cartOrder = await Order.findOne({ where: { user_id: userId, status: 'cart' } });
  if (!cartOrder) {
    cartOrder = await Order.create({ user_id: userId, total_amount: prevOrder.total_amount, status: 'cart' });
  }
  // Remove existing items in cart
  await OrderItem.destroy({ where: { order_id: cartOrder.id } });
  // Copy items
  for (const item of prevOrder.OrderItems) {
    await OrderItem.create({
      order_id: cartOrder.id,
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
      price_at_time: item.price_at_time
    });
  }
  return cartOrder;
};

const addToCart = async (userId, menu_item_id, quantity, ingredients) => {
  // Find or create active cart order
  let order = await Order.findOne({ where: { user_id: userId, status: 'cart' } });
  if (!order) {
    order = await Order.create({ user_id: userId, total_amount: 0, status: 'cart' });
  }
  // Find or create the order item
  let orderItem = await OrderItem.findOne({ where: { order_id: order.id, menu_item_id } });
  if (orderItem) {
    await orderItem.update({ quantity });
  } else {
    orderItem = await OrderItem.create({ order_id: order.id, menu_item_id, quantity, price_at_time: 0 });
  }
  // Remove old custom ingredients
  await CustomOrderIngredient.destroy({ where: { order_item_id: orderItem.id } });
  // Add new custom ingredients
  if (ingredients && Array.isArray(ingredients)) {
    for (const ing of ingredients) {
      await CustomOrderIngredient.create({ order_item_id: orderItem.id, ingredient_name: ing, action: 'add' });
    }
  }
  return getActiveOrder(userId);
};

const removeFromCart = async (userId, menu_item_id) => {
  let order = await Order.findOne({ where: { user_id: userId, status: 'cart' } });
  if (!order) return null;
  const orderItem = await OrderItem.findOne({ where: { order_id: order.id, menu_item_id } });
  if (orderItem) {
    await CustomOrderIngredient.destroy({ where: { order_item_id: orderItem.id } });
    await orderItem.destroy();
  }
  return getActiveOrder(userId);
};

const clearCart = async (userId) => {
  let order = await Order.findOne({ where: { user_id: userId, status: 'cart' } });
  if (!order) return null;
  const items = await OrderItem.findAll({ where: { order_id: order.id } });
  for (const item of items) {
    await CustomOrderIngredient.destroy({ where: { order_item_id: item.id } });
    await item.destroy();
  }
  return getActiveOrder(userId);
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getActiveOrder,
  getOrderHistory,
  checkoutOrder,
  repeatOrder,
  addToCart,
  removeFromCart,
  clearCart
}; 