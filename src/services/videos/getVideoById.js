const Video = require("../../models/Video");
const { SuccessResponse, ErrorResponse } = require("../../utils/response");

const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId)
      .populate({
        path: "categoryId",
      })
      .populate({
        path: "userId",
        select: "channelName, subscribers photoUrl",
      })
      .populate({ path: "likes" })
      .populate({ path: "dislikes" })
      .populate({ path: "comments" });
    if (!video) {
      return new ErrorResponse(404, "Video not found");
    }
    return new SuccessResponse(video, 200);
  } catch (error) {
    console.log("Error fetching videos", error.message);
    return new ErrorResponse(500, "Error fetching videos", error.message);
  }
};

module.exports = { getVideoById };
