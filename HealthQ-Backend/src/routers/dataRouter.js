import { Router } from "express";
import { getAppointmentsData, getSpecialtiesData, getDoctorsData, getHospitalData } from "../controller/dataController.js";

const dataRouter = Router();

// GET /data/getAppointments
dataRouter.get("/getAppointments", async (req, res) => {
  try {
    const result = await getAppointmentsData();
    res.status(200).json({
      message: "Success",
      appointments: result
    });
  } catch (error) {
    console.error("GET APPOINTMENTS ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
});

// GET /data/getSpecialties
dataRouter.get("/getSpecialties", async (req, res) => {
  try {
    const result = await getSpecialtiesData();
    res.status(200).json({
      message: "Success",
      specialties: result
    });
  } catch (error) {
    console.error("GET SPECIALTIES ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
});

// GET /data/getDoctors
dataRouter.get("/getDoctors", async (req, res) => {
  try {
    const result = await getDoctorsData();
    res.status(200).json({
      message: "Success",
      doctors: result
    });
  } catch (error) {
    console.error("GET DOCTORS ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
});

// GET /data/getHospital
dataRouter.get("/getHospital", async (req, res) => {
  try {
    const result = await getHospitalData();
    res.status(200).json({
      message: "Success",
      hospitals: result
    });
  } catch (error) {
    console.error("GET HOSPITAL ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
});

export default dataRouter;
