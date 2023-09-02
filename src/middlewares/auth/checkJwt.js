const jwt = require("jsonwebtoken");
const { findUserById } = require("../../mongoDb");
const { ErrorResponse } = require("../../utils/response");

const checkJwt = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.send(new ErrorResponse(401, "Unauthorized access"));
    }
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await findUserById(decoded.id);
      next();
    }
  } catch (error) {
    console.log("Error occured while validating JWT: " + error.message);
    return res.send(
      new ErrorResponse(401, "UNAUTHORIZED ACCESS", error.message),
    );
  }
};

module.exports = checkJwt;
