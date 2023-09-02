const Reply = require("../../models/Reply");
const Comment = require("../../models/Comment");
const { ErrorResponse, SuccessResponse } = require("../../utils/response");

const postReplies = async (req, res, next) => {
  try {
    // replying on which comment?
    const comment = await Comment.findOne({ _id: req.body.commentId });
    if (!comment) {
      return new ErrorResponse(404, "Comment not found");
    }

    const reply = await Reply.create({
      ...req.body,
      userId: req.user._id,
    });
    return new SuccessResponse(reply, "Reply created successfully");
  } catch (error) {
    console.log("Error creating reply", error.message);
    return new ErrorResponse(500, "Error creating reply", error.message);
  }
};

module.exports = postReplies;
