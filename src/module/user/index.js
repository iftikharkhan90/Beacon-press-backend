const express = require("express");
const { model } = require("mongoose");
const  {verifyTokenAndAttachUser} = require("../../middleWare/validation/auth/index")
const {validateUserRequest,loginvalidateUserRequest,UpdaUsertevalidateRequest} = require("../../middleWare/validation/user/index")
const { userCreate, userLogin, userVerify, getUserById, updateUser, resetPassword, forgotPassword } = require("./controller");

const router = express.Router();
router.post("/register", [validateUserRequest],userCreate);
router.get("/getById", [verifyTokenAndAttachUser],getUserById);
router.patch("/patch",[verifyTokenAndAttachUser,UpdaUsertevalidateRequest],updateUser);
router.post("/login",[loginvalidateUserRequest], userLogin);
router.post("/verify", userVerify);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
module.exports = router;
