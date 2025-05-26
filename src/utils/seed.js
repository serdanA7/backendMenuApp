require('dotenv').config()
require('../models');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../repos/db');
const { User, MenuItem, Ingredient, MenuItemIngredient } = require('../models');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Seeding DB at host:', process.env.DB_HOST);


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
    // Breakfast
    { name: 'Classic Pancakes', category: 'Breakfast', price: 7.99, image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&w=500', rating: 4.5, reviews: 128 },
    { name: 'Avocado Toast', category: 'Breakfast', price: 8.49, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=500', rating: 4.3, reviews: 95 },
    { name: 'Omelette', category: 'Breakfast', price: 6.99, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', rating: 4.6, reviews: 110 },
    // Dinner
    { name: 'Grilled Salmon', category: 'Dinner', price: 18.99, image: 'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&w=500', rating: 4.7, reviews: 156 },
    { name: 'Beef Steak', category: 'Dinner', price: 22.99, image: 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&w=500', rating: 4.8, reviews: 203 },
    { name: 'Chicken Alfredo', category: 'Dinner', price: 15.99, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', rating: 4.4, reviews: 120 },
    // Dessert
    { name: 'Chocolate Cake', category: 'Dessert', price: 5.99, image: 'https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg?auto=compress&w=500', rating: 4.6, reviews: 178 },
    { name: 'Tiramisu', category: 'Dessert', price: 6.99, image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&w=500', rating: 4.4, reviews: 142 },
    { name: 'Cheesecake', category: 'Dessert', price: 6.49, image: 'https://images.pexels.com/photos/704971/pexels-photo-704971.jpeg?auto=compress&w=500', rating: 4.7, reviews: 160 },
    // Bar
    { name: 'Mojito', category: 'Bar', price: 8.00, image: 'https://images.pexels.com/photos/209594/pexels-photo-209594.jpeg?auto=compress&w=500', rating: 4.2, reviews: 90 },
    { name: 'Old Fashioned', category: 'Bar', price: 9.00, image: 'https://images.pexels.com/photos/210909/pexels-photo-210909.jpeg?auto=compress&w=500', rating: 4.5, reviews: 105 },
    { name: 'Margarita', category: 'Bar', price: 8.50, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', rating: 4.3, reviews: 98 }
  ]);

  // Insert ingredients
  await Ingredient.bulkCreate([
    { name: 'Eggs' },
    { name: 'Flour' },
    { name: 'Milk' },
    { name: 'Butter' },
    { name: 'Maple Syrup' },
    { name: 'Avocado' },
    { name: 'Sourdough Bread' },
    { name: 'Salmon Fillet' },
    { name: 'Lemon' },
    { name: 'Dill' },
    { name: 'Beef' },
    { name: 'Potatoes' },
    { name: 'Chicken' },
    { name: 'Pasta' },
    { name: 'Parmesan' },
    { name: 'Chocolate' },
    { name: 'Mascarpone' },
    { name: 'Coffee' },
    { name: 'Ladyfingers' },
    { name: 'Cream Cheese' },
    { name: 'Rum' },
    { name: 'Mint' },
    { name: 'Lime' },
    { name: 'Whiskey' },
    { name: 'Sugar' },
    { name: 'Tequila' },
    { name: 'Triple Sec' }
  ]);

  // Insert menu_item_ingredients (linking by index)
  await MenuItemIngredient.bulkCreate([
    // Pancakes
    { menu_item_id: 1, ingredient_id: 1 }, // Eggs
    { menu_item_id: 1, ingredient_id: 2 }, // Flour
    { menu_item_id: 1, ingredient_id: 3 }, // Milk
    { menu_item_id: 1, ingredient_id: 4 }, // Butter
    { menu_item_id: 1, ingredient_id: 5 }, // Maple Syrup
    // Avocado Toast
    { menu_item_id: 2, ingredient_id: 6 }, // Avocado
    { menu_item_id: 2, ingredient_id: 7 }, // Sourdough Bread
    { menu_item_id: 2, ingredient_id: 1 }, // Eggs
    // Omelette
    { menu_item_id: 3, ingredient_id: 1 }, // Eggs
    { menu_item_id: 3, ingredient_id: 3 }, // Milk
    { menu_item_id: 3, ingredient_id: 4 }, // Butter
    // Grilled Salmon
    { menu_item_id: 4, ingredient_id: 8 }, // Salmon Fillet
    { menu_item_id: 4, ingredient_id: 9 }, // Lemon
    { menu_item_id: 4, ingredient_id: 10 }, // Dill
    // Beef Steak
    { menu_item_id: 5, ingredient_id: 11 }, // Beef
    { menu_item_id: 5, ingredient_id: 12 }, // Potatoes
    { menu_item_id: 5, ingredient_id: 4 }, // Butter
    // Chicken Alfredo
    { menu_item_id: 6, ingredient_id: 13 }, // Chicken
    { menu_item_id: 6, ingredient_id: 14 }, // Pasta
    { menu_item_id: 6, ingredient_id: 15 }, // Parmesan
    // Chocolate Cake
    { menu_item_id: 7, ingredient_id: 16 }, // Chocolate
    { menu_item_id: 7, ingredient_id: 1 }, // Eggs
    { menu_item_id: 7, ingredient_id: 2 }, // Flour
    // Tiramisu
    { menu_item_id: 8, ingredient_id: 17 }, // Mascarpone
    { menu_item_id: 8, ingredient_id: 18 }, // Coffee
    { menu_item_id: 8, ingredient_id: 19 }, // Ladyfingers
    // Cheesecake
    { menu_item_id: 9, ingredient_id: 20 }, // Cream Cheese
    { menu_item_id: 9, ingredient_id: 1 }, // Eggs
    { menu_item_id: 9, ingredient_id: 2 }, // Flour
    // Mojito
    { menu_item_id: 10, ingredient_id: 21 }, // Rum
    { menu_item_id: 10, ingredient_id: 22 }, // Mint
    { menu_item_id: 10, ingredient_id: 23 }, // Lime
    // Old Fashioned
    { menu_item_id: 11, ingredient_id: 24 }, // Whiskey
    { menu_item_id: 11, ingredient_id: 25 }, // Sugar
    { menu_item_id: 11, ingredient_id: 9 }, // Lemon
    // Margarita
    { menu_item_id: 12, ingredient_id: 26 }, // Tequila
    { menu_item_id: 12, ingredient_id: 27 }, // Triple Sec
    { menu_item_id: 12, ingredient_id: 23 } // Lime
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