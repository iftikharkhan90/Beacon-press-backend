const User = require("../../models/user.model");
require("dotenv").config();
const {
  hashPassword,
  comaprePassword,
  genEmailVerfyToken,
  emailtokenVerfy,
  sendResetPasswordLink,
  sendEmail,
} = require("./service");
const { generateToken } = require("../../common/index");
const { otpTemplate } = require("../../utils/emailTemplates");

// =============================
// Create User (Signup)
// =============================
const userCreate = async (req, res) => {
  try {
    const {
      roleId,
      title,
      country,
      firstName,
      lastName,
      specialization,
      affiliation,
      email,
      phone,
      password,
      isReviewer,
      isverfied,
    } = req.validatedData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists!",
      });
    }
    const cryptedPassword = await hashPassword(password);
    const user = await User.create({
      roleId,
      title,
      country,
      firstName,
      lastName,
      specialization,
      affiliation,
      email,
      phone,
      password: cryptedPassword,
      usertype:"user",
      isReviewer,
      isverfied,
    });

    // send verification email

    // const OTP = genEmailVerfyToken(user);
    // await sendEmail(user.email, "Verify your email", otpTemplate(OTP));

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error: " + err.message,
    });
  }
};

// =============================
// Get User by ID
// =============================
const getUserById = async (req, res) => {
  try {
    const {_id} = req.user;
    console.log(_id);
    

    const user = await User.findById(_id).populate("roleId");
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

// =============================
// Update User
// =============================
const updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.validatedData;
   

    if (password) {
      rest.password = await hashPassword(password);
    }
    const user_id = req.user;
    const user = await User.findByIdAndUpdate(user_id._id, rest, {
      new: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
     console.log(user)

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// =============================
// User Login
// =============================
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.validatedData;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email does not exist" });
    }

    const isMatch = await comaprePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
        password: user.password,
      });
    }

      if(user.usertype !=="user"){
      return res.status(403).json({
        message: "User not found",
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

// =============================
// Forgot Password
// =============================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }

    const response = await sendResetPasswordLink(email);

    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in forgotPassword: " + error.message,
    });
  }
};

// =============================
// Reset Password
// =============================
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // decode token and get user id
    const result = emailtokenVerfy(token);
    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        err: result.error,
      });
    }
    const userId = result.data.id;
    console.log("userId", userId);
    const hashedPassword = await hashPassword(password);

    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in resetPassword: " + error.message,
    });
  }
};

// =============================
// Verify User (Email Verification)
// =============================
const userVerify = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token required" });
    }

    const result = emailtokenVerfy(token);
    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        err: result.error,
      });
    }

    const userId = result.data.user;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { isverfied: true }, $unset: { createdAt: "" } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User verified successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in userVerify: " + err.message,
    });
  }
};

module.exports = {
  userCreate,
  userLogin,
  userVerify,
  getUserById,
  updateUser,
  forgotPassword,
  resetPassword,
};
