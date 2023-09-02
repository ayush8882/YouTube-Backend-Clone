const { ErrorResponse, SuccessResponse } = require("../../utils/response");

const getSubscribers = async (req, res, next) => {
  try {
    const result = await res.advanceResults;
    return new SuccessResponse(result);
  } catch (error) {
    console.log("Error getting subscribers", error);
    return new ErrorResponse(error);
  }
};

module.exports = getSubscribers;
