const { feelingsService } = require("../../services");

const createFeeling = async (req, res) => {
  const response = await feelingsService.createFeeling(req, res);
  res.send(response);
};

const getLikedVideos = async (req, res) => {
  const response = await feelingsService.getLikedVideos(req, res);
  res.send(response);
};

module.exports = { createFeeling, getLikedVideos };
