import React, { useState, useEffect, useMemo } from "react";
import { 
  Building2, MapPin, User, Stethoscope, ArrowLeft, 
  Edit, Trash2, Plus, Save, X, ChevronRight, CheckCircle2, 
  LayoutGrid, Search as SearchIcon 
} from "lucide-react";
import "./Export.css"; 
import hospitalMap from "../src/data/hospitaldata.jsx/allhospitaldata";

import { useTranslation } from "react-i18next";


function TabButton({ id, activeTab, onClick, icon: Icon, label }) {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`btn d-flex align-items-center gap-2 rounded-pill px-4 py-2 transition-all ${
        isActive 
          ? 'bg-white text-primary shadow-sm fw-bold' 
          : 'text-muted hover-bg-white-50'
      }`}
      style={{ border: 'none', minWidth: '140px', justifyContent: 'center' }}
    >
      <Icon size={18} className={isActive ? "text-primary" : "text-muted"} /> {label}
    </button>
  );
}

function HospitalCard({ data, onClick, deptCount, docCount }) {
  return (
    <div className="col-md-4 mb-4">
      <div 
        className="card border-0 h-100 shadow-sm hospital-card-modern" 
        onClick={() => onClick(data)}
        style={{ cursor: "pointer" }}
      >
        <div className="card-top-accent" />
        
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="icon-box-modern shadow-sm">
              <Building2 size={28} className="text-white" />
            </div>
            <span className="badge bg-light text-muted border rounded-pill px-3">ID: {data.id}</span>
          </div>

          <h5 className="fw-bold text-dark mb-1 text-truncate">{data.name}</h5>
          <p className="text-muted small mb-4 d-flex align-items-center gap-1">
            <MapPin size={14}/> {data.state}
          </p>

          <div className="d-flex gap-2 mt-auto">
            <div className="stat-pill">
              <span className="fw-bold text-primary">{deptCount}</span> <span className="small text-muted">แผนก</span>
            </div>
            <div className="stat-pill">
              <span className="fw-bold text-success">{docCount}</span> <span className="small text-muted">แพทย์</span>
            </div>
          </div>
        </div>
        
        <div className="card-footer bg-white border-0 p-3 pt-0 text-end">
          <button className="btn btn-link text-decoration-none p-0 text-primary small fw-bold">
            จัดการข้อมูล <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ title, subtitle }) {
  return (
    <div className="text-center py-5 bg-light rounded-4 border border-dashed mt-3">
      <div className="mb-3 text-muted opacity-25 d-flex justify-content-center">
        <LayoutGrid size={64} />
      </div>
      <h6 className="fw-bold text-secondary">{title}</h6>
      <p className="text-muted small mb-0">{subtitle}</p>
    </div>
  );
}
function DataModal({ isOpen, onClose, mode, type, initialData, onSave, departments }) {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onSave(formData);
  }

  return (
    <div className="modal-overlay backdrop-blur">
      <div className="modal-content-custom shadow-lg border-0" style={{ maxWidth: "500px", borderRadius: "16px" }}>
        <div className="modal-header-modern p-4 pb-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold mb-1">{mode === 'ADD' ? 'เพิ่มข้อมูลใหม่' : 'แก้ไขข้อมูล'}</h5>
                <p className="text-muted small mb-0">{type === 'DEPT' ? 'จัดการข้อมูลแผนก/คลินิก' : 'จัดการข้อมูลแพทย์ผู้เชี่ยวชาญ'}</p>
              </div>
              <button className="btn-icon-close" onClick={onClose}><X size={20}/></button>
            </div>
        </div>
        
        <div className="p-4 pt-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="form-label fw-bold small text-uppercase text-muted">
                  {type === 'DEPT' ? 'ชื่อแผนก' : 'ชื่อ-นามสกุลแพทย์'} <span className="text-danger">*</span>
                </label>
                <div className="input-group-modern">
                  <input 
                    className="form-control shadow-none" 
                    value={formData.name || ""} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    required
                    placeholder={type === 'DEPT' ? "ระบุชื่อแผนก..." : "ระบุชื่อแพทย์..."}
                  />
                </div>
            </div>

            {type === 'DOCTOR' && (
                <>
                    <div className="mb-4">
                        <label className="form-label fw-bold small text-uppercase text-muted">ความเชี่ยวชาญ</label>
                        <input 
                          className="form-control shadow-none" 
                          value={formData.specialization || ""} 
                          onChange={e => setFormData({...formData, specialization: e.target.value})} 
                          placeholder="เช่น ศัลยกรรมกระดูก, อายุรกรรม"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-bold small text-uppercase text-muted">สังกัดแผนก <span className="text-danger">*</span></label>
                        <select 
                          className="form-select shadow-none" 
                          value={formData.departmentId || ""} 
                          onChange={e => setFormData({...formData, departmentId: e.target.value})}
                          required
                        >
                            <option value="">-- เลือกแผนก --</option>
                            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>
                </>
            )}

            <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                <button type="button" className="btn btn-light text-muted rounded-pill px-4" onClick={onClose}>ยกเลิก</button>
                <button type="submit" className="btn btn-primary rounded-pill px-4 shadow-sm">
                  <Save size={18} className="me-2"/> บันทึก
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. MAIN COMPONENT (Logic Controller)
// ==========================================

export default function AdminDataManagement() {
  // --- State ---
  const [view, setView] = useState("LIST"); 
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [activeTab, setActiveTab] = useState("INFO");
  const [searchTerm, setSearchTerm] = useState("");

  // Data Store
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // Modal Control
  const [modalConfig, setModalConfig] = useState({ isOpen: false, mode: 'ADD', type: 'DEPT', data: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hospRes, specRes, docRes] = await Promise.all([
          fetch('http://localhost:3000/data/getHospital').then(r => r.json()),
          fetch('http://localhost:3000/data/getSpecialties').then(r => r.json()),
          fetch('http://localhost:3000/data/getDoctors').then(r => r.json())
        ]);

        if (hospRes.hospitals) {
          setHospitals(hospRes.hospitals.map(h => ({
            id: h.hospital_id,
            db_id: h.id,
            name: h.name,
            state: h.state,
            district: h.district,
            type: h.type || 'โรงพยาบาล'
          })));
        }

        let globalDepts = [];
        if (specRes.specialties) {
          globalDepts = specRes.specialties.map(s => ({
            id: s.id,
            name: s.name
          }));
          setDepartments(globalDepts);
        }

        if (docRes.doctors) {
          setDoctors(docRes.doctors.map(d => {
            const specName = globalDepts.find(s => s.id === d.specialty_id)?.name || 'ไม่ระบุ';
            return {
              id: d.id,
              first_name: d.first_name,
              last_name: d.last_name,
              name: (d.prefix ? d.prefix : '') + d.first_name + ' ' + d.last_name,
              specialization: d.specialization || '',
              departmentId: d.specialty_id,
              departmentName: specName,
              hospitalId: d.hospital_id,
              prefix: d.prefix || ''
            };
          }));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // --- Filter Logic ---
  const currentDepts = useMemo(() => {
    let data = departments;
    if (searchTerm) data = data.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return data;
  }, [departments, searchTerm]);

  const currentDoctors = useMemo(() => {
    let data = doctors.filter(d => d.hospitalId === selectedHospital?.id);
    if (searchTerm) data = data.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.specialization.toLowerCase().includes(searchTerm.toLowerCase()));
    return data;
  }, [doctors, selectedHospital, searchTerm]);

  // --- Handlers ---

  function handleSaveHospitalInfo(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/data/hospitals/${selectedHospital.db_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         hospital_id: selectedHospital.id,
         name: selectedHospital.name,
         state: selectedHospital.state,
         district: selectedHospital.district,
         type: selectedHospital.type
      })
    })
    .then(r => r.json())
    .then(res => {
      setHospitals(prev => prev.map(h => h.id === selectedHospital.id ? selectedHospital : h));
      alert("✅ บันทึกข้อมูลโรงพยาบาลเรียบร้อย");
    })
    .catch(err => alert("เกิดข้อผิดพลาด: " + err));
  }

  function handleModalSave(formData) {
    const { mode, type } = modalConfig;
    
    if (type === 'DEPT') {
        if (mode === 'ADD') {
            setDepartments([...departments, { ...formData, id: `NEW-D-${Date.now()}` }]);
        } else {
            setDepartments(departments.map(d => d.id === formData.id ? formData : d));
            setDoctors(prevDoctors => prevDoctors.map(doc => {
                if (String(doc.departmentId) === String(formData.id)) {
                    return { ...doc, departmentName: formData.name };
                }
                return doc;
            }));
        }
        setModalConfig({ ...modalConfig, isOpen: false });
    } else if (type === 'DOCTOR') {
        const deptName = departments.find(d => String(d.id) === String(formData.departmentId))?.name || "";
        
        const nameParts = (formData.name || "").trim().split(" ");
        let firstName = nameParts[0] || "";
        let lastName = nameParts.slice(1).join(" ") || "";
        let prefixStr = "";
        
        if (firstName.startsWith("นพ.") || firstName.startsWith("พญ.")) {
            prefixStr = firstName.substring(0, 3);
            firstName = firstName.substring(3);
        } else if (firstName.startsWith("นายแพทย์")) {
            prefixStr = "นายแพทย์";
            firstName = firstName.substring(8);
        } else if (firstName.startsWith("แพทย์หญิง")) {
            prefixStr = "แพทย์หญิง";
            firstName = firstName.substring(9);
        }

        const payload = {
            hospital_id: selectedHospital.id,
            specialty_id: formData.departmentId,
            specialization: formData.specialization,
            prefix: formData.prefix || prefixStr,
            first_name: firstName,
            last_name: lastName
        };

        if (mode === 'ADD') {
            fetch('http://localhost:3000/data/doctors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).then(r => r.json()).then(res => {
                const newId = res.data?.insertId || Date.now();
                setDoctors([...doctors, { 
                    ...payload,
                    id: newId,
                    name: formData.name,
                    departmentId: formData.departmentId,
                    departmentName: deptName, 
                    hospitalId: selectedHospital.id 
                }]);
                setModalConfig({ ...modalConfig, isOpen: false });
                alert("เพิ่มแพทย์สำเร็จ");
            }).catch(e => alert("Error: " + e));
        } else {
            fetch(`http://localhost:3000/data/doctors/${formData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).then(r => r.json()).then(res => {
                const updatedItem = { 
                    ...payload,
                    id: formData.id,
                    name: formData.name,
                    departmentId: formData.departmentId,
                    departmentName: deptName, 
                    hospitalId: selectedHospital.id 
                };
                setDoctors(doctors.map(d => d.id === formData.id ? updatedItem : d));
                setModalConfig({ ...modalConfig, isOpen: false });
                alert("อัปเดตแพทย์สำเร็จ");
            }).catch(e => alert("Error: " + e));
        }
    }
  }

  function handleDelete(type, id) {
      if(!window.confirm("ยืนยันการลบข้อมูลนี้?")) return;
      
      if (type === 'DEPT') {
          setDepartments(departments.filter(d => d.id !== id));
      } else if (type === 'DOCTOR') {
          fetch(`http://localhost:3000/data/doctors/${id}`, {
              method: 'DELETE'
          }).then(r => r.json()).then(res => {
              setDoctors(doctors.filter(d => d.id !== id));
              alert("ลบข้อมูลแพทย์เรียบร้อยแล้ว");
          }).catch(e => alert("Error deleting doctor: " + e));
      }
  }

  if (view === "LIST") {
    return (
      <div className="export-container">
        <div className="export-header mb-5">
          <h2>จัดการข้อมูลโรงพยาบาล (Master Data)</h2>
          <p className="text-muted">เลือกโรงพยาบาลเพื่อแก้ไขรายละเอียด, แผนก, หรือรายชื่อแพทย์</p>
        </div>
        
        <div className="row">
          {hospitals.map(h => {
             const dCount = departments.filter(d => d.hospitalId === h.id).length;
             const drCount = doctors.filter(dr => dr.hospitalId === h.id).length;
             return (
                <HospitalCard 
                  key={h.id} 
                  data={h} 
                  deptCount={dCount}
                  docCount={drCount}
                  onClick={(hosp) => { setSelectedHospital(hosp); setView("DETAIL"); setActiveTab("INFO"); setSearchTerm(""); }} 
                />
             )
          })}
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER VIEW: 2. DETAIL (หน้าจัดการ)
  // ==========================================
  return (
    <div className="export-container">
      
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
        <button 
          className="btn btn-white shadow-sm rounded-circle p-2 border" 
          onClick={() => { setSelectedHospital(null); setView("LIST"); }}
        >
          <ArrowLeft size={20} className="text-secondary" />
        </button>
        <div>
          <h4 className="mb-0 fw-bold text-dark">{selectedHospital.name}</h4>
          <span className="text-muted small d-flex align-items-center gap-1">
            <CheckCircle2 size={12} className="text-success"/> กำลังแก้ไขข้อมูล
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="bg-light p-1 rounded-pill d-inline-flex gap-1 border">
          <TabButton id="INFO" activeTab={activeTab} onClick={setActiveTab} icon={Building2} label="ข้อมูลทั่วไป" />
          <TabButton id="DEPT" activeTab={activeTab} onClick={setActiveTab} icon={MapPin} label="แผนก" />
          <TabButton id="DOCTOR" activeTab={activeTab} onClick={setActiveTab} icon={Stethoscope} label="แพทย์" />
        </div>

        {/* Search Bar (Show only on DEPT/DOCTOR) */}
        {activeTab !== "INFO" && (
           <div className="position-relative" style={{ width: '250px' }}>
              <SearchIcon size={16} className="text-muted position-absolute top-50 start-0 translate-middle-y ms-3" />
              <input 
                className="form-control ps-5 rounded-pill bg-white" 
                placeholder="ค้นหา..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ fontSize: '0.9rem' }}
              />
           </div>
        )}
      </div>

      {/* Content Area */}
      <div className="animate-slide-up">
        
        {/* 1. INFO TAB */}
        {activeTab === "INFO" && (
            <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-4 text-primary d-flex align-items-center gap-2">
                    <Edit size={20}/> แก้ไขข้อมูลพื้นฐาน
                </h5>
                <form onSubmit={handleSaveHospitalInfo}>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-muted">ชื่อโรงพยาบาล</label>
                            <input className="form-control form-control-lg" value={selectedHospital.name} onChange={e => setSelectedHospital({...selectedHospital, name: e.target.value})} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-muted">จังหวัด</label>
                            <input className="form-control form-control-lg" value={selectedHospital.state} onChange={e => setSelectedHospital({...selectedHospital, state: e.target.value})} />
                        </div>
                        <div className="col-12">
                            <label className="form-label fw-bold small text-muted">ที่อยู่ / เขต</label>
                            <input className="form-control form-control-lg" value={selectedHospital.district} onChange={e => setSelectedHospital({...selectedHospital, district: e.target.value})} />
                        </div>
                        <div className="col-12 text-end mt-4">
                            <button type="submit" className="btn btn-primary rounded-pill px-5 py-2 shadow-sm">
                                <Save size={18} className="me-2"/> บันทึกการแก้ไข
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )}

        {/* 2. DEPT TAB (Modern List Style) */}
        {activeTab === "DEPT" && (
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-header bg-white p-4 d-flex justify-content-between align-items-center border-bottom">
                    <div>
                        <h5 className="fw-bold mb-0">รายการแผนก</h5>
                        <small className="text-muted">ทั้งหมด {currentDepts.length} รายการ</small>
                    </div>
                    <button className="btn btn-primary rounded-pill px-3 d-flex align-items-center gap-2" onClick={() => setModalConfig({ isOpen: true, mode: 'ADD', type: 'DEPT' })}>
                        <Plus size={18}/> เพิ่มแผนก
                    </button>
                </div>
                
                <div className="p-4 bg-light-subtle">
                  {currentDepts.length === 0 ? (
                    <EmptyState title="ไม่พบข้อมูลแผนก" subtitle="กดปุ่ม 'เพิ่มแผนก' เพื่อเริ่มใช้งาน" />
                  ) : (
                    <div className="d-flex flex-column gap-3">
                      {currentDepts.map((d) => (
                        <div 
                          key={d.id} 
                          className="dept-list-item d-flex align-items-center justify-content-between p-3 bg-white rounded-4 shadow-sm border"
                        >
                          {/* ส่วนซ้าย: ไอคอน + ชื่อ */}
                          <div className="d-flex align-items-center gap-3">
                            <div className="dept-icon-box">
                              <Building2 size={20} className="text-primary" />
                            </div>
                            <div>
                              <h6 className="fw-bold text-dark mb-0">{d.name}</h6>
                              <small className="text-muted" style={{fontSize: '0.75rem'}}>ID: {d.id}</small>
                            </div>
                          </div>

                          {/* ส่วนขวา: ปุ่มจัดการ */}
                          <div className="d-flex gap-2">
                            <button 
                              className="btn btn-icon-action btn-edit" 
                              onClick={() => setModalConfig({ isOpen: true, mode: 'EDIT', type: 'DEPT', data: d })}
                              title="แก้ไข"
                            >
                              <Edit size={16} />
                            </button>
                            
                            {d.name !== "ไม่รู้แผนก" && (
                              <button 
                                className="btn btn-icon-action btn-delete" 
                                onClick={() => handleDelete('DEPT', d.id)}
                                title="ลบ"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
            </div>
        )}

        {/* 3. DOCTOR TAB (Modern List Style) */}
        {activeTab === "DOCTOR" && (
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-header bg-white p-4 d-flex justify-content-between align-items-center border-bottom">
                    <div>
                        <h5 className="fw-bold mb-0">รายชื่อแพทย์</h5>
                        <small className="text-muted">ทั้งหมด {currentDoctors.length} ท่าน</small>
                    </div>
                    <button className="btn btn-primary rounded-pill px-3 d-flex align-items-center gap-2" onClick={() => setModalConfig({ isOpen: true, mode: 'ADD', type: 'DOCTOR' })}>
                        <Plus size={18}/> เพิ่มแพทย์
                    </button>
                </div>

                <div className="p-4 bg-light-subtle">
                  {currentDoctors.length === 0 ? (
                    <EmptyState title="ไม่พบรายชื่อแพทย์" subtitle="ลองค้นหาใหม่ หรือกด 'เพิ่มแพทย์'" />
                  ) : (
                    <div className="d-flex flex-column gap-3">
                      {currentDoctors.map((doc) => (
                        <div 
                          key={doc.id} 
                          className="dept-list-item d-flex align-items-center justify-content-between p-3 bg-white rounded-4 shadow-sm border"
                        >
                          {/* ส่วนซ้าย: รูป + ชื่อ + ความเชี่ยวชาญ */}
                          <div className="d-flex align-items-center gap-3">
                            <div className="dept-icon-box" style={{backgroundColor: '#eef2ff'}}>
                              <User size={20} className="text-primary" />
                            </div>
                            <div>
                              <h6 className="fw-bold text-dark mb-0">{doc.name}</h6>
                              <div className="d-flex align-items-center gap-2">
                                <small className="text-muted">{doc.specialization}</small>
                                <span className="badge bg-light text-dark border px-2 py-0 rounded-pill" style={{fontSize: '0.7rem'}}>
                                  {doc.departmentName}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* ส่วนขวา: ปุ่มจัดการ */}
                          <div className="d-flex gap-2">
                            <button 
                              className="btn btn-icon-action btn-edit" 
                              onClick={() => setModalConfig({ isOpen: true, mode: 'EDIT', type: 'DOCTOR', data: doc })}
                              title="แก้ไข"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              className="btn btn-icon-action btn-delete" 
                              onClick={() => handleDelete('DOCTOR', doc.id)}
                              title="ลบ"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
            </div>
        )}
      </div>

      <DataModal 
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        mode={modalConfig.mode}
        type={modalConfig.type}
        initialData={modalConfig.data}
        onSave={handleModalSave}
        departments={departments.filter(d => d.hospitalId === selectedHospital.id)}
      />

    </div>
  );
}