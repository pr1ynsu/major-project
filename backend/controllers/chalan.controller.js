import Chalan from "../models/Chalan.js";

// POST /api/violation
export const createChalan = async (req, res) => {
  try {
    const { vehicleNumber, imageUrl, violationType, dateTime } = req.body;
    const chalan = new Chalan({ vehicleNumber, imageUrl, violationType, dateTime });
    await chalan.save();
    res.status(201).json(chalan);
  } catch (error) {
    res.status(500).json({ error: "Failed to create chalan" });
  }
};

// GET /api/violation/:vehicleNumber
export const getChalansByVehicle = async (req, res) => {
  try {
    const { vehicleNumber } = req.params;
    const chalans = await Chalan.find({ vehicleNumber });
    res.status(200).json(chalans);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chalans" });
  }
};
