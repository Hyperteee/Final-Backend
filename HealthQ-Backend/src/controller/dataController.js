import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const config = {
  host: process.env.DB_host,
  user: process.env.DB_user,
  port: 3307,
  password: process.env.DB_pass,
  database: process.env.DB_data,
};

const query = async (sql, params = []) => {
  const connection = await mysql.createConnection(config);
  const [rows] = await connection.execute(sql, params);
  await connection.end();
  return rows;
};

export const getAppointmentsData = async () => {
  // ดึงข้อมูลการจองทั้งหมดจากตาราง appointments (แก้ไขชื่อตารางตามจริงได้เลย)
  const sql = "SELECT * FROM appointments";
  const result = await query(sql);
  return result;
};

export const getSpecialtiesData = async () => {
  // ดึงข้อมูลจากตาราง specialties จากฐานข้อมูล
  const sql = "SELECT * FROM specialties";
  const result = await query(sql);
  return result;
};

export const getDoctorsData = async () => {
  const sql = "SELECT * FROM doctors";
  const result = await query(sql);
  return result;
};

export const getHospitalData = async () => {
  const sql = "SELECT * FROM hospitals";
  const result = await query(sql);
  return result;
};
