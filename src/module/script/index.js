const express = require("express");
const { model } = require("mongoose");
const { createScript } = require("./controller");

const router = express.Router();
router.post("/upload", createScript);

module.exports = router;
