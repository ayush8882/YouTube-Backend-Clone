const User = require("../../models/User");
const { findUser } = require("../../mongoDb");
const { ErrorResponse, SuccessResponse } = require("../../utils/response");

const user = async (payload) => {
  try {
    const { email, password } = payload;

    if (!email || !password) {
      return new ErrorResponse(400, "Please provide email and password");
    }
    const formattedEmail = email.toLowerCase();
    const loggedInUser = await findUser(formattedEmail);
    const passwordMatched = await loggedInUser.matchPassword(password);
    if (!passwordMatched) {
      return new ErrorResponse(400, "Invalid password, try again");
    }
    const token = await loggedInUser.getSignedJwtToken();
    const dataToSend = {
      id: loggedInUser._id,
      channelName: loggedInUser.channelName,
      email: loggedInUser.email,
      token,
    };
    return new SuccessResponse(dataToSend, "User logged in successfully", 200);
  } catch (error) {
    console.log("Error occurred while logging in: " + error.message);
    return new ErrorResponse(500, "Internal server error");
  }
};

module.exports = { user };
