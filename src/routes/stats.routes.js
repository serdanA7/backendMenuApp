const express = require('express');
const statsController = require('../controllers/stats.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/top-users', statsController.topUsers);

module.exports = router; 