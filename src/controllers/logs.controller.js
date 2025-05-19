const logsService = require('../services/logs.service');

exports.getAllLogs = async (req, res, next) => {
  try {
    const logs = await logsService.getAllLogs();
    res.json(logs);
  } catch (err) {
    next(err);
  }
};

exports.getLogById = async (req, res, next) => {
  try {
    const log = await logsService.getLogById(req.params.id);
    if (!log) return res.status(404).json({ error: 'Log not found' });
    res.json(log);
  } catch (err) {
    next(err);
  }
};

exports.createLog = async (req, res, next) => {
  try {
    const log = await logsService.createLog(req.body);
    res.status(201).json(log);
  } catch (err) {
    next(err);
  }
};

exports.deleteLog = async (req, res, next) => {
  try {
    await logsService.deleteLog(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}; 