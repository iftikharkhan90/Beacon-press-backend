const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true, 
      trim: true,     
    },
    emailAddress: {
      type: String,
      required: true,
      trim: true,
      lowercase: true, 
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ], 
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 5, 
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Contact", contactSchema);
