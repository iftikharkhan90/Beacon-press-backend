// const schemma = require("./schemma");


// const createvalidatejournalsRequest = (req, res, next) => {
//   let data = req.body;

//   if (!data) {
//     return res.status(400).json({
//       success: false,
//       message: "No data provided in the request body",
//     });
//   }

//   if (data.users && typeof data.users === "string") {
//     data.users = data.users.replace(/'/g, '"');
//     data.users = JSON.parse(data.users);
//   }
//   const { error, value } = schemma.createValidationSchema.validate(data, {
//     abortEarly: false,
//     stripUnknown: true,
//   });

//   if (error) {
//     return res.status(400).json({
//       success: false,
//       errors: error.details[0].message,
//     });
//   }

//   req.validatedData = value;
//   next();
// };

// const patchvalidatejournalsRequest = (req, res, next) => {
//   let data = req.body;
//   if (!data) {
//     return res.status(400).json("No data in request");
//   }

//     if (data.users && typeof data.users === "string") {
//     data.users = data.users.replace(/'/g, '"');
//     data.users = JSON.parse(data.users);
//   }

//   const { error, value } = schemma.updateValidationSchema.validate(data, {
//     abortEarly: false,
//     stripUnknown: true,
//   });

//   if (error) {
//     return res.status(400).json({
//       success: false,
//       errors: error.details[0].message,
//     });
//   }
//   req.validatedData = value;

//   next();
// };

// const imageValidatejournalsRequest = (req, res, next) => {
//   const { error } = schemma.journalImagevalidationSchemma.validate(req.files || {}, {
//     abortEarly: false,
//   });
//   if (error) {
//     return res.status(400).json({
//       success: false,
//       error: error.message,
//       message: "Image is requireddddd",
//     });
//   }
//   next();
// };

// const patchimageValidatejournalsRequest = (req, res, next) => {
//   const { error } = schemma.journalupdateImagevalidationSchemma.validate(
//     req.files || {},
//     { abortEarly: false }
//   );
//   if (error) {
//     return res.status(400).json({
//       success: false,
//       error: error.message,
//     });
//   }
//   next();
// };

// module.exports = {
//   createvalidatejournalsRequest,
//   patchvalidatejournalsRequest,
//   imageValidatejournalsRequest,
//   patchimageValidatejournalsRequest,
// };

const journalschemma = require("./schemma");


const validateRequest = (schema) => (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Request body is empty",
    });
  }
  const data= req.body

   if (data.users && typeof data.users === "string") {
    data.users = data.users.replace(/'/g, '"');
    data.users = JSON.parse(data.users);
  }

console.log("data:",req.body);

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


module.exports = {
  createRequest: validateRequest(journalschemma.createValidationSchema),
  updateRequest: validateRequest(journalschemma.updateValidationSchema),
  // validateUserUpdateRequest: validateRequest(userSchemma.UpdateValidationSchema),
};
