const ordersRepo = require('../repos/orders.repo');

const getAllOrders = (filter, options) => ordersRepo.getAllOrders(filter, options);
const getOrderById = (id) => ordersRepo.getOrderById(id);
const createOrder = (data, items) => ordersRepo.createOrder(data, items);
const updateOrder = (id, updates) => ordersRepo.updateOrder(id, updates);
const deleteOrder = (id) => ordersRepo.deleteOrder(id);
const getActiveOrder = async (userId) => {
  let order = await ordersRepo.getActiveOrder(userId);
  if (!order) {
    // Create a new cart order if none exists
    await ordersRepo.createOrder({ user_id: userId, total_amount: 0, status: 'cart' });
    order = await ordersRepo.getActiveOrder(userId);
  }
  return order;
};
const getOrderHistory = (userId) => ordersRepo.getOrderHistory(userId);
const checkoutOrder = (userId) => ordersRepo.checkoutOrder(userId);
const repeatOrder = (userId, orderId) => ordersRepo.repeatOrder(userId, orderId);
const addToCart = (userId, menu_item_id, quantity, ingredients) => ordersRepo.addToCart(userId, menu_item_id, quantity, ingredients);
const removeFromCart = (userId, menu_item_id) => ordersRepo.removeFromCart(userId, menu_item_id);
const clearCart = (userId) => ordersRepo.clearCart(userId);

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