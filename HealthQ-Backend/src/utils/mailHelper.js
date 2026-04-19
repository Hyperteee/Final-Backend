import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * ตั้งค่าตัวส่งเมล (Transporter) โดยใช้ข้อมูลจากไฟล์ .env
 * แยกออกมาเป็นไฟล์กลางเพื่อให้เรียกใช้ซ้ำได้ง่ายและไม่ต้องตั้งค่าหลายรอบ
 */
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_MAIL, // อีเมลต้นทาง (ควรตั้งค่าใน .env)
        pass: process.env.SMTP_PASS, // รหัสผ่านแอป (App Password) ของ Gmail
    },
});

/**
 * ฟังก์ชันสำหรับส่งอีเมลแบบรวม (Reusable Email Sender)
 * @param {string} to - อีเมลผู้รับ
 * @param {string} subject - หัวข้ออีเมล
 * @param {string} htmlBody - เนื้อหาอีเมลในรูปแบบ HTML
 */
export const sendEmail = async (to, subject, htmlBody) => {
    const mailOptions = {
        from: `"HealthQ Registration" <${process.env.SMTP_MAIL}>`,
        to: to,
        subject: subject,
        html: htmlBody,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`[Email Service] ส่งอีเมลไปยัง: ${to} สำเร็จ (ID: ${info.messageId})`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`[Email Service] เกิดข้อผิดพลาดในการส่งเมลไปยัง ${to}:`, error);
        throw error; // ส่งต่อ error ให้กับผู้ที่เรียกใช้ไปจัดการต่อ
    }
};

/*
 * แจ้งเตือนเมื่อบัญชีได้รับการอนุมัติ
 * @param {string} name - ชื่อของผู้ที่ได้รับการอนุมัติ
 */
export const getApprovalTemplate = (name) => {
    return `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #333; background-color: #f9f9f9; border-radius: 10px;">
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h2 style="color: #4F46E5; border-bottom: 2px solid #EEE; padding-bottom: 10px;">ยินดีด้วย! บัญชีของคุณได้รับการอนุมัติแล้ว</h2>
                <p>สวัสดีคุณ <strong>${name}</strong>,</p>
                <p>เรามีความยินดีที่จะแจ้งให้ทราบว่า บัญชีผู้ใช้งานของคุณในระบบ <strong>HealthQ</strong> ได้รับการอนุมัติเรียบร้อยแล้ว</p>
                <p>คุณสามารถเข้าสู่ระบบเพื่อใช้งานจองคิวและรับบริการต่างๆ ได้ทันที</p>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="http://localhost:5173/Final-Project2-Frontendd/login" style="background-color: #4F46E5; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">เข้าสู่ระบบที่นี่</a>
                </div>
                <hr style="border: none; border-top: 1px solid #EEE; margin: 30px 0;">
                <p style="font-size: 12px; color: #777;">หากคุณมีข้อสงสัยเพิ่มเติม สามารถติดต่อแผนกช่วยเหลือได้ตลอดเวลา</p>
                <p style="font-size: 12px; color: #777;">ขอบคุณที่ใช้บริการกับเรา<br/>ทีมงาน HealthQ</p>
            </div>
        </div>
    `;
};

/**
 * Template สำหรับแจ้งเตือนเมื่อนัดหมายได้รับการยืนยัน
 * @param {string} patientName - ชื่อคนไข้
 * @param {string} date - วันที่นัด
 * @param {string} time - เวลานัด
 * @param {string} hospital - โรงพยาบาล
 */
export const getAppointmentConfirmedTemplate = (patientName, date, time, hospital) => {
    return `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #333; background-color: #f0fdf4; border-radius: 10px;">
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-left: 5px solid #22c55e;">
                <h2 style="color: #15803d; border-bottom: 2px solid #EEE; padding-bottom: 10px;">✅ ยืนยันการนัดหมายสำเร็จ</h2>
                <p>สวัสดีคุณ <strong>${patientName}</strong>,</p>
                <p>การนัดหมายจองคิวของคุณได้รับการยืนยันจากโรงพยาบาลเรียบร้อยแล้ว โดยมีรายละเอียดดังนี้:</p>
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>สถานที่:</strong> ${hospital}</p>
                    <p style="margin: 5px 0;"><strong>วันที่:</strong> ${date}</p>
                    <p style="margin: 5px 0;"><strong>เวลา:</strong> ${time} น.</p>
                </div>
                <p>กรุณาเตรียมตัวและไปถึงโรงพยาบาลก่อนเวลานัดหมายอย่างน้อย 15 นาที เพื่อดำเนินการตามขั้นตอนของโรงพยาบาล</p>
                <hr style="border: none; border-top: 1px solid #EEE; margin: 30px 0;">
                <p style="font-size: 12px; color: #777;">ขอบคุณที่ใช้บริการกับเรา<br/>ทีมงาน HealthQ</p>
            </div>
        </div>
    `;
};
