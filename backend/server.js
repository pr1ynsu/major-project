require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const { authMiddleware } = require('./middlewareauth');

const app = express();
app.use(express.json());
app.use(cookieParser());

// allow requests from your react dev server
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// public auth routes (register/login)
app.use('/api', authRoutes); // endpoints: /api/register, /api/login

// attach auth middleware to populate req.user if token present
app.use(authMiddleware);

// admin routes (protected)
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Mongo connected');
    app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connection error:', err);
  });
