const path = require("path");
const crypto = require("crypto");

const User = require("../../models/User");
const { updateUser } = require("../../mongoDb");
const { SuccessResponse, ErrorResponse } = require("../../utils/response");
const sendEmail = require("../../utils/mail");

const userProfile = async (id, payload) => {
  try {
    const fieldToUpdate = {
      channelName: payload.channelName,
    };
    const updatedData = await updateUser(id, fieldToUpdate);
    return new SuccessResponse(updatedData, "Data updated Successfully", 200);
  } catch (error) {
    console.log("Error updating the user data", error.message);
    return new ErrorResponse(500, "Internal Server Error", error.message);
  }
};

const userAvatar = async (req) => {
  try {
    const avatar = req.files.avatar;
    if (!avatar) {
      return new ErrorResponse(400, "Please upload image");
    }
    // check mime type
    if (!avatar.mimetype.startsWith("image")) {
      return new ErrorResponse(400, "Invalid file type");
    }
    // check file size
    if (avatar.size > process.env.MAX_FILE_SIZE) {
      return new ErrorResponse(
        400,
        "Invalid file size",
        `File size must be less than ${
          process.env.MAX_FILE_SIZE / 1024 / 1024
        }MB`,
      );
    }
    // save file
    avatar.name = `avatar-${req.user._id}${path.parse(avatar.name).ext}`;
    await avatar.mv(`${process.env.FILE_UPLOAD_PATH}/avatar/${avatar.name}`);
    req.user.photoUrl = avatar.name;
    await req.user.save();
    return new SuccessResponse(avatar.name, "Data updated Successfully", 200);
  } catch (error) {
    console.log("Error updating the user data", error.message);
    return new ErrorResponse(500, "Internal Server Error", error.message);
  }
};

const password = async (id, payload) => {
  const user = await User.findById(id).select("+password");
  if (!user) {
    return new ErrorResponse(404, "User not found");
  }
  // match current password
  const isMatch = await user.matchPassword(payload.currentPassword);

  if (!isMatch) {
    return new ErrorResponse(401, "Current password is incorrect");
  }
  const isSamePassword = await user.matchPassword(payload.newPassword);

  if (isSamePassword) {
    return new ErrorResponse(401, "Current password is same as old password");
  }

  user.password = payload.newPassword;
  await user.save();
  const token = await user.getSignedJwtToken();
  const dataToSend = {
    id: user.id,
    channelName: user.channelName,
    email: user.email,
    token,
  };
  return new SuccessResponse(dataToSend, "Password updated Successfully", 200);
};

const forgotPassword = async (req) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return new ErrorResponse(404, "User not found");
    }

    const resetToken = await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get(
      "host",
    )}/api/user/resetPassword/${resetToken}`;

    const message = `Update your password by clicking the link \n\n ${resetUrl}`;
    try {
      await sendEmail(message);
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      console.log("Error sending mail to user account", error.message);

      return new ErrorResponse(
        500,
        "Error sending mail to the user",
        error.message,
      );
    }
    return new SuccessResponse(
      message,
      "Password reset link sent successfully",
      200,
    );
  } catch (error) {
    console.log("Error resetting users password", error.message);
    return new ErrorResponse(500, "Internal Server Error", error.message);
  }
};

const resetPassword = async (resetToken, newPassword) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return new ErrorResponse(404, "User not found");
  }
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  const token = await user.getSignedJwtToken();
  const dataToSend = {
    id: user.id,
    channelName: user.channelName,
    email: user.email,
    token,
  };
  return new SuccessResponse(dataToSend, "Password reset Successfully", 200);
};

module.exports = {
  userProfile,
  userAvatar,
  password,
  forgotPassword,
  resetPassword,
};
