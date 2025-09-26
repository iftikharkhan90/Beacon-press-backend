const express = require("express");
const userModule = require("../module/user/index");
const scriptModule = require("../module/script/index");
const contactModule = require("../module/contact/index");

const router = express.Router();
router.use("/users", userModule);
router.use("/scripts", scriptModule);
router.use("/contact", contactModule);

module.exports = router;
