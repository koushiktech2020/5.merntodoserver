const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
