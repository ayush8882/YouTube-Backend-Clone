const { Router } = require("express");
const cateogriesController = require("../../controllers");
const { authMiddlewares, queryMiddlewares } = require("../../middlewares");
const Cateogry = require("../../models/Cateogry");

const router = Router();

router.get("/", queryMiddlewares.advanceQuery(Cateogry), cateogriesController.cateogries.getCateogry);

// It can have options to add cateogries by the admin
// Will keep this as TODO


module.exports = router;
