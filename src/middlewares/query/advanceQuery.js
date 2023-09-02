const jwt = require("jsonwebtoken");
const { findUserById } = require("../../mongoDb");
const { ErrorResponse } = require("../../utils/response");
const paginatedResults = require("./paginatedResults");

const advanceQuery =
  (model, populates, visibility = { status: "", filter: "" }) =>
  async (req, res, next) => {
    try {
      let query;
      if (visibility.status === "private") {
        req.query.userId = await req.user._id;
        if (visibility.filter === "channel") {
          req.query.channelId = req.user._id;
          delete req.query.userId;
        }
      } else if (visibility.status === "public") {
        req.query.status = "public";
      }
      await paginatedResults(req, res, model, populates, "", []);
    } catch (error) {
      console.log(error);
      console.log("Error occured while filtering data", error.message);
      return next(
        new ErrorResponse(
          500,
          "Internal error occurred while filtering data",
          error.message,
        ),
      );
    }
  };

module.exports = advanceQuery;
