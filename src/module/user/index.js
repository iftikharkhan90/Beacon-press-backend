const express = require("express");
const { model } = require("mongoose");
const  {verifyTokenAndAttachUser} = require("../../middleWare/validation/auth/index")
const validation = require("../../middleWare/validation/user/index")
const userController = require("./controller");

const router = express.Router();
router.post("/register", [validation.validateUserRequest],userController.userCreate);
router.get("/getById", [verifyTokenAndAttachUser],userController.getUserById);
router.patch("/patch",[verifyTokenAndAttachUser,validation.validateUserUpdateRequest],userController.updateUser);
router.post("/login",[validation.validateLoginRequest],userController.userLogin);
router.post("/verify",userController.userVerify);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);
module.exports = router;
