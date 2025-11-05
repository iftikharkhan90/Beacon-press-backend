const express = require("express");
const { adminLogin } = require("./controller");
const {adminLoginValidationRequest} = require("../../middleWare/validation/admin/index")
// const {verifyTokenAndAttachUser}  = require("../../middleWare/validation/auth/index")
const getuser = require("./user/index")
const router = express.Router();

router.post("/login",[adminLoginValidationRequest],adminLogin);
router.use("/user",getuser);

module.exports = router;
