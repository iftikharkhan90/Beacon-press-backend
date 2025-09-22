const Joi = require("joi");

const manuscriptDetailsSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title is required",
  }),
  type: Joi.string().trim().required().messages({
    "string.empty": "Type is required",
  }),
  runningTitle: Joi.string().trim().required().messages({
    "string.empty": "Running title is required",
  }),
  subject: Joi.string().trim().required().messages({
    "string.empty": "Subject is required",
  }),
  abstract: Joi.string().trim().required().messages({
    "string.empty": "Abstract is required",
  }),
  correspondingName: Joi.string().trim().required().messages({
    "string.empty": "Corresponding author is required",
  }),
  correspondingEmail: Joi.string().email().lowercase().trim().required().messages({
    "string.email": "Valid email is required for corresponding author",
  }),
  code: Joi.number().integer().optional(),
});

const authorSchema = Joi.object({
  fullName: Joi.string().trim().required().messages({
    "string.empty": "Full name is required",
  }),
  email: Joi.string().email().lowercase().trim().required().messages({
    "string.email": "Valid email is required",
  }),
  country: Joi.string().trim().required().messages({
    "string.empty": "Country is required",
  }),
  affiliation: Joi.string().trim().required().messages({
    "string.empty": "Affiliation is required",
  }),
});

const reviewerSchema = Joi.object({
  fullName: Joi.string().trim().required().messages({
    "string.empty": "Full name is required",
  }),
  email: Joi.string().email().lowercase().trim().required().messages({
    "string.email": "Valid email is required",
  }),
  country: Joi.string().trim().required().messages({
    "string.empty": "Country is required",
  }),
  affiliation: Joi.string().trim().required().messages({
    "string.empty": "Affiliation is required",
  }),
});

const scriptValidationSchema = Joi.object({
  manuscriptDetails: manuscriptDetailsSchema.required(),
  authors: Joi.array().items(authorSchema).min(1).required().messages({
    "array.min": "At least 1 author must be provided",
  }),
  reviewers: Joi.array().items(reviewerSchema).min(3).required().messages({
    "array.min": "At least 3 reviewers must be provided",
  }),
  conflictOfInterest: Joi.boolean().required(),
  conflictDescription: Joi.string().trim().allow("").optional(),
  dataAvailability: Joi.string().trim().required().messages({
    "string.empty": "Data availability statement is required",
  }),
});

module.exports = scriptValidationSchema;