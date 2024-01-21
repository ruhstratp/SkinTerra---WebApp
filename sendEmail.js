const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail({ name, email, message }) {
  const msg = {
    to: 'skinterra.owner@gmail.com',
    from: 'skinterra.licenta@gmail.com',
    subject: `SkinTerra Contact Form Submission from ${name}`,
    text: message,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error("Send Email Error:", error.message); 
    return { success: false, error };
  }
}

module.exports = { sendEmail };

