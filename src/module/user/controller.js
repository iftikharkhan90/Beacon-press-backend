const User = require("../../models/user.model");
require('dotenv').config();
const {
  hashPassword,
  comaprePassword,
  generateToken,
  sendEmail,
  genEmailVerfyToken,
  emailtokenVerfy,
} = require("./service");

const userCreat = async (req, res) => {
  try {
    const {
      title,
      country,
      firstName,
      lastName,
      specialization,
      affiliation,
      email,
      phone,
      password,
      role,
      isReviewer,
      isverfied,
    } = req.body;

    // check if user exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exist!",
      });
    }
    //Sure password should be gratorn than 8 charater
    if (!password || password.length < 8) {
      //Usama is ki midelware banini hy!
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }
    //make password hashed
    const cryptedpassword = await hashPassword(password);
    // save user with hashed password
    const user = await User.create({
      title,
      country,
      firstName,
      lastName,
      specialization,
      affiliation,
      email,
      phone,
      password: cryptedpassword,
      role,
      isReviewer,
      isverfied,
    });

    const OTP = genEmailVerfyToken(user);
    const eamil_info = await sendEmail(email, OTP);
    return res.status(201).json({
      success: true,
      message: "User created",
      user: user,
      email_info: JSON.stringify(eamil_info),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error" + err.message,
    });
  }
};

//For user login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid user eamil" });
    }

    const isMatch = await comaprePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid user password" });
    }
    //if user exist than login and genrate password
    const token = generateToken(user);
    return res
      .status(200)
      .json({ success: true, message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error: " + err.message,
    });
  }
};

//For resend
// const reSendEmail = async(req,res)=>{
//   try{
//     const {isSend} = req.params;
//     if(isSend === true){
//       const otp = genrateOTP()
//       const email_info
//     }

//   }catch(err){
//     err
//   }

const userVerify = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token required" });
    }

    const result = emailtokenVerfy(token);

    if (!result.success) {
      return res.status(401).json({ success: false, message: result.error });
    }

    // Extract user ID from decoded token
    const userId = result.data.user;

    //Find the user
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: { isverfied: true },
        $unset: { createdAt: "" },
      },
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
      message: "Server error: " + err.message,
    });
  }
};

module.exports = { userCreat, userLogin, userVerify };
