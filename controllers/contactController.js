const { sendEmail: sendGridEmail } = require("../sendEmail");

const sendEmail = async (req, res) => {
  // Get data from the request body (name, email, message)
  const { name, email, message } = req.body;

  try {
    // Send the email using the sendGridEmail function
    const result = await sendGridEmail({ name, email, message });

    if (result.success) {
      // Return a successful response
      res.status(200).json({ message: "Email sent successfully" });
    } else {
      console.error(result.error);
      res.status(500).json({ message: "An error occurred while sending the email" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while sending the email" });
  }
};


module.exports = { sendEmail };
