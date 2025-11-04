const {
  createJournalUserRoleValidationSchema,
 getJournalUserRoleValidationSchema
} = require("./schemma");

const createJournalUserRoleValidationRequest = (req, res, next) => {
  let data = req.body;
  if (!data) {
    return res.status(400).json("No data in request body");
  }

  const { error, value } = createJournalUserRoleValidationSchema.validate(
    data,
    {
      abortEarly: false,
      stripUnknown: true,
    }
  );

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details[0].message,
    });
  }
  req.validatedData = value;

  next();
};


// const patchJournalUserRoleValidationRequest = (req, res, next) => {
//   let data = req.body;
//   if (!data) {
//     return res.status(400).json("No data in request body");
//   }

//   const { error, value } = updateJournalUserRoleValidationSchemma.validate(
//     data,
//     {
//       abortEarly: false,
//       stripUnknown: true,
//     }
//   );

//   if (error) {
//     return res.status(400).json({
//       success: false,
//       errors: error.details[0].message,
//     });
//   }
//   req.validatedData = value;

//   next();
// };

const getJournalUserRoleValidationRequest = (req, res, next) => {
  let data = req.body;
  if (!data) {
    return res.status(400).json("No data in request body");
  }

  const { error, value } = getJournalUserRoleValidationSchema.validate(
    data,
    {
      abortEarly: false,
      stripUnknown: true,
    }
  );

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details[0].message,
    });
  }
  req.validatedData = value;

  next();
};

module.exports = {
  createJournalUserRoleValidationRequest,
  getJournalUserRoleValidationRequest
};
