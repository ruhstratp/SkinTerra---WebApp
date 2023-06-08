const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME, // your Gmail username
    pass: process.env.EMAIL_PASSWORD, // your Gmail password
  },
});

async function sendMail(mailOptions) {
  let info;
  try {
    info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;  // this error needs to be caught and handled where sendMail is used
  }
  return info;
}

module.exports = { sendMail };
