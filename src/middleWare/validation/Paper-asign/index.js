const {paperAsignschema}= require("./schema")


const validatePaperAsign = (req, res, next) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ success: false, message: "No data in request body" });
  }

  const { error, value } = paperAsignschema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({ success: false, errors: error.details[0].message });
  }

  req.validatedData = value;
  next();
};
module.exports={validatePaperAsign}