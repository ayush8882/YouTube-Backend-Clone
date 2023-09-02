const User = require("../../models/User");
const { createUser } = require("../../mongoDb");
const { SuccessResponse, ErrorResponse } = require("../../utils/response");

const user = async (payload) => {
  try {
    const registeredUser = await createUser(payload);
    const token = await registeredUser.getSignedJwtToken();

    const responseData = {
      user: registeredUser,
      token,
    };
    return new SuccessResponse(responseData, "User created successfully", 200);
  } catch (error) {
    console.log(
      "Error occurred while creating Users Channel: " + error.message,
    );
    return new ErrorResponse(
      500,
      "Cannot create channel, Some error occurred!",
    );
  }
};

module.exports = {
  user,
};
