const { Router } = require("express");

const router = Router();

router.get("/", () => {
  console.log("First request");
});

module.exports = router;
