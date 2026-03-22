import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const config = {
  host: process.env.DB_host,
  user: process.env.DB_user,
  port: process.env.DB_port,
  password: process.env.DB_pass,
  database: process.env.DB_data,
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
