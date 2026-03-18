import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
import {
  createUser,
  getUserByUsername,
  getRoleNamebyUserId,
  selectAllUsers,
} from "../controller/userController.js";
const userRouter = Router();

//register (user,pass) -> database
userRouter.post("/register", async (req, res) => {
  //(user,pass,roleId) -> database
  // extract
  const { username, password, role_id } = req.body;
  //validate
  //process
  try {
    await createUser(username, password, role_id);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    // พ่น error ออกมาดูใน Terminal ของ VS Code
    console.error("DATABASE ERROR:", error);

    // ส่งข้อความ error กลับไปที่ Postman ด้วย จะได้รู้ว่าติดตรงไหน
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }

  //return
  res.send(req.method, req.originalUrl, "endpoint");
});
//login (user, pass) -> gen token -> frontend
userRouter.post("/login", async (req, res) => {
  const { username, password, role_id } = req.body;
  //check username, password
  const user = await getUserByUsername(username);
  console.log(user);
  if (user === undefined) return res.status(404).json({ message: "not found" });
  const result = await bcrypt.compare(password, user.password);
  console.log(result);
  if (!result) return res.status(403).json({ message: "Unauthorized" });
  //generate token
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  //sebd token back to frontend
  res.status(200).json({ message: "success", token });
  res.send(`${req.method} ${req.originalUrl}`);
});
//middleware for checking token
const jwtTokenMiddleware = (req, res, next) => {
  //[0]   [1]
  // Bearer eyJh...
  const token = req.headers.authorization?.split(" ")[1];
  //   console.log(token)

  //verify token
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      req.jwtExpired = true;
      req.userId = null;
    } else {
      req.jwtExpired = false;
      req.userId = payload.id;
    }
    // console.log(err)
    // console.log(payload)
  });

  next();
};

//verify (token) -> check authorize (admin, manager, worker)
userRouter.get("/verify", jwtTokenMiddleware, async (req, res) => {
  if (req.jwtExpired) return res.status(403).json({ message: "Unauthorized" });

  // get role "name" by user "id"
  const result = await getRoleNamebyUserId(req.userId);
  console.log(result);

  res.status(200).json({ message: "success", role: result[0].role });

  //   res.send(`${req.method} ${req.originalUrl}`);
});
userRouter.get("/list", jwtTokenMiddleware, async (req, res) => {
  if (req.jwtExpired) return res.status(403).json({ message: "Unauthorized" });
  try {
    const result = await getRoleNamebyUserId(req.userId);
    console.log(result[0].role);
    const role = result[0].role;
    if (role === "Super Admin" || role === "Admin") {
      const users = await selectAllUsers(role);
      return res.status(200).json(users);
    } else {
      return res.status(403).json({ message: "You are not Admin" });
    }
  } catch (err) {
    console.log(err);
  }
  // get role "name" by user "id"
});

export default userRouter;
