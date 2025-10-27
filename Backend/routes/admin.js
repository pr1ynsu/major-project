// routes/admin.js
const express = require('express');
const User = require('../models/User');
const { requireAdmin } = require('../middlewareauth');

const router = express.Router();

// GET /api/admin/users?page=1&limit=20
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = Math.min(100, parseInt(req.query.limit || '20'));
    const skip = (page - 1) * limit;
    const users = await User.find({}, '-password').skip(skip).limit(limit).lean();
    const total = await User.countDocuments();
    res.json({ total, page, limit, users });
  } catch (err) {
    console.error('Admin GET users error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single user
router.get('/users/:id', requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password').lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Admin GET user error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE user (whitelist fields)
router.put('/users/:id', requireAdmin, async (req, res) => {
  try {
    const allowed = ['name','mobile','address','vehicle','license','age','guardianName','guardianNumber','userType','email'];
    const updates = {};
    for (const k of allowed) {
      if (req.body[k] !== undefined) updates[k] = req.body[k];
    }

    // if admin wants to change password, handle separately (hashing)
    if (req.body.password) {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(req.body.password, salt);
    }

    updates.updatedAt = Date.now();
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Admin UPDATE user error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE user
router.delete('/users/:id', requireAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Admin DELETE user error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
