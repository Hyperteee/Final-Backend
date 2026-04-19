import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  port: process.env.DB_PORT || "3306",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_DATABASE || "HealthQ",
};

async function checkAndAlter() {
  const connection = await mysql.createConnection(config);
  try {
    console.log("Adding columns...");
    await connection.query("ALTER TABLE appointments ADD COLUMN files TEXT;");
    await connection.query("ALTER TABLE appointments ADD COLUMN note TEXT;");
    await connection.query("ALTER TABLE appointments ADD COLUMN specialty_id INT UNSIGNED;");
    await connection.query("ALTER TABLE appointments ADD COLUMN hospital_id VARCHAR(50);");
    console.log("Success");
  } catch (err) {
    if (err.code === "ER_DUP_FIELDNAME") {
      console.log("Columns already exist.");
    } else {
      console.error("Error:", err);
    }
  } finally {
    await connection.end();
  }
}

checkAndAlter();
