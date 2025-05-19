const ingredientsRepo = require('../repos/ingredients.repo');

const getAllIngredients = () => ingredientsRepo.getAllIngredients();
const getIngredientById = (id) => ingredientsRepo.getIngredientById(id);
const createIngredient = (data) => ingredientsRepo.createIngredient(data);
const updateIngredient = (id, updates) => ingredientsRepo.updateIngredient(id, updates);
const deleteIngredient = (id) => ingredientsRepo.deleteIngredient(id);

module.exports = {
  getAllIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient
}; 