const User = require('../models/User');
const jwt = require('jsonwebtoken');
const transporter = require('../nodemailerTransporter');
const crypto = require('crypto');


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ firstName, lastName, email, password });

  const token = generateToken(user._id);
  res.status(201).json({ token });
};


const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = generateToken(user._id);
  res.status(200).json({ token, isAdmin: user.isAdmin, userId: user._id });
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'No user with that email' });
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;
    const resetURL = `http://localhost:3000/resetPassword/${resetToken}`;


  const message = `Forgot your password? Click on the following link to reset your password: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await transporter.sendMail({
      from: '"SkinTerra." <skinterra.licenta@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: 'Your password reset token (valid for 10 min)', // Subject line
      text: message, // plain text body
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      status: 'error',
      message: 'There was an error sending the email. Try again later!',
    });
  }
};

const resetPassword = async (req, res) => {
  // Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // If token has not expired and there is user, set the new password
  if (!user) {
    return res.status(400).json({ message: 'Token is invalid or has expired' });
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // Update passwordChangedAt property for the user
  // Log the user in, send JWT
  const token = generateToken(user._id);
  res.status(200).json({ token });
};

module.exports = { register, login, forgotPassword, resetPassword };