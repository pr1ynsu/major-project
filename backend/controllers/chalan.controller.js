// backend/controllers/chalan.controller.js

// 1. Import the Chalan Model. Note the .js extension is crucial for ES6 modules.
import Chalan from "../models/Chalan.js"; 
import mongoose from "mongoose";

// POST /api/violation/
export const createChalan = async (req, res) => {
    try {
        // Deconstructs the JSON payload sent by the Python worker
        const { vehicleNumber, imageUrl, violationType, dateTime } = req.body; 

        // 🛑 Validation Check
        if (!vehicleNumber || !imageUrl) {
            return res.status(400).json({ error: "Missing required fields: vehicleNumber or imageUrl" });
        }

        // Create a new Mongoose document instance
        const chalan = new Chalan({ 
            vehicleNumber, 
            imageUrl, 
            violationType, 
            dateTime 
        });
        
        // Save the document to MongoDB
        await chalan.save();

        // Send a 201 Created status back to the Python worker
        res.status(201).json({ message: "Violation logged successfully", chalanId: chalan._id });
    } catch (error) {
        console.error("❌ Failed to log violation:", error);
        res.status(500).json({ error: "Server failed to process and save chalan." });
    }
};


// GET /api/violation/:vehicleNumber
export const getChalansByVehicle = async (req, res) => {
    try {
        // Get the vehicle number from the URL parameter
        const { vehicleNumber } = req.params; 
        
        // Find all violations for that vehicle, sorted by newest first
        const chalans = await Chalan.find({ 
            vehicleNumber: vehicleNumber 
        }).sort({ 
            dateTime: -1 
        });

        // Send the array of chalans back to the frontend
        res.status(200).json(chalans);

    } catch (error) {
        console.error("❌ Failed to fetch chalans:", error);
        res.status(500).json({ error: "Server failed to retrieve violation data." });
    }
};
