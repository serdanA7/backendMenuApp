const { Ingredient } = require('../models');

const getAllIngredients = async () => Ingredient.findAll();
const getIngredientById = async (id) => Ingredient.findByPk(id);
const createIngredient = async (data) => Ingredient.create(data);
const updateIngredient = async (id, updates) => {
  const ingredient = await Ingredient.findByPk(id);
  if (!ingredient) return null;
  return ingredient.update(updates);
};
const deleteIngredient = async (id) => Ingredient.destroy({ where: { id } });

module.exports = {
  getAllIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient
}; 