import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

console.log("Database Config Loaded:", {
  host: config.host,
  user: config.user,
  database: config.database,
  hasPassword: !!config.password
});

const query = async (sql, params) => {
  const connection = await mysql.createConnection(config);
  const [rows] = await connection.execute(sql, params);
  await connection.end();
  return rows;
};

export const createUser = async (userData) => {
  console.log("Checking data before hash:", userData);
  
  const data = userData.username && typeof userData.username === 'object' ? userData.username : userData;
  const { title, name, lastname, gender, identificationNumber, phone, birthDate, nationality, email, username, password, role_id } = data;

  if (!password) {
    throw new Error("Password is undefined. Please check your request body.");
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  
  const sql = "INSERT INTO users (title, name, lastname, gender, identification_number, phone, birth_date, nationality, email, username, password, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const params = [title || null, name || null, lastname || null, gender || null, identificationNumber || null, phone || null, birthDate || null, nationality || null, email, username, encryptedPassword, role_id];
  
  const result = await query(sql, params);
  
  return { 
    id: result.insertId, 
    email, 
    username, 
    role_id,
    name,
    lastname
  };
};

export const selectAllUsers = async (role) => {
  let sql = `SELECT users.id, users.username, roles.name as role
  FROM users, roles
  WHERE users.role_id = roles.id`;
  if (role == "Admin") { sql += ` AND roles.name != 'SuperAdmin'`; }
  return await query(sql);
};

export const getUserByUsername = async (username) => {
  const sql = "SELECT * FROM users WHERE username = ?";
  const result = await query(sql, [username]);
  return result[0];
};

// เพิ่มฟังก์ชันดึงข้อมูลผู้ใช้ด้วย ID (ใช้ในหน้า Profile)
export const getUserById = async (id) => {
  const sql = "SELECT id, title, name, lastname, gender, identification_number, phone, birth_date, nationality, email, username, role_id, status FROM users WHERE id = ?";
  const result = await query(sql, [id]);
  return result[0];
};

// เพิ่มฟังก์ชันอัปเดตข้อมูลส่วนตัวผู้ใช้งาน (ใช้ในหน้า Profile)
export const updateUserProfile = async (id, data) => {
  const { title, name, lastname, gender, identificationNumber, phone, birthDate, email } = data;
  const sql = `
    UPDATE users 
    SET title = ?, name = ?, lastname = ?, gender = ?, 
        identification_number = ?, phone = ?, birth_date = ?, email = ?
    WHERE id = ?
  `;
  const params = [
    title || null, 
    name || null, 
    lastname || null, 
    gender || null, 
    identificationNumber || null, 
    phone || null, 
    birthDate || null, 
    email || null, 
    id
  ];
  return await query(sql, params);
};

export const getRoleNamebyUserId = async (id) => {
  const sql = `SELECT users.id AS id, users.username AS name, roles.name AS role
  FROM users RIGHT JOIN roles ON users.role_id = roles.id
  WHERE users.id = ?`;
  return await query(sql, [id]);
};

export const getAllUsers = async () => {
  const sql = "SELECT id, name, lastname, email, role_id, status FROM users";
  return await query(sql);
};

export const updateUserRole = async (id, role_id, status) => {
  let sql = "UPDATE users SET role_id = ?";
  const params = [role_id];
  
  if (status) {
    sql += ", status = ?";
    params.push(status);
  }
  
  sql += " WHERE id = ?";
  params.push(id);
  
  return await query(sql, params);
};

export const deleteUser = async (id) => {
  const sql = "DELETE FROM users WHERE id = ?";
  return await query(sql, [id]);
};