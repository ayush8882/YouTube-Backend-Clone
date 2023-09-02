const { Router } = require("express");

const test = require("./test");
const auth = require("./auth");
const videos = require("./videos");
const cateogries = require("./cateogries");
const comments = require("./comments");
const replies = require("./replies");
const feelings = require("./feelings");
const subscriptions = require("./subscriptions");
const histories = require("./histories");
const search = require("./search");

const router = Router();

router.use("/test", test);
router.use("/auth", auth);
router.use("/videos", videos);
router.use("/cateogries", cateogries);
router.use("/comments", comments);
router.use("/replies", replies);
router.use("/feelings", feelings);
router.use("/subscriptions", subscriptions);
router.use("/histories", histories);
router.use("/search", search);

module.exports = router;
