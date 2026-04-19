import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// ฟังก์ชันสำหรับคิวรีฐานข้อมูล
const query = async (sql, params = []) => {
  const connection = await mysql.createConnection(config);
  const [rows] = await connection.execute(sql, params);
  await connection.end();
  return rows;
};

// ดึงข้อมูลแพทย์
export const getDoctorsData = async () => {
  // JOIN กับตาราง specialties และ hospitals เพื่อเอาชื่อมาแสดงง่ายๆ
  const sql = `
    SELECT d.*, s.name as specialty_name, h.name as hospital_name 
    FROM doctors d
    LEFT JOIN specialties s ON d.specialty_id = s.id
    LEFT JOIN hospitals h ON d.hospital_id = h.hospital_id
    ORDER BY d.id DESC
  `;
  const result = await query(sql);
  return result;
};

// เพิ่มแพทย์ใหม่
export const addDoctor = async (data) => {
  const { hospital_id, specialty_id, specialization, prefix, first_name, last_name } = data;
  const sql = "INSERT INTO doctors (hospital_id, specialty_id, specialization, prefix, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?)";
  const params = [hospital_id || null, specialty_id, specialization || null, prefix || null, first_name, last_name];
  const result = await query(sql, params);
  return result;
};

// อัปเดตข้อมูลแพทย์
export const updateDoctor = async (id, data) => {
  const { hospital_id, specialty_id, specialization, prefix, first_name, last_name } = data;
  const sql = "UPDATE doctors SET hospital_id = ?, specialty_id = ?, specialization = ?, prefix = ?, first_name = ?, last_name = ? WHERE id = ?";
  const params = [hospital_id || null, specialty_id, specialization || null, prefix || null, first_name, last_name, id];
  const result = await query(sql, params);
  return result;
};

// ลบแพทย์
export const deleteDoctor = async (id) => {
  const sql = "DELETE FROM doctors WHERE id = ?";
  const result = await query(sql, [id]);
  return result;
};

// ดึงข้อมูลโรงพยาบาล
export const getHospitalsData = async () => {
  const sql = "SELECT * FROM hospitals";
  const result = await query(sql);
  return result;
};

// ดึงข้อมูลความชำนาญ (หรือแผนกใน Frontend)
export const getSpecialtiesData = async () => {
  const sql = "SELECT * FROM specialties ORDER BY id ASC";
  const result = await query(sql);
  return result;
};

// เพิ่มแผนกใหม่
export const addSpecialty = async (data) => {
  const { name } = data;
  const sql = "INSERT INTO specialties (name) VALUES (?)";
  const result = await query(sql, [name]);
  return result;
};

// แก้ไขแผนก
export const updateSpecialty = async (id, data) => {
  const { name } = data;
  const sql = "UPDATE specialties SET name = ? WHERE id = ?";
  const result = await query(sql, [name, id]);
  return result;
};

// ลบแผนก
export const deleteSpecialty = async (id) => {
  const sql = "DELETE FROM specialties WHERE id = ?";
  const result = await query(sql, [id]);
  return result;
};

// อัปเดตข้อมูลโรงพยาบาล
export const updateHospital = async (id, data) => {
  const { hospital_id, name, type, state, district } = data;
  const sql = "UPDATE hospitals SET hospital_id = ?, name = ?, type = ?, state = ?, district = ? WHERE id = ?";
  const params = [hospital_id, name, type || null, state, district, id];
  const result = await query(sql, params);
  return result;
};

// ดึงข้อมูลการจอง (Appointments)
export const getAppointmentsData = async () => {
  const sql = "SELECT * FROM appointments";
  const result = await query(sql);
  return result;
};

/**
 * [ฟังก์ชันสำหรับอัปเดตสถานะนัดหมาย]
 * ใช้สำหรับเปลี่ยนสถานะ เช่น จาก pending เป็น confirmed หรือ cancelled
 * @param {number} id - รหัสการนัดหมาย
 * @param {string} status - สถานะใหม่
 * @param {object} details - ข้อมูลเพิ่มเติม (เช่น วันที่ยืนยัน, เวลา, หมายเหตุ)
 */
export const updateAppointmentStatus = async (id, status, details = {}) => {
  const { confirmedDate, confirmedTime } = details;
  
  let sql = "UPDATE appointments SET status = ?";
  const params = [status];

  // ถ้ามีการส่งวันที่ยืนยันมา ให้บันทึกลงฐานข้อมูลด้วย
  if (confirmedDate) {
    sql += ", appointment_date = ?";
    params.push(confirmedDate);
  }
  
  // ถ้ามีการส่งเวลายืนยันมา ให้บันทึกลงฐานข้อมูลด้วย
  if (confirmedTime) {
    sql += ", appointment_time = ?";
    params.push(confirmedTime);
  }

  sql += " WHERE id = ?";
  params.push(id);
  
  console.log(`[Data Controller] อัปเดตสถานะนัดหมาย ID: ${id} (SQL: ${sql})`);
  return await query(sql, params);
};

/**
 * [ฟังก์ชันดึงอีเมลและชื่อผู้ใช้จากรหัสนัดหมาย]
 * ใช้สำหรับระบุตัวตนผู้รับอีเมลแจ้งเตือน
 */
export const getUserEmailByAppointmentId = async (appointmentId) => {
  const sql = `
    SELECT u.email, u.name, h.name as hospital_name, a.appointment_date, a.appointment_time
    FROM appointments a
    JOIN users u ON a.user_id = u.id
    LEFT JOIN doctors d ON a.doctor_id = d.id
    LEFT JOIN hospitals h ON d.hospital_id = h.hospital_id
    WHERE a.id = ?
  `;
  const result = await query(sql, [appointmentId]);
  return result[0];
};
