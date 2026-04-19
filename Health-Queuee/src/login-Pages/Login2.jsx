import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ยิงข้อมูลไปที่ API Login ของ Backend
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // ส่งอีเมลไปตรวจ
          password: password, // ส่งรหัสผ่านไปตรวจ
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // ถ้ารหัสผ่านถูก Backend จะตอบสถานะ OK กลับมา
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(data.data || data.user || data)); // เก็บข้อมูล User ลง LocalStorage

        // หาก Backend มีการสร้าง Token ให้เก็บไว้ใช้งาน
        if (data.token) {
          localStorage.setItem("token", data.token); 
        }

        // เช็ก Role จาก Backend (ระวังว่า Backend ส่งข้อมูลมาใน data.data)
        const userData = data.data || data.user || data;
        const userRole = userData.role || userData.role_id; 
        
        // เช็กบทบาทผู้ใช้งาน (ปรับเลข 1, 2, 3 ตามที่ตั้งไว้ใน DB ของคุณ)
        if (userRole === "super_admin" || userRole === 1) {
          alert("ยินดีต้อนรับ Super Admin!");
          navigate("/admin"); // ไปหน้าแอดมิน
        } else if (userRole === "admin" || userRole === 2) {
          alert("ยินดีต้อนรับ Admin!");
          navigate("/admin"); // ไปหน้าแอดมิน
        } else if (userRole === "pending") {
          alert("กรุณารอแอดมินยืนยันบัญชีของท่านก่อน");
        } else {
          alert("เข้าสู่ระบบสำเร็จ!");
          navigate("/"); // ไปหน้าหลัก
        }
      } else {
        alert(data.message || "ข้อมูลเข้าสู่ระบบไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบ Backend");
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
                className="d-flex flex-column justify-content-center align-items-center h-100 px-5 position-relative"
                style={{ marginTop: "-50px" }}
              >
                <div className="w-100" style={{ maxWidth: 400 }}>
                  <h1 className="text-white text-center mb-2 fw-bold">LOGIN</h1>

                  <p className="text-white text-center mb-4 opacity-75">
                    เข้าสู่ระบบหรือสมัครสมาชิก
                  </p>

                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        size="lg"
                        placeholder="อีเมล"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ borderRadius: 8, border: "none" }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="password"
                        size="lg"
                        placeholder="รหัสผ่าน"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ borderRadius: 8, border: "none" }}
                      />
                    </Form.Group>

                    <Form.Check
                      className="mb-4"
                      type="checkbox"
                      label={<span className="text-white">Remember Me</span>}
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-100 text-white fw-semibold"
                      style={{
                        backgroundColor: "rgba(107, 50, 241, 0.8)",
                        borderRadius: 8,
                        border: "none",
                      }}
                    >
                      Login
                    </Button>

                    <p className="text-white text-center mt-3 small">
                      ยังไม่มีบัญชีใช่มั้ย?{" "}
                      <span
                        onClick={() => navigate("/register")}
                        className="text-white fw-semibold text-decoration-underline"
                        style={{ cursor: "pointer" }}
                      >
                        สมัครสมาชิก
                      </span>
                    </p>
                  </Form>
                </div>
              </div>
            </Col>

            <Col
              md={7}
              className="bg-white d-flex align-items-center justify-content-center"
            >
              <div className="text-center">
                <img
                  src="./images/Login-BG.jpeg"
                  alt="Background-Hospital"
                  style={{
                    maxWidth: "100%",
                    height: "650px",
                    filter: "drop-shadow(0 10px 30px rgba(168, 85, 247, 0.2))",
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}