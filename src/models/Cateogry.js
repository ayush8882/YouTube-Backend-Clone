const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const CateogrySchema = new Schema(
  {
    title: {
      type: String,
      minlength: [3, "Minimum length of the title is 3"],
      trim: true,
      unique: true,
      uniqueCaseSensitive: true,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      minlength: [3, "Minimum length of the description is 3"],
      trim: true,
      required: [true, "Description is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

CateogrySchema.plugin(uniqueValidator, { message: "{PATH} already exists" });

module.exports = mongoose.model("Category", CateogrySchema);
