const express = require("express");
const { model } = require("mongoose");
const { userCreate, userLogin, userVerify, getUserById, updateUser, resetPassword, forgotPassword } = require("./controller");

const router = express.Router();
router.post("/", userCreate);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.post("/login", userLogin);
router.post("/verify", userVerify);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
module.exports = router;
