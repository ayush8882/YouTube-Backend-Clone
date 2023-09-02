const Video = require("../../models/Video");
const Comment = require("../../models/Comment");
const { ErrorResponse, SuccessResponse } = require("../../utils/response");

const postComment = async (req, res, next) => {
  try {
    let video = await Video.findOne({
      _id: req.body.videoId,
      status: "public",
    });
    if (!video) {
      return new ErrorResponse(404, "Not Found");
    }
    const comment = await Comment.create({
      ...req.body,
      userId: req.user._id,
    });
    return new SuccessResponse(comment, "Comment created");
  } catch (error) {
    console.log(error);
    return new ErrorResponse(500, "Error creating comment");
  }
};

module.exports = postComment;
