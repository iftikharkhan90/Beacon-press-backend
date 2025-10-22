const {adminloginValidationSchema} = require("./Schemma")

const adminLoginValidationRequest = (req, res, next) => {
  let data = req.body;
  if(!data){
    return res.status(400).json("No data in request body")
  }

  const { error, value } = adminloginValidationSchema.validate(data, {
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

module.exports = {adminLoginValidationRequest}