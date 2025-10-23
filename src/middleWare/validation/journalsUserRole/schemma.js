const Joi = require("joi");

const createJournalUserRoleValidationSchemma = Joi.object({
  roleId: Joi.string().trim().optional(),
  userId: Joi.string().trim().optional(),
  journalsId: Joi.string().trim().optional(),
});

const updateJournalUserRoleValidationSchemma = Joi.object({
  roleId: Joi.string().trim().optional(),
  userId: Joi.string().trim().optional(),
  journalsId: Joi.string().trim().optional(),
});

module.exports = {
  createJournalUserRoleValidationSchemma,
  updateJournalUserRoleValidationSchemma,
};
