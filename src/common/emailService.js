const { config } = require("dotenv");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.OWNER_EMAIL,
    pass: process.env.APP_PASS,
  },
});

/**
 * Common sendEmail function
 * @param {string} to - Receiver email
 * @param {string} subject - Email subject
 * @param {string} html - Email HTML content
 */
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.OWNER_EMAIL,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err) {
    throw new Error("Email sending failed: " + err);
  }
};

module.exports = { sendEmail };
