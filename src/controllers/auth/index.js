const { authService } = require("../../services");

const registerUser = async (req, res) => {
  const response = await authService.register.user(req.body);
  res.send(response);
};

const loginUser = async (req, res) => {
  const response = await authService.login.user(req.body);
  res.send(response);
};

const updateUser = async (req, res) => {
  const response = await authService.update.userProfile(req.user.id, req.body);
  res.send(response);
};

const updateUserProfile = async (req, res) => {
  const response = await authService.update.userAvatar(req);
  res.send(response);
};

const updatePassword = async (req, res) => {
  const response = await authService.update.password(req.user.id, req.body);
  res.send(response);
};

const forgetPassword = async (req, res) => {
  const response = await authService.update.forgotPassword(req);
  res.send(response);
};

const resetPassword = async (req, res) => {
  const response = await authService.update.resetPassword(
    req.params.resetToken,
    req.body.newPassword,
  );
  res.send(response);
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  updateUserProfile,
  updatePassword,
  forgetPassword,
  resetPassword,
};
