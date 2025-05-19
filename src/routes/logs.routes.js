const express = require('express');
const logsController = require('../controllers/logs.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, logsController.getAllLogs);
router.get('/:id', auth, logsController.getLogById);
router.post('/', auth, logsController.createLog);
router.delete('/:id', auth, logsController.deleteLog);

module.exports = router; 