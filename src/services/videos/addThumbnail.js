const Video = require("../../models/Video");
const { SuccessResponse, ErrorResponse } = require("../../utils/response");

const addThumbnail = async (req, res) => {
  try {
    // fetch video first by id
    const video = await Video.findById(req.params.id);

    // if video not found
    if (!video) {
      return new ErrorResponse(404, "Video not found");
    }
    if (!req.files) {
      return new ErrorResponse(404, "No file uploaded");
    }
    // fetch thumbnil image from form data
    const thumbnail = req.files.thumbnail;
    if (!thumbnail.mimeType.startswith("image")) {
      return new ErrorResponse(404, "Invalid file type");
    }

    // check for thumbnail size
    if (thumbnail.size > process.env.MAX_FILE_SIZE) {
      return new ErrorResponse(404, "Thumbnail size too large");
    }

    thumbnail.name = `thumbnail-${video._id}${path.parse(file.name).ext}`;
    // save thumbnail
    await thumbnail.mv(
      `${process.env.FILE_UPLOAD_PATH}/thumbnail/${thumbnail.name}`,
    );
    // save video
    await Video.findByIdAndUpdate(req.params.id, {
      thumbnailUrl: thumbnail.name,
    });

    return new SuccessResponse(200, "Thumbnail uploaded successfully", video);
  } catch (error) {
    console.log("Error while uploading thumbnail", error.message);
    return new ErrorResponse(
      500,
      "Error while uploading thumbnail",
      error.message,
    );
  }
};

module.exports = { addThumbnail };
