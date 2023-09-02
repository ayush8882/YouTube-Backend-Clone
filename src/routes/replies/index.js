const { Router } = require("express");
const replyController = require("../../controllers/replies");
const { queryMiddlewares, authMiddlewares } = require("../../middlewares");
const Reply = require("../../models/Reply");
const router = Router();

// get replies
router.get(
  "/",
  queryMiddlewares.advanceQuery(Reply),
  replyController.getReplies,
);

// post a reply or create a new reply
router.post(
  "/",
  authMiddlewares.checkJwt,
  replyController.postReplies(req, res),
);

// update the reply
router.put(
  "/",
  authMiddlewares.checkJwt,
  replyController.updateReplies(req, res),
);

//delete your own reply
router.delete(
  "/",
  authMiddlewares.checkJwt,
  replyController.deleteReplies(req, res),
);

module.exports = router;
