import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Login-Pages/data-login/AuthContext.jsx"; // <--- ลบการนำเข้า useAuth ออก

export default function Login2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  // const { login } = useAuth(); // <--- ลบการดึงฟังก์ชัน login ออก

  const handleLogin = (e) => {
    e.preventDefault();
  localStorage.setItem("isLoggedIn", "true");

const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
console.log("isLoggedIn ===>", isLoggedIn);

    // ดึงผู้ใช้ทั้งหมดจาก localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // ค้นหาผู้ใช้จากอีเมล
    const foundUser = users.find((u) => u.email === email);

    // 1. ตรวจสอบ Super Admin (ตาม Logic ของ Login-user.jsx)
    if (email === "admin@gmail.com" && password === "1234") {
      const superAdminUser = {
        fullname: "Super Admin",
        email: "admin@gmail.com",
        role: "super_admin",
        adminScope: "all",
      };
      localStorage.setItem('currentUser', JSON.stringify(superAdminUser));

      alert("ยินดีต้อนรับ Super Admin!");
      navigate("/"); // นำทางไปที่ /admin
      return;
    }
    
    // 2. ตรวจสอบผู้ใช้ทั่วไป (Admin, User, Pending)
    if (!foundUser) {
      alert("ข้อมูลผิด");
      return;
    }
    if (foundUser.password !== password) {
      alert("รหัสผ่านไม่ถูกต้อง");
      return;
    }

    // 3. จัดการตามบทบาท (Role) ของผู้ใช้ที่พบ
    if (foundUser.role === "admin") {
      alert("ยินดีต้อนรับ Admin!");
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      navigate("/"); // นำทางไปที่ /admin
    } else if (foundUser.role === "pending") {
      alert("กรุณารอแอดมินยืนยันบัญชีของท่านก่อน");
    } else if (foundUser.role === "user") {
      alert("เข้าสู่ระบบสำเร็จ!");
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      navigate("/"); // นำทางไปที่หน้าหลัก /
    } else {
      alert("ข้อมูลผิด");
    }
  };

  const PRIMARY_BLUE = "#0040FF";
  const DARK_BLUE = "#020A1B";

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
          <div>
          </div>
        </div>

              <div className="d-flex flex-column justify-content-center align-items-center h-100 px-5" style={{ marginTop: "-50px"}}>
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
                        placeholder="อีเมล หรือ เบอร์โทรศัพท์"
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