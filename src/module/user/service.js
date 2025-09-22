const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
const User = require("../../models/user.model");
const { resetPasswordTemplate } = require("../../utils/emailTemplates");
const { sendEmail } = require("../../common/emailService");
const EMAIL_SECRET =
  process.env.EMAIL_AUTHENTICATION || "mysupersecretkeyBeconsPress";

//For hashed password
const hashPassword = async (plainpassword) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainpassword, salt);
};

//For compare hashed password
const comaprePassword = async (plainpassword, hashedpassword) => {
  return await bcrypt.compare(plainpassword, hashedpassword);
};

const sendResetPasswordLink = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const resetToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.RESET_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

    await sendEmail(
      user.email,
      "Reset your password",
      resetPasswordTemplate(resetLink)
    );

    return {
      success: true,
      message: "Reset Password link generated",
      resetLink,
    };
  } catch (error) {
    console.error("Reset error:", error.message);
    return { success: false, message: "Reset failed, please try again later" };
  }
};

const resetPasswordService = async (token, password) => {
  try {
    const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    return { success: true, message: "Password reset successfully" };
  } catch (error) {
    console.error("Reset password error:", error.message);
    return {
      success: false,
      message: "Password reset failed, please try again later",
    };
  }
};

//For genrate email verfication
const genEmailVerfyToken = (user) => {
  const payload = {
    user: user._id,
  };

  const options = {
    expiresIn: "1h",
  };
  const otp = jwt.sign(payload, EMAIL_SECRET, options);
  return otp;
};

//For email verfytoken
const emailtokenVerfy = (token) => {
  try {
    const decode = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    console.log("decode",decode)
    return {
      success: true,
      data: decode,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      data: null,
      error: err.message,
    };
  }
};

module.exports = {
  hashPassword,
  comaprePassword,
  sendEmail,
  genEmailVerfyToken,
  emailtokenVerfy,
  sendResetPasswordLink,
  resetPasswordService,
};
