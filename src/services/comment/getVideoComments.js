const { ErrorResponse, SuccessResponse } = require("../../utils/response");
const Video = require("../../models/Video");
const Comment = require("../../models/Comment");

const getVideoComments = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .populate("userId")
      .populate("replies")
      .populate("createdAt")
      .sort({ createdAt: -1 });
    if (!comments) {
      return new ErrorResponse(404, "No comments found");
    }
    return new SuccessResponse(comments, "Comment fetched successfully");
  } catch (error) {
    console.log("Error fetching comments", error);
    return new ErrorResponse(500, "Error fetching comments", error.message);
  }
};

module.exports = getVideoComments;
