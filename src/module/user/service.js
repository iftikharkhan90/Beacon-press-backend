const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

//For hashed password
const hashPassword = async (plainpassword) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainpassword, salt);
};

//For compare hashed password
const comaprePassword = async (plainpassword, hashedpassword) => {
  return await bcrypt.compare(plainpassword, hashedpassword);
};

//For genrate jwt token
const generateToken = (user) => {
  const payload = {
    id: user._id,
  };
  const secretKey = process.env.JWT_SECRET || "mysupersecretkeyBeconsPress";
  const options = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

//For genrate email verfication
const genEmailVerfyToken = (user) => {
  const payload = {
    user: user._id,
  };
  const secretKey =
    process.env.EMAIL_AUTHENTICATION || "mysupersecretkeyBeconsPress";

  const options = {
    expiresIn: "1h",
  };
  const otp = jwt.sign(payload, secretKey, options);
  return otp;
};

//For email send
const sendEmail = async (userEmail, token) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.OWNER_EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    let mailOptions = {
      from: process.env.OWNER_EMAIL,
      to: userEmail,
      subject: "Verify your email",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #4CAF50;">🔐 OTP Verification</h2>
          <p>Here is your OTP code:</p>
          <p style="font-size: 24px; font-weight: bold; color: #ff5733;">${token}</p>
          <p>This code will expire in <b>5 minutes</b>.</p>
        </div>
      `,
    };
    // use sendMail, not sendEmail
    const info = await transporter.sendMail(mailOptions);
    return info; // info contains messageId, accepted, rejected, etc.
  } catch (err) {
    throw new Error(": " + err.message + ".Your Email is not correct");
  }
};

const emailtokenVerfy = (token) => {
  try {
    const secretkey = process.env.EMAIL_AUTHENTICATION;
    const decode = jwt.verify(token, secretkey);
    return {
      success: true,
      data: decode,
    };
  } catch (err) {
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
  generateToken,
  sendEmail,
  genEmailVerfyToken,
  emailtokenVerfy,
};
