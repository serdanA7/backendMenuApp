const { DataTypes } = require('sequelize');
const { sequelize } = require('../repos/db');

const Ingredient = sequelize.define('Ingredient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'ingredients'
});

module.exports = Ingredient; 