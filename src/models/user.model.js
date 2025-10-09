const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    title: { type: String },
    country: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    specialization: { type: String },
    affiliation: { type: String },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: { type: String },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    isReviewer: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
