const express = require("express");
const { createJUR } = require("./controller");
const {
  createJournalUserRoleValidationRequest,
  patchJournalUserRoleValidationRequest,
} = require("../../middleWare/validation/journalsUserRole/index")

const router = express.Router();

router.post("/create",[createJournalUserRoleValidationRequest],createJUR);

module.exports = router;
