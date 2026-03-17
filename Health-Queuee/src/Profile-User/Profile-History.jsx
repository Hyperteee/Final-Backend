import { useState, useEffect } from "react"; // เพิ่ม useEffect
import { User, CreditCard, Calendar, Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap"; // ลบ Card และ Button ที่ไม่ได้ใช้

export default function ProfileHistory() {

  // ลบ formBooking และ handleSubmit ที่ไม่เกี่ยวข้องออก

  const navigate = useNavigate();

  // 1. State สำหรับเก็บข้อมูลผู้ใช้ปัจจุบัน
  const [currentUser, setCurrentUser] = useState(null);
    
  useEffect(() => {
    // โหลดข้อมูล User ที่กำลัง Login จาก localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(loggedInUser);
    // ไม่จำเป็นต้องเก็บ users ทั้งหมด หรือ setUsers
  }, []);

  // 2. ดึงข้อมูลประวัติการรักษา: ถ้ามี currentUser และมี medicalHistory ให้ใช้ข้อมูลนั้น ไม่งั้นใช้ []
  const medicalHistory = currentUser?.medicalHistory || [];

  function handleLogout(){
    localStorage.removeItem('currentUser');
    navigate('/login')
  }

  // ฟังก์ชันป้องกันการ submit (ถ้ามี form)
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        <h1 className="text-center mb-4 fw-semibold text-black">
          ข้อมูลของคุณ
        </h1>
        <div className="d-flex justify-content-center mb-4 ">
          <div
            style={{
              height: "4px",
              width: "100px",
              backgroundColor: "#001B45",
              borderRadius: "2px",
            }}
          ></div>
        </div>

        <div className="row g-4">
          <div className="col-lg-3">
            <div className="card shadow-sm border-0">
              <h1 className="fw-medium ">ข้อมูลส่วนตัว</h1>

              <div
                style={{
                  height: "4px",
                  width: "20px",
                  backgroundColor: "#001B45",
                  borderRadius: "2px",
                }}
              ></div>

              <div className="list-group list-group-flush mt-3">
                <button
                  onClick={() => navigate("/Profile")}
                  className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
                >
                  <User size={20} />
                  <span>โปรไฟล์ของคุณ</span>
                </button>

                <button
                  onClick={() => navigate("/ProfileBook")}
                  className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
                >
                  <CreditCard size={20} />
                  <span>นัดหมาย</span>
                </button>

                <button
                  onClick={() => navigate("/ProfileHistory")}
                  // เพิ่ม class active เพื่อเน้นเมนู
                  className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3 active" 
                >
                  <Calendar size={20} />
                  <span>ประวัติการรักษา</span>
                </button>

                <button 
                onClick={() => navigate("/ProfilePrivacy")}
                className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3">
                  <Shield size={20} />
                  <span>จัดการข้อมูลส่วนบุคคล</span>
                </button>
              </div>

              <div className="card-footer bg-white border-top p-3">
                <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2" onClick={handleLogout}>
                  <LogOut size={18} />
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </div>

          {/* เนื้อหาหลัก: ประวัติการรักษา */}
          <div className="col-lg-9">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-lg-5">
                                      <label className="form-label fw-medium text-secondary">
                        ประวัติการรักษา
                      </label>
                <hr />

                {/* ส่วนแสดงผลประวัติการรักษา / ไม่มีประวัติการรักษา */}
                {medicalHistory.length > 0 ? (
                  // ถ้ามีประวัติการรักษา ให้วนลูปแสดงผล
                  medicalHistory.map((history, index) => (
                    <div key={index} className="mb-4 p-3 border rounded shadow-sm bg-white">
                      <div className="d-flex justify-content-between align-items-start mb-3 border-bottom pb-2">
                        <h5 className="mb-0 fw-bold text-primary">
                          การเข้าตรวจวันที่: {history.visitDate}
                        </h5>
                        <span className="badge bg-success py-2">
                          เข้าตรวจแล้ว
                        </span>
                      </div>

                      <Row className="g-3">
                        <Col md={6}>
                            <p className="mb-1 text-muted small">โรงพยาบาล:</p>
                            <p className="fs-5 mb-0">{history.hospital || 'ไม่ระบุ'}</p>
                        </Col>
                        <Col md={6}>
                            <p className="mb-1 text-muted small">แพทย์ผู้รักษา:</p>
                            <p className="fs-5 mb-0">{history.doctor || 'ไม่ระบุ'}</p>
                        </Col>
                        <Col md={6}>
                            <p className="mb-1 text-muted small">เวลาเข้าตรวจ:</p>
                            <p className="fs-5 mb-0">{history.time || 'ไม่ระบุ'} น.</p>
                        </Col>
                        <Col xs={12}>
                            <p className="mb-1 text-muted small">อาการ/ผลการรักษาโดยสรุป:</p>
                            <p className="fs-6 mb-0 text-break fst-italic">{history.symptom || 'ไม่มีข้อมูลสรุปอาการ'}</p>
                        </Col>
                      </Row>
                    </div>
                  ))
                ) : (
                  // *** แสดงผลเมื่อไม่มีประวัติการรักษา ***
                  <div className="text-center p-5 border rounded bg-light">
                    <Calendar size={48} className="text-secondary mb-3" />
                    <h4 className="text-muted fw-normal">
                      ไม่มีประวัติการรักษา
                    </h4>
                    <p className="text-muted">เมื่อคุณมีการเข้าตรวจแล้ว ประวัติจะปรากฏที่นี่</p>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------------- */}

      <div style={{ width: "100%", overflow: "hidden", lineHeight: 0 }}>
        <img
          src={"./images/wave-navy.png"}
          alt="footer wave"
          style={{
            width: "100%",
            height: "120px",
            display: "block",
            marginBottom: "-5px",
            marginTop: "-5px",
            
          }}
        />
      </div>
      
      <footer
        id="contact"
        className="custom-footer py-5"
        style={{ backgroundColor: "rgb(2, 10, 27)" }}
      >
        <div className="row mb-5 ms-5 me-5">

          <div className="col-12 col-lg-4 mb-4 mb-lg-0">
            <div className="d-flex align-items-center mb-4">
              <span className="h3 fw-bold text-white mb-0">HFU</span>
            </div>
            <p className="text-light small opacity-75 mb-4">
              Health Queue Management System
            </p>

            <h5 className="fw-bold fs-5 mb-3">Contact</h5>
            <ul className="list-unstyled small contact-list">
              <li className="d-flex align-items-start mb-2">
                <i className="bi bi-geo-alt-fill"></i>
                <p className="mb-0">
                  123 Bangkhen, Sripatum, Bangkok, Thailand 10110
                </p>
              </li>
              <li className="d-flex align-items-center mb-2">
                <i className="bi bi-telephone-fill"></i>
                <a href="tel:+6621234567">(66) 9 999 9999</a>
              </li>
              <li className="d-flex align-items-center">
                <i className="bi bi-envelope-fill"></i>
                <a href="mailto:support@hfu.co">support@hfu.co.th</a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <h4 className="fw-bold fs-5 mb-4">Products</h4>
            <ul className="list-unstyled space-y-3">
              <li>
                <a href="#">Queue Management</a>
              </li>
              <li>
                <a href="#">Appointment System</a>
              </li>
              <li>
                <a href="#">Analytics Dashboard</a>
              </li>
              <li>
                <a href="#">Mobile App</a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <h4 className="fw-bold fs-5 mb-4">Company</h4>
            <ul className="list-unstyled space-y-3">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">
                  Careers
                </a>
              </li>
              <li>
                <a href="#">Blog & News</a>
              </li>
              <li>
                <a href="#">Our Vision</a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-4 col-lg-4 mt-4 mt-md-0">
            <h4 className="fw-bold fs-5 mb-4">Support & Legal</h4>
            <ul className="list-unstyled space-y-3">
              <li>
                <a href="#">Help Center (FAQ)</a>
              </li>
              <li>
                <a href="#">API Documentation</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-top border-secondary-subtle pt-4 mt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-light opacity-50 small mb-3 mb-md-0">
            &copy; 2025 HFU Healthcare Technologies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}