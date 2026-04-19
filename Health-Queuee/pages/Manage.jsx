import React, { useState, useEffect, useMemo } from "react";
import { 
  Building2, MapPin, User, Stethoscope, ArrowLeft, 
  Edit, Trash2, Plus, Save, X, ChevronRight, CheckCircle2, 
  LayoutGrid, Search as SearchIcon 
} from "lucide-react";
import "./Export.css"; 
import hospitalMap from "../src/data/hospitaldata.jsx/allhospitaldata";


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
                        <label className="form-label fw-bold small text-uppercase text-muted">คำนำหน้า <span className="text-danger">*</span></label>
                        <select 
                          className="form-select shadow-none" 
                          value={formData.prefix || "นพ."} 
                          onChange={e => setFormData({...formData, prefix: e.target.value})}
                          required
                        >
                            <option value="นพ.">นพ.</option>
                            <option value="พญ.">พญ.</option>
                            <option value="ดร.">ดร.</option>
                            <option value="ทพ.">ทพ.</option>
                        </select>
                    </div>
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
  const [loading, setLoading] = useState(true);

  // Modal Control
  const [modalConfig, setModalConfig] = useState({ isOpen: false, mode: 'ADD', type: 'DEPT', data: null });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [hResp, dResp, drResp] = await Promise.all([
        fetch("http://localhost:3000/data/getHospital"),
        fetch("http://localhost:3000/data/getSpecialties"),
        fetch("http://localhost:3000/data/getDoctors")
      ]);

      const hData = await hResp.json();
      const dData = await dResp.json();
      const drData = await drResp.json();

      // Transform data
      setHospitals(hData.hospitals.map(h => ({ 
        ...h, 
        id: h.hospital_id, // Frontend uses hospital_id (e.g. BKK001) as the logical ID
        dbId: h.id 
      })));

      // Specialties are the master list of departments
      setDepartments(dData.specialties || []);

      setDoctors(drData.doctors.map(dr => ({
        ...dr,
        id: dr.id.toString(),
        name: `${dr.first_name} ${dr.last_name}`.trim(),
        prefix: dr.prefix || 'นพ.',
        hospitalId: dr.hospital_id,
        departmentId: dr.specialty_id ? dr.specialty_id.toString() : null,
        departmentName: dr.specialty_name || "ไม่ระบุ"
      })));

    } catch (error) {
      console.error("Fetch Error:", error);
      alert("ไม่สามารถโหลดข้อมูลจากเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Filter Logic ---
  const filteredHospitals = useMemo(() => {
    let data = hospitals;
    if (searchTerm && view === "LIST") {
      data = data.filter(h => 
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        h.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return data;
  }, [hospitals, searchTerm, view]);

  const currentDepts = useMemo(() => {
    if (!selectedHospital) return [];
    // Get unique specialties associated with doctors in this hospital
    const hospitalDoctors = doctors.filter(dr => dr.hospitalId === selectedHospital.id);
    const activeSpecialtyIds = [...new Set(hospitalDoctors.map(dr => dr.specialty_id))];
    
    let data = departments.filter(s => activeSpecialtyIds.includes(s.id));
    if (searchTerm) data = data.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return data;
  }, [departments, doctors, selectedHospital, searchTerm]);

  const currentDoctors = useMemo(() => {
    if (!selectedHospital) return [];
    let data = doctors.filter(dr => dr.hospitalId === selectedHospital.id);
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      data = data.filter(dr => 
        `${dr.first_name} ${dr.last_name}`.toLowerCase().includes(lowerSearch) || 
        (dr.specialization && dr.specialization.toLowerCase().includes(lowerSearch))
      );
    }
    return data;
  }, [doctors, selectedHospital, searchTerm]);

  // --- Handlers ---

  async function handleSaveHospitalInfo(e) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/data/hospitals/${selectedHospital.dbId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedHospital)
      });
      if (response.ok) {
        alert("✅ บันทึกข้อมูลโรงพยาบาลเรียบร้อย");
        fetchData();
      }
    } catch (error) {
       alert("❌ เกิดข้อผิดพลาดในการบันทึก");
    }
  }

  async function handleModalSave(formData) {
    const { mode, type } = modalConfig;
    let url = "";
    let method = "POST";
    let bodyData = {};

    try {
      if (type === 'DEPT') {
        url = mode === 'ADD' ? "http://localhost:3000/data/specialties" : `http://localhost:3000/data/specialties/${formData.id}`;
        method = mode === 'ADD' ? 'POST' : 'PUT';
        bodyData = { name: formData.name };
      } else if (type === 'DOCTOR') {
        url = mode === 'ADD' ? "http://localhost:3000/data/doctors" : `http://localhost:3000/data/doctors/${formData.id}`;
        method = mode === 'ADD' ? 'POST' : 'PUT';
        
        // Handle name splitting for first/last name
        const nameParts = formData.name ? formData.name.trim().split(/\s+/) : ["", ""];
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        bodyData = {
          hospital_id: selectedHospital.id,
          specialty_id: parseInt(formData.departmentId),
          specialization: formData.specialization,
          prefix: formData.prefix || "นพ.", 
          first_name: firstName,
          last_name: lastName
        };
      }

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      if (response.ok) {
        alert("✅ บันทึกข้อมูลเรียบร้อย");
        setModalConfig({ ...modalConfig, isOpen: false });
        fetchData();
      } else {
        const err = await response.json();
        alert(`❌ ผิดพลาด: ${err.message || 'ไม่ทราบสาเหตุ'}`);
      }
    } catch (error) {
      console.error("Save Error:", error);
      alert("❌ เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  }

  async function handleDelete(type, id) {
    if(!window.confirm("ยืนยันการลบข้อมูลนี้?")) return;
    try {
      const url = type === 'DEPT' ? `http://localhost:3000/data/specialties/${id}` : `http://localhost:3000/data/doctors/${id}`;
      const response = await fetch(url, { method: 'DELETE' });
      if (response.ok) {
        alert("✅ ลบข้อมูลสำเร็จ");
        fetchData();
      } else {
        alert("❌ ไม่สามารถลบข้อมูลได้");
      }
    } catch (error) {
      alert("❌ เกิดข้อผิดพลาดในการเชื่อมต่อ");
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="text-muted fw-bold">กำลังโหลดข้อมูล...</h5>
        </div>
      </div>
    );
  }

  if (view === "LIST") {
    return (
      <div className="export-container">
        <div className="export-header mb-5">
          <h2>จัดการข้อมูลโรงพยาบาล (Master Data)</h2>
          <p className="text-muted">เลือกโรงพยาบาลเพื่อแก้ไขรายละเอียด, แผนก, หรือรายชื่อแพทย์</p>
        </div>
        
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 custom-admin-table">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4 py-3">ID โรงพยาบาล</th>
                  <th className="py-3">ชื่อโรงพยาบาล</th>
                  <th className="py-3">จังหวัด / เขต</th>
                  <th className="py-3 text-center">แผนก</th>
                  <th className="py-3 text-center">แพทย์</th>
                  <th className="py-3 text-end pe-4">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredHospitals.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <div className="text-muted">
                        <Building2 size={48} className="mb-3 opacity-25" />
                        <p className="mb-0">ไม่พบข้อมูลโรงพยาบาล</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredHospitals.map(h => {
                    // Stats logic: count unique specialty IDs from doctors in this hospital
                    const hospitalDoctors = doctors.filter(dr => dr.hospitalId === h.id);
                    const dCount = [...new Set(hospitalDoctors.map(dr => dr.specialty_id))].filter(id => id).length;
                    const drCount = hospitalDoctors.length;
                    return (
                      <tr 
                        key={h.id} 
                        style={{ cursor: 'pointer' }}
                        onClick={() => { 
                          setSelectedHospital(h); 
                          setView("DETAIL"); 
                          setActiveTab("INFO"); 
                          setSearchTerm(""); 
                        }}
                      >
                        <td className="ps-4">
                          <span className="badge bg-light text-primary border rounded-pill px-3">
                            {h.id}
                          </span>
                        </td>
                        <td>
                          <div className="fw-bold text-dark">{h.name}</div>
                        </td>
                        <td>
                          <div className="text-muted small">
                            <MapPin size={12} className="me-1" />
                            {h.state || '-'}{h.district ? `, ${h.district}` : ''}
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-blue-light text-primary rounded-pill px-3">
                            {dCount}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-green-light text-success rounded-pill px-3">
                            {drCount}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <button className="btn btn-sm btn-light rounded-circle shadow-sm">
                            <ChevronRight size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
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
      <div className="d-flex align-items-center gap-3 mb-4">
        {/* Navigation Tabs (Now on the left) */}
        <div className="bg-light p-1 rounded-pill d-inline-flex gap-1 border">
          <TabButton id="INFO" activeTab={activeTab} onClick={setActiveTab} icon={Building2} label="ข้อมูลทั่วไป" />
          <TabButton id="DEPT" activeTab={activeTab} onClick={setActiveTab} icon={MapPin} label="แผนก" />
          <TabButton id="DOCTOR" activeTab={activeTab} onClick={setActiveTab} icon={Stethoscope} label="แพทย์" />
        </div>

        {/* Search Bar (Now right next to tabs, show only on DEPT/DOCTOR) */}
        {activeTab !== "INFO" && (
           <div className="position-relative" style={{ width: '250px' }}>
              <SearchIcon size={16} className="text-muted position-absolute top-50 start-0 translate-middle-y ms-3" />
              <input 
                className="form-control ps-5 rounded-pill bg-white shadow-sm" 
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
                              <h6 className="fw-bold text-dark mb-0">{doc.prefix} {doc.name}</h6>
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
        departments={departments}
      />

    </div>
  );
}