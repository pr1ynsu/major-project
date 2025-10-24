// backend/server.js

// 1. IMPORT STATEMENTS using ES6 syntax
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import path from 'path';
// 👇 FIX: Use ES6 import with the .js extension to correctly get the router
import chalanRouter from './routes/chalan.route.js'; 

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


// --- 4. START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
    // console.log(`   Image Folder Path: ${path.resolve('public', 'violations')}`);
    console.log(`   API Endpoint: http://localhost:${PORT}/api/violation`);
});