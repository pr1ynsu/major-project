
const express = require('express');
const router = express.Router();
const Chalan = require('../models/Chalan');

// POST /chalan - Create a new chalan
router.post('/chalan', async (req, res) => {
  try {
    const { vehicleNumber, imageUrl, violationType, dateTime } = req.body;
    const chalan = new Chalan({ vehicleNumber, imageUrl, violationType, dateTime });
    const savedChalan = await chalan.save();
    res.status(201).json(savedChalan);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create chalan', details: err.message });
  }
});

router.get('/chalan/:vehiclenumber', async (req, res) => {
  try {
    const { vehiclenumber } = req.params;
    const chalans = await Chalan.find({ vehicleNumber: vehiclenumber });
    if (chalans.length === 0) {
      return res.status(404).json({ message: 'No chalans found for this vehicle number' });
    }
    res.json(chalans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chalans', details: err.message });
  }
});

module.exports = router;
