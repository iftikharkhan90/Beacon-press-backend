const express = require("express");
const { createScript ,getScript} = require("./controller");
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

router.get("/getScript",
  [
    verifyTokenAndAttachUser,
  ],
getScript
)

module.exports = router;
