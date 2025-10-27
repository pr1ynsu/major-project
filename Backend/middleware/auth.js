// middlewareauth.js
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) {
    // not authenticated — continue (some routes public)
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // { id: ... , iat, exp }
    // fetch full user (without password) and attach to req
    const user = await User.findById(decoded.id).select('-password').lean();
    if (!user) return res.status(401).json({ message: 'Invalid token - user not found' });
    req.user = user;
    return next();
  } catch (err) {
    console.error('JWT auth error', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// can be used to protect endpoints where user must be logged in
function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  next();
}

// admin check — define "admin" as userType === 'Government' OR role === 'admin' (if you add role later)
function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  if (req.user.userType !== 'Government' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden - admin only' });
  }
  next();
}

module.exports = { authMiddleware, requireAuth, requireAdmin };
