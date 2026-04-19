import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const mailRouter = express.Router();


/**
 * @swagger
 * /mail/send-email:
 *   post:
 *     summary: Send an email notification
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *             properties:
 *               to: { type: string, format: email, description: "Recipient email address" }
 *               subject: { type: string, description: "Email subject" }
 *               text: { type: string, description: "Email text body" }
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Missing recipient email
 *       500:
 *         description: Error sending email
 */
mailRouter.post("/send-email", async (req, res) => { 
    console.log("ได้รับข้อมูลแล้ว:", req.body);
    
    if (!req.body || !req.body.to) {
        return res.status(400).json({ message: "ข้อมูลไม่ครบ" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: req.body.to, 
        subject: req.body.subject,
        text: req.body.text,
        // html:
        //     `<img src="https://cdn.discordapp.com/attachments/1288845074557304883/1485313222272880791/image.png?ex=69c1693b&is=69c017bb&hm=48cd49b115f34e4585f4f6770cd3164c61273f7d7eab9c88abcbe7553c667dc2&" alt="Loading..." width="200" height="200"/>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email" });
    }
});

const otpStore = {};

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * @swagger
 * /mail/send-otp-email:
 *   post:
 *     summary: Send an OTP email notification
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email: { type: string, format: email, description: "Recipient email address for OTP" }
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Email is required
 *       500:
 *         description: Send OTP failed
 */
mailRouter.post("/send-otp-email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = generateOtp();

    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS,
        },
    });

    await transporter.sendMail({
      from: `"HealthQ" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2>Welcome to HFU!</h2>
            </div>
            <p>Hello,</p>
            <p>Your One-Time Password (OTP) for verification is:</p>
            <div style="margin: 20px 0; font-size: 24px; font-weight: bold; color: #4F46E5; text-align: center;">
              ${otp}
            </div>
            <p>Please enter this code to complete your verification.</p>
            <p><strong>Note:</strong> This OTP is valid for 5 minutes.</p>
            <p>If you did not request this OTP, please ignore this email.</p>
            <br />
            <p>Best regards,<br/>The HFU Team</p>
        </div>
      `
    });

    return res.json({ message: "OTP sent successfully" });

  } catch (error) {
    return res.status(500).json({
      message: "Send OTP failed",
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