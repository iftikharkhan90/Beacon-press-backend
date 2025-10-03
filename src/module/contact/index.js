const express = require("express");
const { createContact } = require("./controller");

const router = express.Router();

router.post("/", createContact);

module.exports = router;
