const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, " username is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required ."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
