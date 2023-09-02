const Comment = require("../../models/Comment");
const { ErrorResponse, SuccessResponse } = require("../../utils/response");

const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("videoId");
    if (!comment) {
      return new ErrorResponse(404, "Comment not found");
    }
    if (
      comment.userId.toString() === req.user._id.toString() ||
      comment.videoId.userId.toString() === req.user._id.toString()
    ) {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true },
      );
      return new SuccessResponse(
        updatedComment,
        "Comment updated successfully",
      );
    }
  } catch (error) {
    console.log("Error updating comment", error);
    return new ErrorResponse(500, "Error updating comment", error.message);
  }
};

module.exports = updateComment;
