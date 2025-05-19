const { Log } = require('../models');

const getAllLogs = async () => Log.findAll();
const getLogById = async (id) => Log.findByPk(id);
const createLog = async (data) => Log.create(data);
const deleteLog = async (id) => Log.destroy({ where: { id } });

module.exports = {
  getAllLogs,
  getLogById,
  createLog,
  deleteLog
}; 