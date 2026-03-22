import { Router } from "express";
import {
  getDoctorsData,
  getHospitalsData,
  getSpecialtiesData,
  getAppointmentsData,
} from "../controller/dataController.js";

const dataRouter = Router();

// GET /data/getDoctors
dataRouter.get("/getDoctors", async (req, res) => {
  try {
    const result = await getDoctorsData();
    return res.status(200).json({ message: "Success", doctors: result });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// GET /data/getHospital
dataRouter.get("/getHospital", async (req, res) => {
  try {
    const result = await getHospitalsData();
    return res.status(200).json({ message: "Success", hospitals: result });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// GET /data/getSpecialties
dataRouter.get("/getSpecialties", async (req, res) => {
  try {
    const result = await getSpecialtiesData();
    return res.status(200).json({ message: "Success", specialties: result });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// GET /data/getAppointments
dataRouter.get("/getAppointments", async (req, res) => {
  try {
    const result = await getAppointmentsData();
    return res.status(200).json({ message: "Success", appointments: result });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

export default dataRouter;
