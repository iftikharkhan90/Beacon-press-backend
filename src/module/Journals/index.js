const express = require("express");
const {createJournals,getJournals, patchJournals,deleteJournals} = require("./controller")
const {createvalidatejournalsRequest,patchvalidatejournalsRequest,imageValidatejournalsRequest,patchimageValidatejournalsRequest} =require("../../middleWare/validation/Journals/index")
const {verifyTokenAndAttachUser} = require("../../middleWare/validation/auth/index")

const router = express.Router();

router.post("/create",[verifyTokenAndAttachUser,createvalidatejournalsRequest,imageValidatejournalsRequest],createJournals);
router.get("/get",[verifyTokenAndAttachUser],getJournals);
router.patch("/patch/:journalId",[verifyTokenAndAttachUser,patchvalidatejournalsRequest,patchimageValidatejournalsRequest],patchJournals);
router.delete("/delete/:journalId",[verifyTokenAndAttachUser],deleteJournals);

module.exports = router;
