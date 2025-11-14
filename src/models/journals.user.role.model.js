const mongoose = require("mongoose");

const jounalsUserRoleSchemma = new mongoose.Schema(
  {
    roleId: { type: mongoose.Schema.ObjectId, ref: "role" },
    userId: { type: mongoose.Schema.ObjectId, ref: "users" },
    journalId: { type: mongoose.Schema.ObjectId, ref: "Journals" },
    isAssigned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("journal_Users", jounalsUserRoleSchemma);
