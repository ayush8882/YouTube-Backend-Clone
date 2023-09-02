const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VideoSchema = new Schema(
  {
    title: {
      type: String,
      minlength: [3, "Minimum length of title is 3"]
    },
    description: {
      type: String,
      default: '',
    },
    thumbnailUrl: {
      type: String,
      default: "",
    },
    url: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["public", "private", "draft"],
      default: "draft",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cateogryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

VideoSchema.virtual("likes", {
  ref: "Feelings",
  localField: "_id",
  foreignField: "videoId",
  justOne: false,
  count: true,
  match: { type: "like" },
});

VideoSchema.virtual("dislikes", {
  ref: "Dislikes",
  localField: "_id",
  foreignField: "videoId",
  justOne: false,
  count: true,
  match: { type: "dislike" },
});

VideoSchema.virtual("comments", {
  ref: "Comments",
  localField: "_id",
  foreignField: "videoId",
  justOne: false,
  count: true,
});

module.exports = mongoose.model("Video", VideoSchema);
