const { Router } = require("express");
const videosController = require("../../controllers/videos");
const { authMiddlewares, queryMiddlewares } = require("../../middlewares");
const Video = require("../../models/Video");

const router = Router();

// upload videos
router.post("/", authMiddlewares.checkJwt, videosController.uploadVideo);

// get all public videos
router.get(
  "/public",
  queryMiddlewares.advanceQuery(
    Video,
    [
      { path: "userId" },
      { path: "categoryId" },
      { path: "likes" },
      { path: "dislikes" },
    ],
    { status: "public" },
  ),
  videosController.getPublicVideos,
);

// get all private videos
router.get(
  "/private",
  authMiddlewares.checkJwt,
  queryMiddlewares.advanceQuery(
    Video,
    [
      { path: "userId" },
      { path: "categoryId" },
      { path: "likes" },
      { path: "dislikes" },
      { path: "comments" },
    ],
    { status: "private" },
  ),
  videosController.getPrivateVideos,
);

// get video by id
// update video details by id
// delete video by id
router
  .get("/:id", videosController.getVideoById)
  .put("/:id", authMiddlewares.checkJwt, videosController.updateVideoById)
  .delete("/:id", authMiddlewares.checkJwt, videosController.deleteVideoById);

// update thumbnail by id
router.put(
  "/:id/thumbnail",
  authMiddlewares.checkJwt,
  videosController.uploadVideoThumbnail,
);
// update views by id
router.put("/:id/views", authMiddlewares.checkJwt, videosController.updateViews);

module.exports = router;
