import 'dotenv/config';
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  createUser,
  getUserByUsername,
  getAllUsers,
  updateUserRole,
  deleteUser
  // getRoleNamebyUserId, 
  // selectAllUsers 
} from "../controller/userController.js";




const userRouter = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - identificationNumber
 *             properties:
 *               title: { type: string }
 *               name: { type: string }
 *               lastname: { type: string }
 *               gender: { type: string }
 *               identificationNumber: { type: string }
 *               phone: { type: string }
 *               birthDate: { type: string, format: date }
 *               nationality: { type: string }
 *               email: { type: string, format: email }
 *               username: { type: string }
 *               password: { type: string }
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Incomplete data or username/email already exists
 *       500:
 *         description: Server error
 */

// --- Register Route ---
userRouter.post("/register", async (req, res) => {
  try {
    const { title, name, lastname, gender, identificationNumber, phone, birthDate, nationality, email, password } = req.body;
    
    // กำหนด username ให้เป็น email หากไม่ได้ส่งมาแยกต่างหาก
    const username = req.body.username || email;
    const role_id = req.body.role_id || 3; // กำหนดค่าแบบ defualt ผู้ใช้ทั่วไป

    if (!email || !password || !identificationNumber || !name) {
      return res.status(400).json({ message: "ข้อมูลไม่ครบถ้วน กรุณากรอกข้อมูลที่จำเป็นให้ครบ" });
    }

    const oldUser = await getUserByUsername(username);
    if (oldUser) {
      return res.status(400).json({ message: "Username หรืออีเมลนี้ถูกใช้งานแล้ว" });
    }

    // const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({ 
      title, name, lastname, gender, identificationNumber, phone, birthDate, nationality, email, username, password, role_id 
    });


    const token = jwt.sign(
      { userId: user.id, role: user.role_id, email: user.email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "ลงทะเบียนสำเร็จ",
      data: user,
      token: token
    });

  } catch (error) {
    console.log("Error registering user:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               username: { type: string, description: "Username or Email" }
 *               email: { type: string, description: "Username or Email" }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 token: { type: string }
 *                 data: { type: object }
 *       400:
 *         description: Missing credentials
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

// --- Login Route ---
userRouter.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const loginIdentifier = username || email;
    
    if (!loginIdentifier) {
      return res.status(400).json({ message: "กรุณากรอกชื่อผู้ใช้หรืออีเมล" });
    }

    const user = await getUserByUsername(loginIdentifier);
    if (!user) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้งาน" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role_id, email: user.email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token: token,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role_id: user.role_id
      }
    });

} catch (error) {
    console.error(error);
    return res.status(500).json({ 
        message: "Server Error", 
        debug_error: error.message 
    });
}
});

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get all users with formatted roles
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId: { type: integer }
 *                   name: { type: string }
 *                   lastname: { type: string }
 *                   email: { type: string }
 *                   role_id: { type: integer }
 *                   role: { type: string }
 *                   status: { type: string }
 *       500:
 *         description: Server error
 */

// --- Get All Users Route ---
userRouter.get("/all", async (req, res) => {
  try {
    const users = await getAllUsers();
    // แปลง role_id (1=super_admin, 2=admin, 3=user,)
    const formattedUsers = users.map(user => {
      let roleText = 'user';
      if (user.status === 'pending') {
          roleText = 'pending';
      } else {
          if (user.role_id === 1) roleText = 'super_admin';
          else if (user.role_id === 2) roleText = 'admin';
          else if (user.role_id === 3) roleText = 'user';
      }
      
      return {
        userId: user.id,
        name: user.name || '',
        lastname: user.lastname || '',
        email: user.email,
        role_id: user.role_id,
        role: roleText
      };
    });
    
    return res.status(200).json(formattedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

/**
 * @swagger
 * /users/{id}/role:
 *   put:
 *     summary: Update user role and status
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role_id
 *             properties:
 *               role_id: { type: integer }
 *               status: { type: string }
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Missing role_id
 *       500:
 *         description: Server error
 */

// --- Update User Role Route ---
userRouter.put("/:id/role", async (req, res) => {
  try {
    const userId = req.params.id;
    const { role_id, status } = req.body;
    
    if (!role_id) {
      return res.status(400).json({ message: "กรุณาระบุ role_id" });
    }
    
    await updateUserRole(userId, role_id, status);
    return res.status(200).json({ message: "อัปเดตสิทธิ์ผู้ใช้สำเร็จ" });
  } catch (error) {
    console.error("Error updating user role:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Server error
 */

// --- Delete User Route ---
userRouter.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUser(userId);
    return res.status(200).json({ message: "ลบผู้ใช้สำเร็จ" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

export default userRouter;