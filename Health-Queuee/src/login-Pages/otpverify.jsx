import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export default function OTPVerify() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const fromRegister = location.state?.fromRegister || false;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(15);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  // ระบบนับเวลาถอยหลัง 15 วินาที สำหรับการส่งรหัสใหม่
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // ตรวจสอบว่ามีอีเมลส่งมาหรือไม่
  useEffect(() => {
    if (!email) {
      alert("ไม่พบข้อมูลอีเมล กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
      navigate("/login");
    }
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return; // รับเฉพาะตัวเลข

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // เลื่อนไปช่องถัดไปอัตโนมัติ
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // ลบและถอยกลับไปช่องก่อนหน้า
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    
    if (fullOtp.length < 6) {
      alert("กรุณากรอกรหัส OTP ให้ครบ 6 หลัก");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/mail/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: fullOtp }),
      });

      const data = await response.json();

      if (response.ok) {
        if (fromRegister) {
          alert("สมัครสมาชิกสำเร็จ! กรุณารอแอดมินอนุมัติการเข้าใช้งาน");
        } else {
          alert("ยืนยันตัวตนสำเร็จ!");
        }
        navigate("/login");
      } else {
        alert(data.message || "รหัส OTP ไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/mail/send-otp-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("ส่งรหัส OTP ใหม่เรียบร้อยแล้ว");
        setTimer(15);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        inputRefs[0].current.focus();
      } else {
        alert("ไม่สามารถส่งรหัสใหม่ได้ กรุณาลองอีกครั้ง");
      }
    } catch (error) {
      console.error("Resend error:", error);
      alert("เกิดข้อผิดพลาดในการส่งรหัสใหม่");
    } finally {
      setLoading(false);
    }
  };

  const PRIMARY_BLUE = "#0040FF";

  return (
    <div
      style={{
        backgroundColor: "#020A1B",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "1100px",
          height: "650px",
          backgroundColor: "white",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        }}
      >
        <Container fluid className="h-100 p-0">
          <Row className="g-0 h-100">
            <Col
              md={5}
              className="position-relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #071164ff 0%, #2527afff 50%, #7d7bffff 100%)",
              }}
            >
              <div
                className="d-flex align-items-center gap-3 py-3 px-4"
                role="button"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center bg-primary rounded-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: PRIMARY_BLUE,
                  }}
                >
                  <span className="text-white fw-bold fs-4">H</span>
                </div>
              </div>

              <div
                className="position-absolute"
                style={{
                  top: 0,
                  right: 0,
                  width: "150%",
                  height: "150%",
                  opacity: 0.1,
                }}
              >
                <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="200" cy="200" r="300" fill="white" />
                  <circle cx="600" cy="100" r="200" fill="white" />
                  <circle cx="100" cy="600" r="250" fill="white" />
                </svg>
              </div>

              <div
                className="d-flex flex-column justify-content-center align-items-center h-100 px-5 text-center position-relative"
                style={{ marginTop: "-50px" }}
              >
                <div className="w-100" style={{ maxWidth: 400 }}>
                  <h1 className="text-white mb-2 fw-bold">OTP Verification</h1>
                  <p className="text-white mb-4 opacity-75">
                    เราได้ส่งรหัสยืนยันไปยัง <br />
                    <span className="fw-semibold">{email}</span>
                  </p>
                  {/* <div className="mb-4">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png" 
                      alt="OTP Icon" 
                      style={{ width: "120px", filter: "brightness(0) invert(1)" }}
                    />
                  </div> */}
                </div>
              </div>
            </Col>

            <Col
              md={7}
              className="bg-white d-flex align-items-center justify-content-center"
            >
              <div className="w-100 px-5" style={{ maxWidth: 500 }}>
                <h2 className="text-center mb-4 fw-bold" style={{ color: "#020A1B" }}>กรอกรหัสยืนยัน</h2>
                <p className="text-center text-muted mb-5">ระบุรหัส 6 หลักที่คุณได้รับทางอีเมล</p>

                <Form onSubmit={handleVerify}>
                  <div className="d-flex justify-content-between mb-5">
                    {otp.map((digit, index) => (
                      <Form.Control
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="text-center fw-bold fs-3"
                        style={{
                          width: "60px",
                          height: "70px",
                          borderRadius: "12px",
                          border: "2px solid #E2E8F0",
                          backgroundColor: "#F8FAFC",
                        }}
                      />
                    ))}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-100 text-white fw-semibold mb-4"
                    disabled={loading}
                    style={{
                      backgroundColor: "rgba(107, 50, 241, 0.8)",
                      borderRadius: "12px",
                      border: "none",
                      padding: "15px",
                      fontSize: "1.1rem",
                      boxShadow: "0 4px 12px rgba(107, 50, 241, 0.3)",
                    }}
                  >
                    {loading ? "กำลังตรวจสอบ..." : "ยืนยันรหัส"}
                  </Button>

                  <div className="text-center">
                    {canResend ? (
                      <p className="mb-0">
                        ไม่ได้รับรหัส?{" "}
                        <span
                          onClick={handleResend}
                          className="fw-bold text-decoration-underline"
                          style={{ cursor: "pointer", color: PRIMARY_BLUE }}
                        >
                          ส่งใหม่อีกครั้ง
                        </span>
                      </p>
                    ) : (
                      <p className="text-muted mb-0">
                        ส่งรหัสใหม่ได้ในอีก <span className="fw-bold" style={{ color: PRIMARY_BLUE }}>{timer}</span> วินาที
                      </p>
                    )}
                  </div>

                  <div className="text-center mt-4">
                    <span 
                      onClick={() => navigate("/login")}
                      className="text-muted"
                      style={{ cursor: "pointer", fontSize: "0.9rem" }}
                    >
                      <i className="bi bi-arrow-left me-1"></i> ย้อนกลับไปหน้า Login
                    </span>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
