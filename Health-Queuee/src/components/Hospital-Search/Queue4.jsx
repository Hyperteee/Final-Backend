import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router"
import hospitalMap from "../../data/hospitaldata.jsx/allhospitaldata";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/esm/Button";
import { UserAppointment } from "../../data/context/appointment";
import Modal from 'react-bootstrap/Modal'
import "./Queue4.css"; 

const Queue4 = () => {

    const { state } = useLocation()
    const navigate = useNavigate()
    
    // ดึงข้อมูลจาก State ที่ส่งมาจากหน้า Queue3
    const { selectedHospital, selectedDepartment, selectedDoctor, priority1Date, priority2Date, departmentName, doctorName } = state || {};
    
    const hospitalData = hospitalMap[selectedHospital]?.info || null;
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            setCurrentUser(user);
        } else {
            alert("กรุณาเข้าสู่ระบบก่อนทำการจอง");
            navigate('/login');
        }
    }, [])
    const formatDateThai = (date) => {
        if (!date) return "-";
        const d = new Date(date);
        const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
        // แปลงปีเป็น พ.ศ. (d.getFullYear() + 543)
        return `${d.getDate()} ${thaiMonths[d.getMonth()]} ${d.getFullYear() + 543}`;
    };

    const [symptom, setSymptom] = useState("");
    const [files, setFiles] = useState([]);
    const [show, setShow] = useState(false);

    const { addAppointment } = useContext(UserAppointment)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const steps = [
        { id: 1, label: "เลือกแผนก" },
        { id: 2, label: "เลือกแพทย์" },
        { id: 3, label: "เลือกวันนัด" },
        { id: 4, label: "กรอกอาการ" }   
    ];
    const currentStep = 4; 
    const isStepActive = (stepNumber) => stepNumber <= currentStep;

    const handleFileSelect = (e) => {
        if(e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]); 
        }
    };

    const handleRemoveFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    // --- LOGIC บันทึกข้อมูล ---
    const handleConfirm = async () => {
        const now = new Date();

        // Prepare POST data using backend schema
        const d = new Date(priority1Date);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const appointment_date = `${yyyy}-${mm}-${dd}`;

        // "ให้ตอนแรกใส่เป็นเวลาที่กดแล้วค่อยมา put ใหม่เป็นเวลานัด" => ส่งเวลาปัจจุบันไปก่อน
        const appointment_time = now.toTimeString().split(' ')[0]; // format HH:MM:SS

        const userId = currentUser?.userId || currentUser?.id || 1;
        const postData = {
            user_id: userId, 
            doctor_id: selectedDoctor || null,
            appointment_date: appointment_date,
            priority2_date: priority2Date,
            appointment_time: appointment_time,
            symptom: symptom,
            status: "pending"
        };

        try {
            const response = await fetch("http://127.0.0.1:3000/data/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                const errBody = await response.text();
                throw new Error("Failed to create appointment in DB: " + errBody);
            }

            const data = await response.json();
            console.log("Appointment Created in DB:", data);

            // เก็บใน Context เดิมไว้เผื่อ component อื่นยังต้องใช้ข้อมูลละเอียด
            const realId = data?.data?.insertId;
            if (!realId) throw new Error("Database did not return an insertId");

            const newAppointment = {
                id: realId,
                userId: userId, 
                name: currentUser?.name || currentUser?.first_name || "ผู้ใช้งาน",
                lastname: currentUser?.lastname || currentUser?.last_name || "",
                phone: currentUser?.phone,
                birthDate: currentUser?.birthDate,
                nationality: currentUser?.nationality,
                identificationNumber: currentUser?.identificationNumber || currentUser?.idCard,
                
                hospitalId: hospitalData?.id || selectedHospital,
                hospitalName: state.hospitalName || selectedHospital,
                departmentId: selectedDepartment,
                departmentName: departmentName,
                doctorId: selectedDoctor || null,
                doctorName: doctorName,

                priority1Date: priority1Date,
                priority2Date: priority2Date,
                
                symptom: symptom,
                files: files.map(file => ({ name: file.name, size: file.size, type: file.type })),

                status: "NEW", 
                
                createdAt: now.toISOString(), 
                updatedAt: now.toISOString(), 
                
                batchId: null,
                suggestedDate: null,
                confirmedDate: null,
                resultNote: null
            };
            addAppointment(newAppointment);
            
            handleShow();
        } catch (error) {
            console.error("Error creating appointment:", error);
            alert("เกิดข้อผิดพลาดในการจองคิว โปรดลองอีกครั้ง");
        }
    };

    const handleFinished = () => {
        navigate("/profilebook");
    };

    return (
        <>
        <div className="d-flex flex-column align-items-center bg-light min-vh-100 pb-5">
            
            <div className="mt-5 fs-4 text-center w-100" style={{ maxWidth: '800px' }}>
                <div className="fw-bold fs-3 mb-2" style={{ color: 'black', marginTop: '35px' }}>ทำนัด</div>
                
                <div className="d-flex justify-content-center gap-3 mb-4">
                    <div className="bg-primary-subtle rounded-2 px-3 py-2 fw-semibold" style={{ color: "#001E6C" }}>
                        โรงพยาบาล{selectedHospital}
                    </div>
                    <div className="bg-primary-subtle rounded-2 px-2 py-2 fw-semibold" style={{ color: "#001E6C" }}>
                        {departmentName || (selectedDepartment === "ไม่รู้แผนก" ? "คัดกรอง" : "แผนกทั่วไป")}
                    </div>
                </div>

                <div 
                    className="d-flex justify-content-center align-items-start px-3 mb-4 mx-auto" 
                    style={{ maxWidth: '600px', width: '100%'  }}
                >
                    {steps.map((step, index) => {
                        const active = isStepActive(step.id);
                        return (
                            <React.Fragment key={step.id}>
                                <div className="d-flex flex-column align-items-center" style={{ zIndex: 2, minWidth: '80px' }}>
                                    <div className={`step ${active ? "step-active" : "step-inactive"}`}>
                                        {step.id}
                                    </div>
                                    <span className="mt-2 small text-nowrap" style={{ color: active ? '#001E6C' : '#9ca3af', fontWeight: active ? 'bold' : 'normal', fontSize: '14px' }}>
                                        {step.label}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div style={{ flexGrow: 1, minWidth: '20px', height: '2px', backgroundColor: isStepActive(steps[index + 1].id) ? '#001E6C' : '#e5e7eb', marginTop: '19px', alignSelf: 'flex-start' }}></div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <div className="container bg-white shadow-lg rounded-4 p-5 mt-4" style={{ maxWidth: '900px' }}>
                <div className="row">
                    
                    <div className="col-md-5 border-end pe-4">
                        <h5 className="fw-bold mb-4 text-dark border-bottom pb-2">สรุปข้อมูลการนัด</h5>
                        
                        <div className="d-flex flex-column align-items-center text-center mb-4">
                            <div className="doctor-card__avatar">
                                {selectedDoctor ? 
                                    <i className="bi bi-person-fill fs-2 text-secondary"></i> : 
                                    <i className="bi bi-hospital-fill fs-2 text-secondary"></i>
                                }
                            </div>
                            <h6 
                                className="fw-bold mb-1" 
                                style={{ color: '#001E6C' }}
                            >
                                {doctorName || (selectedDepartment === "ไม่รู้แผนก" ? "เจ้าหน้าที่คัดกรอง" : "แพทย์เวร")}
                            </h6>
                            <small className="text-muted">{departmentName || "ไม่ระบุ"}</small>
                        </div>

                        <div className="info-group mb-3">
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">วันนัดหลัก (P1):</span>
                                <span className="fw-semibold text-dark">{formatDateThai(priority1Date)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">วันนัดรอง (P2):</span>
                                <span className="fw-semibold text-dark">{formatDateThai(priority2Date)}</span>
                            </div>
                        </div>
                        
                        <div className="alert alert-primary d-flex align-items-center" role="alert">
                            <i className="bi bi-info-circle-fill me-2"></i>
                            <div className="small">
                                กรุณารอการยืนยันจากโรงพยาบาล <br/>
                                ภายใน 24-48 ชั่วโมง
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7 ps-md-5 pt-3 pt-md-0">
                        <h5 className="fw-bold mb-3">อธิบายอาการเบื้องต้น <span className="text-danger">*</span></h5>
                        <Form>
                            <Form.Group className="mb-4">
                                <Form.Control 
                                    as="textarea" 
                                    rows={6} 
                                    placeholder="พิมพ์อาการหรือปัญหาสุขภาพของท่าน..." 
                                    value={symptom}
                                    onChange={(e) => setSymptom(e.target.value)} 
                                />
                                <Form.Text className="text-muted mt-2">
                                    <i className="bi bi-exclamation-triangle-fill text-warning me-1"></i> กรุณากรอกรายละเอียดอาการให้ชัดเจน
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">แนบไฟล์ หรือรูปภาพประกอบ (ถ้ามี)</Form.Label>
                                <div className="d-flex gap-2">
                                    <Form.Control type="file" multiple onChange={handleFileSelect} className="form-control-sm" />
                                </div>
                            </Form.Group>

                            {files.length > 0 && (
                                <div className="mb-3">
                                    <p className="small text-muted mb-1">ไฟล์ที่เลือก:</p>
                                    <div className="file-list">
                                        {files.map((file, index) => (
                                            <div key={index} className="file-list-item d-flex justify-content-between align-items-center border p-2 mb-1 rounded">
                                                <span><i className="bi bi-file-earmark-text me-2"></i> {file.name}</span>
                                                <button type="button" className="btn-close" style={{fontSize: '0.7rem'}} onClick={() => handleRemoveFile(index)}></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Form>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-between w-100 mt-4 px-4" style={{ maxWidth: '900px' }}>
                <Button 
                    variant="outline-primary" 
                    className="rounded-pill px-4 py-2 fw-bold" 
                    style={{ borderColor: '#001E6C', color: '#001E6C' }} // Outline Primary
                    onClick={() => navigate(-1)}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    ย้อนกลับ
                </Button>
                <Button
                    variant="primary"
                    className="rounded-pill px-5 py-2 fw-bold shadow-sm"
                    style={{ backgroundColor: '#001E6C', border: 'none' }} // Solid Primary
                    onClick={handleConfirm}
                    disabled={!symptom.trim()}
                >
                    ยืนยันการจอง <i className="bi bi-check-circle ms-2"></i>
                </Button>
            </div>

            <Modal 
                show={show} 
                onHide={handleClose} 
                backdrop="static" 
                keyboard={false} 
                centered
                className="success-modal"
            >
                <Modal.Body className="p-0">
                    <div className="success-modal-content text-center">
                        
                        <div className="success-icon-wrapper mb-4">
                            <div className="success-icon-circle">
                                <i className="bi bi-check-lg"></i>
                            </div>
                            <div className="success-icon-ripple"></div>
                        </div>

                        <h3 className="fw-bold mb-3" style={{ color: '#001E6C' }}>จองสำเร็จ!</h3>
                        <p className="text-muted mb-4 px-4">
                            ระบบได้รับข้อมูลการนัดหมายของท่านเรียบร้อยแล้ว
                            ท่านสามารถตรวจสอบสถานะได้ที่เมนูประวัติการจอง
                        </p>

                        <Button 
                            variant="primary" 
                            className="success-btn rounded-pill px-5 py-2 fw-bold" 
                            style={{ backgroundColor: '#001E6C', border: 'none' }} 
                            onClick={handleFinished} 
                        >
                            ตกลง
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
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
        </>
    );
}

export default Queue4;