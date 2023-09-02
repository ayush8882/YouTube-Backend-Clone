const { ErrorResponse, SuccessResponse } = require("../../utils/response");
const Subscription = require("../../models/Subscription");
const createSubscriber = async (req, res, next) => {
  try {
    const { channelId } = req.body;
    if (channelId.toString() === req.user._id.toString()) {
      return new ErrorResponse(404, "Cannot subscribe to own channel");
    }
    const subscription = await Subscription.findOne({
      channelId: channelId,
      subscriberId: req.user._id,
    });
    // if subscription exists, unsubscribe from the channel
    if (subscription) {
      subscription.remove();
      return new SuccessResponse("User unsubscribed successfully");
    } else {
      const createSubscriber = Subscription.create({
        subscriberId: req.user._id,
        channelId: channelId,
      });
      return new SuccessResponse("User subscribed successfully");
    }
  } catch (error) {
    console.log("Error in subscription", error);
    return new ErrorResponse(error, "Error in subscription");
  }
};

module.exports = createSubscriber;
