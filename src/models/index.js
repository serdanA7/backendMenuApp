const User = require('./user.model');
const MenuItem = require('./menuItem.model');
const Ingredient = require('./ingredient.model');
const MenuItemIngredient = require('./menuItemIngredient.model');
const Order = require('./order.model');
const OrderItem = require('./orderItem.model');
const Log = require('./log.model');
const CustomOrderIngredient = require('./customOrderIngredient.model');
const MonitoredUser = require('./monitoredUser.model');

// Associations
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

MenuItem.hasMany(OrderItem, { foreignKey: 'menu_item_id' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'menu_item_id' });

MenuItem.belongsToMany(Ingredient, {
  through: MenuItemIngredient,
  foreignKey: 'menu_item_id',
  otherKey: 'ingredient_id'
});
Ingredient.belongsToMany(MenuItem, {
  through: MenuItemIngredient,
  foreignKey: 'ingredient_id',
  otherKey: 'menu_item_id'
});

OrderItem.hasMany(CustomOrderIngredient, { foreignKey: 'order_item_id' });
CustomOrderIngredient.belongsTo(OrderItem, { foreignKey: 'order_item_id' });

User.hasMany(Log, { foreignKey: 'user_id' });
Log.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(MonitoredUser, { foreignKey: 'user_id' });
MonitoredUser.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  User,
  MenuItem,
  Ingredient,
  MenuItemIngredient,
  Order,
  OrderItem,
  Log,
  CustomOrderIngredient,
  MonitoredUser
}; 