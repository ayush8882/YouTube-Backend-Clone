const { SuccessResponse, ErrorResponse } = require("../../utils/response");

const updateVideosById = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return new SuccessResponse(video);
  } catch (error) {
    console.log("Error updating video", error.message);
    return new ErrorResponse(500, "Error updating video", error.message);
  }
};

module.exports = { updateVideosById };
