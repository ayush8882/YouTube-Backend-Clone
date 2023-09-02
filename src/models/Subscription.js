const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema(
  {
    subscriberId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Subscriber id is required"],
    },
    channelId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Channel id is required"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
