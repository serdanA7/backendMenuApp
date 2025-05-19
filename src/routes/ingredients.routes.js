const express = require('express');
const ingredientsController = require('../controllers/ingredients.controller');

const router = express.Router();

router.get('/', ingredientsController.getAllIngredients);
router.get('/:id', ingredientsController.getIngredientById);
router.post('/', ingredientsController.createIngredient);
router.put('/:id', ingredientsController.updateIngredient);
router.delete('/:id', ingredientsController.deleteIngredient);

module.exports = router; 