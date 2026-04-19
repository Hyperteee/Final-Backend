import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import hospitalMap from "../../data/hospitaldata.jsx/allhospitaldata";
import { HospitalScheduleContext } from "../../data/context/allSchedule";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Queue3.css";
// ต้องมั่นใจว่ามีการ import bootstrap icons ใน project หลัก เช่น <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

const thaiDays = [
  "อาทิตย์",
  "จันทร์",
  "อังคาร",
  "พุธ",
  "พฤหัสบดี",
  "ศุกร์",
  "เสาร์",
];

const Queue3 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // --- Data & Context ---
  const { selectedHospital, selectedDoctor, selectedDepartment, departmentName, doctorName } = state || {};
  const { hospitalSchedules } = useContext(HospitalScheduleContext);
  const hospitalData = hospitalMap[selectedHospital]?.info || null;

  const [show, setShow] = useState(false);
  const [currentDepartmentId, setCurrentDepartmentId] =
    useState(selectedDepartment);
  const [priority1Date, setPriority1Date] = useState(null);
  const [priority2Date, setPriority2Date] = useState(null);
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    if (selectedDepartment === "ไม่รู้แผนก") {
      const dontKnowDept = hospitalData?.departments.find(
        (d) => d.name === "ไม่รู้แผนก" || d.name === "แผนก 0"
      );
      // ใช้ Department ID ของแผนกคัดกรอง หรือ default เป็น BKK001-D00 ถ้าหาไม่เจอ
      setCurrentDepartmentId(dontKnowDept ? dontKnowDept.id : "BKK001-D00");
    } else {
      setCurrentDepartmentId(selectedDepartment);
    }
  }, [selectedDepartment, hospitalData]);

  const currentHospitalSchedule = hospitalSchedules[selectedHospital] || [];
  const departmentSchedule = currentHospitalSchedule.find(
    (dep) => {
      if (dep.departmentId === currentDepartmentId) return true;
      const suffix = `-D${String(currentDepartmentId).padStart(2, '0')}`;
      return typeof currentDepartmentId === 'number' || !isNaN(currentDepartmentId) 
        ? dep.departmentId.endsWith(suffix) 
        : false;
    }
  );

  const selectedDepartmentData =
    selectedDepartment === "ไม่รู้แผนก"
      ? null
      : hospitalData?.departments.find((d) => d.id === currentDepartmentId);

  const DoctorData =
    selectedDoctor != null
      ? selectedDepartmentData?.doctors?.find(
          (doctor) => doctor.id === selectedDoctor
        )
      : null;

  // --- Handlers ---
  const handleClose = () => setShow(false);
  const handleShow = (field) => {
    setActiveField(field);
    setShow(true);
  };

  function getThaiDayName(date) {
    const dayIndex = date.getDay();
    return thaiDays[dayIndex];
  }

  const formatDateDisplay = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  function isDoctorWorking(date) {
    const dayName = getThaiDayName(date);
    let workingDays = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"];
    
    if (departmentSchedule && Array.isArray(departmentSchedule.workingDays)) {
      workingDays = departmentSchedule.workingDays;
    }
    
    return workingDays.includes(dayName);
  }

  const getMinDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // ensure midnight for strict day comparison
    const minBookingDate = new Date(today);
    minBookingDate.setDate(today.getDate() + 7);

    if (activeField === "P1") return minBookingDate;

    if (activeField === "P2" && priority1Date) {
      const minP2Date = new Date(priority1Date);
      minP2Date.setHours(0, 0, 0, 0);
      minP2Date.setDate(minP2Date.getDate() + 3);
      return minP2Date > minBookingDate ? minP2Date : minBookingDate;
    }
    return minBookingDate;
  };

  function handleDateClick(date) {
    if (activeField === "P1") {
      setPriority1Date(date);
      // หากวัน P1 ที่เลือกใหม่ทำให้ P2 ที่มีอยู่ผิดเงื่อนไข ให้รีเซ็ต P2
      if (
        priority2Date &&
        date.getTime() + 3 * 24 * 60 * 60 * 1000 > priority2Date.getTime()
      ) {
        setPriority2Date(null);
      }
    } else if (activeField === "P2") {
      setPriority2Date(date);
    }
    handleClose();
  }

  const handleNext = () => {
    navigate("/queue4", {
      state: {
        ...state,
        priority1Date,
        priority2Date,
        hospitalName: state.hospitalName || selectedHospital,
        departmentName:
          state.departmentName ||
          departmentName ||
          selectedDepartmentData?.name ||
          (selectedDepartment === "ไม่รู้แผนก" ? "คัดกรอง/ทั่วไป" : "ไม่ระบุ"),
        doctorName:
          state.doctorName ||
          doctorName ||
          DoctorData?.name ||
          (selectedDepartment === "ไม่รู้แผนก"
            ? "เจ้าหน้าที่คัดกรอง"
            : "แพทย์เวร"),
      },
    });
  };

  // --- Stepper Config ---
  const steps = [
    { id: 1, label: "เลือกแผนก" },
    { id: 2, label: "เลือกแพทย์" },
    { id: 3, label: "เลือกวันนัด" },
    { id: 4, label: "กรอกอาการ" },
  ];
  
  const currentStep = 3;
  const isStepActive = (stepNumber) => stepNumber <= currentStep;

  console.log("hospitalMap[].schedule:", hospitalMap[selectedHospital]?.schedule);
  console.log("hospitalSchedules['']:", hospitalSchedules[selectedHospital]);

  return (
    <>
      <div className="d-flex flex-column align-items-center bg-light min-vh-100 pb-5">
        <div
          className="mt-5 fs-4 text-center w-100"
          style={{ maxWidth: "800px", width: "100%" }}
        >
          <div className="fw-bold fs-3 mb-2" style={{ color: "black" }}>
            ทำนัด
          </div>

          <div className="d-flex justify-content-center gap-3 mb-4">
            <div
              className="bg-primary-subtle rounded-2 px-3 py-2 fw-semibold"
              style={{ color: "#001E6C" }}
            >
              โรงพยาบาล{selectedHospital}
            </div>
            <div
              className="bg-primary-subtle rounded-2 px-2 py-2 fw-semibold"
              style={{ color: "#001E6C" }}
            >
              {selectedDepartment === "ไม่รู้แผนก"
                ? "คัดกรอง"
                : `แผนก ${departmentName || selectedDepartmentData?.name || selectedDepartment}`}
            </div>
          </div>

          <div
            className="d-flex justify-content-center align-items-start px-3 mb-4 mx-auto"
            style={{ maxWidth: "600px", width: "100%" }}
          >
            {steps.map((step, index) => {
              const active = isStepActive(step.id);
              return (
                <React.Fragment key={step.id}>
                  <div
                    className="d-flex flex-column align-items-center"
                    style={{ zIndex: 2, minWidth: "80px" }}
                  >
                    <div
                      className={`step ${
                        active ? "step-active" : "step-inactive"
                      }`}
                    >
                      {step.id}
                    </div>
                    <span
                      className="mt-2 small text-nowrap"
                      style={{
                        color: active ? "#001E6C" : "#9ca3af",
                        fontWeight: active ? "bold" : "normal",
                        fontSize: "14px",
                      }}
                    >
                      {step.label}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      style={{
                        flexGrow: 1,
                        minWidth: "20px",
                        height: "2px",
                        backgroundColor: isStepActive(steps[index + 1].id)
                          ? "#001E6C"
                          : "#e5e7eb",
                        marginTop: "19px",
                        alignSelf: "flex-start",
                      }}
                    ></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <h4 className="fw-bold mb-4 mt-3" style={{ color: "#001E6C" }}>
            เลือกวันนัดหมายที่สะดวก
          </h4>
        </div>

        <div
          className="container bg-white shadow-lg rounded-4 p-5 mt-4"
          style={{ maxWidth: "900px" }}
        >
          <div className="row">
            <div className="col-md-5 d-flex flex-column align-items-center text-center border-end pe-4">
              <div className="doctor-avatar shadow-sm mb-3">
                {selectedDoctor ? (
                  <i className="bi bi-person-fill fs-1 text-secondary"></i>
                ) : selectedDepartment !== "ไม่รู้แผนก" ? (
                  <i className="bi bi-hospital-fill fs-1 text-secondary"></i>
                ) : (
                  <i className="bi bi-clipboard-check-fill fs-1 text-secondary"></i>
                )}
              </div>

              <h4 className="fw-bold text-dark mb-1">
                {selectedDoctor
                  ? doctorName || DoctorData?.name
                  : selectedDepartment === "ไม่รู้แผนก"
                  ? "เจ้าหน้าที่คัดกรอง"
                  : "แพทย์เวรประจำวัน"}
              </h4>

              <p className="text-muted small mb-3">
                {selectedDepartment === "ไม่รู้แผนก"
                  ? "โรงพยาบาลจะทำการคัดกรองให้"
                  : `แผนก: ${departmentName || selectedDepartmentData?.name || "ไม่ระบุ"}`}
              </p>

              <div className="alert alert-info border-0 bg-info-subtle text-info-emphasis w-100 py-2 small mb-1">
                <i className="bi bi-clock me-1"></i> ต้องจองล่วงหน้าอย่างน้อย 7
                วัน
              </div>

              {selectedDoctor && (
                <div className="alert alert-warning border-0 bg-warning-subtle text-warning-emphasis w-100 py-2 small">
                  <i className="bi bi-info-circle me-1"></i>{" "}
                  วันนัดอ้างอิงตามตารางแผนก
                </div>
              )}
            </div>

            <div className="col-md-7 ps-4 d-flex flex-column justify-content-center">
              <div className="mb-4">
                <label className="form-label fw-bold text-dark">
                  เลือกวันที่ต้องการนัดหลัก
                </label>
                <div
                  className="input-group input-group-lg shadow-sm"
                  onClick={() => handleShow("P1")}
                  style={{ cursor: "pointer" }}
                >
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-calendar-event text-primary"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0"
                    placeholder="เลือกวัน (ล่วงหน้า 7 วัน)"
                    value={formatDateDisplay(priority1Date)}
                    readOnly
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="form-label fw-bold text-dark">
                  เลือกวันที่ต้องการนัดรอง
                </label>
                <div
                  className={`input-group input-group-lg shadow-sm ${
                    !priority1Date ? "opacity-50" : ""
                  }`}
                  onClick={() => priority1Date && handleShow("P2")}
                  style={{ cursor: priority1Date ? "pointer" : "not-allowed" }}
                >
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-calendar-plus text-secondary"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0"
                    placeholder={
                      priority1Date
                        ? "ต้องห่างจากวันหลัก 3 วัน"
                        : "กรุณาเลือกวันหลักก่อน"
                    }
                    value={formatDateDisplay(priority2Date)}
                    readOnly
                    style={{
                      cursor: priority1Date ? "pointer" : "not-allowed",
                    }}
                    disabled={!priority1Date}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-between w-100 mt-4 px-4"
          style={{ maxWidth: "900px" }}
        >
          <Button
            variant="outline-primary"
            className="rounded-pill px-4 py-2 fw-bold"
            style={{ borderColor: "#001E6C", color: "#001E6C" }}
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left me-2"></i>
            ย้อนกลับ
          </Button>
          <Button
            variant="primary"
            className="rounded-pill px-5 py-2 fw-bold"
            style={{ backgroundColor: "#001E6C", border: "none" }}
            onClick={handleNext}
            disabled={!priority1Date}
          >
            ถัดไป
            <i className="bi bi-arrow-right ms-2"></i>
          </Button>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          centered
          className="custom-calendar-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {activeField === "P1"
                ? "เลือกวันนัดหลัก (ล่วงหน้า 7 วัน)"
                : "เลือกวันนัดรอง"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center">
            <Calendar
              onChange={handleDateClick}
              value={activeField === "P1" ? priority1Date : priority2Date}
              minDate={getMinDate()}
              tileDisabled={({ date }) => !isDoctorWorking(date)}
              tileClassName={({ date }) => {
                let classes = isDoctorWorking(date)
                  ? "working-day"
                  : "non-working-day";
                if (
                  activeField === "P2" &&
                  priority1Date &&
                  date.toDateString() === priority1Date.toDateString()
                ) {
                  classes += " non-working-day";
                }
                return classes;
              }}
              locale="th-TH"
              prev2Label={null}
              next2Label={null}
            />
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
};

export default Queue3;
