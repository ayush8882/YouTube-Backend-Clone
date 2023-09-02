const { ErrorResponse, SuccessResponse } = require("../../utils/response");

const getReplies = async (req, res, next) => {
  try {
    const result = await res.advanceResults;
    return new SuccessResponse(result);
  } catch (error) {
    console.log("Error fetching replies", error);
    return new ErrorResponse(error);
  }
};

module.exports = getReplies;
