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
  const sql = `
    SELECT 
      a.id,
      a.user_id as userId,
      a.doctor_id as doctorId,
      a.appointment_date as priority1Date,
      a.priority2_date as priority2Date,
      a.symptom,
      a.note,
      a.files,
      a.status,
      a.hospital_id as apptHospitalId,
      a.specialty_id as apptSpecialtyId,
      u.name,
      u.lastname,
      u.birth_date as birthDate,
      u.identification_number as idCard,
      d.hospital_id as hospitalId,
      d.prefix,
      d.first_name,
      d.last_name as last_name_doc,
      h.name as hospitalName,
      s.name as departmentName
    FROM appointments a
    LEFT JOIN users u ON a.user_id = u.id
    LEFT JOIN doctors d ON a.doctor_id = d.id
    LEFT JOIN hospitals h ON d.hospital_id = h.hospital_id
    LEFT JOIN specialties s ON d.specialty_id = s.id
  `;
  const result = await query(sql);
  
  return result.map(row => ({
    id: row.id, 
    userId: row.userId,
    batchId: null,
    hospitalId: row.apptHospitalId || row.hospitalId,
    hospitalName: row.hospitalName,
    departmentName: row.departmentName,
    doctorId: row.doctorId,
    doctorName: row.first_name ? `${row.prefix||''} ${row.first_name} ${row.last_name_doc||''}`.trim() : "-",
    name: (row.name || row.lastname) && `${row.name || ''} ${row.lastname || ''}`.trim() !== ''
            ? `${row.name || ''} ${row.lastname || ''}`.trim() 
            : `ผู้ใช้งาน (ID: ${row.userId})`,
    birthDate: row.birthDate,
    idCard: row.idCard,
    symptom: row.symptom || "-",
    note: row.note || "",
    files: row.files ? JSON.parse(row.files) : [],
    priority1Date: row.priority1Date,
    priority2Date: row.priority2Date,
    status: row.status === 'pending' ? 'NEW' : 
            row.status === 'confirmed' ? 'CONFIRMED' : 
            row.status === 'cancelled' ? 'CANCELLED' : row.status,
    createdAt: new Date().toISOString()
  }));
};

// เพิ่มข้อมูลการจอง (Create Appointment)
export const createAppointment = async (data) => {
  let timeStr = data.appointment_time;
  if (timeStr) {
    const timeMatch = timeStr.match(/(\d{2}:\d{2}:\d{2})/);
    if (timeMatch) timeStr = timeMatch[1];
  }

  let dateStr = data.appointment_date;
  if (dateStr) {
    const dateMatch = dateStr.match(/(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) dateStr = dateMatch[1];
  }

  let date2Str = data.priority2_date;
  if (date2Str) {
    const dateMatch2 = date2Str.match(/(\d{4}-\d{2}-\d{2})/);
    if (dateMatch2) date2Str = dateMatch2[1];
  }

  const sql = "INSERT INTO appointments (user_id, doctor_id, hospital_id, specialty_id, appointment_date, priority2_date, appointment_time, symptom, note, files, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const params = [
    data.user_id,
    data.doctor_id || null,
    data.hospital_id || null,
    data.specialty_id || null,
    dateStr,
    date2Str || null,
    timeStr,
    data.symptom,
    data.note || null,
    data.files ? JSON.stringify(data.files) : null,
    data.status || "pending"
  ];
  try {
    const result = await query(sql, params);
    return result;
  } catch (err) {
    if (err.code === 'ER_BAD_FIELD_ERROR') {
         console.error("Database schema outdated! Please run the alter_db.js script.");
    }
    throw err;
  }
};

// อัปเดตข้อมูลการจอง (Update Appointment)
export const updateAppointment = async (id, data) => {
  let timeStr = data.appointment_time;
  if (timeStr) {
    const timeMatch = timeStr.match(/(\d{2}:\d{2}(:\d{2})?)/);
    if (timeMatch) {
        timeStr = timeMatch[1];
        if (timeStr.length === 5) timeStr += ":00";
    }
  }

  let dateStr = data.appointment_date;
  if (dateStr) {
    const dateMatch = dateStr.match(/(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) dateStr = dateMatch[1];
  }

  let sql = "UPDATE appointments SET status = ?";
  let params = [data.status];

  if (dateStr) {
      sql += ", appointment_date = ?";
      params.push(dateStr);
  }
  if (timeStr) {
      sql += ", appointment_time = ?";
      params.push(timeStr);
  }
  if (data.note !== undefined) {
      sql += ", note = ?";
      params.push(data.note);
  }

  sql += " WHERE id = ?";
  params.push(id);

  try {
    const result = await query(sql, params);
    return result;
  } catch (err) {
    if (err.code === 'ER_BAD_FIELD_ERROR') {
         console.error("Database schema outdated! Please run the alter_db.js script.");
    }
    throw err;
  }
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
