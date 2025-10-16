const { string } = require("joi");
const mongoose = require("mongoose");

const journalsSchemma = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image:{type:String},
    createdby:{type: String},
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journals", journalsSchemma);
