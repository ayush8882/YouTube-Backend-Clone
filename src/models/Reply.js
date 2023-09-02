const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReplySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      minlength: [3, "Minlength for reply should be 3"],
      required: true,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

ReplySchema.pre("find", function () {
  this.populate({
    path: "userId",
    select: "channelName photoUrl",
    sort: "+createdAt",
  });
});

module.exports = mongoose.model("Reply", ReplySchema);
