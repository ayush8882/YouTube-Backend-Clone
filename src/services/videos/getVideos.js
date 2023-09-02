const { SuccessResponse, ErrorResponse } = require("../../utils/response");

const getVideos = async (req, res) => {
  try {
    const result = await res.advanceResults;
    return new SuccessResponse(result);
  } catch (error) {
    console.log("Error getting videos", error);
    return new ErrorResponse(error);
  }
};

module.exports = getVideos;
