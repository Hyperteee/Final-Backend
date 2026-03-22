import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import React from "react";
import "./Queue1.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import hospitalMap from "../../data/hospitaldata.jsx/allhospitaldata";
import { useTranslation } from "react-i18next";

function Queue1() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { selectedHospital } = state || {};
  console.log("selectedHospital:", selectedHospital);
  const [department, setDepartment] = useState(null);
  const [show, setShow] = useState(false);
  const [chooseDoctor, setChooseDoctor] = useState(null);
  const [departmentName, setDepartmentName] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const [backendSpecialties, setBackendSpecialties] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/data/getSpecialties")
      .then(res => res.json())
      .then(data => {
        if (data.message === "Success" && data.specialties) {
          setBackendSpecialties(data.specialties);
        }
      })
      .catch(err => console.error("Error fetching specialties:", err));
  }, []);

  const hospitalData = hospitalMap[selectedHospital]?.info || null;

  function handleNext(department, chooseDoctor, selectedHospital) {
    if (department === "ไม่รู้แผนก" || chooseDoctor === "dontChoose") {
      navigate("/queue3", {
        state: {
          selectedHospital,
          selectedDoctor: null,
          selectedDepartment: department,
          departmentName,
        },
      });
    } else if (chooseDoctor === "choose") {
      navigate("/queue2", {
        state: {
          selectedDepartment: department,
          optionChooseDoctor: chooseDoctor,
          selectedHospital,
          departmentName,
        },
      });
    }
  }

  const steps = [
    { id: 1, label: t('step_dept') },
    { id: 2, label: t('step_doc') },
    { id: 3, label: t('step_date') },
    { id: 4, label: t('step_symptom') },
  ];
  const currentStep = 1;
  const isStepActive = (stepNumber) => stepNumber <= currentStep;

  return (
    <div>
      <div className="d-flex flex-column align-items-center bg-light min-vh-100 pb-5">
        <div
          className="fs-4 text-center "
          style={{ maxWidth: "600px", width: "100%", marginTop: "85px" }}
        >
          <div className="fw-bold fs-3 mb-2" style={{ color: "black" }}>
            {t('appointment_title')}
          </div>

          <div className="d-flex justify-content-center mb-4">
            <div
              className="bg-primary-subtle rounded-2 px-3 py-2 fw-semibold"
              style={{ color: "#11248f" }}
            >
              {t('hospital_prefix')}{selectedHospital}
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-start px-3 mb-4">
            {steps.map((step, index) => {
              const active = isStepActive(step.id);
              return (
                <React.Fragment key={step.id}>
                  <div
                    className="d-flex flex-column align-items-center"
                    style={{ zIndex: 2, minWidth: "80px" }}
                  >
                    <div
                      className={`step ${active ? "step-active" : "step-inactive"
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
        </div>

        <div
          className="d-flex flex-column align-items-center w-100 px-4"
          style={{ maxWidth: "900px" }}
        >
          <div className="zone-option d-flex flex-column mb-5 w-100">
            <div className="fw-bold mb-4 fs-5" style={{ color: "#001E6C" }}>
              {t('section_1_title')}
            </div>
            <div className="d-flex justify-content-center gap-4 w-100">
              <div
                className={`option ${department !== null && department !== "ไม่รู้แผนก"
                    ? "option-active"
                    : ""
                  }`}
                onClick={handleShow}
              >
                <i
                  className="bi bi-hospital fs-3 me-3"
                  style={{ color: "#001E6C" }}
                ></i>
                <div className="d-flex p-5 flex-column align-items-start">
                  <span className="fw-bold">
                    {t('step_dept')}
                  </span>
                  {departmentName && department !== "ไม่รู้แผนก" ? (
                    <span className="small text-success">
                      {t('selected')}: {departmentName}
                    </span>
                  ) : (
                    <span className="small text-muted">
                      {t('click_to_select')}
                    </span>
                  )}
                </div>
              </div>

              <div
                className={`option ${department === "ไม่รู้แผนก" ? "option-active" : ""
                  }`}
                onClick={() => {
                  setDepartment("ไม่รู้แผนก");
                  setDepartmentName(t('unknown_dept'));
                  setChooseDoctor("dontChoose");
                }}
              >
                <i
                  className="bi bi-question-circle-fill fs-3 me-3"
                  style={{ color: "#001E6C" }}
                ></i>
                <div className="d-flex flex-column align-items-start ">
                  <span className="fw-bold">
                    {t('unknown_dept')}
                  </span>
                  <span className="small text-muted">
                    {t('screening_desc')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {department && department !== "ไม่รู้แผนก" && (
            <div className="zone-option d-flex flex-column mb-5 w-100">
              <div className="fw-bold mb-3 fs-5" style={{ color: "#001E6C" }}>
                {t('section_2_title')}
              </div>
              <div className="d-flex justify-content-center gap-4 w-100">
                <div
                  className={`option ${chooseDoctor === "choose" ? "option-active" : ""
                    }`}
                  onClick={() => setChooseDoctor("choose")}
                >
                  <i
                    className="bi bi-person-fill fs-3 me-3"
                    style={{ color: "#001E6C" }}
                  ></i>
                  <div className="d-flex flex-column align-items-start">
                    <span className="fw-bold">{t('choose_doc_self')}</span>
                    <span className="small text-muted">
                      {t('choose_doc_desc')}
                    </span>
                  </div>
                </div>

                <div
                  className={`option ${chooseDoctor === "dontChoose" ? "option-active" : ""
                    }`}
                  onClick={() => setChooseDoctor("dontChoose")}
                >
                  <i
                    className="bi bi-people-fill fs-3 me-3"
                    style={{ color: "#001E6C" }}
                  ></i>
                  <div className="d-flex flex-column align-items-start">
                    <span className="fw-bold">
                      {t('let_hospital_choose')}
                    </span>
                    <span className="small text-muted">
                      {t('hospital_assign_desc')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Modal
            className="department-modal"
            size="lg"
            show={show}
            onHide={handleClose}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold modal-title">
                {t('modal_title')}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-body department-grid-container">
              <p className="text-center text-muted mb-4 department-instruction">
                {t('modal_instruction')}
              </p>
              <div className="department-grid-list">
                {backendSpecialties
                  ?.filter((dep) => dep.name !== "ไม่รู้แผนก")
                  ?.map((dep) => (
                    <div
                      key={dep.id}
                      className="option-department"
                      onClick={() => {
                        setDepartment(dep.id);
                        setDepartmentName(dep.name);
                        setChooseDoctor(null);
                        handleClose();
                      }}
                    >
                      {dep.logo ? (
                        <img src={dep.logo} alt={`Icon for ${dep.name}`} />
                      ) : (
                        <div className="default-icon-placeholder">
                          <i
                            className="bi bi-hospital fs-1"
                            style={{ color: "#001E6C" }}
                          ></i>
                        </div>
                      )}
                      <span className="fw-semibold">{dep.name}</span>
                    </div>
                  ))}
              </div>
            </Modal.Body>
          </Modal>
        </div>

        <div
          className="d-flex justify-content-end w-100 px-4"
          style={{ maxWidth: "900px" }}
        >
          <Button
            className="nextButton px-5 py-2 rounded-pill fw-bold shadow-lg"
            style={{ backgroundColor: "#001E6C", border: "none" }}
            onClick={() =>
              handleNext(department, chooseDoctor, selectedHospital)
            }
            disabled={
              department === null ||
              (department !== "ไม่รู้แผนก" && chooseDoctor === null)
            }
          >
            <span>{t('next_btn')} </span>
            <i className="bi bi-arrow-right ms-2"></i>
          </Button>
        </div>
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
              {t('system_name')}
            </p>

            <h5 className="fw-bold fs-5 mb-3">{t('contact')}</h5>
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
            <h4 className="fw-bold fs-5 mb-4">{t('products')}</h4>
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
            <h4 className="fw-bold fs-5 mb-4">{t('company')}</h4>
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
            <h4 className="fw-bold fs-5 mb-4">{t('support')}</h4>
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
            &copy; 2025 HFU Healthcare Technologies. {t('rights')}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Queue1;