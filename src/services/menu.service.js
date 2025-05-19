const menuRepo = require('../repos/menu.repo');

const getAllMenuItems = (filter, options) => menuRepo.getAllMenuItems(filter, options);
const getMenuItemById = (id) => menuRepo.getMenuItemById(id);
const createMenuItem = (data) => menuRepo.createMenuItem(data);
const updateMenuItem = (id, updates) => menuRepo.updateMenuItem(id, updates);
const deleteMenuItem = (id) => menuRepo.deleteMenuItem(id);

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
}; 