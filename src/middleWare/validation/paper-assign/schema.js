const Joi = require("joi");

module.exports = {
  createPaperAssignSchema: Joi.object({
    manuscriptId: Joi.string().trim().required().min(24).max(24),
    journalUserId: Joi.string().trim().required().min(24).max(24),
    status: Joi.string().trim().optional(),
    feedBack: Joi.string().trim().optional(),
  }),

  updatePaperAssignSchema: Joi.object({
    manuscriptId: Joi.string().trim().min(24).max(24).optional(),
    journalUserRoleId: Joi.string().trim().min(24).max(24).optional(),
    status: Joi.string().trim().optional(),
    feedBack: Joi.string().trim().optional(),
  }),
};
