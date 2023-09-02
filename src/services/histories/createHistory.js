const History = require("../../models/History");
const Video = require("../../models/Video");
const { ErrorResponse, SuccessResponse } = require("../../utils/response");

const createHistory = async (req, res) => {
  try {
    const video = await Video.findById(req.body.videoId);
    if (!video) return new ErrorResponse(404, "Video not found");

    const history = await History.create({
      userId: req.user._id,
      videoId: req.body.videoId,
      type: "watch",
    });
    return new SuccessResponse(history, "History created successfully");
  } catch (error) {
    console.log("Error creating history: " + error.message);
    return new ErrorResponse(500, "Error creating history", error.message);
  }
};
module.exports = createHistory;
