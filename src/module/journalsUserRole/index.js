const express = require("express");
const { 
  getJournalUserRole, 
  createJournalUserRole, 
  updateJournalRole 
} = require("./controller");

const { 
  getJournalUserRoleValidationRequest, 
  createJournalUserRoleValidationRequest,
  patchJournalUserRoleValidationRequest // import patch validation
} = require("../../middleWare/validation/journalsUserRole/index");

const { verifyTokenAndAttachUser } = require("../../middleWare/validation/auth/index");

const router = express.Router();

// Create a Journal User Role
router.post(
  "/create",
  [verifyTokenAndAttachUser, createJournalUserRoleValidationRequest],
  createJournalUserRole
);

// Get Journal User Role(s)
router.get(
  "/get",
  [verifyTokenAndAttachUser, getJournalUserRoleValidationRequest],
  getJournalUserRole
);

// Update a Journal User Role
router.patch(
  "/update/:id",
  [verifyTokenAndAttachUser, patchJournalUserRoleValidationRequest],
  updateJournalRole
);

module.exports = router;
