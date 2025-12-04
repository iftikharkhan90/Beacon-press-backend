const express = require("express");
const controller = require("./controller");
const validation = require("../../middleWare/validation/Journals/index");
const {
  verifyTokenAndAttachUser,
} = require("../../middleWare/validation/auth/index");
const {
  uploadMiddleware,
  handleSingleFile,
  handleMultipleFiles,
} = require("../../file");

const router = express.Router();

router.post(
  "/create",
  [verifyTokenAndAttachUser, validation.createRequest],
  controller.createJournal
);
router.get("/get", [], controller.getJournals);
router.patch(
  "/patch/:journalId",
  [, validation.updateRequest],
  controller.updateJournal
);
router.delete(
  "/delete/:journalId",
  [verifyTokenAndAttachUser],
  controller.deleteJournalbyId
);

module.exports = router;
