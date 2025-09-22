const express = require("express");
const userModule = require("../module/user/index");
const scriptModule = require("../module/script/index");

const router = express.Router();
router.use("/users", userModule);
router.use("/scripts", scriptModule);

module.exports = router;
