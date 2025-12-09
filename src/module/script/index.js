const express = require("express");
const { createScript ,getScript,getScriptByjournalId} = require("./controller");
const {
  verifyTokenAndAttachUser,
} = require("../../middleWare/validation/auth");
const {
  validateCreateScriptRequest,
  preprocessBody,
  validateFiles,
} = require("../../middleWare/validation/script");

const router = express.Router();

router.post(
  "/upload",
  [
    verifyTokenAndAttachUser,
    preprocessBody,
    validateCreateScriptRequest,
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

router.get("/get",
getScriptByjournalId)

module.exports = router;
