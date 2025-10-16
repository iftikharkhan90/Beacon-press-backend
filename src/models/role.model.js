const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ["author", "reviewer", "editor", "Association author"],
    },
    key: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("role", roleSchema);
