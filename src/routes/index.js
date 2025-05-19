const express = require('express');
const usersRoutes = require('./users.routes');
const menuRoutes = require('./menu.routes');
const ingredientsRoutes = require('./ingredients.routes');
const ordersRoutes = require('./orders.routes');
const logsRoutes = require('./logs.routes');
const authRoutes = require('./auth.routes');
const statsRoutes = require('./stats.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/menu-items', menuRoutes);
router.use('/ingredients', ingredientsRoutes);
router.use('/orders', ordersRoutes);
router.use('/logs', logsRoutes);
router.use('/stats', statsRoutes);

module.exports = router; 