const express = require("express");
const router = express.Router();
const validate = require("../../middleWare/validation/paper-assign/index");

const {
  createPaperAssign,
  getPaperAssigns,
  updatePaperAssign,
  deletePaperAssign,
} = require("./controller");

router.post("/create", [validate.createPaperAssign], createPaperAssign);
router.get("/get", getPaperAssigns);
router.put("/update/:id", [validate.UpdatePaperAssign], updatePaperAssign);
router.delete("/delete/:id", deletePaperAssign);

module.exports = router;
