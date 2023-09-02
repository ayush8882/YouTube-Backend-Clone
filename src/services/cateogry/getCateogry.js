const { SuccessResponse, ErrorResponse } = require("../../utils/response");

const getCateogry = async (req, res) => {
  try {
    const result = await res.advanceResults;
    return new SuccessResponse(result);
  } catch (error) {
    console.log("Error getting cateogries", error);
    return new ErrorResponse(error);
  }
};

module.exports = getCateogry;
