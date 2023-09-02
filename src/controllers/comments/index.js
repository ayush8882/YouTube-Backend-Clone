const { commentService } = require("../../services");

const postComment = async (req, res) => {
  const response = await commentService.postComment(req, res);
  res.send(response);
};

const updateComment = async (req, res) => {
  const response = await commentService.updateComment(req, res);
  res.send(response);
};

const deleteComment = async (req, res) => {
  const response = await commentService.deleteComment(req, res);
  res.send(response);
};

const getVideoComments = async (req, res) => {
  const response = await commentService.getVideoComments(req, res);
  res.send(response);
}

module.exports = { postComment, updateComment, deleteComment, getVideoComments };
