const mongoose = require("mongoose");

//Create an Schema Object mongoose
const todoSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    mark: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
