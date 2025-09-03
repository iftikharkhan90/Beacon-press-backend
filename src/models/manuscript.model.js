const mongoose = require("mongoose");

const scriptSchema = new mongoose.Schema({
  manuScriptDetail: [
    {
      title: { type: String, required: true },
      type: { type: String, required: true },
      runningTitle: { type: String, required: true },
      subject: { type: String, required: true },
      abstract: { type: String, required: true },
      correspondingAuthor: { type: String, required: true },
      email: { type: String, required: true },
    },
  ],
  authors: [
    {
      fullname: { type: String, required: true },
      email: { type: String, required: true },
      country: { type: String, required: true },
      affiliation: { type: String, required: true },
    },
  ],
  reviewersDetails: [
    {
      fullname: { type: String, required: true },
      email: { type: String, required: true },
      country: { type: String, required: true },
      affiliation: { type: String, required: true },
    },
  ],

  authorConflict: { type: Boolean, default: false },
  conflictDescription: { type: String },
  dataAvailabilityStatement: { type: String, required: true },

  manuScriptFiles: [
    {
      scriptFile: {
        name: { type: String, default: "Script File", required: true },
        url: { type: String, required: true },
      },
      figureTableFiles: {
        name: { type: String, default: "Figure/Table File" },
        url: { type: String },
      },
      supplementaryFiles: {
        name: { type: String, default: "Supplementary File" },
        url: { type: String },
      },
    },
  ],
});

const userScript = mongoose.model("Script", scriptSchema);
module.exports = userScript;
