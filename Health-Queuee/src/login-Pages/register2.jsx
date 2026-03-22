import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// กำหนดสไตล์สำหรับ Form.Control เพื่อให้สอดคล้องกับ UI เดิม
const INPUT_STYLE = {
  borderRadius: 8,
  border: "none",
};

export default function Register2() {
  const navigate = useNavigate();

  // 1. State สำหรับเก็บข้อมูลฟอร์มทั้งหมด (เพิ่ม title และ gender)
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    lastname: "",
    email: "",
    identificationNumber: "",
    phone: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
    nationality: "",
    gender: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  // 2. ฟังก์ชันอัปเดตข้อมูลเมื่อมีการพิมพ์
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (id === "rememberMe" && type === "checkbox") {
      setRememberMe(checked);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const id = formData.identificationNumber;
    const phone = formData.phone;

    const today = new Date();
    const maxYear = today.getFullYear() - 18;

    const minRequiredBirthDate = new Date(today.setFullYear(maxYear));

    const selectedBirthDate = new Date(formData.birthDate);

    if (selectedBirthDate > minRequiredBirthDate) {
      alert("คุณต้องมีอายุ 18 ปีบริบูรณ์ขึ้นไปจึงจะสามารถสมัครได้");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน!");
      return;
    }

    if (id.length !== 13) {
      alert("กรุณากรอกเลขบัตรประชาชน 13 หลักให้ครบ");
      return;
    }

    if (phone.length !== 10) {
      alert("กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก");
      return;
    }

    const payload = {
      title: formData.title,
      name: formData.name,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      identificationNumber: formData.identificationNumber,
      birthDate: formData.birthDate,
      password: formData.password,
      nationality: formData.nationality,
      gender: formData.gender,
    };

    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok || response.status === 201) {
        alert("สมัครสมาชิกสำเร็จ! กรุณารอแอดมินอนุมัติ");
        navigate("/login");
      } else {
        alert("ไม่สามารถสมัครได้: " + (data.message || "เกิดข้อผิดพลาด"));
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองตรวจสอบ Backend ของคุณ");
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#020A1B",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          overflow: "hidden",
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
                      objectFit: "cover",
                      filter:
                        "drop-shadow(0 10px 30px rgba(168, 85, 247, 0.2))",
                      marginTop: "-22px",
                    }}
                  />
                </div>
              </Col>

              <Col
                md={5}
                className="position-relative overflow-hidden "
                style={{
                  background:
                    "linear-gradient(135deg, #071164ff 0%, #2527afff 50%, #7d7bffff 100%)",
                }}
              >
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
                  className="d-flex flex-column justify-content-start align-items-center h-100 position-relative px-5 py-5"
                  style={{ overflowY: "hidden", marginTop: "-50px" }}
                >
                  <div className="w-100 pt-3 mt-4" style={{ maxWidth: 450 }}>
                    <h1 className="text-white text-center mb-2 fw-bold">
                      REGISTER
                    </h1>
                    <p className="text-white text-center mb-4 opacity-75">
                      กรุณากรอกข้อมูลเพื่อสร้างบัญชี
                    </p>

                    <Form onSubmit={handleRegister}>
                      <Row className="mb-3">
                        <Col md={4}>
                          <Form.Group controlId="title">
                            <Form.Select
                              size="lg"
                              value={formData.title}
                              onChange={handleChange}
                              required
                              style={INPUT_STYLE}
                              className={
                                !formData.title ? "text-muted" : "text-dark"
                              }
                            >
                              <option value="" disabled>
                                คำนำหน้า
                              </option>
                              <option value="นาง">นาง</option>
                              <option value="นางสาว">นางสาว</option>
                              <option value="นาย">นาย</option>
                              <option value="Mr.">Mr.</option>
                              <option value="Mrs.">Mrs.</option>
                              <option value="Ms.">Ms.</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={8}>
                          <Form.Group controlId="name">
                            <Form.Control
                              type="text"
                              size="lg"
                              placeholder="ชื่อ"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              style={INPUT_STYLE}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* นามสกุล/เพศ (Row 2) */}
                      <Row className="mb-3">
                        <Col md={8}>
                          <Form.Group controlId="lastname">
                            <Form.Control
                              type="text"
                              size="lg"
                              placeholder="นามสกุล"
                              value={formData.lastname}
                              onChange={handleChange}
                              required
                              style={INPUT_STYLE}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="gender">
                            <Form.Select
                              size="lg"
                              value={formData.gender}
                              onChange={handleChange}
                              required
                              style={INPUT_STYLE}
                              className={
                                !formData.gender ? "text-muted" : "text-dark"
                              }
                            >
                              <option value="" disabled>
                                เพศ
                              </option>
                              <option value="ชาย">ชาย</option>
                              <option value="หญิง">หญิง</option>
                              <option value="อื่นๆ">อื่นๆ</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* เลขบัตรประชาชน/เบอร์โทรศัพท์ (Row 3) */}
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="identificationNumber">
                            <Form.Control
                              type="tel"
                              size="lg"
                              placeholder="เลขบัตรประชาชน (13 หลัก)"
                              value={formData.identificationNumber}
                              onChange={handleChange}
                              required
                              maxLength={13}
                              style={INPUT_STYLE}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="phone">
                            <Form.Control
                              type="tel"
                              size="lg"
                              placeholder="เบอร์โทรศัพท์"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              maxLength={10}
                              style={INPUT_STYLE}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3" controlId="email">
                        <Form.Control
                          type="email"
                          size="lg"
                          placeholder="อีเมล"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          style={INPUT_STYLE}
                        />
                      </Form.Group>

                      {/* วันเกิด/สัญชาติ (Row 4) */}
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="birthDate">
                            <Form.Control
                              type="date"
                              size="lg"
                              value={formData.birthDate}
                              onChange={handleChange}
                              required
                              style={INPUT_STYLE}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="nationality">
                            <Form.Select
                              size="lg"
                              value={formData.nationality}
                              onChange={handleChange}
                              required
                              style={INPUT_STYLE}
                              className={
                                !formData.nationality
                                  ? "text-muted"
                                  : "text-dark"
                              }
                            >
                              <option value="" disabled>
                                เลือกสัญชาติ...
                              </option>
                              <option value="ไทย">ไทย</option>
                              <option value="ลาว">ลาว</option>
                              <option value="พม่า">พม่า</option>
                              <option value="จีน">จีน</option>
                              <option value="ญี่ปุ่น">ญี่ปุ่น</option>
                              <option value="เกาหลีใต้">เกาหลีใต้</option>
                              <option value="สหรัฐอเมริกา">สหรัฐอเมริกา</option>
                              <option value="อื่นๆ">อื่นๆ</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* Password / Confirm Password (Row 5) */}
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="password">
                            <Form.Control
                              type="password"
                              size="lg"
                              placeholder="รหัสผ่าน"
                              value={formData.password}
                              onChange={handleChange}
                              required
                              style={INPUT_STYLE}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="confirmPassword">
                            <Form.Control
                              type="password"
                              size="lg"
                              placeholder="ยืนยันรหัสผ่าน"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                              style={INPUT_STYLE}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* Submit Button */}
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
                        Register
                      </Button>

                      {/* Link to Login */}
                      <p className="text-white text-center mt-3 small">
                        มีบัญชีอยู่แล้ว?{" "}
                        <span
                          onClick={() => navigate("/login")}
                          className="text-white fw-semibold text-decoration-underline"
                          style={{ cursor: "pointer" }}
                        >
                          เข้าสู่ระบบ
                        </span>
                      </p>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}