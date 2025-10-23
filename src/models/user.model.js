const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    roleId: { type: mongoose.Schema.ObjectId, ref: "role",},
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
    usertype: {
      type: String,
      enum: ["user", "admin"],
    },
    isReviewer: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
