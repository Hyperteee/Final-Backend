

import React, { useState, useMemo, useEffect, useRef, useContext } from "react";
import {
  Search, FileDown, CheckCircle2, FileSpreadsheet, Filter, MapPin, Building2, X,
  ChevronDown, FileText, Paperclip, AlertCircle, AlertTriangle,
  Calendar as CalendarIcon, ChevronLeft, ChevronRight,
  Mail
} from "lucide-react";
import "./Export.css";
import hospitalData from "../src/data/listhospital";
import { UserAppointment } from "../src/data/context/appointment";
import * as XLSX from "xlsx";

// --- Helper Component: Highlight Text ---
const HighlightText = ({ text, highlight }) => {
  if (!highlight) return <span>{text}</span>;
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} style={{ color: "#0d6efd", fontWeight: "bold" }}>{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

// --- Helper Component: DatePicker ---
const CustomDatePicker = ({ value, onChange, placeholder = "เลือกวันที่...", eventCounts = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      setCurrentDate(new Date(value));
    }
  }, [value]);

  const thaiMonths = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
  const thaiDaysShort = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
  };

  const handleDateClick = (day) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const offset = selectedDate.getTimezoneOffset();
    const localDate = new Date(selectedDate.getTime() - (offset * 60 * 1000));
    onChange(localDate.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const displayValue = value ? new Date(value).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' }) : "";

  return (
    <div className="position-relative" ref={containerRef} style={{ width: '100%' }}>
      <div
        className="form-control d-flex align-items-center justify-content-between cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      >
        <span className={displayValue ? "text-dark" : "text-muted small"}>
          {displayValue || placeholder}
        </span>
        <CalendarIcon size={16} className="text-muted" />
      </div>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 9999,
            width: '280px',
            marginTop: '5px',
            backgroundColor: '#ffffff',
            border: '1px solid #dee2e6',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            borderRadius: '8px',
            padding: '16px'
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button className="btn btn-sm btn-light rounded-circle" onClick={(e) => { e.stopPropagation(); changeMonth(-1); }}>
              <ChevronLeft size={20} />
            </button>
            <span className="fw-bold text-primary" style={{ fontSize: '1rem' }}>
              {thaiMonths[currentDate.getMonth()]} {currentDate.getFullYear() + 543}
            </span>
            <button className="btn btn-sm btn-light rounded-circle" onClick={(e) => { e.stopPropagation(); changeMonth(1); }}>
              <ChevronRight size={20} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', marginBottom: '10px' }}>
            {thaiDaysShort.map(d => <div key={d} className="text-center text-muted small fw-bold">{d}</div>)}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
            {days.map((day, index) => {
              if (!day) return <div key={index}></div>;

              const isSelected = value && new Date(value).getDate() === day && new Date(value).getMonth() === currentDate.getMonth() && new Date(value).getFullYear() === currentDate.getFullYear();
              const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();

              const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const offset = dateObj.getTimezoneOffset();
              const localDateKey = new Date(dateObj.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0];
              const eventCount = eventCounts[localDateKey] || 0;
              const hasEvent = eventCount > 0;

              return (
                <div
                  key={index}
                  onClick={(e) => { e.stopPropagation(); handleDateClick(day); }}
                  style={{
                    height: '35px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    backgroundColor: isSelected ? '#0d6efd' : 'transparent',
                    color: isSelected ? 'white' : (isToday ? '#0d6efd' : '#333'),
                    fontWeight: (isSelected || isToday) ? 'bold' : 'normal',
                    border: isToday && !isSelected ? '1px solid #0d6efd' : '1px solid transparent',
                    position: 'relative',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.backgroundColor = '#f0f8ff'; e.currentTarget.style.color = '#0d6efd'; } }}
                  onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = isToday ? '#0d6efd' : '#333'; } }}
                  title={hasEvent ? `มี ${eventCount} รายการ` : ''}
                >
                  <span>{day}</span>
                  {hasEvent && (
                    <div style={{
                      width: '4px',
                      height: '4px',
                      backgroundColor: isSelected ? 'white' : '#fd7e14',
                      borderRadius: '50%',
                      marginTop: '2px'
                    }}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Helper Component: Modal ---
const CustomModal = ({ isOpen, type, title, content, onConfirm, onCancel, confirmText = "ตกลง", cancelText = "ยกเลิก" }) => {
  if (!isOpen) return null;

  const getHeaderStyle = () => {
    switch (type) {
      case 'success': return 'bg-success text-white';
      case 'warning': return 'bg-warning text-dark';
      default: return 'bg-light text-dark';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle2 size={24} />;
      case 'warning': return <AlertTriangle size={24} />;
      case 'confirm': return <AlertCircle size={24} className="text-primary" />;
      default: return null;
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content shadow-lg">
        <div className={`custom-modal-header ${getHeaderStyle()}`}>
          <div className="d-flex align-items-center gap-2">
            {getIcon()}
            <h5 className="mb-0 fw-bold">{title}</h5>
          </div>
          <button onClick={onCancel} className={`btn-close ${type === 'success' ? 'btn-close-white' : ''}`} />
        </div>
        <div className="custom-modal-body p-4 text-center">
          {content}
        </div>
        <div className="custom-modal-footer p-3 bg-light d-flex justify-content-end gap-2">
          {type === 'confirm' && (
            <button className="btn btn-outline-secondary px-4" onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button
            className={`btn ${type === 'success' ? 'btn-success' : type === 'warning' ? 'btn-warning' : 'btn-primary'} px-4`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Component: Searchable Select ---
const SearchableSelect = ({ options, value, onChange, placeholder, icon: Icon, displayKey = "label", valueKey = "value" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef(null);

  const selectedItem = options.find(opt => {
    const itemValue = typeof opt === "object" ? opt[valueKey] : opt;
    return itemValue === value;
  });

  useEffect(() => {
    if (selectedItem) {
      const label = typeof selectedItem === "object" ? selectedItem[displayKey] : selectedItem;
      setSearchTerm(label);
    } else if (!value) {
      setSearchTerm("");
    }
  }, [value, selectedItem, displayKey]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => {
    const label = typeof opt === "object" ? opt[displayKey] : opt;
    return label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="searchable-select-wrapper" ref={wrapperRef} style={{ position: "relative" }}>
      <div className="input-group">
        <span className="input-group-text bg-light">
          {Icon ? <Icon size={16} /> : <Search size={16} />}
        </span>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            if (e.target.value === "") onChange("");
          }}
          onFocus={() => setIsOpen(true)}
        />
        <span
          className="input-group-text bg-white"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (value || searchTerm) {
              // Clear the selection
              onChange("");
              setSearchTerm("");
              setIsOpen(false);
            } else {
              setIsOpen(prev => !prev);
            }
          }}
        >
          {value || searchTerm ? <X size={14} className="text-muted" /> : <ChevronDown size={14} className="text-muted" />}
        </span>
      </div>

      {isOpen && (
        <ul className="custom-dropdown-list shadow-sm">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, index) => {
              const itemLabel = typeof opt === "object" ? opt[displayKey] : opt;
              const itemValue = typeof opt === "object" ? opt[valueKey] : opt;
              const bookingCount = typeof opt === "object" ? opt.bookingCount || 0 : 0;

              return (
                <li
                  key={index}
                  className={`dropdown-item d-flex justify-content-between align-items-center ${itemValue === value ? "active" : ""}`}
                  onClick={() => {
                    onChange(itemValue);
                    setIsOpen(false);
                  }}
                >
                  <HighlightText text={itemLabel} highlight={searchTerm === itemLabel ? "" : searchTerm} />
                  {bookingCount > 0 && (
                    <span className="badge bg-primary rounded-pill ms-2">{bookingCount}</span>
                  )}
                </li>
              );
            })
          ) : (
            <li className="dropdown-item text-muted text-center small">ไม่พบข้อมูล</li>
          )}
        </ul>
      )}
    </div>
  );
};

// --- Main Component: AdminExport ---
export default function AdminExport() {
  const { appointments, createBatchExport } = useContext(UserAppointment);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [sentEmailIds, setSentEmailIds] = useState([]);
  
  const adminScope = currentUser?.adminScope || 'all';

  useEffect(() => {
    if (adminScope && adminScope !== 'all') {
      setSelectedProvince(adminScope);
    }
  }, [adminScope]);


  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'confirm' | 'success' | 'warning'
    batchId: null
  });

  const allHospitals = useMemo(() =>
    hospitalData.map(hosp => {
      const count = appointments.filter(a => a.hospitalId === hosp.id && a.status === "NEW").length;
      return {
        id: hosp.id,
        name: `รพ. ${hosp.name}`,
        province: hosp.state,
        bookingCount: count
      };
    }),
    [appointments]);

  const provinces = useMemo(() => {
    const provinceCounts = {};
    allHospitals.forEach(h => {
      if (!provinceCounts[h.province]) provinceCounts[h.province] = 0;
      provinceCounts[h.province] += h.bookingCount;
    });

    const keys = Object.keys(provinceCounts).filter(p => adminScope === 'all' || p === adminScope);

    return keys.map(p => ({
      label: p,
      value: p,
      bookingCount: provinceCounts[p]
    })).sort((a, b) => {
      if (b.bookingCount !== a.bookingCount) {
        return b.bookingCount - a.bookingCount;
      }
      return a.label.localeCompare(b.label, "th");
    });
  }, [allHospitals, adminScope]);

  const hospitalOptions = useMemo(() => {
    let filtered = allHospitals;
    if (selectedProvince) {
      filtered = filtered.filter(h => h.province === selectedProvince);
    }

    return filtered.sort((a, b) => {
      if (b.bookingCount !== a.bookingCount) {
        return b.bookingCount - a.bookingCount;
      }
      return a.name.localeCompare(b.name, "th");
    });
  }, [selectedProvince, allHospitals]);

  const dailyCounts = useMemo(() => {
    const counts = {};
    appointments.forEach(appt => {
      if (appt.status !== 'NEW' || !appt.priority1Date) return;

      if (selectedHospital && String(appt.hospitalId) !== String(selectedHospital)) return;

      if (selectedProvince && !selectedHospital) {
        // const hosp = allHospitals.find(h => String(h.id) === String(appt.hospitalId));
        // if (!hosp || hosp.province !== selectedProvince) return;
        return
      }
      if (!selectedProvince && !selectedHospital){
        return
      }

      const dateKey = new Date(appt.priority1Date).toISOString().split('T')[0];
      counts[dateKey] = (counts[dateKey] || 0) + 1;
    });
    return counts;
  }, [appointments, selectedHospital, selectedProvince, allHospitals]);

  const filteredAppointments = useMemo(() => {
    if (!isSearched) return [];
    if (!selectedHospital) return [];

    const result = appointments.filter(appt => {
      if (appt.status !== "NEW") return false;
      if (selectedHospital && String(appt.hospitalId) !== String(selectedHospital)) return false;

      const itemDate = new Date(appt.priority1Date);
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        itemDate.setHours(0, 0, 0, 0);
        if (itemDate < start) return false;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        itemDate.setHours(0, 0, 0, 0);
        if (itemDate > end) return false;
      }
      return true;
    });

    return result.sort((a, b) => {
      const dateA = new Date(a.priority1Date);
      const dateB = new Date(b.priority1Date);
      if (dateA - dateB !== 0) return dateA - dateB;
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  }, [appointments, selectedHospital, startDate, endDate, isSearched]);

  // --- Handlers ---
  const handleSearch = () => {
    if (!selectedHospital) {
      setModalState({
        isOpen: true,
        type: 'warning',
        batchId: null
      });
      return;
    }
    setIsSearched(true);
  };

  const handleInitiateExport = () => {
    if (filteredAppointments.length === 0) return;
    setModalState({
      isOpen: true,
      type: 'confirm',
      batchId: null
    });
  };

  // --- Function for Single Email Action ---
  const handleSendEmail = (appt) => {

    if (!sentEmailIds.includes(appt.id)) {
      setSentEmailIds(prev => [...prev, appt.id]);
    }

  };


  const handleConfirmExport = () => {
    const selectedItems = filteredAppointments;
    if (selectedItems.length === 0) return;

    // เตรียมข้อมูล Excel
    const excelData = selectedItems.map((appt, index) => ({
      "ลำดับ": index + 1,
      "ชื่อ-นามสกุล": appt.name,
      "วันเกิด": appt.birthDate || "",
      "อายุ": appt.age || "",
      "บัตรประชาชน": appt.idCard || "",
      "อาการ": appt.symptom || "-",
      "ไฟล์แนบ": (appt.files || []).map(f => f.name).join(", "),
      "วันจองนัดหลัก": appt.priority1Date ? new Date(appt.priority1Date).toLocaleDateString('th-TH') : "",
      "วันจองนัดรอง": appt.priority2Date ? new Date(appt.priority2Date).toLocaleDateString('th-TH') : "",
      "เหตุผลที่ไม่ได้จอง": "",
      "วันนัดแนะนำ": ""
    }));

    const ws = XLSX.utils.json_to_sheet(excelData, { skipHeader: false });
    ws['!cols'] = [
      { wch: 10 }, { wch: 20 }, { wch: 15 }, { wch: 5 }, { wch: 15 },
      { wch: 30 }, { wch: 30 }, { wch: 15 }, { wch: 15 }, { wch: 25 }, { wch: 20 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BatchExport");

    // const now = new Date();
    // const filename = `BatchExport-${now.toISOString().slice(0, 10)}.xlsx`;
    // XLSX.writeFile(wb, filename);

    const idsToExport = selectedItems.map(appt => appt.id);
    const newBatchId = createBatchExport(idsToExport);

    setModalState({
      isOpen: true,
      type: "success",
      batchId: newBatchId
    });
  };

  const handleCloseModal = () => {
    const wasSuccess = modalState.type === 'success';
    setModalState({ isOpen: false, type: null, batchId: null });

    if (wasSuccess) {
      setIsSearched(false);
      setSelectedHospital("");
      setSentEmailIds([]);
      
      if (adminScope !== 'all') {
         setSelectedProvince(adminScope); // ถ้าเป็น admin จังหวัด ให้ reset กลับไปเป็นจังหวัดตัวเอง
      } else {
         setSelectedProvince(""); // ถ้าเป็น super admin ให้ล้างค่าว่าง
      }
    }
  };


  const pendingItemsCount = filteredAppointments.filter(appt => !sentEmailIds.includes(appt.id)).length;
  const isReadyToExport = filteredAppointments.length > 0 && pendingItemsCount === 0;

  return (
    <div className="export-container">
      <CustomModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        title={
          modalState.type === 'warning' ? "แจ้งเตือน" :
            modalState.type === 'confirm' ? "ยืนยันการส่งออกข้อมูล" :
              "ดำเนินการสำเร็จ"
        }
        content={
          modalState.type === 'warning' ? (
            <div>
              <p className="mb-0 text-muted">กรุณาเลือก <strong>โรงพยาบาล</strong> ก่อนกดค้นหารายการ</p>
            </div>
          ) : modalState.type === 'confirm' ? (
            <div>
              <p className="mb-2">คุณต้องการสร้าง Batch สำหรับรายการจำนวน <strong>{filteredAppointments.length}</strong> รายการ ใช่หรือไม่?</p>
              <small className="text-muted">(รายการเหล่านี้จะถูกย้ายไปหน้า "ติดตามผล" ทันที)</small>
            </div>
          ) : (
            <div>
              <h4 className="text-success fw-bold mb-3">สร้าง Batch: {modalState.batchId} สำเร็จ!</h4>
              <p>รายการถูกย้ายไปสถานะ "รอผลตอบกลับ" เรียบร้อยแล้ว</p>
            </div>
          )
        }
        confirmText={modalState.type === 'confirm' ? "ยืนยัน, สร้าง Batch" : "ตกลง"}
        cancelText="ยกเลิก"
        onConfirm={modalState.type === 'confirm' ? handleConfirmExport : handleCloseModal}
        onCancel={handleCloseModal}
      />

      <div className="export-header">
        <h2>ส่งข้อมูลนัด (Export Data)</h2>
        <p>รายการนัดแต่ละโรงพยาบาล</p>
      </div>

      {/* --- Filter Card --- */}
      <div className="filter-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold text-primary d-flex align-items-center gap-2 mb-0">
            <Filter size={20} /> ตัวกรองข้อมูล
          </h5>
          <span className="badge bg-danger rounded-pill px-3">
            งานคงค้างรวม: {allHospitals.reduce((sum, h) => sum + h.bookingCount, 0)} คน
          </span>
        </div>

        <div className="d-flex gap-3 mb-3">
          <div className="flex-fill">
            <label className="text-muted small mb-1">จังหวัด</label>
            <div style={adminScope !== 'all' ? { pointerEvents: 'none', opacity: 0.8 } : {}}>
              <SearchableSelect
                options={provinces}
                value={selectedProvince}
                onChange={(val) => {
                  setSelectedProvince(val);
                  setSelectedHospital("");
                  setIsSearched(false);
                }}
                placeholder="ค้นหาหรือเลือกจังหวัด..."
                icon={MapPin}
              />
            </div>
          </div>
          <div className="flex-fill">
            <label className="text-muted small mb-1">โรงพยาบาล</label>
            <SearchableSelect
              options={hospitalOptions}
              value={selectedHospital}
              onChange={(val) => {
                setSelectedHospital(val);
                setIsSearched(false);
              }}
              placeholder={selectedProvince ? "ค้นหาชื่อโรงพยาบาล..." : "กรุณาเลือกจังหวัดก่อน"}
              icon={Building2}
              displayKey="name"
              valueKey="id"
            />
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-end">
          <div className="flex-fill me-3">
            <label className="text-muted small mb-1">ช่วงวันที่นัด (หลัก)</label>
            <div className="d-flex gap-2 align-items-center">
              <div style={{ flex: 1 }}>
                <CustomDatePicker
                  value={startDate}
                  onChange={setStartDate}
                  placeholder="วันเริ่มต้น"
                  eventCounts={dailyCounts}
                />
              </div>
              <span className="text-muted">-</span>
              <div style={{ flex: 1 }}>
                <CustomDatePicker
                  value={endDate}
                  onChange={setEndDate}
                  placeholder="วันสิ้นสุด"
                  eventCounts={dailyCounts}
                />
              </div>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-light border px-3"
              onClick={() => {
                setSelectedHospital("");
                // --- [FIX] Clear Logic: If scoped, don't clear province ---
                if (adminScope === 'all') {
                  setSelectedProvince("");
                } else {
                  setSelectedProvince(adminScope);
                }
                setStartDate("");
                setEndDate("");
                setIsSearched(false);
              }}
            >
              ล้างค่า
            </button>
            <button className="btn-search" onClick={handleSearch}>
              <Search size={18} className="me-2" /> ค้นหารายการ
            </button>
          </div>
        </div>
      </div>

      {/* --- Preview Table --- */}
      <div className="preview-card">
        <div className="preview-header">
          <div className="preview-title">
            <FileSpreadsheet className="text-primary" />
            รายการคำขอใหม่ (New Requests)
          </div>
          {filteredAppointments.length > 0 && (
            <span className="badge-count">พบ {filteredAppointments.length} รายการ</span>
          )}
        </div>

        <div style={{ flex: 1, overflowX: 'auto' }}>
          {isSearched && filteredAppointments.length === 0 ? (
            <div className="empty-state">
              <CheckCircle2 size={64} style={{ marginBottom: 20, opacity: 0.3, color: "green" }} />
              <p className="text-success fw-bold">ไม่พบรายการจองใหม่ในช่วงเวลานี้</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="empty-state">
              <Search size={64} style={{ marginBottom: 20, opacity: 0.1 }} />
              <p className="text-muted">
                กรุณาเลือกเงื่อนไขและกด "ค้นหา" เพื่อดูรายการที่ต้องส่งออก
              </p>
            </div>
          ) : (
            <table className="export-table">
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>#</th>
                  <th style={{ minWidth: "150px" }}>ชื่อ-นามสกุล</th>
                  <th style={{ minWidth: "100px" }}>แผนก</th>
                  <th style={{ minWidth: "150px" }}>แพทย์ที่เลือก</th>
                  <th style={{ minWidth: "100px" }}>อาการ</th>
                  <th style={{ width: "50px" }}>ไฟล์</th>
                  <th style={{ minWidth: "100px" }}>วันนัดหลัก</th>
                  <th style={{ minWidth: "100px" }}>วันนัดรอง</th>
                  <th>Status</th>
                  {/* --- Header ปุ่มส่งเรื่อง --- */}
                  <th className="text-center" style={{ minWidth: "80px" }}>ส่งเรื่อง</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appt, index) => {
                  // เช็คว่าคนนี้กดส่งไปหรือยัง
                  const isSent = sentEmailIds.includes(appt.id);

                  return (
                    <tr key={appt.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="fw-bold">{appt.name} {appt.lastname}</div>
                      </td>
                      <td>{appt.departmentName || "-"}</td>
                      <td>{appt.doctorName || "-"}</td>
                      <td>
                        <div className="d-flex align-items-start gap-1">
                          <FileText size={16} className="text-muted mt-1 flex-shrink-0" />
                          <span className="text-break">{appt.symptom || "-"}</span>
                        </div>
                      </td>
                      <td>
                        {appt.files && appt.files.length > 0 ? (
                          <div className="d-flex flex-column gap-1">
                            {appt.files.map((file, i) => (
                              <a
                                key={i}
                                href={file.url || "#"}
                                target="_blank"
                                rel="noreferrer"
                                className="d-flex align-items-center gap-1 text-decoration-none text-primary small"
                                style={{ maxWidth: "80px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", display: "inline-flex" }}
                                title={file.name}
                              >
                                <Paperclip size={14} style={{ minWidth: "14px", flexShrink: 0 }} />
                                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{file.name || `File ${i + 1}`}</span>
                              </a>
                            ))}
                          </div>
                        ) : <span className="text-muted">-</span>}
                      </td>
                      <td>{appt.priority1Date ? new Date(appt.priority1Date).toLocaleDateString('th-TH') : "-"}</td>
                      <td>{appt.priority2Date ? new Date(appt.priority2Date).toLocaleDateString('th-TH') : "-"}</td>
                      <td>
                        <span className={`badge ${appt.status === 'NEW' ? 'bg-success' : 'bg-secondary'}`}>{appt.status}</span>
                      </td>

                      {/* --- ปุ่มส่งเรื่อง --- */}
                      <td className="text-center">
                        {isSent ? (
                          // ถ้าส่งแล้ว: แสดงปุ่มเขียว + เครื่องหมายถูก (คลิกไม่ได้)
                          <button
                            className="btn btn-sm btn-success rounded-circle p-2"
                            disabled
                            title="บันทึกว่าส่งแล้ว"
                            style={{ cursor: "default" }}
                          >
                            <CheckCircle2 size={16} />
                          </button>
                        ) : (
                          // ถ้ายังไม่ส่ง: แสดงปุ่มซองจดหมาย (คลิกแล้วเปลี่ยนสถานะ)
                          <button
                            className="btn btn-sm btn-outline-primary rounded-circle p-2"
                            onClick={() => handleSendEmail(appt)}
                            title="ส่งอีเมล / แจ้งเรื่อง"
                          >
                            <Mail size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {filteredAppointments.length > 0 && (
          <div className="preview-footer">
            <div className="d-flex flex-column align-items-end me-3">
              {/* แสดงสถานะข้อความ */}
              {!isReadyToExport ? (
                <span className="text-danger small fw-bold">
                  * เหลืออีก {pendingItemsCount} รายการที่ยังไม่ได้ส่งเรื่อง
                </span>
              ) : (
                <span className="text-success small fw-bold">
                  <CheckCircle2 size={14} className="me-1" /> ครบถ้วน พร้อมส่งออก
                </span>
              )}
              <div className="summary-text text-muted" style={{ fontSize: '0.75rem' }}>
                *ต้องส่งเรื่องให้ครบทุกรายการจึงจะกดปุ่มได้
              </div>
            </div>

            <button
              className="btn-export"
              onClick={handleInitiateExport}
              disabled={!isReadyToExport}
              style={{
                opacity: !isReadyToExport ? 0.5 : 1,
                cursor: !isReadyToExport ? 'not-allowed' : 'pointer'
              }}
            >
              <FileDown size={20} /> สร้าง Batch & Export
            </button>
          </div>
        )}
      </div>
    </div>
  );
}