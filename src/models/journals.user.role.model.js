const mongoose = require("mongoose");

const jounalsUserRoleSchemma = new mongoose.Schema({
  roleId: { type: mongoose.Schema.ObjectId, ref: "role" },
  userId: { type: mongoose.Schema.ObjectId, ref: "user" },
  journalsId: { type: mongoose.Schema.ObjectId, ref: "Journals" },
});

module.exports = mongoose.model("journalsUserRole",jounalsUserRoleSchemma)
