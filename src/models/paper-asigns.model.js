const mongoose = require("mongoose");

const paperAsignModel = new mongoose.Schema(
  {
    manuscriptId: { type: mongoose.Schema.ObjectId, ref: "Manuscript" },
    journalUserId: { type: mongoose.Schema.ObjectId, ref: "journal-users" },
    status: { type: String,  },
    feedBack: { type: String,  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("paper-asigns", paperAsignModel);
