const mongoose = require("mongoose");

const PaperAsignSchema = new mongoose.Schema(
  {
    manuscriptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manuscript",
      required: true,
    },
    journalUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "journal-users", // ✅ MUST match JournalUser model
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

module.exports = mongoose.model("paper-asigns", PaperAsignSchema);
