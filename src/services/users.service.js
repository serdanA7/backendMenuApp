const usersRepo = require('../repos/users.repo');

const getAllUsers = () => usersRepo.getAllUsers();
const getUserById = (id) => usersRepo.getUserById(id);
const getUserByEmail = (email) => usersRepo.getUserByEmail(email);
const getUserByUsername = (username) => usersRepo.getUserByUsername(username);
const createUser = (userData) => usersRepo.createUser(userData);
const updateUser = (id, updates) => usersRepo.updateUser(id, updates);
const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser
}; 