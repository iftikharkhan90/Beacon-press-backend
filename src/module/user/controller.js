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

module.exports = {
  userCreate: async (req, res) => {
    try {
      const userData = req.validatedData;

      const retriveUser = await User.findOne({ email: userData.email });
      if (retriveUser) {
        return res.status(409).json({
          success: false,
          message: "User already exists!",
        });
      }
      userData.password = await hashPassword(userData.password);
      userData.usertype = "user";
      const user = await User.create(userData);

      // send verification email

      // const OTP = genEmailVerfyToken(user);
      // await sendEmail(user.email, "Verify your email", otpTemplate(OTP));

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server error ",
        error: error.message
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { _id } = req.user;
      const user = await User.findById(_id).populate("roleId");
      if (!user) {
        return res
          .status(400)
          .json({ success: false, messag: "user not found" });
      }
      return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Some thing went wrong while fetching user. Please try again shortly.",
        error: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
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

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Some thing went wrong while updating user. Please try again shortly.",
        error: err.message,
      });
    }
  },

  userLogin: async (req, res) => {
    try {
      const { email, password } = req.validatedData;

      const retriveUser = await User.findOne({ email }).select("+password");
      if (!retriveUser) {
        return res
          .status(404)
          .json({ success: false, message: "Email does not exist" });
      }

      const isMatch = await comaprePassword(password, retriveUser.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
          password: password,
        });
      }

      if (retriveUser.usertype !== "user") {
        return res.status(403).json({
          message: "Access denied: Only user can login",
        });
      }

      const token = generateToken(retriveUser);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        retriveUser,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error ",
        error: error.message,
      });
    }
  },

  forgotPassword: async (req, res) => {
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
      return res.status(500).json({
        success: false,
        message: "Error in forgotPassword: " + error.message,
      });
    }
  },

  resetPassword: async (req, res) => {
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
      return res.status(500).json({
        success: false,
        message: "Error in resetPassword: " + error.message,
      });
    }
  },

  userVerify: async (req, res) => {
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
      return res.status(500).json({
        success: false,
        message: "Error in userVerify: " + err.message,
      });
    }
  },
};
