const Joi = require("joi");


const createJournalUserRoleValidationSchema = Joi.object({
  roleId: Joi.string()
    .trim()
    .required()
    .min(24)
    .max(24)
    .messages({
      "string.base": "roleId must be a string",
      "string.empty": "roleId is required",
      "any.required": "Please provide a roleId",
      "string.min": "roleId must be exactly 24 characters long",
      "string.max": "roleId must be exactly 24 characters long",
    }),

  userId: Joi.string()
    .trim()
    .required()
    .min(24)
    .max(24)
    .messages({
      "string.base": "userId must be a string",
      "string.empty": "userId is required",
      "any.required": "Please provide a userId",
      "string.min": "userId must be exactly 24 characters long",
      "string.max": "userId must be exactly 24 characters long",
    }),

  journalsId: Joi.string()
    .trim()
    .required()
    .min(24)
    .max(24)
    .messages({
      "string.base": "journalsId must be a string",
      "string.empty": "journalsId is required",
      "any.required": "Please provide a journalsId",
      "string.min": "journalsId must be exactly 24 characters long",
      "string.max": "journalsId must be exactly 24 characters long",
    }),

  isAssigned: Joi.boolean().optional().messages({
    "boolean.base": "isAssigned must be true or false",
  }),
});


const updateJournalUserRoleValidationSchemma = Joi.object({
  roleId: Joi.string().trim().optional(),
  userId: Joi.string().trim().optional(),
  journalsId: Joi.string().trim().optional(),
});

const getJournalUserRoleValidationSchema = Joi.object({
  userId: Joi.string()
    .trim()
    .optional()
    .min(24)
    .max(24)
    .messages({
      "string.base": "userId must be a string",
      "string.empty": "userId cannot be empty",
      "string.min": "userId must be exactly 24 characters long",
      "string.max": "userId must be exactly 24 characters long",
    }),

  journalsId: Joi.string()
    .trim()
    .optional()
    .min(24)
    .max(24)
    .messages({
      "string.base": "journalsId must be a string",
      "string.empty": "journalsId cannot be empty",
      "string.min": "journalsId must be exactly 24 characters long",
      "string.max": "journalsId must be exactly 24 characters long",
    }),
});




module.exports = {
createJournalUserRoleValidationSchema,
 getJournalUserRoleValidationSchema
};
