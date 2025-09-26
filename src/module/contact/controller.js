const Contact = require("../../models/contact.model");
const nodemailer = require("nodemailer");

exports.createContact = async (req, res) => {
  try {
    const { fullName, emailAddress, message } = req.body;
    console.log("req.body", req.body)

    // Save to DB
    const contact = await Contact.create({ fullName, emailAddress, message });

    // Nodemailer setup (example with Gmail, better use SendGrid/SMTP in prod)
    let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


    // Mail options
    let mailOptions = {
      from: `"${fullName}" <${emailAddress}>`,
      to: "muhammadasifrana445@gmail.com", // website owner's email
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact Form Submission</h3>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${emailAddress}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      message: "Contact created successfully and email sent",
      data: contact,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    return res.status(500).json({ message: "Failed to create contact" });
  }
};
