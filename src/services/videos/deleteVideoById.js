const fs = require("fs");
const Video = require("../../models/Video");
const { SuccessResponse, ErrorResponse } = require("../../utils/response");

const deleteVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findOne({ _id: id, userId: req.user._id });
    if (!video) {
      return new ErrorResponse(404, "Video not found");
    }
    // unlink video from local storage
    fs.unlinkSync(`${process.env.FILE_UPLOAD_PATH}/videos/${video.url}`);

    // TODO : Unlink thumbnail from local storage
    fs.unlinkSync(
      `${process.env.FILE_UPLOAD_PATH}/thumbnail/${video.thumbnailUrl}`,
    );
    video.remove();

    return new SuccessResponse(200, "Video deleted", video);
  } catch (error) {
    console.log("Error deleting video", error.message);
    return new ErrorResponse(500, "Error deleting video", error.message);
  }
};

module.exports = { deleteVideoById };
