// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const crypto = require('crypto'); // for token generation
const nodemailer = require('nodemailer'); // for sending email
const User = require('../models/User');

// Configure nodemailer transporter (using Gmail as an example)
// Ensure EMAIL_USER and EMAIL_PASS are set in your environment or replace with your credentials.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Helper for password validation: at least 8 characters, one number, one special character
function validatePassword(password) {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
  return password.length >= 8 && re.test(password);
}

// Helper for name validation: no spaces, first character uppercase, only letters and dashes allowed
function validateName(name) {
  return /^[A-Z][A-Za-z-]*$/.test(name);
}

// Signup endpoint (expects firstName and lastName)
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    if (!validateName(firstName)) {
      return res.status(400).json({ error: 'First name is invalid. It must start with an uppercase letter, contain no spaces, and only letters and dashes are allowed.' });
    }
    if (!validateName(lastName)) {
      return res.status(400).json({ error: 'Last name is invalid. It must start with an uppercase letter, contain no spaces, and only letters and dashes are allowed.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Confirmed password is mispelled. Passwords do not match.' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one number and one special character.' });
    }
    if (!email.endsWith('.edu')) {
      return res.status(400).json({ error: 'Email must end in .edu' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const user = new User({ firstName, lastName, email, password });
    
    // Generate a confirmation token
    const confirmationToken = crypto.randomBytes(20).toString('hex');
    user.confirmationToken = confirmationToken;
    
    await user.save();

    // Construct confirmation URL (adjust domain as needed)
    const confirmUrl = `http://localhost:5000/api/auth/confirm?token=${confirmationToken}`;

    // Send confirmation email with updated text
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Please confirm your AcademiNet account',
      text: `Thank you for signing up for AcademiNet. Please confirm your account by clicking the following link: ${confirmUrl}. Once confirmed, you can log in and access all site features.`
    });

    res.status(201).json({ message: 'User created successfully. A confirmation email has been sent to your email address.', accountId: user.accountId });
  } catch (err) {
    res.status(500).json({ error: `An error occurred: ${err.message}` });
  }
});

// Login endpoint (using email and password)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    // Prevent login if account isn't confirmed
    if (!user.isConfirmed) {
      return res.status(400).json({ error: 'Please confirm your email before logging in.' });
    }
    res.json({ message: 'Login successful', accountId: user.accountId });
  } catch (err) {
    res.status(500).json({ error: `An error occurred: ${err.message}` });
  }
});

// Endpoint to handle email confirmation
router.get('/confirm', async (req, res) => {
  const { token } = req.query;
  try {
    const user = await User.findOne({ confirmationToken: token });
    if (!user) {
      return res.status(400).json({ error: 'Invalid confirmation token.' });
    }
    user.isConfirmed = true;
    user.confirmationToken = undefined; // Clear the token
    await user.save();
    res.json({ message: 'Account confirmed successfully. You can now log in.' });
  } catch (err) {
    res.status(500).json({ error: `An error occurred: ${err.message}` });
  }
});

// New endpoint to resend confirmation email
router.post('/resend-confirmation', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email not found.' });
    }
    if (user.isConfirmed) {
      return res.status(400).json({ error: 'Account is already confirmed.' });
    }
    const confirmationToken = crypto.randomBytes(20).toString('hex');
    user.confirmationToken = confirmationToken;
    await user.save();
    const confirmUrl = `http://localhost:5000/api/auth/confirm?token=${confirmationToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Please confirm your AcademiNet account',
      text: `Thank you for signing up for AcademiNet. Please confirm your account by clicking the following link: ${confirmUrl}. Once confirmed, you can log in and access all site features.`
    });
    res.json({ message: 'Confirmation email resent successfully.' });
  } catch (err) {
    res.status(500).json({ error: `An error occurred: ${err.message}` });
  }
});

module.exports = router;
