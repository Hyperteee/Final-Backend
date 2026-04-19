import { Router } from "express";
import {
  getDoctorsData,
  getHospitalsData,
  getSpecialtiesData,
  getAppointmentsData,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  addSpecialty,
  updateSpecialty,
  deleteSpecialty,
  updateHospital,
  updateAppointmentStatus,
  getUserEmailByAppointmentId
} from "../controller/dataController.js";
import { sendEmail, getAppointmentConfirmedTemplate } from "../utils/mailHelper.js";

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

/**
 * @swagger
 * /data/doctors:
 *   post:
 *     summary: Add a new doctor
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - specialty_id
 *             properties:
 *               first_name: { type: string }
 *               last_name: { type: string }
 *               specialty_id: { type: integer }
 *               phone: { type: string }
 *               email: { type: string }
 *     responses:
 *       201:
 *         description: Doctor added successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal Server Error
 */
// POST /data/doctors (Add Doctor)
dataRouter.post("/doctors", async (req, res) => {
  try {
    const newDoctor = req.body;
    if (!newDoctor.first_name || !newDoctor.last_name || !newDoctor.specialty_id) {
       return res.status(400).json({ message: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน (ชื่อ, นามสกุล, ความเชี่ยวชาญ)" });
    }
    const result = await addDoctor(newDoctor);
    return res.status(201).json({ message: "เพิ่มแพทย์สำเร็จ", id: result.insertId });
  } catch (error) {
    console.error("POST DOCTOR ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @swagger
 * /data/doctors/{id}:
 *   put:
 *     summary: Update doctor information
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The doctor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name: { type: string }
 *               last_name: { type: string }
 *               specialty_id: { type: integer }
 *               phone: { type: string }
 *               email: { type: string }
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *       500:
 *         description: Internal Server Error
 */
// PUT /data/doctors/:id (Edit Doctor)
dataRouter.put("/doctors/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    await updateDoctor(id, updateData);
    return res.status(200).json({ message: "อัปเดตข้อมูลแพทย์สำเร็จ" });
  } catch (error) {
    console.error("PUT DOCTOR ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @swagger
 * /data/doctors/{id}:
 *   delete:
 *     summary: Delete a doctor
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The doctor ID
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *       500:
 *         description: Internal Server Error
 */
// DELETE /data/doctors/:id (Delete Doctor)
dataRouter.delete("/doctors/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteDoctor(id);
    return res.status(200).json({ message: "ลบแพทย์สำเร็จ" });
  } catch (error) {
    console.error("DELETE DOCTOR ERROR:", error);
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

// POST /data/specialties (Add Specialty/Department)
dataRouter.post("/specialties", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "กรุณาระบุชื่อแผนก" });
    const result = await addSpecialty({ name });
    return res.status(201).json({ message: "เพิ่มแผนกสำเร็จ", id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// PUT /data/specialties/:id (Update Specialty)
dataRouter.put("/specialties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await updateSpecialty(id, { name });
    return res.status(200).json({ message: "อัปเดตแผนกสำเร็จ" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// DELETE /data/specialties/:id (Delete Specialty)
dataRouter.delete("/specialties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSpecialty(id);
    return res.status(200).json({ message: "ลบแผนกสำเร็จ" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// PUT /data/hospitals/:id (Update Hospital Info)
dataRouter.put("/hospitals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    await updateHospital(id, updateData);
    return res.status(200).json({ message: "อัปเดตข้อมูลโรงพยาบาลสำเร็จ" });
  } catch (error) {
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

/**
 * [API สำหรับอัปเดตสถานะนัดหมายและส่งอีเมลแจ้งเตือน]
 */
dataRouter.put("/appointments/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, confirmedDate, confirmedTime, note } = req.body;

    console.log(`[Data Router] กำลังอัปเดตนัดหมาย ID: ${id} สู่สถานะ: ${status}`);

    // 1. อัปเดตสถานะในฐานข้อมูล
    await updateAppointmentStatus(id, status, { confirmedDate, confirmedTime, note });

    // 2. ถ้าสถานะเป็น 'CONFIRMED' ให้ส่งเมลหาคนไข้
    if (status === 'CONFIRMED' || status === 'confirmed') {
      const info = await getUserEmailByAppointmentId(id);
      if (info && info.email) {
        // ใช้ข้อมูลจาก DB หรือจาก Request ถ้าใน DB ไม่มี
        const dateStr = confirmedDate || info.appointment_date;
        const timeStr = confirmedTime || info.appointment_time;
        
        const subject = "ยินดีด้วย! การนัดหมายของคุณได้รับการยืนยันแล้ว (HealthQ)";
        const htmlContent = getAppointmentConfirmedTemplate(
          info.name || "คนไข้", 
          dateStr, 
          timeStr, 
          info.hospital_name || "โรงพยาบาล"
        );

        // ส่งเมล (Background)
        sendEmail(info.email, subject, htmlContent).catch(err => {
          console.error("[Data Router] ส่งเมลแจ้งยืนยัดนัดหมายไม่สำเร็จ:", err);
        });
      }
    }

    return res.status(200).json({ message: "อัปเดตสถานะนัดหมายสำเร็จ" });
  } catch (error) {
    console.error("PUT APPOINTMENT STATUS ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

export default dataRouter;
