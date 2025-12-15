const Joi = require("joi");

const paperAsignschema = Joi.object({
    paperId: Joi.string().trim().required().min(24)
        .max(24),
    userId: Joi.string().trim().required().min(24)
        .max(24),
    status: Joi.string().trim().optional(),
    isActive: Joi.string().trim().optional(),
});

const updatePaperAsignSchema = Joi.object({
  paperId: Joi.string().trim().min(24).max(24).optional(),
  userId: Joi.string().trim().min(24).max(24).optional(),
  status: Joi.string().trim().optional(),
  isActive: Joi.string().trim().optional(),
});


module.exports = { paperAsignschema ,updatePaperAsignSchema }