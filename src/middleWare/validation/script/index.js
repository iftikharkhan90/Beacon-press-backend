const Joi = require("joi");
const createSchema = require("./schema");

const validateCreateScriptRequest = (req, res, next) => {
  let data = req.body;

  const { error, value } = createSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details[0].message,
    });
  }
  req.validatedData = value;

  next();
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
    if (
      req.body.conflictOfInterest &&
      typeof req.body.conflictOfInterest === "string"
    ) {
      req.body.conflictOfInterest = req.body.conflictOfInterest === "true";
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON in request body",
    });
  }
  next();
};

const validateFiles = (req, res, next) => {
  const fileSchema = Joi.object({
    manuscript: Joi.object().required(),
    figuresDetails: Joi.any().optional(),
    supplementaryDetails: Joi.any().optional(),
  });
  const { error } = fileSchema.validate(req.files || {}, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message:"MnauScript file is required"
    });
  }
  next();
};

module.exports = { validateCreateScriptRequest, preprocessBody, validateFiles };
