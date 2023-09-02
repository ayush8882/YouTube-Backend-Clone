const { ErrorResponse, SuccessResponse } = require("../../utils/response");

const getAllHistory = async (req, res, next) => {
  try {
    const result = await res.advanceResults;
    return new SuccessResponse(result);
  } catch (error) {
    console.log("Error getting all histories", error);
    return new ErrorResponse(error);
  }
};

module.exports = getAllHistory;
