const schema = require("./schemma");

module.exports = {
  createJournalUser: (req, res, next) => {
    const data = req.body;
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "No data in request body" });
    }

    const { error, value } = schema.createSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res
        .status(400)
        .json({ success: false, errors: error.details[0].message });
    }

    req.validatedData = value;
    next();
  },

  updateJournalUser: (req, res, next) => {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data to update" });
    }

    const { error, value } = schema.updateSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res
        .status(400)
        .json({ success: false, errors: error.details[0].message });
    }

    req.validatedData = value;
    next();
  },

  getJournalUser: (req, res, next) => {
    const data = req.query;
    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data in request" });
    }

    const { error, value } = schema.getSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res
        .status(400)
        .json({ success: false, errors: error.details[0].message });
    }

    req.validatedData = value;
    next();
  },
};
