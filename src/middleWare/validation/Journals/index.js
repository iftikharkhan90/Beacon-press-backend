const {
  createjournalsvalidationSchemma,
  patchjournalsvalidationSchemma,
  journalImagevalidationSchemma,
  journalPatchImagevalidationSchemma,
} = require("./schemma");

const createvalidatejournalsRequest = (req, res, next) => {
  let data = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No data provided in the request body",
    });
  }

  if (data.users && typeof data.users === "string") {
    data.users = data.users.replace(/'/g, '"');
    data.users = JSON.parse(data.users);
  }
  const { error, value } = createjournalsvalidationSchemma.validate(data, {
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

const patchvalidatejournalsRequest = (req, res, next) => {
  let data = req.body;
  if (!data) {
    return res.status(400).json("No data in request");
  }

    if (data.users && typeof data.users === "string") {
    data.users = data.users.replace(/'/g, '"');
    data.users = JSON.parse(data.users);
  }

  const { error, value } = patchjournalsvalidationSchemma.validate(data, {
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

const imageValidatejournalsRequest = (req, res, next) => {
  const { error } = journalImagevalidationSchemma.validate(req.files || {}, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message: "Image is requireddddd",
    });
  }
  next();
};

const patchimageValidatejournalsRequest = (req, res, next) => {
  const { error } = journalPatchImagevalidationSchemma.validate(
    req.files || {},
    { abortEarly: false }
  );
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
  next();
};

module.exports = {
  createvalidatejournalsRequest,
  patchvalidatejournalsRequest,
  imageValidatejournalsRequest,
  patchimageValidatejournalsRequest,
};
