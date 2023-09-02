const { Router } = require("express");
const historyController = require("../../controllers/histories");
const History = require("../../models/History");
const { queryMiddlewares, authMiddlewares } = require("../../middlewares");

const router = Router();

// get all history
router.get(
  "/",
  authMiddlewares.checkJwt,
  queryMiddlewares.advanceQuery(
    History,
    [{ path: "videoId" }, { path: "userId" }],
    {
      status: "private",
    },
  ),
  historyController.getAllHistory,
);

// Create history
router.post("/", authMiddlewares.checkJwt, historyController.createHistory);

// delete history
router.delete("/:id", authMiddlewares.checkJwt, historyController.deleteHistory);

// clear all history
router.delete("/:type/all", authMiddlewares.checkJwt, historyController.clearHistory);

module.exports = router;
