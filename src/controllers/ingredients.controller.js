const ingredientsService = require('../services/ingredients.service');

exports.getAllIngredients = async (req, res, next) => {
  try {
    const ingredients = await ingredientsService.getAllIngredients();
    res.json(ingredients);
  } catch (err) {
    next(err);
  }
};

exports.getIngredientById = async (req, res, next) => {
  try {
    const ingredient = await ingredientsService.getIngredientById(req.params.id);
    if (!ingredient) return res.status(404).json({ error: 'Ingredient not found' });
    res.json(ingredient);
  } catch (err) {
    next(err);
  }
};

exports.createIngredient = async (req, res, next) => {
  try {
    const ingredient = await ingredientsService.createIngredient(req.body);
    res.status(201).json(ingredient);
  } catch (err) {
    next(err);
  }
};

exports.updateIngredient = async (req, res, next) => {
  try {
    const ingredient = await ingredientsService.updateIngredient(req.params.id, req.body);
    if (!ingredient) return res.status(404).json({ error: 'Ingredient not found' });
    res.json(ingredient);
  } catch (err) {
    next(err);
  }
};

exports.deleteIngredient = async (req, res, next) => {
  try {
    await ingredientsService.deleteIngredient(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}; 