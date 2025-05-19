const { MenuItem, Ingredient } = require('../models');

const getAllMenuItems = async (filter = {}, options = {}) => MenuItem.findAll({ 
    where: filter, 
    include: [{
        model: Ingredient,
        through: { attributes: [] } // exclude join table attributes
    }],
    ...options 
});

const getMenuItemById = async (id) => MenuItem.findByPk(id, { 
    include: [{
        model: Ingredient,
        through: { attributes: [] }
    }]
});

const createMenuItem = async (data) => {
    const { ingredientIds, ...itemData } = data;
    const item = await MenuItem.create(itemData);
    if (ingredientIds && Array.isArray(ingredientIds)) {
        await item.setIngredients(ingredientIds);
        await item.reload({
            include: [{
                model: Ingredient,
                through: { attributes: [] }
            }]
        });
    }
    return item;
};

const updateMenuItem = async (id, updates) => {
    const { ingredientIds, ...itemUpdates } = updates;
    const item = await MenuItem.findByPk(id);
    if (!item) return null;
    
    await item.update(itemUpdates);
    if (ingredientIds && Array.isArray(ingredientIds)) {
        await item.setIngredients(ingredientIds);
        await item.reload({
            include: [{
                model: Ingredient,
                through: { attributes: [] }
            }]
        });
    }
    return item;
};

const deleteMenuItem = async (id) => MenuItem.destroy({ where: { id } });

module.exports = {
    getAllMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
}; 