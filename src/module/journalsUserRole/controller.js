const JournalsUserRole = require("../../models/journals.user.role.model");

const createJUR = async (req, res) => {
  try {
    const { roleId, userId, journalsId } = req.validatedData;

    const record = await JournalsUserRole.create({ roleId, userId, journalsId });

    res.status(201).json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {createJUR}