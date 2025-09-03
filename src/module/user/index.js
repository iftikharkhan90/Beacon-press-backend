const express = require("express");
const { model } = require("mongoose");
const { userCreat, userLogin, userVerify } = require("./controller");

const router = express.Router();
router.post("/create", userCreat);
router.post("/login", userLogin);
router.post("/verify", userVerify);
module.exports = router;
