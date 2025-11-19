const {
 createSchema,
getSchema,
updateSchema 
} = require("./schemma"); // make sure the filename is correct

//  Create Validation
const validateCreateJournalUserRequest = (req, res, next) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ success: false, message: "No data in request body" });
  }

  const { error, value } = createSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({ success: false, errors: error.details[0].message });
  }

  req.validatedData = value;
  next();
};

//  Patch / Update Validation
const validateUpdateJournalUserRequest = (req, res, next) => {
  const data = req.body;
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ success: false, message: "No data to update" });
  }

  const { error, value } = updateSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({ success: false, errors: error.details[0].message });
  }

  req.validatedData = value;
  next();
};

//  Get Validation
const validateGetJournalUserRequest = (req, res, next) => {
  const data = req.query;
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ success: false, message: "No data in request" });
  }

  const { error, value } = getSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({ success: false, errors: error.details[0].message });
  }

  req.validatedData = value;
  next();
};

module.exports = {validateCreateJournalUserRequest,validateGetJournalUserRequest,validateUpdateJournalUserRequest};
