const Joi = require("joi");
const { create } = require("../../../models/user.model");


const createSchema = Joi.object({
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

  journalId: Joi.string()
    .trim()
    .required()
    .min(24)
    .max(24)
    .messages({
      "string.base": "journalId must be a string",
      "string.empty": "journalId is required",
      "any.required": "Please provide a journalId",
      "string.min": "journalId must be exactly 24 characters long",
      "string.max": "journalId must be exactly 24 characters long",
    }),

  isAssigned: Joi.boolean().optional().messages({
    "boolean.base": "isAssigned must be true or false",
  }),
});


const updateSchema = Joi.object({
  roleId: Joi.string()
    .trim()
    .min(24)
    .max(24)
    .optional()
    .messages({
      "string.base": "roleId must be a string",
      "string.min": "roleId must be exactly 24 characters long",
      "string.max": "roleId must be exactly 24 characters long",
    }),
    
  userId: Joi.string()
    .trim()
    .min(24)
    .max(24)
    .optional()
    .messages({
      "string.base": "userId must be a string",
      "string.min": "userId must be exactly 24 characters long",
      "string.max": "userId must be exactly 24 characters long",
    }),
    
  journalId: Joi.string()   // <-- fixed here
    .trim()
    .min(24)
    .max(24)
    .optional()
    .messages({
      "string.base": "journalId must be a string",
      "string.min": "journalId must be exactly 24 characters long",
      "string.max": "journalId must be exactly 24 characters long",
    }),
    
  isAssigned: Joi.boolean()
    .optional()
    .messages({
      "boolean.base": "isAssigned must be true or false",
    }),
});

const getSchema = Joi.object({
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

  journalId: Joi.string()
    .trim()
    .optional()
    .min(24)
    .max(24)
    .messages({
      "string.base": "journalId must be a string",
      "string.empty": "journalId cannot be empty",
      "string.min": "journalId must be exactly 24 characters long",
      "string.max": "journalId must be exactly 24 characters long",
    }),
});




module.exports = {
createSchema,
getSchema,
updateSchema 
};
