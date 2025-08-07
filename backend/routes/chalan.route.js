import express from "express";
import { createChalan, getChalansByVehicle } from "../controllers/chalan.controller.js";

const router = express.Router();

router.post("/", createChalan);
router.get("/:vehicleNumber", getChalansByVehicle);

export default router;
