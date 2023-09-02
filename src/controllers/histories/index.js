const { historyService } = require("../../services");

const getAllHistory = async (req, res) => {
  const response = await historyService.getAllHistory(req, res);
  res.send(response);
};

const createHistory = async (req, res) => {
  const response = await historyService.createHistory(req, res);
  res.send(response);
};

const deleteHistory = async (req, res) => {
  const response = await historyService.deleteHistory(req, res);
  res.send(response);
};

const clearHistory = async (req, res) => {
  const response = await historyService.clearHistory(req, res);
  res.send(response);
};

module.exports = { getAllHistory, createHistory, deleteHistory, clearHistory };
