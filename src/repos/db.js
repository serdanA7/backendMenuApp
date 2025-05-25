require('dotenv').config(); // FIRST!
const { Sequelize } = require('sequelize');
const path = require('path');

let sequelize;

if (process.env.NODE_ENV === 'production') {
  // Production: Use PostgreSQL
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    }
  );
} else {
  // Development: Use SQLite
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../database.sqlite'),
    logging: console.log
  });
}

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(`Connected to ${process.env.NODE_ENV === 'production' ? 'PostgreSQL' : 'SQLite'} database`);
    await sequelize.sync();
    console.log('Database models synchronized');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    throw err;
  }
}

module.exports = {
  sequelize,
  connectDB
}; 