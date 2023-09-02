const { subscriptionsService } = require("../../services");

const getAllSubscribers = async (req, res) => {
  const response = await subscriptionsService.getAllSubscribers(req, res);
  res.send(response);
};

const createSubscriber = async (req, res) => {
  const response = await subscriptionsService.createSubscriber(req, res);
  res.send(response);
};

module.exports = { getAllSubscribers, createSubscriber };
