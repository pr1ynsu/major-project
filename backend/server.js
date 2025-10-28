<<<<<<< HEAD
=======
<<<<<<< HEAD
// backend/server.js

// 1. IMPORT STATEMENTS using ES6 syntax
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import path from 'path';
// 👇 FIX: Use ES6 import with the .js extension to correctly get the router
import chalanRouter from './routes/chalan.route.js'; 
=======

>>>>>>> 0eb52290921bd1335f6b1aa832dd22dec6ef81ac
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

<<<<<<< HEAD
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
=======
>>>>>>> 0c6380dbaeb3f169e85c27e4418a8b0e76501442

const app = express();
const PORT = process.env.PORT || 5000;


// --- 1. MIDDLEWARE & CONFIGURATION ---
// Set up CORS (Allow frontend to communicate)
app.use(cors());

// Body Parser for POST requests 
app.use(express.json());

// Set up Static Folder for Violation Images (CRUCIAL for image URL access)
// __dirname is not available in ES6 modules, so we use path.resolve()
// This serves files from 'backend/public' at the root URL path (e.g., /violations/image.jpg)
app.use(express.static(path.resolve('public')));


// --- 2. DATABASE CONNECTION (MongoDB) ---
const uri = "mongodb://localhost:27017/helmet_violations"; // <<< REPLACE with your actual MongoDB URI
mongoose.connect(uri)
    .then(() => console.log("✅ MongoDB Connection Established Successfully!"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));


// --- 3. IMPORT & USE ROUTES ---

// Define the base path for your violation API
// chalanRouter is now correctly imported as a function
app.use('/api/violation', chalanRouter); 


<<<<<<< HEAD
// --- 4. START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
    // console.log(`   Image Folder Path: ${path.resolve('public', 'violations')}`);
    console.log(`   API Endpoint: http://localhost:${PORT}/api/violation`);
});
=======
// Login API
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  let users = await readUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

  // Send user data (excluding password)
  const { password: _, ...userData } = user;
  res.json({ success: true, message: 'Login successful', user: userData });
});

// Forum
const forumFile = './forumMessages.json';

app.get('/api/forum/messages', (req, res) => {
  fs.readFile(forumFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading forum' });
    const messages = JSON.parse(data || '[]');
    res.json(messages);
  });
});

app.post('/api/forum/messages', async (req, res) => {
  const { email, message } = req.body;

  let users = await readUsers();
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: 'User not registered' });
  }

  fs.readFile(forumFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading forum' });
    let messages = JSON.parse(data || '[]');

    const newMessage = {
      id: Date.now(),
      name: user.name,
      email,
      message,
      time: new Date().toLocaleString(),
    };

    messages.push(newMessage);

    fs.writeFile(forumFile, JSON.stringify(messages, null, 2), (err) => {
      if (err) return res.status(500).json({ message: 'Error saving forum' });
      res.json({ success: true, message: 'Message posted', newMessage });
    });
  });
});

// ✅ ADD THIS LINE AT THE BOTTOM TO IMPORT AND USE THE CHALAN ROUTE
const chalanRoutes = require('./routes/chalan'); 

app.use('/api/violation', chalanRoute); // All chalan-related APIs will start with this path

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
>>>>>>> 0c6380dbaeb3f169e85c27e4418a8b0e76501442
>>>>>>> 0eb52290921bd1335f6b1aa832dd22dec6ef81ac
