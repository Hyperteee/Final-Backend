import { Router } from "express";
import {
  getDoctorsData,
  getHospitalsData,
  getSpecialtiesData,
  getAppointmentsData,
  createHospital,
  updateHospital,
  deleteHospital,
  createDoctor,
  updateDoctor,
  deleteDoctor,
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

// --- Admin Routes for Hospitals ---

/**
 * @swagger
 * /data/hospitals:
 *   post:
 *     summary: Create a new hospital (Admin)
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hospital_id
 *               - name
 *               - state
 *               - district
 *             properties:
 *               hospital_id: { type: string }
 *               name: { type: string }
 *               type: { type: string }
 *               state: { type: string }
 *               district: { type: string }
 *     responses:
 *       201:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
dataRouter.post("/hospitals", async (req, res) => {
  try {
    const result = await createHospital(req.body);
    return res.status(201).json({ message: "Hospital created successfully", data: result });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @swagger
 * /data/hospitals/{id}:
 *   put:
 *     summary: Update an existing hospital (Admin)
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hospital_id: { type: string }
 *               name: { type: string }
 *               type: { type: string }
 *               state: { type: string }
 *               district: { type: string }
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
dataRouter.put("/hospitals/:id", async (req, res) => {
  try {
    const result = await updateHospital(req.params.id, req.body);
    return res.status(200).json({ message: "Hospital updated successfully", data: result });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @swagger
 * /data/hospitals/{id}:
 *   delete:
 *     summary: Delete a hospital (Admin)
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
dataRouter.delete("/hospitals/:id", async (req, res) => {
  try {
    const result = await deleteHospital(req.params.id);
    return res.status(200).json({ message: "Hospital deleted successfully", data: result });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// --- Admin Routes for Doctors ---

/**
 * @swagger
 * /data/doctors:
 *   post:
 *     summary: Create a new doctor (Admin)
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - specialty_id
 *               - first_name
 *               - last_name
 *             properties:
 *               hospital_id: { type: string }
 *               specialty_id: { type: integer }
 *               specialization: { type: string }
 *               prefix: { type: string }
 *               first_name: { type: string }
 *               last_name: { type: string }
 *     responses:
 *       201:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
dataRouter.post("/doctors", async (req, res) => {
  try {
    const result = await createDoctor(req.body);
    return res.status(201).json({ message: "Doctor created successfully", data: result });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @swagger
 * /data/doctors/{id}:
 *   put:
 *     summary: Update an existing doctor (Admin)
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hospital_id: { type: string }
 *               specialty_id: { type: integer }
 *               specialization: { type: string }
 *               prefix: { type: string }
 *               first_name: { type: string }
 *               last_name: { type: string }
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
dataRouter.put("/doctors/:id", async (req, res) => {
  try {
    const result = await updateDoctor(req.params.id, req.body);
    return res.status(200).json({ message: "Doctor updated successfully", data: result });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @swagger
 * /data/doctors/{id}:
 *   delete:
 *     summary: Delete a doctor (Admin)
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
dataRouter.delete("/doctors/:id", async (req, res) => {
  try {
    const result = await deleteDoctor(req.params.id);
    return res.status(200).json({ message: "Doctor deleted successfully", data: result });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

export default dataRouter;
