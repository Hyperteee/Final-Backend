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
        html:
            `<img src="https://cdn.discordapp.com/attachments/1288845074557304883/1485313222272880791/image.png?ex=69c1693b&is=69c017bb&hm=48cd49b115f34e4585f4f6770cd3164c61273f7d7eab9c88abcbe7553c667dc2&" alt="Loading..." width="200" height="200"/>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email" });
    }
});

export default mailRouter;