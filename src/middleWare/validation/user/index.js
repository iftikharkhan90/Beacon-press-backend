const userSchemma = require("./schema")

const validateRequest = (schema) => (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Request body is empty",
    });
  }

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map(err => err.message).join(", "),
    });
  }

  req.validatedData = value;
  next();
};
;

module.exports = {
  validateUserRequest: validateRequest(userSchemma.createValidationSchema),
  validateLoginRequest: validateRequest(userSchemma.loginValidationSchema),
  validateUserUpdateRequest: validateRequest(userSchemma.UpdateValidationSchema),
};
