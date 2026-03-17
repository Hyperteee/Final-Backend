import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// NOTE: This is a small demo in-memory store. For production, use a real database.
const users = new Map();
const otpStore = new Map();

const JWT_SECRET = process.env.JWT_SECRET || "replace_this_with_a_strong_secret";
const JWT_EXPIRY = "2h";

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendEmailMock(email, subject, text) {
  // Replace this with real email integration (e.g., SendGrid, Nodemailer, AWS SES)
  console.log(`📩 [mock email] to=${email} subject=${subject} text=${text}`);
}

router.post("/register/request-otp", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = generateOtp();
  const refCode = Math.random().toString(36).slice(2, 6).toUpperCase();
  otpStore.set(email, { otp, expiresAt: Date.now() + 1000 * 60 * 10 }); // 10 minutes

  sendEmailMock(email, "Your OTP Code", `Your OTP is ${otp}`);

  return res.json({ message: "OTP sent successfully", refCode });
});

router.post("/register/verify", async (req, res) => {
  const { email, otp, username, password } = req.body;
  if (!email || !otp || !username || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const stored = otpStore.get(email);
  if (!stored || stored.otp !== otp || stored.expiresAt < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  if (users.has(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: `u_${Date.now()}`,
    email,
    username,
    passwordHash: hashed,
    role: "user",
    fullname: "",
    createdAt: new Date().toISOString(),
  };

  users.set(username, newUser);
  otpStore.delete(email);

  return res.json({ message: "Register Success" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }

  const user = users.get(username);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ sub: user.id, username: user.username, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });

  return res.json({ message: "Login Success", token });
});

router.post("/logout", (req, res) => {
  // Stateless JWT approach: client can drop token. If you use a blacklist, implement here.
  return res.json({ message: "Logout success" });
});

router.post("/auth/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = Array.from(users.values()).find((u) => u.email === email);
  if (!user) {
    // Don't leak existence
    return res.json({ message: "Password reset OTP sent" });
  }

  const otp = generateOtp();
  otpStore.set(email, { otp, expiresAt: Date.now() + 1000 * 60 * 10 });
  sendEmailMock(email, "Password reset code", `Your password reset OTP is ${otp}`);

  return res.json({ message: "Password reset OTP sent" });
});

router.post("/auth/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const stored = otpStore.get(email);
  if (!stored || stored.otp !== otp || stored.expiresAt < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const user = Array.from(users.values()).find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  otpStore.delete(email);

  return res.json({ message: "Password reset success" });
});

export default router;
