const authService = require("./auth");
const videoService = require("./videos");
const cateogriyService = require("./cateogry");
const commentService = require("./comment");
const replyService = require("./replies");
const feelingsService = require("./feelings");
const subscriptionsService = require("./subscriptions");
const historyService = require("./histories");

module.exports = {
  authService,
  videoService,
  cateogriyService,
  commentService,
  replyService,
  feelingsService,
  subscriptionsService,
  historyService
};