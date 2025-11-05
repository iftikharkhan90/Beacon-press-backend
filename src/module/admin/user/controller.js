const User = require("../../../models/user.model")


// =============================
// Get User
// =============================

const getUser= async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(400).json({ success: false, messag: "user not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {getUser}