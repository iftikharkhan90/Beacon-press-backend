const express = require("express");
const controller = require("./controller");

const validation = require("../../middleWare/validation/journal-user/index");

const {
  verifyTokenAndAttachUser,
} = require("../../middleWare/validation/auth/index");

const router = express.Router();

// Create a Journal User Role
router.post(
  "/create",
  [verifyTokenAndAttachUser, validation.createJournalUser],
  controller.createJournalUser
);

// Get Journal User Role(s)
router.get(
  "/get",
  [verifyTokenAndAttachUser, validation.getJournalUser],
  controller.getJournalUser
);

// Update a Journal User Role
router.patch(
  "/update/:id",
  [verifyTokenAndAttachUser, validation.updateJournalUser],
  controller.updateJournal
);

module.exports = router;
