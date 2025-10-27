const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register endpoint (matches your frontend POST /api/register)
router.post('/register', async (req, res) => {
  try {
    const {
      name, mobile, email, address, vehicle, license,
      age, guardianName, guardianNumber, userType, password
    } = req.body;

    // basic validation
    if (!name || !mobile || !email || !password) {
      return res.status(400).json({ message: 'Name, mobile, email and password are required.' });
    }

    // check if email already used
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered.' });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({
      name, mobile, email, address, vehicle, license,
      age, guardianName, guardianNumber, userType, password: hashed
    });

    await user.save();

    // create jwt token (small payload)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    // respond — for now we send token back (for dev). In production prefer HttpOnly cookie.
    res.status(201).json({ message: 'User registered successfully', token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;
    if (!emailOrMobile || !password) return res.status(400).json({ message: 'Missing fields' });

    // allow login by email or mobile
    const user = await User.findOne({ $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }] });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.json({ message: 'Login successful', token, user: { id: user._id, name: user.name, email: user.email }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
