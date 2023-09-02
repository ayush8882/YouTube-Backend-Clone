const { videoService } = require("../../services");

const uploadVideo = async (req, res) => {
  const response = await videoService.upload(req);
  res.send(response);
};

const getPublicVideos = async (req, res) => {
  const response = await videoService.getVideos(req, res);
  res.send(response);
};

const getPrivateVideos = async (req, res) => {
  const response = await videoService.getVideos(req, res);
  res.send(response);
};

const getVideoById = async (req, res) => {
  const response = await videoService.getVideoById(req);
  res.send(response);
};

const updateVideoById = async (req, res) => {
  const response = await videoService.updateVideoById(req);
  res.send(response);
};

const deleteVideoById = async (req, res) => {
  const response = await videoService.deleteVideoById(req);
  res.send(response);
};

const uploadVideoThumbnail = async (req, res) => {
  const response = await videoService.addThumbnail(req);
  res.send(response);
};

const updateViews = async (req, res) => {
  const response = await videoService.updateViews(req);
  res.send(response);
};

module.exports = {
  uploadVideo,
  getPublicVideos,
  getPrivateVideos,
  getVideoById,
  updateVideoById,
  deleteVideoById,
  uploadVideoThumbnail,
  updateViews,
};
