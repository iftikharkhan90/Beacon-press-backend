const Joi = require("joi");

const manuscriptDetailsSchema = Joi.object({
  title: Joi.string().trim().required(),
  type: Joi.string().trim().required(),
  runningTitle: Joi.string().trim().required(),
  subject: Joi.string().trim().required(),
  abstract: Joi.string().trim().required(),
  correspondingName: Joi.string().trim().required(),
  correspondingEmail: Joi.string().email().lowercase().trim().required(),
  keyword: Joi.string().trim().optional(),
});

const authorSchema = Joi.object({
  fullName: Joi.string().trim().required(),
  email: Joi.string().email().lowercase().trim().required(),
  country: Joi.string().trim().required(),
  affiliation: Joi.string().trim().required(),
});

const reviewerSchema = Joi.object({
  fullName: Joi.string().trim().required(),
  email: Joi.string().email().lowercase().trim().required(),
  country: Joi.string().trim().required(),
  affiliation: Joi.string().trim().required(),
});

const scriptValidationSchema = Joi.object({
  manuscriptDetails: manuscriptDetailsSchema.required(),
  authors: Joi.array().items(authorSchema).min(1).required(),
  reviewers: Joi.array().items(reviewerSchema).min(3).required(),
  conflictOfInterest: Joi.boolean().required(),
  conflictDescription: Joi.string().trim().allow("").optional(),
  dataAvailability: Joi.string().trim().required(),
});

module.exports = scriptValidationSchema;
