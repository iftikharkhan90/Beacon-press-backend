const Joi = require("joi");

//paperAsignSchema
const paperAsignschema = Joi.object({
    manuscriptId: Joi.string().trim().required().min(24)
        .max(24),
    journalUserId: Joi.string().trim().required().min(24)
        .max(24),
    staus: Joi.string().trim().optional(),
    feedBack: Joi.string().trim().optional(),
});
module.exports = { paperAsignschema }