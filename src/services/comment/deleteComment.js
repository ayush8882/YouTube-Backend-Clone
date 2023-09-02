const Comment = require("../../models/Comment");
const { ErrorResponse, SuccessResponse } = require("../../utils/response");

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("videoId");
    if (!comment) {
      return new ErrorResponse(404, "Comment not found");
    }
    if (
      comment.userId.toString() === req.user._id.toString() ||
      comment.videoId.userId.toString() === req.user._id.toString()
    ) {
      const deletedComment = await Comment.deleteOne({ _id: req.params.id });
      return new SuccessResponse(
        deletedComment,
        "Comment Deleted successfully",
      );
    }
  } catch (error) {
    console.log("Error updating comment", error);
    return new ErrorResponse(500, "Error updating comment", error.message);
  }
};

module.exports = deleteComment;
