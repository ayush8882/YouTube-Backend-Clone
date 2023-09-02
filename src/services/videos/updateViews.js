const Video = require("../../models/Video");
const { ErrorResponse, SuccessResponse } = require("../../utils/response");

const updateViews = async (req) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return new ErrorResponse(404, "No video found");
    }
    video.views++;
    await video.save();
    return new SuccessResponse(video, "Views updated successfully");
  } catch (error) {
    return new ErrorResponse(500, "Internal Server Error", error.message);
  }
};

module.exports = { updateViews };
