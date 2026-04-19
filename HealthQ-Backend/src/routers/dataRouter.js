import { Router } from "express";
import {
  getDoctorsData,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getHospitalsData,
  createHospital,
  updateHospital,
  deleteHospital,
  getSpecialtiesData,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
  getAppointmentsData,
  createAppointment,
  updateAppointment,
  updateAppointmentStatus,
  getUserEmailByAppointmentId,
} from "../controller/dataController.js";
import { sendEmail, getAppointmentConfirmedTemplate } from "../utils/mailHelper.js";

const dataRouter = Router();

// ==========================================
// DOCTORS ROUTES
// ==========================================

/**
 * @swagger
 * /data/getDoctors:
 *   get:
 *     summary: ดึงข้อมูลแพทย์ทั้งหมด
 *     description: คืนค่ารายการแพทย์ พร้อมข้อมูลแผนก (Specialty) และโรงพยาบาลที่สังกัด
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: สำเร็จ
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
 *                     properties:
 *                       id: { type: integer }
 *                       first_name: { type: string }
 *                       last_name: { type: string }
 *                       specialty_name: { type: string }
 *                       hospital_name: { type: string }
 */
dataRouter.get("/getDoctors", async (req, res) => {
  try {
    // 1. เรียก Controller เพื่อคิวรีข้อมูลแพทย์ (JOIN ข้ามตารางมาแล้ว)
    const result = await getDoctorsData();
    return res.status(200).json({ message: "Success", doctors: result });
  } catch (error) {
    console.error("GET DOCTORS ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @swagger
 * /data/doctors:
 *   post:
 *     summary: เพิ่มข้อมูลแพทย์ใหม่
 *     description: บันทึกข้อมูลแพทย์รายใหม่เข้าสู่ระบบ
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [first_name, last_name, specialty_id]
 *             properties:
 *               first_name: { type: string }
 *               last_name: { type: string }
 *               specialty_id: { type: integer }
 *               hospital_id: { type: string }
 *               prefix: { type: string }
 *               specialization: { type: string }
 *     responses:
 *       201:
 *         description: เพิ่มแพทย์สำเร็จ
 *       400:
 *         description: ข้อมูลไม่ครบถ้วน
 */
dataRouter.post("/doctors", async (req, res) => {
  try {
    const newDoctor = req.body;
    // ตรวจสอบความครบถ้วนของข้อมูลที่จำเป็น
    if (!newDoctor.first_name || !newDoctor.last_name || !newDoctor.specialty_id) {
       return res.status(400).json({ message: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน (ชื่อ, นามสกุล, ความเชี่ยวชาญ)" });
    }
    // บันทึกลงฐานข้อมูล
    const result = await createDoctor(newDoctor);
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
 *     summary: แก้ไขข้อมูลแพทย์
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name: { type: string }
 *               last_name: { type: string }
 *               specialty_id: { type: integer }
 *   delete:
 *     summary: ลบข้อมูลแพทย์
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
dataRouter.put("/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    // อัปเดตข้อมูลโดยใช้ ID เป็นตัวอ้างอิง
    await updateDoctor(id, updateData);
    return res.status(200).json({ message: "อัปเดตข้อมูลแพทย์สำเร็จ" });
  } catch (error) {
    console.error("PUT DOCTOR ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

dataRouter.delete("/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // ลบข้อมูลแพทย์ออกจากระบบ
    await deleteDoctor(id);
    return res.status(200).json({ message: "ลบแพทย์สำเร็จ" });
  } catch (error) {
    console.error("DELETE DOCTOR ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ==========================================
// HOSPITALS ROUTES
// ==========================================

/**
 * @swagger
 * /data/getHospital:
 *   get:
 *     summary: ดึงข้อมูลโรงพยาบาลทั้งหมด
 *     tags: [Data]
 * /data/hospitals:
 *   post:
 *     summary: เพิ่มโรงพยาบาลใหม่
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [hospital_id, name]
 *             properties:
 *               hospital_id: { type: string }
 *               name: { type: string }
 *               type: { type: string }
 *               state: { type: string }
 *               district: { type: string }
 */
dataRouter.get("/getHospital", async (req, res) => {
  try {
    // เรียก Controller ดึงข้อมูลโรงพยาบาลจาก DB
    const result = await getHospitalsData();
    return res.status(200).json({ message: "Success", hospitals: result });
  } catch (error) {
    console.error("GET HOSPITALS ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

dataRouter.post("/hospitals", async (req, res) => {
  try {
    // บันทึกโรงพยาบาลใหม่
    const result = await createHospital(req.body);
    return res.status(201).json({ message: "Hospital created successfully", data: result });
  } catch (error) {
    console.error("POST HOSPITAL ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @swagger
 * /data/hospitals/{id}:
 *   put:
 *     summary: แก้ไขข้อมูลโรงพยาบาล
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *   delete:
 *     summary: ลบข้อมูลโรงพยาบาล
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
dataRouter.put("/hospitals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // อัปเดตข้อมูลโรงพยาบาล
    const result = await updateHospital(id, req.body);
    return res.status(200).json({ message: "Hospital updated successfully", data: result });
  } catch (error) {
    console.error("PUT HOSPITAL ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

dataRouter.delete("/hospitals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // ลบโรงพยาบาล
    const result = await deleteHospital(id);
    return res.status(200).json({ message: "Hospital deleted successfully", data: result });
  } catch (error) {
    console.error("DELETE HOSPITAL ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ==========================================
// SPECIALTIES ROUTES
// ==========================================

/**
 * @swagger
 * /data/getSpecialties:
 *   get:
 *     summary: ดึงข้อมูลแผนก/ความเชี่ยวชาญ ทั้งหมด
 *     tags: [Data]
 * /data/specialties:
 *   post:
 *     summary: เพิ่มแผนกใหม่
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string }
 * /data/specialties/{id}:
 *   put:
 *     summary: แก้ไขชื่อแผนก
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *   delete:
 *     summary: ลบแผนก
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
dataRouter.get("/getSpecialties", async (req, res) => {
  try {
    const result = await getSpecialtiesData();
    return res.status(200).json({ message: "Success", specialties: result });
  } catch (error) {
    console.error("GET SPECIALTIES ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

dataRouter.post("/specialties", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "กรุณาระบุชื่อแผนก" });
    const result = await createSpecialty({ name });
    return res.status(201).json({ message: "เพิ่มแผนกสำเร็จ", id: result.insertId });
  } catch (error) {
    console.error("POST SPECIALTY ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

dataRouter.put("/specialties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await updateSpecialty(id, { name });
    return res.status(200).json({ message: "อัปเดตแผนกสำเร็จ" });
  } catch (error) {
    console.error("PUT SPECIALTY ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

dataRouter.delete("/specialties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSpecialty(id);
    return res.status(200).json({ message: "ลบแผนกสำเร็จ" });
  } catch (error) {
    console.error("DELETE SPECIALTY ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ==========================================
// APPOINTMENTS ROUTES
// ==========================================

/**
 * @swagger
 * /data/getAppointments:
 *   get:
 *     summary: ดึงข้อมูลการนัดหมายทั้งหมด
 *     tags: [Data]
 * /data/appointments:
 *   post:
 *     summary: สร้างการนัดหมายใหม่ (Booking)
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, doctor_id, appointment_date, appointment_time]
 *             properties:
 *               user_id: { type: integer }
 *               doctor_id: { type: integer }
 *               hospital_id: { type: string }
 *               specialty_id: { type: integer }
 *               appointment_date: { type: string, format: date }
 *               appointment_time: { type: string }
 *               symptom: { type: string }
 */
dataRouter.get("/getAppointments", async (req, res) => {
  try {
    // คิวรีข้อมูลการนัดหมาย พร้อมข้อมูลผู้ใช้และแพทย์
    const result = await getAppointmentsData();
    return res.status(200).json({ message: "Success", appointments: result });
  } catch (error) {
    console.error("GET APPOINTMENTS ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

dataRouter.post("/appointments", async (req, res) => {
  try {
    // บันทึกข้อมูลการจองใหม่
    const result = await createAppointment(req.body);
    return res.status(201).json({ message: "Appointment created successfully", data: result });
  } catch (error) {
    console.error("POST APPOINTMENT ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @swagger
 * /data/appointments/{id}:
 *   put:
 *     summary: อัปเดตข้อมูลการนัดหมาย
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 * /data/appointments/{id}/status:
 *   put:
 *     summary: อัปเดตสถานะการนัดหมายและส่งอีเมลแจ้งเตือน
 *     description: เปลี่ยนสถานะ (เช่น CONFIRMED, CANCELLED) และส่งอีเมลหาผู้ใช้หากสถานะพ้นช่วงรออนุมัติ
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string }
 *               confirmedDate: { type: string, format: date }
 *               confirmedTime: { type: string }
 *               note: { type: string }
 */
dataRouter.put("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // อัปเดตรายละเอียดการนัดหมายทั่วไป
    const result = await updateAppointment(id, req.body);
    return res.status(200).json({ message: "Appointment updated successfully", data: result });
  } catch (error) {
    console.error("PUT APPOINTMENT ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

dataRouter.put("/appointments/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, confirmedDate, confirmedTime, note } = req.body;

    console.log(`[Data Router] กำลังอัปเดตนัดหมาย ID: ${id} สู่สถานะ: ${status}`);

    // 1. อัปเดตสถานะใน DB
    await updateAppointmentStatus(id, status, { confirmedDate, confirmedTime, note });

    // 2. หากสถานะเป็นยืนยัน (CONFIRMED) ให้ส่งอีเมลแจ้งเตือนคนไข้
    if (status === 'CONFIRMED' || status === 'confirmed') {
      const info = await getUserEmailByAppointmentId(id);
      if (info && info.email) {
        const dateStr = confirmedDate || info.appointment_date;
        const timeStr = confirmedTime || info.appointment_time;
        
        const subject = "ยินดีด้วย! การนัดหมายของคุณได้รับการยืนยันแล้ว (HealthQ)";
        const htmlContent = getAppointmentConfirmedTemplate(
          info.name || "คนไข้", 
          dateStr, 
          timeStr, 
          info.hospital_name || "โรงพยาบาล"
        );

        // ส่งเมลแบบ Background
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
