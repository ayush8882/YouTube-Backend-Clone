const { replyService } = require("../../services");

const getReplies = async (req, res) => {
  const response = await replyService.getReplies(req, res);
  res.send(response);
};

const postReplies = async (req, res) => {
  const response = await replyService.postReplies(req, res);
  res.send(response);
};

const updateReplies = async (req, res) => {
  const response = await replyService.updateReplies(req, res);
  res.send(response);
};

const deleteReplies = async (req, res) => {
  const response = await replyService.deleteReplies(req, res);
  res.send(response);
};

module.exports = { getReplies, postReplies, updateReplies, deleteReplies };
