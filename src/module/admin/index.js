const express = require("express");
const { adminLogin } = require("./controller");
const {adminLoginValidationRequest} = require("../../middleWare/validation/admin/index")

const router = express.Router();

router.post("/login",[adminLoginValidationRequest],adminLogin);

module.exports = router;
