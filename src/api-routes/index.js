const express = require("express");
const userModule = require("../module/user/index");
const scriptModule = require("../module/script/index");
const contactModule = require("../module/contact/index");
const journalsModule = require("../module/Journals/index")
const roleModule = require("../module/role/index")
const adminModule = require("../module/admin/index")
const router = express.Router();
router.use("/users", userModule);
router.use("/scripts", scriptModule);
router.use("/contact", contactModule);
router.use("/journals", journalsModule)
router.use("/role",roleModule)
router.use("/admin",adminModule)

module.exports = router;
