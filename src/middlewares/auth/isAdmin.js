const isAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.send(new ErrorResponse(401, "Unauthorized access"));
  }
  if (req.user.role !== "admin") {
    return res.send(new ErrorResponse(401, "Unauthorized access"));
  }
  next();
};

module.exports = isAdmin;
