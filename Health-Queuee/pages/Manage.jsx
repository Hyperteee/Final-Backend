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
    const loadedHospitals = [];
    const loadedDepts = [];
    const loadedDoctors = [];

    Object.values(hospitalMap).forEach(h => {
      const info = h.info;
      loadedHospitals.push({ ...info });

      if (info.departments) {
        info.departments.forEach(d => {
          loadedDepts.push({ ...d, hospitalId: info.id });
          if (d.doctors) {
            d.doctors.forEach(dr => {
              loadedDoctors.push({ ...dr, departmentId: d.id, departmentName: d.name, hospitalId: info.id });
            });
          }
        });
      }
    });

    setHospitals(loadedHospitals);
    setDepartments(loadedDepts);
    setDoctors(loadedDoctors);
  }, []);

  // --- Filter Logic ---
  const currentDepts = useMemo(() => {
    let data = departments.filter(d => d.hospitalId === selectedHospital?.id);
    if (searchTerm) data = data.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return data;
  }, [departments, selectedHospital, searchTerm]);

  const currentDoctors = useMemo(() => {
    let data = doctors.filter(d => d.hospitalId === selectedHospital?.id);
    if (searchTerm) data = data.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.specialization.toLowerCase().includes(searchTerm.toLowerCase()));
    return data;
  }, [doctors, selectedHospital, searchTerm]);

  // --- Handlers ---

  function handleSaveHospitalInfo(e) {
    e.preventDefault();
    setHospitals(prev => prev.map(h => h.id === selectedHospital.id ? selectedHospital : h));
    alert("✅ บันทึกข้อมูลโรงพยาบาลเรียบร้อย (จำลอง)");
  }

  function handleModalSave(formData) {
    const { mode, type } = modalConfig;
    
    if (type === 'DEPT') {
        if (mode === 'ADD') {
            // เพิ่มแผนก
            setDepartments([...departments, { ...formData, id: `NEW-D-${Date.now()}`, hospitalId: selectedHospital.id }]);
        } else {
            // แก้ไขแผนก
            setDepartments(departments.map(d => d.id === formData.id ? formData : d));
            
            // 🔥 Cascade Update: อัปเดตชื่อแผนกที่ติดตัวหมอไปด้วย
            setDoctors(prevDoctors => prevDoctors.map(doc => {
                if (String(doc.departmentId) === String(formData.id)) {
                    return { ...doc, departmentName: formData.name };
                }
                return doc;
            }));
        }
    } else if (type === 'DOCTOR') {
        // หาชื่อแผนก
        const deptName = departments.find(d => String(d.id) === String(formData.departmentId))?.name || "";
        const newItem = { 
            ...formData, 
            departmentName: deptName, // ใส่ชื่อแผนกให้ถูกต้อง
            hospitalId: selectedHospital.id 
        };
        
        if (mode === 'ADD') {
            setDoctors([...doctors, { ...newItem, id: `NEW-DR-${Date.now()}` }]);
        } else {
            setDoctors(doctors.map(d => d.id === formData.id ? newItem : d));
        }
    }
    setModalConfig({ ...modalConfig, isOpen: false });
  }

  function handleDelete(type, id) {
      if(!window.confirm("ยืนยันการลบข้อมูลนี้?")) return;
      if (type === 'DEPT') setDepartments(departments.filter(d => d.id !== id));
      if (type === 'DOCTOR') setDoctors(doctors.filter(d => d.id !== id));
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