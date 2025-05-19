const { DataTypes } = require('sequelize');
const { sequelize } = require('../repos/db');

const CustomOrderIngredient = sequelize.define('CustomOrderIngredient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_item_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ingredient_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  action: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isIn: [['add', 'remove']]
    }
  }
}, {
  timestamps: false
});

module.exports = CustomOrderIngredient; 