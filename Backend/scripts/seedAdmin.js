// scripts/seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'adminpassword123';

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin already exists:', email);
    process.exit(0);
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const admin = new User({
    name: 'Admin',
    mobile: '0000000000',
    email,
    userType: 'Government',
    password: hashed
  });

  await admin.save();
  console.log('Admin created:', email);
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
