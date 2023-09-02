const Reply = require("../../models/Reply");
const Comment = require("../../models/Comment");
const { ErrorResponse, SuccessResponse } = require("../../utils/response");

const updateReplies = async (req, res, next) => {
  try {
    const reply = await Reply.findOne({ _id: req.params.id })
      .populate({
        path: "commentID",
        select: "userId videoId",
      })
      .populate({
        path: "userId",
        select: "userId",
      });
    if (!reply) {
      return new ErrorResponse(403, "Reply not found");
    }
    if (
      reply.userId.toString() !== req.user._id.toString() ||
      reply.commentId.videoId.userId.toString() !== req.user._id.toString()
    ) {
      return new ErrorResponse(403, "Forbidden Request");
    }
    const deleteReply = await Reply.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return new SuccessResponse(deleteReply);
  } catch (error) {
    console.log("Error deleting the reply", error);
    return new ErrorResponse(error);
  }
};

module.exports = updateReplies;
