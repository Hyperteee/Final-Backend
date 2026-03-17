import { useEffect, useState, useContext } from "react";
import { User, CreditCard, Calendar, Shield, LogOut, MapPin, Clock, FileText, AlertCircle, CheckCircle2, XCircle, ArrowRightCircle, Phone, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { UserAppointment } from "../data/context/appointment";
import "./Profile.css";

export default function ProfileBook() {
  const { appointments, cancelAppointment, updateAppointmentStatus } = useContext(UserAppointment);
  const navigate = useNavigate();

  ///////////////////// หาว่าใครคือคนใช้ตอนนี้
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null)
  /////////////////////////////////
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPostponeModal, setShowPostponeModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  ///////////////////// หาว่าใครคือคนใช้ตอนนี้
  useEffect(() => {
          const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
          setUsers(storedUsers);
          const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
          setCurrentUser(loggedInUser);
      }, []);

  
  // --- Helper Functions ---
  function formatThaiDate(dateString) {
    if (!dateString) return "-";
    const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const date = new Date(dateString);
    return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${date.getFullYear() + 543}`;
  }

  // Status Badge Logic
  const getStatusBadge = (status, suggestedDate) => {
    if (status === 'REJECTED' && suggestedDate) {
      return <span className="status-badge bg-warning text-dark border-warning"><AlertTriangle size={14} /> รอคุณยืนยันนัดใหม่</span>;
    }

    switch (status) {
      case "NEW":
        return (
          <span className="status-badge bg-primary-subtle text-primary border-primary">
            <FileText size={14} /> ส่งคำขอแล้ว (รอแอดมินส่งเรื่อง)
          </span>
        );
      case "SENT":
        return <span className="status-badge status-new"><AlertCircle size={14} /> รอการยืนยันจากรพ.</span>;
      case "CONFIRMED":
        return <span className="status-badge status-confirmed"><CheckCircle2 size={14} /> นัดหมายสำเร็จ</span>;
      case "REJECTED":
        return <span className="status-badge status-failed"><XCircle size={14} /> คำขอถูกปฏิเสธ</span>;
      case "FAILED":
      case "CANCELLED":
        return <span className="status-badge status-failed"><XCircle size={14} /> ยกเลิกแล้ว</span>;
      case "USER_CANCELLED":
        return <span className="status-badge bg-danger text-white border-danger"><XCircle size={14} /> คุณยกเลิกรายการ</span>;
      default:
        return <span className="status-badge status-new">{status}</span>;
    }
  };
function handleLogout(){
        localStorage.removeItem('currentUser');
        navigate('/login')
    }
  const isInactive = (status) => {
    return ['CANCELLED', 'FAILED', 'NO_SHOW'].includes(status);
  };

  // --- Handlers ---
  const handleCancelClick = (appt) => {
    setSelectedAppointment(appt);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (selectedAppointment) {
      cancelAppointment(selectedAppointment.id);
      setShowCancelModal(false);
      setShowSuccessModal(true);
    }
  };

  const handlePostponeClick = (appt) => {
    if (appt.status === 'NEW') {
      setSelectedAppointment(appt);
      setShowPostponeModal(true);
    }
  };

  const confirmPostpone = () => {
    if (selectedAppointment) {
      console.log(selectedAppointment.hospitalName)
      console.log(selectedAppointment.doctorId)
      console.log(selectedAppointment.departmentId)
      cancelAppointment(selectedAppointment.id);
      setShowPostponeModal(false);
      navigate("/queue3", {
        state: {
          selectedHospital: selectedAppointment.hospitalName,
          selectedDoctor: selectedAppointment.doctorId,
          selectedDepartment: selectedAppointment.departmentId

        }
      });
    }
  };

  const handleAcceptProposal = (appt) => {
    const dateStr = formatThaiDate(appt.suggestedDate);
    if (window.confirm(`ยืนยันการนัดหมายใหม่เป็นวันที่ ${dateStr} ใช่หรือไม่?`)) {
      updateAppointmentStatus(appt.id, 'CONFIRMED', {
        confirmedDate: appt.suggestedDate,
        confirmedTime: "09:00",
        note: "User accepted new date (ยืนยันนัดใหม่)"
      });
      setShowSuccessModal(true);
    }
  };

  const handleDeclineProposal = (id) => {
    if (window.confirm("คุณต้องการปฏิเสธข้อเสนอและยกเลิกนัดหมายนี้ใช่หรือไม่?")) {
      updateAppointmentStatus(id, 'CANCELLED', {
        note: "User declined proposed date (ปฏิเสธวันนัดใหม่)"
      });
      setShowSuccessModal(true);
    }
  };

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => setShowSuccessModal(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);
  const myAppointments = appointments.filter(appt => 
    currentUser && (appt.userId === currentUser.userId) 
  )

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        <h1 className="text-center mb-4 fw-semibold text-black">ข้อมูลของคุณ</h1>
        <div className="d-flex justify-content-center mb-4">
          <div style={{ height: "4px", width: "100px", backgroundColor: "#001B45", borderRadius: "2px" }}></div>
        </div>

        <div className="row g-4">
          <div className="col-lg-3">
            <div className="card shadow-sm border-0">
              <h1 className="fw-medium p-3 pb-0 fs-4">ข้อมูลส่วนตัว</h1>
              <div className="px-3">
                <div style={{ height: "4px", width: "30px", backgroundColor: "#001B45", borderRadius: "2px" }}></div>
              </div>
              <div className="list-group list-group-flush mt-3">
                <button onClick={() => navigate("/Profile")} className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3 border-0">
                  <User size={20} /> <span>โปรไฟล์ของคุณ</span>
                </button>
                <button onClick={() => navigate("/ProfileBook")} className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3 border-0 active bg-primary-subtle text-primary fw-bold">
                  <CreditCard size={20} /> <span>นัดหมาย</span>
                </button>
                <button onClick={() => navigate("/ProfileHistory")} className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3 border-0">
                  <Calendar size={20} /> <span>ประวัติการรักษา</span>
                </button>
                <button onClick={() => navigate("/ProfilePrivacy")} className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3 border-0">
                  <Shield size={20} /> <span>จัดการข้อมูลส่วนบุคคล</span>
                </button>
              </div>
              <div className="card-footer bg-white border-top p-3">
                <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2" onClick={() => handleLogout()}>
                  <LogOut size={18} /> ออกจากระบบ
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-lg-5">
                <div className="mb-4">
                  <label className="form-label fw-medium fs-5">นัดหมายของฉัน</label>
                </div>

                {myAppointments.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    <Calendar size={48} className="mb-3 opacity-25" />
                    <p>คุณยังไม่มีรายการนัดหมาย</p>
                    <Button variant="primary" className="rounded-pill px-4" onClick={() => navigate("/")}>เริ่มทำนัดใหม่</Button>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {myAppointments
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .map((appt, index) => (
                        <div
                          key={index}
                          className={`appointment-card ${isInactive(appt.status) ? 'card-inactive' : ''}`}
                        >
                          <div className="appt-card-header">
                            <div className="appt-hospital-name">
                              <MapPin size={18} /> {appt.hospitalName}
                            </div>
                            {getStatusBadge(appt.status, appt.suggestedDate)}
                          </div>

                          <div className="appt-card-body">
                            <Row className="g-4">
                              <Col md={6}>
                                <div className="doctor-info">
                                  <div className="doctor-avatar-small">
                                    {appt.doctorName ? <User /> : <Shield />}
                                  </div>
                                  <div>
                                    <div className="text-muted small mb-1">แผนก/คลินิก</div>
                                    <h5 className="fw-bold text-dark mb-1">{appt.departmentName || "คัดกรองอาการ"}</h5>
                                    <p className="text-secondary mb-0 small">
                                      {appt.doctorName ? `แพทย์: ${appt.doctorName}` : "ยังไม่ระบุแพทย์"}
                                    </p>
                                  </div>
                                </div>
                              </Col>

                              <Col md={6}>
                                <div className="date-box">
                                  {appt.status === 'CONFIRMED' ? (
                                    <div className="text-success animate-slide-up">
                                      <div className="d-flex align-items-center mb-2 fw-bold text-success">
                                        <CheckCircle2 size={16} className="me-1" /> วันเวลานัดหมายจริง
                                      </div>
                                      <div className="p-2 bg-success-subtle rounded border border-success">
                                        <div className="fs-5 fw-bold text-dark">{formatThaiDate(appt.confirmedDate)}</div>
                                        <div className="small text-muted">เวลา: {appt.confirmedTime || "09:00"} น.</div>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="d-flex align-items-center mb-2 text-muted small">
                                        <Clock size={14} className="me-1" /> วันที่ขอจอง
                                      </div>
                                      <div className="date-row">
                                        <span className="label-p1">หลัก (P1)</span>
                                        <span className="fw-medium">{formatThaiDate(appt.priority1Date)}</span>
                                      </div>
                                      <div className="date-row">
                                        <span className="label-p2">รอง (P2)</span>
                                        <span className="text-muted">{formatThaiDate(appt.priority2Date)}</span>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </Col>
                            </Row>

                            {/* อาการ */}
                            {appt.symptom && (
                              <div className="symptom-box">
                                <div className="d-flex align-items-center mb-1 fw-bold text-dark" style={{ fontSize: '0.85rem' }}>
                                  <FileText size={14} className="me-1" /> อาการเบื้องต้น:
                                </div>
                                {appt.symptom}
                              </div>
                            )}

                            {/* --- 🔥 ปรับปรุงส่วน REJECTED --- */}
                            {appt.status === 'REJECTED' && (
                              <div className="mt-3">
                                {/* 1. แสดงเหตุผลเสมอ ถ้ามี (ไม่ว่าจะแนะนำวันใหม่หรือไม่) */}
                                {(appt.rejectReason || appt.note) && (
                                  <div className="mb-3 p-2 bg-danger-subtle border border-danger rounded d-flex align-items-start gap-2">
                                    <XCircle size={18} className="text-danger flex-shrink-0 mt-1" />
                                    <div>
                                      <span className="fw-bold text-danger">เหตุผลที่ปฏิเสธ:</span>
                                      <span className="ms-2 text-dark">{appt.rejectReason || appt.note}</span>
                                    </div>
                                  </div>
                                )}

                                {/* 2. กล่องแนะนำวันใหม่ (แสดงเฉพาะเมื่อมี suggestedDate) */}
                                {appt.suggestedDate && (
                                  <div className="p-3 bg-warning-subtle border border-warning rounded-3">
                                    <div className="d-flex align-items-start gap-2 mb-2">
                                      <AlertTriangle className="text-warning-emphasis flex-shrink-0" size={20} />
                                      <div>
                                        <h6 className="fw-bold text-dark mb-1">เจ้าหน้าที่เสนอนัดใหม่</h6>
                                        <p className="text-muted small mb-0">เนื่องจากวันที่เลือกไม่ว่าง รพ.เสนอเป็นวันที่:</p>
                                      </div>
                                    </div>

                                    <div className="bg-white rounded p-2 text-center border mb-3">
                                      <span className="fw-bold fs-5 text-primary">{formatThaiDate(appt.suggestedDate)}</span>
                                    </div>
                                    <div className="d-flex gap-2">
                                      <Button variant="success" size="sm" className="w-100 rounded-pill fw-bold" onClick={() => handleAcceptProposal(appt)}>
                                        <CheckCircle2 size={16} className="me-1" /> ยืนยันวันใหม่
                                      </Button>
                                      <Button variant="outline-danger" size="sm" className="w-100 rounded-pill" onClick={() => handleDeclineProposal(appt.id)}>
                                        <XCircle size={16} className="me-1" /> ปฏิเสธ/ยกเลิก
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* --- Footer Actions --- */}
                          {/* 🔥 ซ่อน Footer ทันทีถ้า status เป็น REJECTED หรือ Inactive */}
                          {!isInactive(appt.status) && appt.status !== 'REJECTED' && (
                            <div className="appt-card-footer">
                              {appt.status === 'CONFIRMED' || appt.status === 'SENT' ? (
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  className="rounded-pill px-3 w-100"
                                  onClick={() => alert(`กรุณาติดต่อ ${appt.hospitalName} โดยตรงเพื่อทำการเปลี่ยนแปลงหรือยกเลิกนัดหมาย`)}
                                >
                                  <Phone size={14} className="me-1" /> ติดต่อรพ.เพื่อเปลี่ยนแปลง/ยกเลิก
                                </Button>
                              ) : (
                                <>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="rounded-pill px-3"
                                    onClick={() => handleCancelClick(appt)}
                                  >
                                    ยกเลิกนัด
                                  </Button>

                                  {(appt.status === 'NEW' || appt.status === 'SENT_TO_HOSPITAL') ? (
                                    <Button
                                      variant="outline-primary"
                                      size="sm"
                                      className="rounded-pill px-3"
                                      onClick={() => handlePostponeClick(appt)}
                                    >
                                      เลื่อนนัด
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outline-secondary"
                                      size="sm"
                                      className="rounded-pill px-3"
                                      onClick={() => alert("กรุณาติดต่อเจ้าหน้าที่เพื่อตรวจสอบสถานะ")}
                                    >
                                      <Phone size={14} className="me-1" /> ติดต่อเจ้าหน้าที่
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold fs-5">ยืนยันการยกเลิก</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center pb-4">
          <p className="text-muted mb-3">คุณต้องการยกเลิกคำขอนัดหมายนี้ใช่หรือไม่?</p>
          {selectedAppointment && (
            <div className="bg-light p-3 rounded-3 mb-4 text-start mx-auto border" style={{ maxWidth: '380px' }}>
              <div className="d-flex align-items-center mb-2">
                <MapPin size={16} className="text-primary me-2 flex-shrink-0" />
                <span className="fw-bold text-dark text-truncate">{selectedAppointment.hospitalName}</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <FileText size={16} className="text-primary me-2 flex-shrink-0" />
                <span className="text-dark text-truncate">{selectedAppointment.departmentName || "แผนกคัดกรอง"}</span>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-center gap-2">
            <Button variant="secondary" onClick={() => setShowCancelModal(false)} className="rounded-pill px-4">กลับ</Button>
            <Button variant="danger" onClick={confirmCancel} className="rounded-pill px-4">ยืนยันยกเลิก</Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showPostponeModal} onHide={() => setShowPostponeModal(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold fs-5 text-primary">ต้องการเลื่อนนัด?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center pb-4">
          <div className="text-primary mb-3">
            <ArrowRightCircle size={48} />
          </div>
          <p className="text-dark fw-medium">ระบบจะทำการ <span className="text-danger">ยกเลิกนัดหมายเดิม (สถานะรอตรวจสอบ)</span> <br /> และพาคุณไปเลือกวันนัดหมายใหม่</p>
          <p className="text-muted small">คุณต้องการดำเนินการต่อหรือไม่?</p>
          <div className="d-flex justify-content-center gap-2 mt-4">
            <Button variant="secondary" onClick={() => setShowPostponeModal(false)} className="rounded-pill px-4">ยกเลิก</Button>
            <Button variant="primary" onClick={confirmPostpone} className="rounded-pill px-4" style={{ backgroundColor: '#001E6C' }}>ไปเลือกวันใหม่</Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered size="sm">
        <Modal.Body className="text-center py-4">
          <div className="text-success fs-1 mb-2"><CheckCircle2 /></div>
          <h5 className="fw-bold">ดำเนินการสำเร็จ</h5>
        </Modal.Body>
      </Modal>

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