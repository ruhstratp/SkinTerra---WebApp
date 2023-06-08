require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require("body-parser");
const { sendEmail: sendContactEmail } = require("./sendEmail");

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const contactRoutes = require('./routes/contactRoutes');
const eventRoutes = require('./routes/eventRoutes');

const connectionString = process.env.MONGODB_URI;
const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Add the bodyParser middleware for parsing JSON data in POST requests
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect(connectionString, {
    dbName: 'skinterra',
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connection established'))
.catch((error) => console.log('MongoDB connection error:', error));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/events', eventRoutes);

// route for handling contact form submissions
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const { success, error } = await sendContactEmail({ name, email, message });

  if (success) {
    res.status(200).json({ message: "Email sent successfully" });
  } else {
    console.error(error);
    res.status(500).json({ message: "An error occurred while sending the email" });
  }
});


// Forgot password route
app.post('/api/users/forgotPassword', async (req, res) => {
    const { email } = req.body;

    // Find user with this email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist' });
    }

    // Generate password reset token
    const resetToken = user.createPasswordResetToken();
    await user.save();

    // Send password reset email
    try {
      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/api/users/reset-password/${resetToken}`;

      await sendPasswordResetEmail(user.email, resetURL);
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      res.status(500).json({ message: 'There was an error sending the email' });
    }
});

// Reset password route
app.post('/api/users/resetPassword/:token', async (req, res) => {
  const { password } = req.body;

  // Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // If token has not expired, and there is user, set the new password
  if (!user) {
    return res.status(400).json({ message: 'Token is invalid or has expired' });
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({ message: 'Password has been reset containing code to continue the conversation.' });
});


// Start server
app.listen(port,'localhost', () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Server is running on port ${port}`);
});