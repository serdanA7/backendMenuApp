const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/error');
const routes = require('./routes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', routes);

// Error handling
app.use(errorHandler);

module.exports = app; 