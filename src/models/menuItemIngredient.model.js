const { DataTypes } = require('sequelize');
const { sequelize } = require('../repos/db');

const MenuItemIngredient = sequelize.define('MenuItemIngredient', {
  menu_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    onDelete: 'CASCADE'
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    onDelete: 'CASCADE'
  }
}, {
  timestamps: false,
  tableName: 'menu_item_ingredients'
});

module.exports = MenuItemIngredient; 