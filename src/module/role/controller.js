const Role = require("../../models/role.model");

const  getRole = async (req, res) => {
  try {
    const role = await Role.find();
    if (role) {
      return res.status(200).json({ success: true, role: role });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};

module.exports = { getRole }
