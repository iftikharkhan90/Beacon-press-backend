const express = require('express');
const { getManuscriptsByAdminId } = require('./controller');
const {verifyTokenAndAttachUser} = require("../../../middleWare/validation/auth/index")

const router = express.Router();

router.get('/',
    //verifyTokenAndAttachUser, 
    getManuscriptsByAdminId);
module.exports = router;