const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/error');
const routes = require('./routes');

const app = express();


app.options('*', cors()); // Enable preflight for all routes

// Middleware
app.use(cors({
  origin: [
    'https://frontendmenuapp.onrender.com',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is healthy!' });
});

// Friendly root route
app.get('/', (req, res) => {
  res.send('API is running! 🚀');
});

// Error handling
app.use(errorHandler);

module.exports = app; 