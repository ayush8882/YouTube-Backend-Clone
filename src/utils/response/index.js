const common = require("./common");
const payloads = require("./payloads");
const middlewares = require("./middlewares");

const { BaseResponse, HttpDefaultMessage, HttpStatusCode } = common;
const { ErrorResponse, SuccessResponse } = payloads;
const { responseHandler } = middlewares;

module.exports = {
  common,
  payloads,
  middlewares,
  BaseResponse,
  HttpDefaultMessage,
  HttpStatusCode,
  ErrorResponse,
  SuccessResponse,
  responseHandler,
};
