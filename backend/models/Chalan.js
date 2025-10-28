<<<<<<< HEAD
// backend/models/Chalan.js

=======
>>>>>>> 0c6380dbaeb3f169e85c27e4418a8b0e76501442
const mongoose = require('mongoose');

const ChalanSchema = new mongoose.Schema({
    // Vehicle number from OCR (Crucial for frontend fetching and user lookup)
    vehicleNumber: {
        type: String,
        required: true,
        // Added index for fast lookups by the frontend's vehicle number query
        index: true 
    },
    // The path where the image is stored on your server (e.g., /violations/image.jpg)
    imageUrl: {
        type: String,
        required: true,
    },
    // Type of violation
    violationType: {
        type: String,
        required: true,
        default: "Helmet Violation"
    },
    // Timestamp of the incident
    dateTime: {
        type: Date,
        default: Date.now
    },
    // Optional: Camera identification
    cameraID: {
        type: String,
        required: false 
    }
});

<<<<<<< HEAD
// CRITICAL: Export the model using Node.js standard module.exports
module.exports = mongoose.model('Chalan', ChalanSchema);
=======
module.exports = mongoose.model('Chalan', ChalanSchema);
>>>>>>> 0c6380dbaeb3f169e85c27e4418a8b0e76501442
