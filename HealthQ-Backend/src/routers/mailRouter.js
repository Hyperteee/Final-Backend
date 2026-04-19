import express from "express";
import { sendEmail } from "../utils/mailHelper.js";

const mailRouter = express.Router();

/**
 * [API สำหรับทดสอบส่งอีเมลทั่วไป]
 * เรียกใช้ฟังก์ชัน sendEmail จาก mailHelper เพื่อลดความซ้ำซ้อนของโค้ด
 */
mailRouter.post("/send-email", async (req, res) => { 
    console.log("[Mail Router] ได้รับข้อมูลการส่งเมลทดสอบ:", req.body);
    
    if (!req.body || !req.body.to) {
        return res.status(400).json({ message: "ข้อมูลไม่ครบ (ต้องการอีเมลผู้รับ)" });
    }

    try {
        // เรียกใช้ฟังก์ชันกลางที่เตรียมไว้
        await sendEmail(req.body.to, req.body.subject, `<p>${req.body.text}</p>`);
        res.status(200).json({ message: "ส่งอีเมลทดสอบสำเร็จ" });
    } catch (error) {
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการส่งอีเมล", error: error.message });
    }
});

const otpStore = {}; // เก็บ OTP ชั่วคราวใน RAM (ในการผลิตจริงควรใช้ Redis)

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * [API สำหรับส่งรหัส OTP]
 * ปรับปรุงให้ใช้ mailHelper เพื่อความสะอาดของโค้ด
 */
mailRouter.post("/send-otp-email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "กรุณาระบุอีเมล" });
    }

    const otp = generateOtp();

    // เก็บ OTP ไว้ตรวจสอบ (หมดอายุใน 5 นาที)
    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; border: 1px solid #EEE; border-radius: 10px;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #4F46E5;">ยินดีต้อนรับสู่ HFU!</h2>
            </div>
            <p>สวัสดีครับ,</p>
            <p>รหัสยืนยันตัวตน (OTP) ของคุณคือ:</p>
            <div style="margin: 20px 0; font-size: 32px; font-weight: bold; color: #4F46E5; text-align: center; letter-spacing: 5px;">
              ${otp}
            </div>
            <p>กรุณากรอกรหัสนี้ภายใน 5 นาทีเพื่อดำเนินการต่อ</p>
            <hr style="border: none; border-top: 1px solid #EEE;">
            <p style="font-size: 12px; color: #777;">หากคุณไม่ได้ขอนี้ รบกวนเพิกเฉยต่ออีเมลฉบับนี้ครับ</p>
        </div>
    `;

    await sendEmail(email, "Your OTP Code for HFU", htmlContent);

    return res.json({ message: "ส่งรหัส OTP เรียบร้อยแล้ว" });

  } catch (error) {
    return res.status(500).json({
      message: "ไม่สามารถส่ง OTP ได้",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /mail/verify-otp:
 *   post:
 *     summary: Verify an OTP
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email: { type: string, format: email, description: "Recipient email address for OTP" }
 *               otp: { type: string, description: "OTP provided by the user" }
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: OTP validation errors (expired, invalid, missing)
 */
mailRouter.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    const storedData = otpStore[email];

    if (!storedData) {
        return res.status(400).json({ message: "No OTP found for this email or it has expired" });
    }

    if (Date.now() > storedData.expiresAt) {
        delete otpStore[email]; // clean up
        return res.status(400).json({ message: "OTP has expired" });
    }

    if (storedData.otp !== otp.toString()) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid
    delete otpStore[email]; // Clear OTP after successful use
    return res.status(200).json({ message: "OTP verified successfully" });
});

export default mailRouter;