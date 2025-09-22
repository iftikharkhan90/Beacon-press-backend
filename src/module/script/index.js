const express = require("express");
const { createScript } = require("./controller");
const {
  verifyTokenAndAttachUser,
} = require("../../middleWare/validation/auth");
const {
  validateScriptRequest,
  preprocessBody,
  validateFiles,
} = require("../../middleWare/validation/script");

const router = express.Router();

router.post(
  "/upload",
  [
    verifyTokenAndAttachUser,
    preprocessBody,
    validateScriptRequest,
    validateFiles,
  ],
  createScript
);

module.exports = router;
