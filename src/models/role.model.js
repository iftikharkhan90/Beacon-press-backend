const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ["Author", "Reviewer", "Editor", "Association Editor","Editor in Chief","Editorial Board Member"],
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
