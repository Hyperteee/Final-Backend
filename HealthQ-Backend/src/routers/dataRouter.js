import { Router } from "express";
import {
  getDoctorsData,
  getHospitalsData,
  getSpecialtiesData,
  getAppointmentsData,
} from "../controller/dataController.js";

const dataRouter = Router();

// GET /data/getDoctors
/**
 * @swagger
 * /data/getDoctors:
 *   get:
 *     summary: Get list of doctors
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 doctors: 
 *                   type: array
 *                   items: 
 *                     type: object
 *       500:
 *         description: Internal Server Error
 */
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
/**
 * @swagger
 * /data/getHospital:
 *   get:
 *     summary: Get list of hospitals
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 hospitals: 
 *                   type: array
 *                   items: 
 *                     type: object
 *       500:
 *         description: Internal Server Error
 */
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
/**
 * @swagger
 * /data/getSpecialties:
 *   get:
 *     summary: Get list of specialties
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 specialties: 
 *                   type: array
 *                   items: 
 *                     type: object
 *       500:
 *         description: Internal Server Error
 */
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
/**
 * @swagger
 * /data/getAppointments:
 *   get:
 *     summary: Get list of appointments
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 appointments: 
 *                   type: array
 *                   items: 
 *                     type: object
 *       500:
 *         description: Internal Server Error
 */
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
