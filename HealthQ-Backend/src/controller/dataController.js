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
  const sql = "SELECT * FROM doctors";
  const result = await query(sql);
  return result;
};

// ดึงข้อมูลโรงพยาบาล
export const getHospitalsData = async () => {
  const sql = "SELECT * FROM hospitals";
  const result = await query(sql);
  return result;
};

// ดึงข้อมูลความชำนาญ
export const getSpecialtiesData = async () => {
  const sql = "SELECT * FROM specialties";
  const result = await query(sql);
  return result;
};

// ดึงข้อมูลการจอง (Appointments)
export const getAppointmentsData = async () => {
  const sql = "SELECT * FROM appointments";
  const result = await query(sql);
  return result;
};

// เพิ่มข้อมูลโรงพยาบาล
export const createHospital = async (data) => {
  const sql = "INSERT INTO hospitals (hospital_id, name, type, state, district) VALUES (?, ?, ?, ?, ?)";
  const params = [data.hospital_id, data.name, data.type, data.state, data.district];
  const result = await query(sql, params);
  return result;
};

// แก้ไขข้อมูลโรงพยาบาล
export const updateHospital = async (id, data) => {
  const sql = "UPDATE hospitals SET hospital_id = ?, name = ?, type = ?, state = ?, district = ? WHERE id = ?";
  const params = [data.hospital_id, data.name, data.type, data.state, data.district, id];
  const result = await query(sql, params);
  return result;
};

// ลบข้อมูลโรงพยาบาล
export const deleteHospital = async (id) => {
  const sql = "DELETE FROM hospitals WHERE id = ?";
  const result = await query(sql, [id]);
  return result;
};

// เพิ่มข้อมูลแพทย์
export const createDoctor = async (data) => {
  const sql = "INSERT INTO doctors (hospital_id, specialty_id, specialization, prefix, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?)";
  const params = [data.hospital_id, data.specialty_id, data.specialization, data.prefix, data.first_name, data.last_name];
  const result = await query(sql, params);
  return result;
};

// แก้ไขข้อมูลแพทย์
export const updateDoctor = async (id, data) => {
  const sql = "UPDATE doctors SET hospital_id = ?, specialty_id = ?, specialization = ?, prefix = ?, first_name = ?, last_name = ? WHERE id = ?";
  const params = [data.hospital_id, data.specialty_id, data.specialization, data.prefix, data.first_name, data.last_name, id];
  const result = await query(sql, params);
  return result;
};

// ลบข้อมูลแพทย์
export const deleteDoctor = async (id) => {
  const sql = "DELETE FROM doctors WHERE id = ?";
  const result = await query(sql, [id]);
  return result;
};
