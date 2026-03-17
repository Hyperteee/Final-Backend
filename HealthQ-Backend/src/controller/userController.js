import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const config = {
  host: process.env.DB_host,
  user: process.env.DB_user,
  port: 3307,
  password: process.env.DB_pass,
  database: process.env.DB_data,
};

const query = async (sql, params) => {
  const connection = await mysql.createConnection(config);
  const [rows] = await connection.execute(sql, params);
  await connection.end();
  return rows;
};
export const selectAllUsers = async (role) => {
  let sql = `SELECT users.id, users.username, roles.name as role
  FROM users, roles
  WHERE users.role_id = roles.id`;

  if (role == "Manager") {
    sql += ` AND roles.name != 'Admin'`;
  }
  const result = await query(sql);
  return result;
};

export const createUser = async (username, password, role_id) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO users (username,password, role_id) VALUES (?, ?, ?)";
  const params = [username, encryptedPassword, role_id];
  const result = await query(sql, params);
  return result;
};

export const getUserByUsername = async (username) => {
  const sql = "SELECT * FROM users WHERE username = ?";
  const params = [username];
  const result = await query(sql, params);
  return result[0];
};

export const getRoleNamebyUserId = async (id) => {
  const sql = `SELECT users.id AS id, users.username AS name, roles.name AS role
FROM users RIGHT JOIN roles ON users.role_id = roles.id
WHERE users.id = ?`;
  const params = [id];
  const result = await query(sql, params);
  return result;
};
