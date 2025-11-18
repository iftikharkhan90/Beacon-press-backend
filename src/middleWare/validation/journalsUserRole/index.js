const {
  createJournalUserRoleValidationSchema,
  getJournalUserRoleValidationSchema,
  updateJournalUserRoleValidationSchema
} = require("./schemma"); // make sure the filename is correct

// ✅ Create Validation
const createJournalUserRoleValidationRequest = (req, res, next) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ success: false, message: "No data in request body" });
  }

  const { error, value } = createJournalUserRoleValidationSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({ success: false, errors: error.details[0].message });
  }

  req.validatedData = value;
  next();
};

// ✅ Patch / Update Validation
const patchJournalUserRoleValidationRequest = (req, res, next) => {
  const data = req.body;
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ success: false, message: "No data to update" });
  }

  const { error, value } = updateJournalUserRoleValidationSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({ success: false, errors: error.details[0].message });
  }

  req.validatedData = value;
  next();
};

// ✅ Get Validation
const getJournalUserRoleValidationRequest = (req, res, next) => {
  const data = req.query;
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ success: false, message: "No data in request" });
  }

  const { error, value } = getJournalUserRoleValidationSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({ success: false, errors: error.details[0].message });
  }

  req.validatedData = value;
  next();
};

module.exports = {
  createJournalUserRoleValidationRequest,
  patchJournalUserRoleValidationRequest, // ✅ export it
  getJournalUserRoleValidationRequest
};
