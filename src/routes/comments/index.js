const { Router } = require("express");
const commentController = require("../../controllers/comments");
const { authMiddlewares, queryMiddlewares } = require("../../middlewares");
const router = Router();

// create comment

router.post("/", authMiddlewares.checkJwt, commentController.postComment);
// update comment
// delete comment
router
    .put("/:id", authMiddlewares.checkJwt, commentController.updateComment)
    .delete("/:id", authMiddlewares.checkJwt, commentController.deleteComment)

// get all comments on a video
router.get("/:videoId/videos", commentController.getVideoComments);

module.exports = router;
