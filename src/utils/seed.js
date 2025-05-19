require('../models');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../repos/db');
const { User, MenuItem, Ingredient, MenuItemIngredient } = require('../models');

async function seed() {
  await sequelize.sync({ force: true }); // Drops and recreates tables

  // Insert users
  await User.bulkCreate([
    { username: 'admin_user', email: 'admin@example.com', password_hash: await bcrypt.hash('parola1', 10), role: 'admin' },
    { username: 'john_doe', email: 'john@example.com', password_hash: await bcrypt.hash('parolaUser1', 10), role: 'user' },
    { username: 'jane_smith', email: 'jane@example.com', password_hash: await bcrypt.hash('parolaUser2', 10), role: 'user' }
  ]);

  // Insert menu items
  await MenuItem.bulkCreate([
    { name: 'Soon Staff', category: 'Breakfast', price: 8.38, image: 'https://www.lorempixel.com/53/746', rating: 4.32, reviews: 306 },
    { name: 'Respond Let', category: 'Breakfast', price: 38.52, image: 'https://placekitten.com/759/449', rating: 3.89, reviews: 371 },
    { name: 'Team However', category: 'Lunch', price: 13.67, image: 'https://placekitten.com/389/167', rating: 4.28, reviews: 353 },
    { name: 'Book Possible', category: 'Bar', price: 29.26, image: 'https://dummyimage.com/652x581', rating: 3.74, reviews: 444 },
    { name: 'Successful Foreign', category: 'Lunch', price: 25.57, image: 'https://dummyimage.com/913x992', rating: 4.68, reviews: 489 }
  ]);

  // Insert ingredients
  await Ingredient.bulkCreate([
    { name: 'Better' },
    { name: 'Easy' },
    { name: 'Sometimes' },
    { name: 'Former' },
    { name: 'Pick' }
  ]);

  // Insert menu_item_ingredients
  await MenuItemIngredient.bulkCreate([
    { menu_item_id: 1, ingredient_id: 1 },
    { menu_item_id: 1, ingredient_id: 3 },
    { menu_item_id: 1, ingredient_id: 5 },
    { menu_item_id: 2, ingredient_id: 2 },
    { menu_item_id: 2, ingredient_id: 4 },
    { menu_item_id: 2, ingredient_id: 5 },
    { menu_item_id: 3, ingredient_id: 1 },
    { menu_item_id: 3, ingredient_id: 2 },
    { menu_item_id: 3, ingredient_id: 3 },
    { menu_item_id: 4, ingredient_id: 2 },
    { menu_item_id: 4, ingredient_id: 3 },
    { menu_item_id: 4, ingredient_id: 4 },
    { menu_item_id: 5, ingredient_id: 1 },
    { menu_item_id: 5, ingredient_id: 4 },
    { menu_item_id: 5, ingredient_id: 5 }
  ]);

  // Debug print: show all join table links
  const allLinks = await MenuItemIngredient.findAll();
  console.log('MenuItemIngredient links:', allLinks.map(l => l.toJSON()));

  // Direct association test: fetch MenuItem 1 with Ingredients
  const menuItem = await MenuItem.findByPk(1, { include: Ingredient });
  console.log('MenuItem 1 with Ingredients:', JSON.stringify(menuItem, null, 2));

  console.log('Database seeded!');
  process.exit();
}

seed(); 