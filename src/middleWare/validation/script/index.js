const Joi = require("joi");
const scriptValidationSchema = require("./schema");

const validateScriptRequest = (data) => {
  const { error, value } = scriptValidationSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    console.log(error);
    const errorMessages = error.details.map((detail) => detail.message);
    return {
      valid: false,
      errors: errorMessages,
    };
  }

  return {
    valid: true,
    data: value,
  };
};

const preprocessBody = (req, res, next) => {
  try {
    if (
      req.body.manuscriptDetails &&
      typeof req.body.manuscriptDetails === "string"
    ) {
      req.body.manuscriptDetails = JSON.parse(req.body.manuscriptDetails);
    }
    if (req.body.authors && typeof req.body.authors === "string") {
      req.body.authors = JSON.parse(req.body.authors);
    }
    if (req.body.reviewers && typeof req.body.reviewers === "string") {
      req.body.reviewers = JSON.parse(req.body.reviewers);
    }
    // Convert conflictOfInterest to boolean
    if (
      req.body.conflictOfInterest &&
      typeof req.body.conflictOfInterest === "string"
    ) {
      req.body.conflictOfInterest = req.body.conflictOfInterest === "true";
    }
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid JSON in request body" });
  }
  next();
};


const validateFiles = (req, res, next) => {
  const fileSchema = Joi.object({
    manuscript: Joi.object().required().messages({
      "any.required": "Manuscript file is required",
    }),
    figuresDetails: Joi.any().optional(),
    supplementaryDetails: Joi.any().optional(),
  });

  const { error } = fileSchema.validate(req.files || {}, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((err) => err.message).join(", "),
    });
  }
  next();
};

module.exports = { validateScriptRequest, preprocessBody, validateFiles };
