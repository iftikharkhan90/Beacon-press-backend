const express = require("express");
const { getJournalUserRole,createJournalUserRole } = require("./controller");
const {getJournalUserRoleValidationRequest,createJournalUserRoleValidationRequest} = require("../../middleWare/validation/journalsUserRole/index")
const {verifyTokenAndAttachUser} =require("../../middleWare/validation/auth/index")

const router = express.Router();

router.post("/create",[verifyTokenAndAttachUser,createJournalUserRoleValidationRequest],createJournalUserRole);
router.get("/get",[verifyTokenAndAttachUser,getJournalUserRoleValidationRequest],getJournalUserRole);


module.exports = router;
