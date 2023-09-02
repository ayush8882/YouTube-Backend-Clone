const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    type: {
      type: String,
      enum: ["search", "watch"],
      required: true,
    },
    searchText: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("History", HistorySchema);
