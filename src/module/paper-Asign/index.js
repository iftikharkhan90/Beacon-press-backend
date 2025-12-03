// modules/paperAsign/index.js

const express = require("express");
const router = express.Router();

const { createPaperAsignController,getPaperAsignByIdController , updatePaperAsignController,deletePaperAsignController } = require("./controller");
const { validatePaperAsign,validateUpdatePaperAsign } = require("../../middleWare/validation/Paper-asign/index");
const { verifyTokenAndAttachUser } = require("../../middleWare/validation/auth");

router.post(
  "/create",
  // verifyTokenAndAttachUser,
  validatePaperAsign,
  createPaperAsignController
);
router.get("/:id", 
  verifyTokenAndAttachUser,
   getPaperAsignByIdController);
router.patch("/update/:id", validateUpdatePaperAsign, updatePaperAsignController);

router.delete("/delete/:id", [
  verifyTokenAndAttachUser,
], deletePaperAsignController);

module.exports = router;
