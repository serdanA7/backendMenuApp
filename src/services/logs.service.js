const logsRepo = require('../repos/logs.repo');

const getAllLogs = () => logsRepo.getAllLogs();
const getLogById = (id) => logsRepo.getLogById(id);
const createLog = (data) => logsRepo.createLog(data);
const deleteLog = (id) => logsRepo.deleteLog(id);

module.exports = {
  getAllLogs,
  getLogById,
  createLog,
  deleteLog
}; 