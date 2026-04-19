import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDoctors } from "../utils/doctorUtils";
import "./DoctorList.css";
import resolveAssetPath from "../utils/assetPath.js";
import hospitalMap from "../data/hospitaldata.jsx/allhospitaldata";

const PAGE_SIZE = 8;
const ALL_DEPARTMENTS = "All departments";
const ALL_HOSPITALS = "All hospitals";
const DOCTOR_AVATAR_PATHS = {
  male: "images/Doctor-Boy.jpg",
  female: "images/Doctor-Girl.jpg",
};
const MALE_MARKERS = ["นพ.", "นายแพทย์", "dr.", "mr.", "sir"];
const FEMALE_MARKERS = ["พญ.", "แพทย์หญิง", "นางแพทย์", "mrs.", "ms.", "madam"];

const getInitials = (text) => {
  if (!text) return "DR";
  const tokens = text
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((token) => token.charAt(0).toUpperCase());
  return tokens.join("") || "DR";
};

const detectDoctorGender = (name = "") => {
  const normalized = name?.toLowerCase?.() ?? "";
  if (!normalized) return "unknown";
  if (MALE_MARKERS.some((marker) => normalized.includes(marker.toLowerCase()))) {
    return "male";
  }
  if (FEMALE_MARKERS.some((marker) => normalized.includes(marker.toLowerCase()))) {
    return "female";
  }
  return "unknown";
};

const getDoctorAvatarPath = (doctor) => {
  if (!doctor) return "";
  let gender = detectDoctorGender(doctor.name);
  if (gender === "unknown" && doctor.id) {
    gender = (doctor.id % 2 === 0) ? "female" : "male";
  }
  return DOCTOR_AVATAR_PATHS[gender] ?? "";
};

export default function DoctorList() {
  const navigate = useNavigate();
  const [doctorPool, setDoctorPool] = useState([]);

  useEffect(() => {
    const allStaticDoctors = getAllDoctors();
    Promise.all([
      fetch("http://127.0.0.1:3000/data/getDoctors").then(res => res.json()),
      fetch("http://127.0.0.1:3000/data/getSpecialties").then(res => res.json()),
      fetch("http://127.0.0.1:3000/data/getHospital").then(res => res.json())
    ])
      .then(([docsData, specsData, hospData]) => {
        if (docsData.message === "Success" && docsData.doctors) {
          const specsMap = {};
          if (specsData.message === "Success" && specsData.specialties) {
            specsData.specialties.forEach(sp => {
              specsMap[sp.id] = sp.name;
            });
          }

          const hospMap = {};
          if (hospData.message === "Success" && hospData.hospitals) {
            hospData.hospitals.forEach(h => {
              hospMap[h.hospital_id] = h.name;
            });
          }

          const merged = docsData.doctors.map(dbDoc => {
            const name = `${dbDoc.prefix ? dbDoc.prefix + ' ' : ''}${dbDoc.first_name} ${dbDoc.last_name}`.trim();
            const staticDoc = allStaticDoctors.find(d => d.name === name) || {};
            
            return {
              ...staticDoc,
              id: dbDoc.id,
              name: name,
              specialization: dbDoc.specialization || staticDoc.specialization || specsMap[dbDoc.specialty_id] || "แพทย์ทั่วไป",
              dept: staticDoc.dept || specsMap[dbDoc.specialty_id] || "ทั่วไป",
              hospital: staticDoc.hospital || hospMap[dbDoc.hospital_id] || "โรงพยาบาล",
            };
          });
          setDoctorPool(merged);
        }
      })
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const departmentOptions = useMemo(() => {
    const names = doctorPool
      .map((doc) => doc.dept)
      .filter(Boolean);
    return [ALL_DEPARTMENTS, ...Array.from(new Set(names))];
  }, [doctorPool]);

  const hospitalOptions = useMemo(() => {
    const names = doctorPool
      .map((doc) => doc.hospital)
      .filter(Boolean);
    return [ALL_HOSPITALS, ...Array.from(new Set(names))];
  }, [doctorPool]);

  const [dept, setDept] = useState(departmentOptions[0]);
  const [hospital, setHospital] = useState(hospitalOptions[0]);
  const [q, setQ] = useState("");
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const isProfileOpen = Boolean(selectedDoctor);

  useEffect(() => {
    setStep(1);
  }, [dept, hospital, q]);

  const filteredDoctors = useMemo(() => {
    const term = q.trim().toLowerCase();
    return doctorPool
      .filter((doctor) => (dept === ALL_DEPARTMENTS ? true : doctor.dept === dept))
      .filter((doctor) => (hospital === ALL_HOSPITALS ? true : doctor.hospital === hospital))
      .filter((doctor) => {
        if (!term) return true;
        return (
          doctor.name.toLowerCase().includes(term) || doctor.specialization.toLowerCase().includes(term)
        );
      });
  }, [doctorPool, dept, hospital, q]);

  const totalSteps = Math.max(1, Math.ceil(filteredDoctors.length / PAGE_SIZE));

  useEffect(() => {
    setStep((prev) => Math.min(prev, totalSteps));
  }, [totalSteps]);

  const startIndex = (step - 1) * PAGE_SIZE;
  const pageDoctors = filteredDoctors.slice(startIndex, startIndex + PAGE_SIZE);

  const handleNext = () => {
    if (step < totalSteps) setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  useEffect(() => {
    if (!isProfileOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedDoctor(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isProfileOpen]);

  const handleOpenProfile = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseProfile = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="doctor-page-container min-vh-100 py-5">
      <div className="container">
        <div className="text-center mb-5">
          <div className="section-title-wrapper">
            <h1 className="fw-bold text-black mb-0">รายชื่อแพทย์</h1>
          </div>
        </div>

        {/* Filter Card */}
        <div className="card shadow-sm border-0 rounded-4 mb-5 filter-card">
          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-md-4 col-12">
                <label className="form-label fw-bold text-secondary small text-uppercase">Department (แผนก)</label>
                <select className="form-select border-0 bg-light rounded-3" value={dept} onChange={(e) => setDept(e.target.value)}>
                  {departmentOptions.map((option) => (
                    <option key={option}>{option}</option>
                   ))}
                </select>
              </div>
              <div className="col-md-4 col-12">
                <label className="form-label fw-bold text-secondary small text-uppercase">Hospital (โรงพยาบาล)</label>
                <select className="form-select border-0 bg-light rounded-3" value={hospital} onChange={(e) => setHospital(e.target.value)}>
                  {hospitalOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 col-12">
                <label className="form-label fw-bold text-secondary small text-uppercase">Search (ค้นหาชื่อแพทย์)</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 rounded-start-3">
                    <i className="bi bi-search text-muted" />
                  </span>
                  <input
                    className="form-control bg-light border-0 rounded-end-3"
                    placeholder="Find doctor or specialty..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Info */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 px-2">
          <div>
            <h5 className="mb-0 fw-bold text-dark">ทีมแพทย์ผู้เชี่ยวชาญ</h5>
            <small className="text-muted">พบแพทย์ทั้งหมด {filteredDoctors.length} ท่าน</small>
          </div>
        </div>

        {/* Results Grid */}
        {pageDoctors.length > 0 ? (
          <div className="row g-4 mb-5">
            {pageDoctors.map((doctor, idx) => {
              const avatarPath = getDoctorAvatarPath(doctor);
              const avatarSrc = avatarPath ? resolveAssetPath(avatarPath) : "";
              const hospitalLogoSrc = doctor.hospitalLogo ? resolveAssetPath(doctor.hospitalLogo) : null;
              
              return (
                <div className="col-lg-3 col-md-4 col-sm-6" key={doctor.id}>
                  <div className="card shadow-sm border-0 h-100 rounded-4 text-center profile-card-hover">
                    <div className="card-body p-4 d-flex flex-column align-items-center">
                      
                      {/* Avatar with Hospital Badge */}
                      <div className="doctor-avatar-wrapper">
                        <div 
                          className="rounded-circle overflow-hidden shadow-sm w-100 h-100 border border-3 border-white bg-light"
                        >
                          {avatarSrc ? (
                            <img src={avatarSrc} alt={doctor.name || "Doctor"} className="w-100 h-100" style={{ objectFit: "cover" }} />
                          ) : (
                            <div className="w-100 h-100 d-flex align-items-center justify-content-center text-secondary fw-bold fs-4">
                              {getInitials(doctor.name)}
                            </div>
                          )}
                        </div>
                        {hospitalLogoSrc && (
                          <div className="hospital-badge">
                            <img src={hospitalLogoSrc} alt={doctor.hospital} title={doctor.hospital} />
                          </div>
                        )}
                      </div>

                      <h5 className="doctor-name mb-1 text-truncate w-100" title={doctor.name || "Unnamed doctor"}>
                        {doctor.name || "Unnamed doctor"}
                      </h5>
                      <div className="mb-3">
                        <span className="dept-tag">{doctor.dept}</span>
                      </div>
                      
                      <p className="small text-muted mb-2 text-truncate w-100">
                        <i className="bi bi-building me-1"></i> {doctor.hospital}
                      </p>

                      {doctor.specialization && (
                         <p className="text-secondary small mb-3 lines-2 px-2">{doctor.specialization}</p>
                      )}

                      <div className="mt-auto w-100 d-grid gap-2">
                        <button
                          onClick={() => {
                            const hospitalEntry = Object.values(hospitalMap).find(h => h.info?.name === doctor.hospital);
                            const deptObj = hospitalEntry?.info?.departments?.find(d => d.name === doctor.dept);
                            const deptId = deptObj?.id ?? doctor.dept;
                            navigate("/queue3", { 
                              state: { 
                                selectedHospital: doctor.hospital, 
                                selectedDepartment: deptId, 
                                selectedDoctor: doctor.id,
                                doctorName: doctor.name,
                                hospitalName: doctor.hospital,
                                departmentName: doctor.dept
                              } 
                            });
                          }}
                          className="btn btn-primary rounded-pill btn-sm border-0 py-2 fw-bold shadow-none"
                          style={{ backgroundColor: "#001B45" }}
                        >
                          ทำการนัดหมาย
                        </button>
                        <button 
                          className="btn btn-outline-light text-dark border rounded-pill btn-sm py-2 fw-bold shadow-none"
                          onClick={() => handleOpenProfile(doctor)}
                        >
                          ดูประวัติ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-5 my-5 bg-white rounded-4 shadow-sm border-0 filter-card">
            <i className="bi bi-search text-muted opacity-50 mb-3" style={{ fontSize: "3rem" }}></i>
            <h5 className="text-muted fw-normal">ไม่พบรายชื่อแพทย์ที่ตรงตามเงื่อนไข</h5>
          </div>
        )}

        {/* Pagination */}
        <div className="d-flex justify-content-center align-items-center gap-3">
          <button 
            className="btn btn-outline-secondary rounded-pill px-4 pagination-btn bg-white" 
            onClick={handlePrev} 
            disabled={step === 1}
          >
            ก่อนหน้า
          </button>
          <span className="text-muted small fw-bold">หน้าที่ {step} จาก {totalSteps}</span>
          <button
            className="btn btn-primary rounded-pill px-4 pagination-btn border-0"
            style={{ backgroundColor: "#001B45" }}
            onClick={handleNext}
            disabled={step === totalSteps || filteredDoctors.length === 0}
          >
            ถัดไป
          </button>
        </div>
      </div>

      {/* Profile Modal Overlay */}
      {isProfileOpen && selectedDoctor && (
        <div 
          className="position-fixed inset-0 min-vh-100 w-100 d-flex align-items-center justify-content-center p-3" 
          style={{ zIndex: 9999, backgroundColor: "rgba(0,0,0,0.5)", top: 0, left: 0 }} 
          onClick={handleCloseProfile}
        >
          <div 
            className="bg-white rounded-4 shadow-lg overflow-hidden position-relative" 
            style={{ maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="btn-close position-absolute top-0 end-0 m-3 bg-light p-2 rounded-circle shadow-sm" 
              onClick={handleCloseProfile}
              aria-label="Close"
            ></button>

            {/* Header / Avatar */}
            <div className="bg-light p-4 text-center border-bottom">
              {(() => {
                const avatarPath = getDoctorAvatarPath(selectedDoctor);
                const avatarSrc = avatarPath ? resolveAssetPath(avatarPath) : "";
                return (
                  <div 
                    className="rounded-circle overflow-hidden shadow-sm mx-auto mb-3 border border-3 border-white" 
                    style={{ width: "110px", height: "110px", backgroundColor: "#e9ecef" }}
                  >
                    {avatarSrc ? (
                      <img src={avatarSrc} alt={selectedDoctor.name} className="w-100 h-100" style={{ objectFit: "cover" }} />
                    ) : (
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center text-secondary fw-bold fs-2">
                        {getInitials(selectedDoctor.name)}
                      </div>
                    )}
                  </div>
                );
              })()}
              <h4 className="fw-bold mb-1 text-dark">{selectedDoctor.name || "Unnamed doctor"}</h4>
              <p className="text-secondary mb-2">{selectedDoctor.specialization || "General practitioner"}</p>
              <div className="d-flex justify-content-center gap-2">
                {selectedDoctor.dept && <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 border border-primary-subtle">{selectedDoctor.dept}</span>}
                {selectedDoctor.hospital && <span className="badge bg-light text-dark rounded-pill px-3 py-2 border">{selectedDoctor.hospital}</span>}
              </div>
            </div>

            {/* Details */}
            <div className="p-4">
              <div className="mb-4 bg-light rounded-3 p-3 d-flex align-items-center gap-3 border">
                {selectedDoctor.hospitalLogo ? (
                  <div className="bg-white rounded p-1 border shadow-sm" style={{ width: "50px", height: "50px" }}>
                    <img src={resolveAssetPath(selectedDoctor.hospitalLogo)} alt={selectedDoctor.hospital} className="w-100 h-100" style={{ objectFit: "contain" }} />
                  </div>
                ) : (
                  <div className="bg-white rounded p-1 border shadow-sm d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                    <i className="bi bi-building text-muted fs-4"></i>
                  </div>
                )}
                <div>
                  <h6 className="fw-bold text-dark mb-0">{selectedDoctor.hospital || "N/A"}</h6>
                  <small className="text-muted">{selectedDoctor.dept || "Department not specified"}</small>
                </div>
              </div>

              {selectedDoctor.education && (
                <div className="mb-4">
                  <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-2">
                    <i className="bi bi-mortarboard-fill text-secondary"></i> ประวัติการศึกษา
                  </h6>
                  <p className="text-secondary small mb-0 lh-lg">{selectedDoctor.education}</p>
                </div>
              )}

              {selectedDoctor.bio && (
                <div className="mb-4">
                  <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-2">
                    <i className="bi bi-person-lines-fill text-secondary"></i> ประวัติย่อ
                  </h6>
                  <p className="text-secondary small mb-0 lh-lg">{selectedDoctor.bio}</p>
                </div>
              )}
              {Array.isArray(selectedDoctor.schedule) && selectedDoctor.schedule.length > 0 && (
                <div className="doctor-profile-modal__section">
                  <h6>Available slots</h6>
                  <ul className="doctor-profile-modal__schedule list-unstyled mb-0">
                    {selectedDoctor.schedule.map((slot, idx) => (
                      <li key={`${slot?.day || "day"}-${slot?.time || "time"}-${idx}`}>
                        <span>{slot?.day || "—"}</span>
                        <span>{slot?.time || "—"}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="doctor-profile-modal__actions">
              <button
                onClick={() => {
                  const hospitalEntry = Object.values(hospitalMap).find(h => h.info?.name === selectedDoctor.hospital);
                  const deptObj = hospitalEntry?.info?.departments?.find(d => d.name === selectedDoctor.dept);
                  const deptId = deptObj?.id ?? selectedDoctor.dept;
                  navigate("/queue3", { 
                    state: { 
                      selectedHospital: selectedDoctor.hospital, 
                      selectedDepartment: deptId, 
                      selectedDoctor: selectedDoctor.id,
                      doctorName: selectedDoctor.name,
                      hospitalName: selectedDoctor.hospital,
                      departmentName: selectedDoctor.dept
                    } 
                  });
                }}
                className="btn btn-primary rounded-pill px-4"
              >
                Book appointment
              </button>
              <button className="btn btn-outline-secondary rounded-pill px-4" onClick={handleCloseProfile}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
