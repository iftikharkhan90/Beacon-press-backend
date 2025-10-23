const User = require("../../models/user.model")
const {comaprePassword }= require("../user/service")
const {generateToken} = require("../../common/index")

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.validatedData;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ 
            success: false, 
            message: "Email does not exist"
         });
    }
    if(user.usertype !=="admin"){
      return res.status(403).json({
        message: "Access denied: Only Admin can log in",
      });
    }


    const isMatch = await comaprePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
        password: user.password,
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error: " + err.message,
    });
  }
};

module.exports = {adminLogin}