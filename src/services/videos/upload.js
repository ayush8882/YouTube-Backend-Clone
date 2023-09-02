const path = require('path');
const Video = require("../../models/Video");
const { SuccessResponse, ErrorResponse } = require("../../utils/response");

const upload = async (req) => {
  try {
    if (!req.files) {
      return new ErrorResponse("No files were uploaded.", 404);
    }
    const video = req.files.video;
    if (!video || !video.mimetype.startsWith("video")) {
      return new ErrorResponse("No files were uploaded.", 404);
    }
    if (video.size > process.env.MAX_FILE_SIZE * 10) {
      return new ErrorResponse(
        "File is too large. Max file size is " +
          (process.env.MAX_FILE_SIZE * 5) / 1000 / 1000,
        404,
      );
    }
    let videoModel = await Video.create({ userId: req.user._id });
    video.originalName = video.name.split(".")[0];
    video.name = `video-${videoModel._id}${path.parse(video.name).ext}`;

    await video.mv(`${process.env.FILE_UPLOAD_PATH}/videos/${video.name}`);
    videoModel = await Video.findByIdAndUpdate(
      videoModel.id,
      {
        url: video.name,
        name: video.originalName,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return new SuccessResponse("Video uploaded successfully.", videoModel);
  } catch (error) {
    console.log(error);
    console.log("Error uploading video", error.message);
    return new ErrorResponse(500, "Error uploading video", error.message);
  }
};

module.exports = upload;
