const { paginatedResults } = require("../../middlewares/query");
const Feeling = require("../../models/Feeling");
const { SuccessResponse, ErrorResponse } = require("../../utils/response");

const getLikedVideos = async (req, res, next) => {
  try {
    const likes = await Feeling.find({
      userId: req.user._id,
      type: "like",
    });
    if (likes.length === 0) {
      return new SuccessResponse({});
    }
    const videosId = likes.map((video) => {
      return { _id: video.videoId.toString() };
    });

    const populates = [{ path: "userId", select: "photoUrl channelName" }];
    await paginatedResults(req, res, next, Video, populates, "public", videosId);
    return new SuccessResponse(res.advanceResults);
  } catch (error) {
    console.log("Error occured while fetching liked videos", error.message);
    return new ErrorResponse(
      500,
      "Error occured while fetching liked videos",
      error.message,
    );
  }
};

module.exports = getLikedVideos;
