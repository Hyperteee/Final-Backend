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
 *     summary: Get list of doctors
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: Success
 */
dataRouter.get("/getDoctors", async (req, res) => {
  try {
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
 *     summary: Add a new doctor
 *     tags: [Data]
 */
dataRouter.post("/doctors", async (req, res) => {
  try {
    const newDoctor = req.body;
    if (!newDoctor.first_name || !newDoctor.last_name || !newDoctor.specialty_id) {
       return res.status(400).json({ message: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน (ชื่อ, นามสกุล, ความเชี่ยวชาญ)" });
    }
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
 *     summary: Update doctor information
 *     tags: [Data]
 */
dataRouter.put("/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;
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
 */
dataRouter.delete("/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;
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
 *     summary: Get list of hospitals
 *     tags: [Data]
 */
dataRouter.get("/getHospital", async (req, res) => {
  try {
    const result = await getHospitalsData();
    return res.status(200).json({ message: "Success", hospitals: result });
  } catch (error) {
    console.error("GET HOSPITALS ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @swagger
 * /data/hospitals:
 *   post:
 *     summary: Create a new hospital
 *     tags: [Data]
 */
dataRouter.post("/hospitals", async (req, res) => {
  try {
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
 *     summary: Update an existing hospital
 *     tags: [Data]
 */
dataRouter.put("/hospitals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateHospital(id, req.body);
    return res.status(200).json({ message: "Hospital updated successfully", data: result });
  } catch (error) {
    console.error("PUT HOSPITAL ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @swagger
 * /data/hospitals/{id}:
 *   delete:
 *     summary: Delete a hospital
 *     tags: [Data]
 */
dataRouter.delete("/hospitals/:id", async (req, res) => {
  try {
    const { id } = req.params;
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
 *     summary: Get list of specialties
 *     tags: [Data]
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

/**
 * @swagger
 * /data/specialties:
 *   post:
 *     summary: Add Specialty
 *     tags: [Data]
 */
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

/**
 * @swagger
 * /data/specialties/{id}:
 *   put:
 *     summary: Update Specialty
 *     tags: [Data]
 */
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

/**
 * @swagger
 * /data/specialties/{id}:
 *   delete:
 *     summary: Delete Specialty
 *     tags: [Data]
 */
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
 *     summary: Get list of appointments
 *     tags: [Data]
 */
dataRouter.get("/getAppointments", async (req, res) => {
  try {
    const result = await getAppointmentsData();
    return res.status(200).json({ message: "Success", appointments: result });
  } catch (error) {
    console.error("GET APPOINTMENTS ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @swagger
 * /data/appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Data]
 */
dataRouter.post("/appointments", async (req, res) => {
  try {
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
 *     summary: Update an existing appointment
 *     tags: [Data]
 */
dataRouter.put("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateAppointment(id, req.body);
    return res.status(200).json({ message: "Appointment updated successfully", data: result });
  } catch (error) {
    console.error("PUT APPOINTMENT ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @swagger
 * /data/appointments/{id}/status:
 *   put:
 *     summary: Update appointment status and send email
 *     tags: [Data]
 */
dataRouter.put("/appointments/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, confirmedDate, confirmedTime, note } = req.body;

    console.log(`[Data Router] กำลังอัปเดตนัดหมาย ID: ${id} สู่สถานะ: ${status}`);

    await updateAppointmentStatus(id, status, { confirmedDate, confirmedTime, note });

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
