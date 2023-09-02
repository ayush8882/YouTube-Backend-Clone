const upload = require("./upload");
const getVideos = require("./getVideos");
const getVideoById = require("./getVideoById");
const updateVideoById = require("./updateVideoById");
const deleteVideoById = require("./deleteVideoById");
const addThumbnail = require("./addThumbnail");
const updateViews = require("./updateViews");

module.exports = {
  upload,
  getVideos,
  getVideoById,
  updateVideoById,
  deleteVideoById,
  addThumbnail,
  updateViews,
};
