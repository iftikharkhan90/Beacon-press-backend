const mongoose = require("mongoose");
const { type } = require("os");
const bcrypt = require("bcrypt");

const userScehma = new mongoose.Schema({
  title: { type: String, required: true },
  country: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialization: { type: String, required: true },
  affiliation: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: { type: String, required: true },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin", "superAdmin"],
    default: "user",
  },
  isReviewer: { type: Boolean, default: false },
  isverfied: { type: Boolean, default: false },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  //   expires: 120, // 120 seconds = 2 minutes
  // },
});

const User = mongoose.model("User", userScehma);
module.exports = User;
