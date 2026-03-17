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
  female: "images/Doctor-Girl.jpg",};
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

const getDoctorAvatarPath = (name = "") => {
  const gender = detectDoctorGender(name);
  return DOCTOR_AVATAR_PATHS[gender] ?? "";
};

export default function DoctorList() {
  const navigate = useNavigate();
  const doctorPool = useMemo(() => getAllDoctors(), []);

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
    <>
      <section className="doctor-page py-5">
        <div className="doctor-wrapper">
          <div className="doctor-filter-card rounded-4 shadow-sm p-4 mb-4">
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label small">Department</label>
                <select className="form-select rounded-3" value={dept} onChange={(e) => setDept(e.target.value)}>
                  {departmentOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label small">Hospital</label>
                <select className="form-select rounded-3" value={hospital} onChange={(e) => setHospital(e.target.value)}>
                  {hospitalOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label small">Search</label>
                <div className="input-group rounded-3">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-search text-muted" />
                  </span>
                  <input
                    className="form-control border-start-0"
                    placeholder="Find doctor or specialty"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="doctor-summary d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="mb-0">Doctors</h5>
              <small>Found {filteredDoctors.length} doctors</small>
            </div>
            <div className="badge text-bg-light rounded-pill px-3 py-2">
              Page {step} / {totalSteps}
            </div>
          </div>

          <div className="doctor-results-panel">
            {pageDoctors.length > 0 ? (
              <div className="doctor-card-grid">
                {pageDoctors.map((doctor, idx) => {
                  const logoSrc = resolveAssetPath(doctor.hospitalLogo);
                  const rank = startIndex + idx + 1;
                  const rankClassMap = {
                    1: "doctor-card__rank doctor-card__rank--gold",
                    2: "doctor-card__rank doctor-card__rank--silver",
                    3: "doctor-card__rank doctor-card__rank--bronze",
                    4: "doctor-card__rank doctor-card__rank--default",
                  };
                  const rankClass = rankClassMap[rank];
                  const avatarPath = getDoctorAvatarPath(doctor.name);
                  const avatarSrc = avatarPath ? resolveAssetPath(avatarPath) : "";
                  const avatarClassName = `doctor-card__avatar${avatarSrc ? " doctor-card__avatar--image" : ""}`;
                  return (
                    <div className="doctor-card-grid__item" key={doctor.id}>
                      <div className="card border-0 shadow-sm rounded-4 position-relative h-100 doctor-card">
                        {rankClass && <div className={rankClass}>Top {rank}</div>}
                        {logoSrc && (
                          <div className="doctor-card__logo">
                            <img src={logoSrc} alt={doctor.hospital} />
                          </div>
                        )}
                        <div className="card-body text-center pt-4 pb-4 d-flex flex-column align-items-center doctor-card__body">
                          <div className={avatarClassName}>
                            {avatarSrc ? (
                              <img src={avatarSrc} alt={doctor.name || "Doctor avatar"} />
                            ) : (
                              <span className="fw-semibold">{getInitials(doctor.name)}</span>
                            )}
                          </div>
                          <p className="fw-semibold doctor-card__name mt-3 mb-1 text-truncate w-100">
                            {doctor.name || "Unnamed doctor"}
                          </p>
                          <p className="small mb-1 doctor-card__subtitle">{doctor.dept}</p>
                          <p className="small mb-3 doctor-card__hospital">{doctor.hospital}</p>
                          {doctor.specialization && <p className="small text-secondary mb-3">{doctor.specialization}</p>}
                          <div className="d-grid gap-2 w-100 mt-auto doctor-card__actions">
                            <button
                              onClick={() => {
                                // find department id from hospitalMap using hospital name + department name
                                const hospitalEntry = Object.values(hospitalMap).find(h => h.info?.name === doctor.hospital);
                                const deptObj = hospitalEntry?.info?.departments?.find(d => d.name === doctor.dept);
                                const deptId = deptObj?.id ?? doctor.dept;
                                navigate("/queue3", { state: { selectedHospital: doctor.hospital, selectedDepartment: deptId, selectedDoctor: doctor.id } });
                              }}
                              className="btn btn-primary rounded-pill py-2"
                            >
                              Book
                            </button>
                            <button className="btn btn-outline-secondary rounded-pill py-2" onClick={() => handleOpenProfile(doctor)}>
                              View profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center py-5 doctor-empty mb-0">No doctors match the current filters.</p>
            )}
          </div>

          <div className="doctor-pagination">
            <div className="doctor-pagination__panel shadow-sm p-3 d-flex gap-3 justify-content-between">
              <button className="btn btn-outline-secondary flex-fill rounded-pill" onClick={handlePrev} disabled={step === 1}>
                Previous
              </button>
              <button
                className="btn btn-primary flex-fill rounded-pill"
                onClick={handleNext}
                disabled={step === totalSteps || filteredDoctors.length === 0}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
      {isProfileOpen && selectedDoctor && (
        <div className="doctor-profile-modal" role="dialog" aria-modal="true" aria-label={`${selectedDoctor.name} profile`} onClick={handleCloseProfile}>
          <div className="doctor-profile-modal__panel" onClick={(event) => event.stopPropagation()} role="document">
            <button type="button" className="doctor-profile-modal__close btn-close" aria-label="Close profile" onClick={handleCloseProfile} />
            <div className="doctor-profile-modal__header">
              {(() => {
                const avatarPath = getDoctorAvatarPath(selectedDoctor.name);
                const avatarSrc = avatarPath ? resolveAssetPath(avatarPath) : "";
                const avatarClassName = `doctor-profile-modal__avatar${avatarSrc ? " doctor-profile-modal__avatar--image" : ""}`;
                return (
                  <div className={avatarClassName}>
                    {avatarSrc ? <img src={avatarSrc} alt={selectedDoctor.name || "Doctor avatar"} /> : <span>{getInitials(selectedDoctor.name)}</span>}
                  </div>
                );
              })()}
              <div className="doctor-profile-modal__identity">
                <h4 className="mb-1">{selectedDoctor.name || "Unnamed doctor"}</h4>
                <p className="mb-1 text-muted">{selectedDoctor.specialization || "General practitioner"}</p>
                <div className="doctor-profile-modal__tags">
                  {selectedDoctor.dept && <span className="badge rounded-pill bg-primary-subtle text-primary">{selectedDoctor.dept}</span>}
                  {selectedDoctor.hospital && <span className="badge rounded-pill bg-light text-dark">{selectedDoctor.hospital}</span>}
                </div>
              </div>
            </div>
            <div className="doctor-profile-modal__body">
              <div className="doctor-profile-modal__section">
                <h6>Hospital</h6>
                <div className="doctor-profile-modal__hospital">
                  {selectedDoctor.hospitalLogo && (
                    <div className="doctor-profile-modal__hospital-logo">
                      <img src={resolveAssetPath(selectedDoctor.hospitalLogo)} alt={selectedDoctor.hospital} />
                    </div>
                  )}
                  <div>
                    <p className="mb-0 fw-semibold">{selectedDoctor.hospital || "N/A"}</p>
                    <small className="text-muted">{selectedDoctor.dept || "Department not specified"}</small>
                  </div>
                </div>
              </div>
              {selectedDoctor.education && (
                <div className="doctor-profile-modal__section">
                  <h6>ประวัติการศึกษา</h6>
                  <p className="mb-0">{selectedDoctor.education}</p>
                </div>
              )}
              {selectedDoctor.bio && (
                <div className="doctor-profile-modal__section">
                  <h6>ประวัติย่อ</h6>
                  <p className="mb-0">{selectedDoctor.bio}</p>
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
                  navigate("/queue3", { state: { selectedHospital: selectedDoctor.hospital, selectedDepartment: deptId, selectedDoctor: selectedDoctor.id } });
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
    </>
  );
}
