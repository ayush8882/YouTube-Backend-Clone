const History = require("../../models/History");
const { ErrorResponse, SuccessResponse } = require("../../utils/response");

const deleteHistory = async (req, res) => {
  try {
    const history = await History.findById({
      videoId: req.params.id,
      userId: req.user._id,
    });
    if (!history) {
      return new ErrorResponse(404, "Video not found");
    }
    await history.remove();
    return new SuccessResponse("History deleted successfully");
  } catch (error) {
    console.log("Error deleting history: " + error.message);
    return new ErrorResponse(500, "Error deleting history", error.message);
  }
};

module.exports = deleteHistory;
