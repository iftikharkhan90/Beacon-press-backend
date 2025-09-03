const express = require("express");
const { model } = require("mongoose");
const { uploadManuscript } = require("./controller");

const router = express.Router();
router.post("/upload", uploadManuscript);

module.exports = router;
