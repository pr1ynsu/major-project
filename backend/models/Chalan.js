const mongoose = require('mongoose');

const ChalanSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true },
  imageUrl: { type: String, required: true },
  violationType: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chalan', ChalanSchema);
