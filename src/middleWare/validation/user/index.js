const { models } = require("mongoose");
const {userValidationSchema , userloginValidationSchema , userUpdateValidationSchema} = require("./schema")

const validateUserRequest = (req, res, next) => {
  let data = req.body;
  if(!data){
    return res.status(400).json("No data in request body")
  }

  const { error, value } = userValidationSchema.validate(data, {
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

const loginvalidateUserRequest = (req, res, next) => {
  let data = req.body;
  if(!data){
    return res.status(400).json("No data in request body")
  }

  const { error, value } = userloginValidationSchema.validate(data, {
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

const UpdaUsertevalidateRequest = (req, res, next) => {
  let data = req.body;
  if(!data){
    return res.status(400).json("No data in request body")
  }

  const { error, value } = userUpdateValidationSchema.validate(data, {
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

module.exports = {validateUserRequest , loginvalidateUserRequest , UpdaUsertevalidateRequest}
