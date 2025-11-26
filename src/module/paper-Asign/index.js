// modules/paperAsign/index.js

const express = require("express");
const router = express.Router();

const { createPaperAsignController } = require("./controller");
const { validatePaperAsign } = require("../../middleWare/validation/Paper-asign/index");
const { verifyTokenAndAttachUser } = require("../../middleWare/validation/auth");

router.post(
  "/create",
  verifyTokenAndAttachUser,
  validatePaperAsign,
  createPaperAsignController
);

module.exports = router;
