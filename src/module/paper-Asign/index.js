const express = require("express");
const router = express.Router();

const {
  createPaperAsignController,
  getPaperAsignByJournalController,
  updatePaperAsignController,
  deletePaperAsignController,
} = require("./controller");

router.post("/create", createPaperAsignController);
router.get("/get", getPaperAsignByJournalController);
router.put("/update/:id", updatePaperAsignController);
router.delete("/delete/:id", deletePaperAsignController);

module.exports = router;
