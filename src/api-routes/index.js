const express = require("express");
const userModule = require("../modules/user/index");
const scriptModule = require("../modules/script/index");

const router = express.Router();
router.use("/user", userModule);
router.use("/scritp", scriptModule);
module.exports = router;
