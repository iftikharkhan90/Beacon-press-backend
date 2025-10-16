const { string } = require("joi");
const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const authorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  affiliation: { type: String, required: true },
});

const reviewerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  affiliation: { type: String, required: true },
});

const manuscriptDetailsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  runningTitle: { type: String, required: true },
  subject: { type: String, required: true },
  abstract: { type: String, required: true },
  correspondingName: { type: String, required: true },
  correspondingEmail: { type: String, required: true },
  code: { type: String, required: false },
});

const manuscriptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },

    manuscriptDetails: { type: manuscriptDetailsSchema, required: true },

    authors: { type: [authorSchema], required: true },

    reviewers: { type: [reviewerSchema], required: true },

    conflictOfInterest: { type: Boolean, required: true },

    conflictDescription: { type: String, default: "" },

    dataAvailability: { type: String, required: true },

    manuscriptFiles: {
      manuscript: { type: fileSchema, required: true },
      figuresDetails: { type: [fileSchema], default: [] },
      supplementaryDetails: { type: [fileSchema], default: [] },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Manuscript", manuscriptSchema);
