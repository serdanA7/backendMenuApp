const express = require('express');
const usersController = require('../controllers/users.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, usersController.getAllUsers);
router.get('/:id', auth, usersController.getUserById);
router.post('/', usersController.createUser);
router.put('/:id', auth, usersController.updateUser);
router.delete('/:id', auth, usersController.deleteUser);

module.exports = router; 