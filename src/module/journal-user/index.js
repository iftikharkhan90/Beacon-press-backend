const express = require("express");
const { getJournalUser, createJournalUser, updateJournal } = require("./controller");

const {validateCreateJournalUserRequest,validateGetJournalUserRequest,validateUpdateJournalUserRequest} = require("../../middleWare/validation/journal-user/index");

const { verifyTokenAndAttachUser } = require("../../middleWare/validation/auth/index");

const router = express.Router();

// Create a Journal User Role
router.post(
  "/create",
  [verifyTokenAndAttachUser,validateCreateJournalUserRequest],
  createJournalUser
);

// Get Journal User Role(s)
router.get(
  "/get",
  [verifyTokenAndAttachUser, validateGetJournalUserRequest],
  getJournalUser
);

// Update a Journal User Role
router.patch(
  "/update/:id",
  [verifyTokenAndAttachUser, validateUpdateJournalUserRequest],
  updateJournal
);

module.exports = router;
