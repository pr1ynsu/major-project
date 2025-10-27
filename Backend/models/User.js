const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  address: String,
  vehicle: String,
  license: String,
  age: Number,
  guardianName: String,
  guardianNumber: String,
  userType: { type: String, default: 'User' },
  password: { type: String, required: true }, // hashed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
