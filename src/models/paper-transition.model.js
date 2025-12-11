const mongoose = require("mongoose");

const paperTransitionModel = new mongoose.Schema(
  {
    paperId: { type: mongoose.Schema.ObjectId, ref: "Manuscript" },
    userId: { type: mongoose.Schema.ObjectId, ref: "users" },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("paper-transitions", paperTransitionModel);
