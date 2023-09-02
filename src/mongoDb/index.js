const User = require("../models/User");

exports.createUser = async (payload) => {
  const user = await User.create({
    channelName: payload.channelName,
    email: payload.email,
    password: payload.password,
  });
  return user;
};

exports.findUser = async (email) => {
  const loggedInUser = await User.findOne({ email }).select("+password");
  return loggedInUser;
};

exports.updateUser = async (id, payload) => {
  const updatedData = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
    context: "query",
  });
  return updatedData;
};

exports.findUserById = async (id) => {
  const user = await User.findById(id);
  // .populate("+subscribers");
  return user;
};
