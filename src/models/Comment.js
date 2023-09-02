const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      minlength: [3, "Minimun length should be 3"],
      required: [true, "Text is required"],
    },
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

CommentSchema.virtual('replies', {
  ref: 'Reply',
  localField: '_id',
  foreignField: 'commentId',
  justOne: false,

  options: { sort: { createdAt: -1 } }
})

module.exports = mongoose.model("Comment", CommentSchema);
