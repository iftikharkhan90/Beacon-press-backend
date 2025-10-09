const Joi = require("joi");

const userValidationSchema = Joi.object({
  title: Joi.string().trim().required(),
  country: Joi.string().trim().required(),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  specialization: Joi.string().trim().required(),
  affiliation: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string().trim().required(),
  password: Joi.string().trim().min(8).required(),
  role: Joi.string().valid("user", "admin", "superAdmin").optional(),
  isReviewer: Joi.boolean().default(false),
});

const userloginValidationSchema = Joi.object({
     email: Joi.string().trim().email().required(),
     password: Joi.string().trim().required(),
})

const userUpdateValidationSchema = Joi.object({
  title: Joi.string().trim().optional(),
  country: Joi.string().trim().optional(),
  firstName: Joi.string().trim().optional(),
  lastName: Joi.string().trim().optional(),
  specialization: Joi.string().trim().optional(),
  affiliation: Joi.string().trim().optional(),
  email: Joi.string().trim().email().optional(),
  phone: Joi.string().trim().optional(),
  password: Joi.string().trim().min(8).optional(),
  isReviewer: Joi.boolean().default(false),
});

module.exports = {userValidationSchema , userloginValidationSchema , userUpdateValidationSchema};
