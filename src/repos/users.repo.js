const { User } = require('../models');

const getAllUsers = async () => User.findAll();
const getUserById = async (id) => User.findByPk(id);
const getUserByEmail = async (email) => User.findOne({ where: { email } });
const getUserByUsername = async (username) => User.findOne({ where: { username } });
const createUser = async (userData) => User.create(userData);
const updateUser = async (id, updates) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  return user.update(updates);
};
const deleteUser = async (id) => User.destroy({ where: { id } });

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser
}; 