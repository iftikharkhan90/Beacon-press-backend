const express = require("express")
const {getUser} = require("./controller")
const {verifyTokenAndAttachUser} = require("../../../middleWare/validation/auth/index")

const router = express.Router()

router.get("/get", [verifyTokenAndAttachUser],getUser);

module.exports = router;