const { Router } = require("express");
const { authMiddlewares } = require("../../middlewares");
const feelingsController = require("../../controllers/feelings");

const router = Router();

// Like or dislike a video
router.post("/", authMiddlewares.checkJwt, feelingsController.createFeeling);

// get count of liked and unliked videos
router.get("/", authMiddlewares.checkJwt, feelingsController.getLikedVideos);

module.exports = router;
