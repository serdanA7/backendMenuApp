const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../repos/db');
const { User, MenuItem, Ingredient, MenuItemIngredient, Order, OrderItem } = require('../models');

async function seedLarge() {
  await sequelize.sync({ force: true }); // Drops and recreates tables

  // Add indices for performance
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_orders_user_id ON Orders(user_id)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_orders_status ON Orders(status)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_orders_created_at ON Orders(created_at)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_orderitems_order_id ON OrderItems(order_id)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_orderitems_menu_item_id ON OrderItems(menu_item_id)');

  // Generate 10,000 users (with real bcrypt hashes for all)
  console.log('Generating users...');
  const NUM_USERS = 10000; 
  const users = [];
  for (let i = 0; i < NUM_USERS; i++) {
    users.push({
      username: faker.internet.username() + i,
      email: faker.internet.email(),
      password_hash: await bcrypt.hash(faker.internet.password(), 4),
      role: 'user',
      created_at: new Date()
    });
  }
  // Add a few known users for testing/admin (with real hashes)
  users.push(
    { username: 'admin_user', email: 'admin@example.com', password_hash: await bcrypt.hash('parola1', 10), role: 'admin', created_at: new Date() },
    { username: 'john_doe', email: 'john@example.com', password_hash: await bcrypt.hash('parolaUser1', 10), role: 'user', created_at: new Date() },
    { username: 'jane_smith', email: 'jane@example.com', password_hash: await bcrypt.hash('parolaUser2', 10), role: 'user', created_at: new Date() }
  );

  console.log('Inserting users...');
  await User.bulkCreate(users);
  console.log('Inserted', users.length, 'users.');

  // --- MENU ITEMS ---
  const NUM_MENU_ITEMS = 100000;
  const menuItems = [];
  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Bar'];
  for (let i = 0; i < NUM_MENU_ITEMS; i++) {
    menuItems.push({
      name: faker.commerce.productName(),
      category: faker.helpers.arrayElement(categories),
      price: parseFloat(faker.commerce.price({ min: 5, max: 50, dec: 2 })),
      image: faker.image.urlPicsumPhotos(),
      rating: parseFloat(faker.number.float({ min: 2, max: 5, precision: 0.01 })),
      reviews: faker.number.int({ min: 0, max: 1000 }),
      created_at: new Date()
    });
  }
  console.log('Inserting menu items...');
  await MenuItem.bulkCreate(menuItems);
  console.log('Inserted', menuItems.length, 'menu items.');

  // --- INGREDIENTS ---
  const NUM_INGREDIENTS = 100000;
  const ingredients = [];
  for (let i = 0; i < NUM_INGREDIENTS; i++) {
    ingredients.push({
      name: faker.commerce.productMaterial(),
      created_at: new Date()
    });
  }
  console.log('Inserting ingredients...');
  await Ingredient.bulkCreate(ingredients);
  console.log('Inserted', ingredients.length, 'ingredients.');

  // --- MENU ITEM INGREDIENTS (JOIN TABLE) ---
  console.log('Linking menu items and ingredients...');
  const menuItemIngredients = [];
  for (let i = 1; i <= NUM_MENU_ITEMS; i++) {
    // Each menu item gets 2–5 random ingredients
    const numLinks = faker.number.int({ min: 2, max: 5 });
    const ingredientIds = new Set();
    while (ingredientIds.size < numLinks) {
      ingredientIds.add(faker.number.int({ min: 1, max: NUM_INGREDIENTS }));
    }
    for (const ingId of ingredientIds) {
      menuItemIngredients.push({
        menu_item_id: i,
        ingredient_id: ingId
      });
    }
  }
  await MenuItemIngredient.bulkCreate(menuItemIngredients);
  console.log('Linked menu items and ingredients.');

  // --- ORDERS ---
  const NUM_ORDERS = 100000;
  const orders = [];
  for (let i = 0; i < NUM_ORDERS; i++) {
    orders.push({
      user_id: faker.number.int({ min: 1, max: NUM_USERS }),
      total_amount: parseFloat(faker.commerce.price({ min: 10, max: 200, dec: 2 })),
      status: faker.helpers.weightedArrayElement([
        { value: 'completed', weight: 90 },
        { value: 'cart', weight: 10 }
      ]),
      created_at: faker.date.past({ years: 2 }),
      updated_at: new Date()
    });
  }
  console.log('Inserting orders...');
  await Order.bulkCreate(orders);
  console.log('Inserted', orders.length, 'orders.');

  // --- ORDER ITEMS ---
  console.log('Inserting order items...');
  const orderItems = [];
  for (let i = 1; i <= NUM_ORDERS; i++) {
    const numItems = faker.number.int({ min: 1, max: 5 });
    const menuItemIds = new Set();
    while (menuItemIds.size < numItems) {
      menuItemIds.add(faker.number.int({ min: 1, max: NUM_MENU_ITEMS }));
    }
    for (const menuItemId of menuItemIds) {
      orderItems.push({
        order_id: i,
        menu_item_id: menuItemId,
        quantity: faker.number.int({ min: 1, max: 5 }),
        price_at_time: parseFloat(faker.commerce.price({ min: 5, max: 50, dec: 2 }))
      });
    }
  }
  await OrderItem.bulkCreate(orderItems);
  console.log('Inserted', orderItems.length, 'order items.');

  // Ready for next steps: Orders, OrderItems, etc.
  console.log('Large menu/ingredient seed complete!');
  process.exit();
}

seedLarge(); 