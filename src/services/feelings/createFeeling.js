const Video = require("../../models/Video");
const Feeling = require("../../models/Feeling");
const { ErrorResponse, SuccessResponse } = require("../../utils/response");

const createFeeling = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { type, videoId } = req.body;
    const video = await Video.findById(videoId);

    if (!video) {
      return new ErrorResponse(404, "Video not found");
    }
    if (video.status !== "public") {
      return new ErrorResponse(404, "Video is not public");
    }
    let feelings = await Feeling.findOne({
      videoId,
      userId,
    });
    if (!feelings) {
      feelings = await Feeling.create({
        videoId,
        userId,
        type,
      });
      return new SuccessResponse(feelings, `Video ${type} successfully!`);
    }
    if (feelings.type === type) {
      await feelings.deleteOne({_id: feelings._id})
      return new SuccessResponse({}, `Video feeling removed successfully!`);
    }
    feelings.type = type;
    await feelings.save();
    return new SuccessResponse(feelings, `Video feeling updated successfully!`);
  } catch (error) {
    console.log("Error occurred while liking/disliking video", error);
    return new ErrorResponse(
      500,
      "Error occurred while liking/disliking video",
      error.message,
    );
  }
};

module.exports = createFeeling;
