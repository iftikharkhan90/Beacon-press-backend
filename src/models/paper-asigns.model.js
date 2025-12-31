const mongoose = require("mongoose");

const PaperAssignSchema = new mongoose.Schema(
  {
    manuscriptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manuscript",
      required: true,
    },
    journalUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "journal-users",
      required: true,
    },
    status: {
      type: String,
      default: "assigned",
    },
    feedBack: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("paper-assigns", PaperAssignSchema);
