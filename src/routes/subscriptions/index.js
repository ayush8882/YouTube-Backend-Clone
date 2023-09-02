const { Router } = require("express");
const subscriptionController = require("../../controllers/subscription");
const { queryMiddlewares, authMiddlewares } = require("../../middlewares");
const Subscription = require("../../models/Subscription");
const router = Router();

// get all subscribers
router.get(
  "/",
  authMiddlewares.checkJwt,
  queryMiddlewares.advanceQuery(Subscription, [{ path: "subscriberId" }], {
    status: "private",
    filter: "channel",
  }),
  subscriptionController.getAllSubscribers,
);

// create or remove a subscriber
router.post(
  "/",
  authMiddlewares.checkJwt,
  subscriptionController.createSubscriber,
);

module.exports = router;
