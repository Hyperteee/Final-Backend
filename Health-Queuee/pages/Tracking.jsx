import React, { useState, useMemo, useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Search, CheckCircle2, XCircle, Clock,
  FileSpreadsheet, Download,
  Calendar as CalendarIcon, Filter, AlertCircle, AlertTriangle, RotateCcw,
  Check, X, Save, ChevronLeft, ChevronRight, Copy
} from "lucide-react";
import * as XLSX from "xlsx";

import { UserAppointment } from "../src/data/context/appointment";
import "./Export.css";
import "./Tracking.css";

import { useTranslation } from "react-i18next";

import hospitalData from "../src/data/listhospital";
function getLocalYMD(dateString) {
  if (!dateString) return null;
  const d = new Date(dateString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateCard(dateString) {
  if (!dateString) return { day: "-", date: "-" };
  const d = new Date(dateString);
  return {
    day: d.toLocaleDateString('th-TH', { weekday: 'long' }),
    date: d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })
  };
}

function StatusBadge({ status, hasSuggestion }) {
  const styles = {
    SENT: { bg: "#fff3cd", color: "#856404", label: "รอผลตอบกลับ", icon: Clock },
    CONFIRMED: { bg: "#d1e7dd", color: "#0f5132", label: "ยืนยันนัดแล้ว", icon: CheckCircle2 },
    REJECTED: { bg: "#f8d7da", color: "#842029", label: "ปฏิเสธ/เลื่อน", icon: XCircle },
    CANCELLED: { bg: "#e2e3e5", color: "#6c757d", label: "ยกเลิก", icon: XCircle },
    USER_CANCELLED: { bg: "#dc3545", color: "#ffffff", label: "ผู้ใช้ขอยกเลิก", icon: AlertTriangle },
  };

  if (status === 'REJECTED' && hasSuggestion) {
    return (
      <span className="badge rounded-pill d-inline-flex align-items-center gap-1 border border-warning" style={{ backgroundColor: "#fff3cd", color: "#856404", padding: "6px 12px", fontWeight: 500 }}>
        <Clock size={14} /> รอผู้ใช้ยืนยัน (นัดใหม่)
      </span>
    );
  }

  const s = styles[status] || styles.SENT;
  const Icon = s.icon;
  return (
    <span className="badge rounded-pill d-inline-flex align-items-center gap-1" style={{ backgroundColor: s.bg, color: s.color, padding: "6px 12px", fontWeight: 500 }}>
      <Icon size={14} /> {s.label}
    </span>
  );
}

function getSLAStatus(createdDate, status) {
  if (status !== 'SENT') return null;
  const created = new Date(createdDate);
  const now = new Date();
  const diffHours = (now - created) / (1000 * 60 * 60);
  if (diffHours > 48) {
    return <span className="badge bg-danger-subtle text-danger border border-danger-subtle ms-2 d-inline-flex align-items-center gap-1"><AlertTriangle size={10} /> ล่าช้า ({Math.floor(diffHours / 24)} วัน)</span>;
  } else if (diffHours > 24) {
    return <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle ms-2">เกิน 24 ชม.</span>;
  }
  return null;
}

function BatchProgress({ items }) {
  if (!items || items.length === 0) return null;
  const total = items.length;
  const confirmed = items.filter(i => i.status === 'CONFIRMED').length;
  const rejected = items.filter(i => i.status === 'REJECTED').length;
  const pending = items.filter(i => i.status === 'SENT').length;
  const successPercent = (confirmed / total) * 100;
  const rejectPercent = (rejected / total) * 100;
  const pendingPercent = (pending / total) * 100;
  return (
    <div className="progress mt-2" style={{ height: '6px' }}>
      <div className="progress-bar bg-success" style={{ width: `${successPercent}%` }}></div>
      <div className="progress-bar bg-danger" style={{ width: `${rejectPercent}%` }}></div>
      <div className="progress-bar bg-warning" style={{ width: `${pendingPercent}%` }}></div>
    </div>
  );
}

function CustomDatePicker({ value, onChange, placeholder = "เลือกวันที่...", disablePast = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) setCurrentDate(new Date(value));
  }, [value]);

  const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  const thaiDaysShort = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

  function getDaysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }
  function getFirstDayOfMonth(year, month) { return new Date(year, month, 1).getDay(); }

  function changeMonth(offset) {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
  }

  function handleDateClick(day) {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const offset = selectedDate.getTimezoneOffset();
    const localDate = new Date(selectedDate.getTime() - (offset * 60 * 1000));
    onChange(localDate.toISOString().split('T')[0]);
    setIsOpen(false);
  }

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const displayValue = value ? new Date(value).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' }) : "";

  return (
    <div className="position-relative" ref={containerRef} style={{ width: '100%' }}>
      <div
        className="form-control bg-white d-flex align-items-center justify-content-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer', height: '38px', fontSize: '0.9rem' }}
      >
        <span className={displayValue ? "text-dark" : "text-muted small"}>
          {displayValue || placeholder}
        </span>
        <CalendarIcon size={16} className="text-muted" />
      </div>

      {isOpen && (
        <div className="shadow-lg rounded border p-2 bg-white" style={{ position: 'absolute', bottom: '100%', marginBottom: '5px', left: 0, zIndex: 1050, width: '240px' }}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <button className="btn btn-sm btn-light rounded-circle p-1" onClick={(e) => { e.stopPropagation(); changeMonth(-1); }}>
              <ChevronLeft size={16} />
            </button>
            <span className="fw-bold text-primary" style={{ fontSize: '0.9rem' }}>
              {thaiMonths[currentDate.getMonth()]} {currentDate.getFullYear() + 543}
            </span>
            <button className="btn btn-sm btn-light rounded-circle p-1" onClick={(e) => { e.stopPropagation(); changeMonth(1); }}>
              <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '4px' }}>
            {thaiDaysShort.map(d => <div key={d} className="text-center text-muted small fw-bold" style={{ fontSize: '0.75rem' }}>{d}</div>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {days.map((day, index) => {
              if (!day) return <div key={index}></div>;

              const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              checkDate.setHours(0, 0, 0, 0);
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              const isPast = disablePast && checkDate < today;
              // -----------------------------------------------------

              const isSelected = value && new Date(value).getDate() === day && new Date(value).getMonth() === currentDate.getMonth() && new Date(value).getFullYear() === currentDate.getFullYear();
              const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();

              return (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isPast) handleDateClick(day);
                  }}
                  style={{
                    height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%',
                    fontSize: '0.8rem',
                    cursor: isPast ? 'default' : 'pointer',
                    backgroundColor: isSelected ? '#0d6efd' : 'transparent',
                    color: isSelected ? 'white' : (isPast ? '#ccc' : (isToday ? '#0d6efd' : '#333')),
                    fontWeight: (isSelected || isToday) ? 'bold' : 'normal',
                    border: isToday && !isSelected ? '1px solid #0d6efd' : '1px solid transparent',
                  }}
                  onMouseEnter={(e) => { if (!isSelected && !isPast) { e.currentTarget.style.backgroundColor = '#f0f8ff'; } }}
                  onMouseLeave={(e) => { if (!isSelected && !isPast) { e.currentTarget.style.backgroundColor = 'transparent'; } }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


export default function AdminTracking() {
  const { appointments, batches, updateAppointmentStatus } = useContext(UserAppointment);
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("ACTION");
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSentDate, setFilterSentDate] = useState("");
  const [filterBookingDate, setFilterBookingDate] = useState("");
  const [filterHospital, setFilterHospital] = useState("ALL");
  const [filterUrgentOnly, setFilterUrgentOnly] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsItem, setDetailsItem] = useState(null);
  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const [selectedItemIds, setSelectedItemIds] = useState([]);


  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const adminScope = currentUser?.adminScope || 'all';

  useEffect(() => {
    if (adminScope && adminScope !== 'all') {
      setSelectedProvince(adminScope);
    }
  }, [adminScope]);
  console.log(selectedProvince)

  const [updateForm, setUpdateForm] = useState({
    status: "CONFIRMED",
    confirmedDate: "",
    confirmedTime: "09:00",
    note: "",
    newProposedDate: "",
    bulkStrategy: "P1"
  });
  function getHospitalState(hospitalName) {
    if (!hospitalName) return "";
    const found = hospitalData.find(h => hospitalName.includes(h.name));
    return found ? found.state : "";
  }
  useEffect(() => {
    if (location.state?.filterMode === 'TODAY') {
      setActiveTab("HISTORY");
      const today = new Date().toISOString().slice(0, 10);
      setFilterSentDate(today);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const scopedAppointments = useMemo(() => {
    if (adminScope === 'all') return appointments;

    return appointments.filter(appt => {
      const state = getHospitalState(appt.hospitalName); // หาจังหวัดของโรงพยาบาลนี้
      return state === adminScope; // เทียบกับ scope ของ admin
    });
  }, [appointments, adminScope]);

  const scopedBatches = useMemo(() => {
    if (adminScope === 'all') return batches;

    return batches.filter(batch => {
      const state = getHospitalState(batch.hospitalName);
      return state === adminScope;
    });
  }, [batches, adminScope]);

  const trackingData = useMemo(() => {
    return scopedAppointments.filter(a => a.status !== "NEW");
  }, [scopedAppointments]);


  const hospitalOptions = useMemo(() => {
    const hospitals = trackingData.map(item => item.hospitalName).filter(Boolean);
    return ["ALL", ...new Set(hospitals)];
  }, [trackingData]);

  const stats = useMemo(() => {
    return {
      pending: trackingData.filter(a => a.status === "SENT").length,
      confirmed: trackingData.filter(a => a.status === "CONFIRMED").length,
      issues: trackingData.filter(a => a.status === "REJECTED").length,
    };
  }, [trackingData]);

  // --- Logic การกรอง ---
  const filteredList = useMemo(() => {
    if (activeTab === 'BATCH') return [];

    return trackingData.filter(item => {
      let showInTab = false;

      if (activeTab === "ACTION") {
        if (item.status === 'SENT' || item.status === 'USER_CANCELLED') {
          showInTab = true;
        } else if (item.status === 'REJECTED' && item.suggestedDate) {
          showInTab = true;
        }
      } else if (activeTab === "HISTORY") {
        if (item.status === 'CONFIRMED' || item.status === 'CANCELLED') {
          showInTab = true;
        } else if (item.status === 'REJECTED' && !item.suggestedDate) {
          showInTab = true;
        }
      }

      if (!showInTab) return false;

      if (filterSentDate) {
        const createdStr = getLocalYMD(item.createdAt);
        if (createdStr !== filterSentDate) return false;
      }
      if (filterBookingDate) {
        const bookingStr = getLocalYMD(item.priority1Date);
        if (bookingStr !== filterBookingDate) return false;
      }
      const term = searchTerm.toLowerCase();
      const matchSearch =
        (item.name && item.name.toLowerCase().includes(term)) ||
        (item.hospitalName && item.hospitalName.toLowerCase().includes(term)) ||
        (item.hn && item.hn.toLowerCase().includes(term)) ||
        (item.doctorName && item.doctorName.toLowerCase().includes(term)) ||
        (item.batchId && item.batchId.toLowerCase().includes(term));

      if (!matchSearch) return false;
      if (filterHospital !== "ALL" && item.hospitalName !== filterHospital) return false;
      if (filterUrgentOnly && item.status === 'SENT') {
        const diffHours = (new Date() - new Date(item.createdAt)) / 36e5;
        if (diffHours < 24) return false;
      }
      return true;
    });
  }, [trackingData, searchTerm, activeTab, filterSentDate, filterBookingDate, filterHospital, filterUrgentOnly]);

  // const filteredBatches = useMemo(() => {
  //   if (activeTab !== 'BATCH') return [];
  //   return batches.filter(b => b.id.toLowerCase().includes(searchTerm.toLowerCase()));
  // }, [batches, searchTerm, activeTab]);
  const filteredBatches = useMemo(() => {
    if (activeTab !== 'BATCH') return [];
    return scopedBatches.filter(b => b.id.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [scopedBatches, searchTerm, activeTab])
  useEffect(() => {
    if (activeTab === 'BATCH' && !selectedBatchId && scopedBatches.length > 0) {
      setSelectedBatchId(scopedBatches[0].id);
    }
  }, [activeTab, scopedBatches, selectedBatchId]);

  const currentBatchInfo = scopedBatches.find(b => b.id === selectedBatchId);
  
  const currentBatchItems = useMemo(() => {
    if (!selectedBatchId) return [];
    return scopedAppointments.filter(a => a.batchId === selectedBatchId);
  }, [scopedAppointments, selectedBatchId]);


  // --- Handlers ---

  function handleSelectAll(e) {
    if (e.target.checked) {
      const pendingItems = currentBatchItems
        .filter(i => i.status === 'SENT' || i.status === 'REJECTED')
        .map(i => i.id);
      setSelectedItemIds(pendingItems);
    } else {
      setSelectedItemIds([]);
    }
  }

  function handleSelectItem(id) {
    setSelectedItemIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  }

  function handleOpenUpdate(item) {
    setSelectedTask(item);
    const defaultDate = item.priority1Date ? getLocalYMD(item.priority1Date) : "";

    setUpdateForm({
      status: "CONFIRMED",
      confirmedDate: defaultDate,
      confirmedTime: "09:00",
      note: "",
      newProposedDate: "",
      bulkStrategy: "P1"
    });
    setShowModal(true);
  }

  async function handleSaveUpdate() {
    const basePayload = {
      confirmedTime: updateForm.status === 'CONFIRMED' ? updateForm.confirmedTime : null,
      rejectReason: updateForm.status === 'REJECTED' ? updateForm.note : null,
      suggestedDate: updateForm.status === 'REJECTED' ? updateForm.newProposedDate : null,
      note: updateForm.note
    };

    if (selectedTask) {
      const payload = {
        ...basePayload,
        confirmedDate: updateForm.status === 'CONFIRMED' ? updateForm.confirmedDate : null
      };

      // The context function updateAppointmentStatus now handles the backend DB update.

      updateAppointmentStatus(selectedTask.id, updateForm.status, payload);
      setSelectedTask(null);

    } else if (selectedItemIds.length > 0) {
      for (const id of selectedItemIds) {
        const originalItem = appointments.find(a => a.id === id);
        let targetDate = null;
        if (updateForm.status === 'CONFIRMED') {
          if (updateForm.bulkStrategy === 'P2') {
            targetDate = originalItem?.priority2Date || null;
          } else {
            targetDate = originalItem?.priority1Date;
          }
        }

        // The context function updateAppointmentStatus now handles the backend DB update.

        updateAppointmentStatus(id, updateForm.status, {
          ...basePayload,
          confirmedDate: targetDate
        });
      }
      setSelectedItemIds([]);
    }
    setShowModal(false);
  }

  function handleOpenBulkUpdate(status) {
    setSelectedTask(null);
    setUpdateForm({
      status: status,
      confirmedDate: "",
      confirmedTime: "09:00",
      note: "",
      newProposedDate: "",
      bulkStrategy: "P1"
    });
    setShowModal(true);
  }

  function handleRedownload(targetBatchId, batchDate) {
    const itemsInBatch = appointments.filter(app => app.batchId === targetBatchId);
    if (itemsInBatch.length === 0) {
      alert("ไม่พบข้อมูลใน Batch นี้");
      return;
    }
    itemsInBatch.sort((a, b) => {
      const dateA = new Date(a.priority1Date);
      const dateB = new Date(b.priority1Date);
      if (dateA - dateB !== 0) return dateA - dateB;
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    const excelData = itemsInBatch.map((appt, index) => ({
      "ลำดับ": index + 1,
      "ชื่อ": appt.name,
      "นามสกุล": appt.lastname,
      "วันเกิด": appt.birthDate || "",
      "อายุ": appt.age || "",
      "บัตรประชาชน/พาสปอร์ต": appt.identificationNumber || "",
      "สัญชาติ": currentUser.nationality || "",
      "อาการ": appt.symptom || "-",
      "ไฟล์แนบ": (appt.files || []).map(f => f.name).join(", "),
      "วันจองนัดหลัก": appt.priority1Date ? new Date(appt.priority1Date).toLocaleDateString('th-TH') : "",
      "วันจองนัดรอง": appt.priority2Date ? new Date(appt.priority2Date).toLocaleDateString('th-TH') : "",
      "เหตุผลที่ไม่ได้จอง": appt.rejectReason || "",
      "วันนัดแนะนำ": appt.suggestedDate ? new Date(appt.suggestedDate).toLocaleDateString('th-TH') : ""
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BatchExport");
    const filename = `BatchExport-${batchDate || targetBatchId}.xlsx`;
    XLSX.writeFile(wb, filename);
  }

  function handleCopyCancelMessage(item) {
    const message = `
🚨 *แจ้งขอยกเลิกนัดหมาย (Urgent Cancel)*
--------------------------
🏥 รพ.: ${item.hospitalName}
👤 คนไข้: ${item.name}
🆔 HN: ${item.hn || '-'}
📅 วันที่นัดเดิม: ${new Date(item.confirmedDate).toLocaleDateString('th-TH')}
⏰ เวลา: ${item.confirmedTime || '-'}
--------------------------
⚠️ ผู้ป่วยขอยกเลิกนัดผ่านระบบ รบกวนเจ้าหน้าที่ยกเลิกคิวแพทย์ด้วยครับ/ค่ะ
    `.trim();
    navigator.clipboard.writeText(message);
    alert("คัดลอกข้อความแจ้งยกเลิกแล้ว (นำไปวางใน Line/Email รพ. ได้เลย)");
  }

  function handleMarkAsNotified(item) {
    if (window.confirm(`ยืนยันว่าแจ้งโรงพยาบาล ${item.hospitalName} เรียบร้อยแล้ว?`)) {
      updateAppointmentStatus(item.id, 'CANCELLED', {
        note: `แอดมินแจ้งยกเลิก รพ. แล้วเมื่อ ${new Date().toLocaleString('th-TH')}`
      });
    }
  }

  return (
    <div className="export-container">
      <div className="export-header">
        <h2>ติดตามผลการนัด (Tracking)</h2>
        <p>ตรวจสอบสถานะและอัปเดตผลตอบกลับจากโรงพยาบาล</p>
      </div>

      <div className="row mb-4 g-3">
        <div className="col-md-4">
          <div className="stats-card">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="mb-0 text-warning">{stats.pending}</h3>
                <small className="text-muted">รอผลตอบกลับ (Pending)</small>
              </div>
              <div className="icon-bg bg-warning-light"><Clock className="text-warning" size={24} /></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stats-card">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="mb-0 text-danger">{stats.issues}</h3>
                <small className="text-muted">ต้องแก้ไข/ปฏิเสธ (Issues)</small>
              </div>
              <div className="icon-bg bg-danger-light"><AlertCircle className="text-danger" size={24} /></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stats-card">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="mb-0 text-success">{stats.confirmed}</h3>
                <small className="text-muted">ยืนยันนัดแล้ว (Confirmed)</small>
              </div>
              <div className="icon-bg bg-success-light"><CheckCircle2 className="text-success" size={24} /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex gap-4 mb-3 border-bottom px-2">
        <button
          className={`btn pb-2 rounded-0 ${activeTab === 'ACTION' ? 'border-bottom border-primary border-3 text-primary fw-bold' : 'text-muted'}`}
          onClick={() => setActiveTab('ACTION')}
        >
          ต้องจัดการ {(stats.pending + stats.issues) > 0 && <span className="badge bg-danger ms-2 rounded-pill">{stats.pending + stats.issues}</span>}
        </button>
        <button
          className={`btn pb-2 rounded-0 ${activeTab === 'HISTORY' ? 'border-bottom border-primary border-3 text-primary fw-bold' : 'text-muted'}`}
          onClick={() => setActiveTab('HISTORY')}
        >
          ประวัติรายคน (History)
        </button>
        <button
          className={`btn pb-2 rounded-0 ${activeTab === 'BATCH' ? 'border-bottom border-primary border-3 text-primary fw-bold' : 'text-muted'}`}
          onClick={() => setActiveTab('BATCH')}
        >
          ประวัติราย Batch
        </button>
      </div>

      {activeTab !== 'BATCH' && (
        <>
          <div className="filter-card py-3 mb-3">
            <div className="d-flex gap-3 align-items-center">

              <div className="position-relative flex-grow-1">
                <Search size={18} className="text-muted position-absolute top-50 start-0 translate-middle-y ms-3" />
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="ค้นหาชื่อคนไข้, โรงพยาบาล, ชื่อแพทย์..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="position-relative" style={{ width: '180px' }}>
                <CustomDatePicker
                  value={filterSentDate}
                  onChange={setFilterSentDate}
                  placeholder="วันที่ส่งเรื่อง"
                  disablePast={false} // ไม่ล็อควันกรอง
                />
                {filterSentDate && (
                  <button className="btn-close position-absolute top-50 end-0 translate-middle-y me-4 small" style={{ fontSize: '0.7rem' }} onClick={() => setFilterSentDate("")} />
                )}
              </div>

              <div className="position-relative" style={{ width: '180px' }}>
                <CustomDatePicker
                  value={filterBookingDate}
                  onChange={setFilterBookingDate}
                  placeholder="วันที่ขอนัด"
                  disablePast={false} // ไม่ล็อควันกรอง
                />
                {filterBookingDate && (
                  <button className="btn-close position-absolute top-50 end-0 translate-middle-y me-4 small" style={{ fontSize: '0.7rem' }} onClick={() => setFilterBookingDate("")} />
                )}
              </div>

              <button className={`btn d-flex align-items-center gap-2 ${showFilters ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setShowFilters(!showFilters)}>
                <Filter size={18} /> ตัวกรอง
              </button>
            </div>

            {showFilters && (
              <div className="mt-3 p-4 bg-white border rounded shadow-sm animate-slide-up position-relative">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                    <Filter size={16} className="text-primary" /> ตัวกรองแบบละเอียด
                  </h6>
                  <button
                    className="btn btn-link text-muted btn-sm text-decoration-none d-flex align-items-center gap-1"
                    onClick={() => { setFilterHospital("ALL"); setFilterUrgentOnly(false); setFilterSentDate(""); setFilterBookingDate(""); setSearchTerm(""); }}
                  >
                    <RotateCcw size={14} /> ล้างค่าทั้งหมด
                  </button>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small text-muted fw-bold">โรงพยาบาล</label>
                    <select className="form-select" value={filterHospital} onChange={(e) => setFilterHospital(e.target.value)}>
                      {hospitalOptions.map((h, index) => (
                        <option key={index} value={h}>{h === "ALL" ? "ทั้งหมด" : h}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-muted fw-bold">ความเร่งด่วน</label>
                    <div
                      className={`d-flex align-items-center p-2 px-3 rounded border cursor-pointer transition-all ${filterUrgentOnly ? 'border-danger bg-danger-subtle' : 'border-secondary-subtle bg-light'}`}
                      onClick={() => setFilterUrgentOnly(!filterUrgentOnly)}
                      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                      <div className={`rounded-circle p-2 me-3 d-flex align-items-center justify-content-center ${filterUrgentOnly ? 'bg-danger text-white' : 'bg-secondary text-white'}`} style={{ width: '36px', height: '36px' }}>
                        <AlertTriangle size={18} />
                      </div>
                      <div className="flex-grow-1">
                        <div className={`fw-bold small ${filterUrgentOnly ? 'text-danger' : 'text-dark'}`}>เฉพาะงานล่าช้า (Urgent)</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>กรองเฉพาะรายการที่รอนานเกิน 24 ชม.</div>
                      </div>
                      <div className="ms-2">
                        {filterUrgentOnly ? <CheckCircle2 size={20} className="text-danger" /> : <div className="border rounded-circle" style={{ width: 20, height: 20 }}></div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="preview-card mt-0">
            <div className="table-responsive">
              <table className="export-table">
                <thead>
                  <tr>
                    <th>Batch ID</th>
                    <th>คนไข้</th>
                    <th>โรงพยาบาล/แพทย์</th>
                    <th>วันที่จอง (Booking)</th>
                    <th>สถานะ</th>
                    <th className="text-end">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-5 text-muted">ไม่พบข้อมูล</td></tr>
                  ) : filteredList.map((item) => (
                    <tr key={item.id} className={item.status === 'USER_CANCELLED' ? 'table-danger' : ''}>
                      <td><span className="font-monospace text-muted small">{item.batchId || "-"}</span></td>
                      <td><div className="fw-bold">{item.name} {item.lastname || ''}</div></td>
                      <td><div>{item.hospitalName}</div><div className="small text-primary">{item.doctorName || "-"}</div></td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="fw-bold text-dark d-flex align-items-center">
                            {item.confirmedDate ? new Date(item.confirmedDate).toLocaleDateString('th-TH') : new Date(item.priority1Date).toLocaleDateString('th-TH')}
                            {getSLAStatus(item.createdAt, item.status)}
                          </span>
                          <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
                            ส่งเมื่อ: {item.createdAt ? new Date(item.createdAt).toLocaleDateString('th-TH') : "-"}
                          </span>
                        </div>
                      </td>
                      <td>
                        <StatusBadge status={item.status} hasSuggestion={!!item.suggestedDate} />
                      </td>

                      <td className="text-end">
                        {activeTab === 'ACTION' && (
                          <>
                            {item.status === 'USER_CANCELLED' ? (
                              <div className="d-flex gap-2 justify-content-end">
                                <button
                                  className="btn btn-light btn-sm border text-muted"
                                  onClick={() => handleCopyCancelMessage(item)}
                                  title="คัดลอกข้อความเพื่อแจ้ง รพ."
                                >
                                  <Copy size={14} className="me-1" /> Copy ข้อความ
                                </button>
                                <button
                                  className="btn btn-danger btn-sm shadow-sm d-flex align-items-center gap-1"
                                  onClick={() => handleMarkAsNotified(item)}
                                >
                                  <CheckCircle2 size={14} /> แจ้ง รพ. แล้ว
                                </button>
                              </div>

                            ) : item.status === 'REJECTED' && item.suggestedDate ? (
                              <button className="btn btn-warning btn-sm rounded-pill px-3 text-dark fw-bold border-0" disabled style={{ opacity: 0.9, cursor: 'default' }}>
                                <Clock size={14} className="me-1" /> รอผู้ใช้ยืนยัน
                              </button>

                            ) : (
                              <button className="btn btn-primary btn-sm rounded-pill px-3 text-nowrap" onClick={() => handleOpenUpdate(item)}>
                                อัปเดตผล
                              </button>
                            )}
                          </>
                        )}

                        {activeTab === 'HISTORY' && (
                          <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={() => { setDetailsItem(item); setShowDetailsModal(true); }}>ดูรายละเอียด</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* --- TAB 3: BATCH View --- */}
      {activeTab === 'BATCH' && (
        <div className="row g-4 fade-in">
          <div className="col-md-4">
            <div className="bg-white p-3 rounded-top border-bottom">
              <div className="position-relative">
                <Search size={16} className="text-muted position-absolute top-50 start-0 translate-middle-y ms-3" />
                <input type="text" className="form-control ps-5 form-control-sm" placeholder="ค้นหาเลข Batch..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div className="bg-white rounded-bottom shadow-sm overflow-auto" style={{ maxHeight: '70vh', border: '1px solid #dee2e6' }}>
              {filteredBatches.length === 0 ? (<div className="text-center p-4 text-muted small">ไม่พบประวัติ</div>) : filteredBatches.map(batch => {
                const batchItems = appointments.filter(a => a.batchId === batch.id);
                return (
                  <div
                    key={batch.id}
                    className={`p-3 border-bottom batch-item ${selectedBatchId === batch.id ? 'bg-blue-light border-start-primary' : ''}`}
                    onClick={() => setSelectedBatchId(batch.id)}
                    style={{ cursor: 'pointer', borderLeft: selectedBatchId === batch.id ? '4px solid #0d6efd' : '4px solid transparent' }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <span className="fw-bold text-primary small" style={{ fontSize: '0.8rem' }}>{batch.id}</span>
                      <div className="d-flex flex-column">
                        <span className="text-muted small" style={{ fontSize: '0.75rem' }}>{new Date(batch.date).toLocaleDateString('th-TH')}</span>
                        <span className="text-primary small text-end" style={{ fontSize: '0.75rem' }}>{batch.hospitalName}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between small text-muted mb-1">
                      <span>{batch.totalItems} รายการ</span>
                      {batch.status === 'COMPLETED'
                        ? (<span className="text-success d-flex align-items-center gap-1"><CheckCircle2 size={12} /> เสร็จสิ้น</span>)
                        : (<span className="text-warning d-flex align-items-center gap-1"><Clock size={12} /> รอผล</span>)}
                    </div>
                    <BatchProgress items={batchItems} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-md-8">
            {currentBatchInfo ? (
              <div className="preview-card mt-0 h-100">
                <div className="preview-header border-bottom pb-3 mb-3">
                  <div>
                    <div className="d-flex align-items-center gap-2"><FileSpreadsheet className="text-primary" size={24} /><h5 className="mb-0 fw-bold">รายละเอียด {currentBatchInfo.id}</h5></div>
                    <div className="d-flex gap-5"><small className="text-muted ms-1">ส่งเมื่อ: {new Date(currentBatchInfo.date).toLocaleString('th-TH')}</small>
                      <small className="text-muted">โรงพยาบาล<span className="text-primary">{currentBatchInfo.hospitalName}</span></small>
                    </div>
                  </div>
                  {selectedItemIds.length > 0 ? (
                    <div className="d-flex gap-2 animate-slide-up">
                      <button className="btn btn-success btn-sm d-flex align-items-center gap-1" onClick={() => handleOpenBulkUpdate('CONFIRMED')}><CheckCircle2 size={16} /> ยืนยัน ({selectedItemIds.length})</button>
                      <button className="btn btn-danger btn-sm d-flex align-items-center gap-1" onClick={() => handleOpenBulkUpdate('REJECTED')}><XCircle size={16} /> ปฏิเสธ ({selectedItemIds.length})</button>
                    </div>
                  ) : (
                    <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2" onClick={() => handleRedownload(currentBatchInfo.id, currentBatchInfo.date)}>
                      <Download size={16} /> ดาวน์โหลดไฟล์ซ้ำ
                    </button>
                  )}
                </div>

                <div className="d-flex gap-3 mb-4">
                  <div className="badge bg-success-subtle text-success p-2 px-3 rounded-pill border border-success-subtle">สำเร็จ: {currentBatchItems.filter(i => i.status === 'CONFIRMED').length}</div>
                  <div className="badge bg-danger-subtle text-danger p-2 px-3 rounded-pill border border-danger-subtle">ปฏิเสธ: {currentBatchItems.filter(i => i.status === 'REJECTED').length}</div>
                  <div className="badge bg-warning-subtle text-warning-emphasis p-2 px-3 rounded-pill border border-warning-subtle"> รอผล: {currentBatchItems.filter(i => i.status === 'SENT').length}</div>
                </div>

                <div className="table-responsive">
                  <table className="export-table">
                    <thead>
                      <tr>
                        <th style={{ width: '40px' }}><input type="checkbox" onChange={handleSelectAll} checked={selectedItemIds.length > 0 && selectedItemIds.length === currentBatchItems.filter(i => i.status === 'SENT').length} /></th>
                        <th>คนไข้</th>
                        <th>แผนก</th>
                        <th>วันนัด (P1)</th>
                        <th>สถานะ</th>
                        <th className="text-end">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBatchItems.map((item) => (
                        <tr key={item.id} className={selectedItemIds.includes(item.id) ? 'bg-light-blue' : ''}>
                          <td>{(item.status === 'SENT' || item.status === 'REJECTED') ? (<input type="checkbox" checked={selectedItemIds.includes(item.id)} onChange={() => handleSelectItem(item.id)} />) : <CheckCircle2 size={16} className="text-muted" />}</td>
                          <td><div className="fw-bold">{item.name} {item.lastname}</div><div className="small text-muted">{item.userId}</div></td>
                          <td>{item.hospitalName}</td>
                          <td>{new Date(item.priority1Date).toLocaleDateString('th-TH')}</td>
                          <td><StatusBadge status={item.status} /></td>

                          <td className="text-end">
                            {item.status === 'SENT' && (
                              <button className="btn btn-outline-primary btn-sm rounded-pill px-2 py-1" style={{ fontSize: '0.8rem' }} onClick={() => handleOpenUpdate(item)}>อัปเดต</button>
                            )}
                            {item.status === 'USER_CANCELLED' && (
                              <button className="btn btn-outline-danger btn-sm rounded-pill px-2 py-1" style={{ fontSize: '0.8rem' }} onClick={() => handleMarkAsNotified(item)}>แจ้ง รพ.</button>
                            )}
                            {item.status === 'REJECTED' && item.suggestedDate && (
                              <span className="badge bg-warning text-dark border-warning" style={{ fontSize: '0.7rem' }}>รอผู้ใช้</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted border rounded bg-white p-5">
                <FileSpreadsheet size={48} className="mb-3 opacity-25" /><p>กรุณาเลือก Batch ทางซ้ายเพื่อดูรายละเอียด</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- MODAL: Update Status --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content-custom animate-slide-up">
            <div className="d-flex justify-content-between align-items-start mb-4 border-bottom pb-3">
              <div>
                <h5 className="mb-1 fw-bold">{selectedTask ? "อัปเดตผลการนัดหมาย" : `อัปเดตผลแบบกลุ่ม (${selectedItemIds.length} รายการ)`}</h5>
                {selectedTask && <p className="mb-0 text-muted small">คนไข้: {selectedTask.name} {selectedTask.lastname}</p>}
              </div>
              <button className="btn-close-custom" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <div className="modal-body">
              <div className="mb-4">
                <div className="d-flex gap-2 bg-light p-1 rounded-pill" style={{ border: '1px solid #dee2e6' }}>
                  <button className={`btn rounded-pill flex-grow-1 d-flex align-items-center justify-content-center gap-2 ${updateForm.status === 'CONFIRMED' ? 'btn-success shadow-sm' : 'text-muted'}`} onClick={() => setUpdateForm({ ...updateForm, status: 'CONFIRMED' })}><CheckCircle2 size={18} /> ยืนยันนัด</button>
                  <button className={`btn rounded-pill flex-grow-1 d-flex align-items-center justify-content-center gap-2 ${updateForm.status === 'REJECTED' ? 'btn-danger shadow-sm' : 'text-muted'}`} onClick={() => setUpdateForm({ ...updateForm, status: 'REJECTED' })}><XCircle size={18} /> ปฏิเสธ/เลื่อน</button>
                </div>
              </div>

              {updateForm.status === 'CONFIRMED' ? (
                <div className="animate-slide-up">

                  {/* --- CASE 1: Single Task --- */}
                  {selectedTask && (
                    <>
                      <label className="small text-muted mb-2 fw-bold">เลือกวันที่ต้องการยืนยัน</label>
                      <div className="d-flex gap-3 mb-4">
                        {/* Card P1 (หลัก) */}
                        <div
                          className={`date-select-card flex-grow-1 ${updateForm.confirmedDate === getLocalYMD(selectedTask.priority1Date) ? 'active' : ''}`}
                          onClick={() => setUpdateForm({ ...updateForm, confirmedDate: getLocalYMD(selectedTask.priority1Date) })}
                        >
                          <div className="badge bg-primary mb-1">ตัวเลือกที่ 1 (หลัก)</div>
                          <h5 className="mb-0 fw-bold text-dark">{formatDateCard(selectedTask.priority1Date).date}</h5>
                        </div>

                        {/* Card P2 (รอง) */}
                        {selectedTask.priority2Date ? (
                          <div
                            className={`date-select-card flex-grow-1 ${updateForm.confirmedDate === getLocalYMD(selectedTask.priority2Date) ? 'active' : ''}`}
                            onClick={() => setUpdateForm({ ...updateForm, confirmedDate: getLocalYMD(selectedTask.priority2Date) })}
                          >
                            <div className="badge bg-secondary mb-1">ตัวเลือกที่ 2 (รอง)</div>
                            <h5 className="mb-0 fw-bold text-dark">{formatDateCard(selectedTask.priority2Date).date}</h5>
                          </div>
                        ) : (
                          <div className="date-select-card flex-grow-1 disabled bg-light text-muted border-dashed d-flex align-items-center justify-content-center">
                            <small>ไม่มีวันนัดสำรอง</small>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {!selectedTask && (
                    <>
                      <label className="small text-muted mb-2 fw-bold">เลือกรูปแบบวันที่สำหรับทุกคน</label>
                      <div className="d-flex gap-3 mb-4">
                        <div
                          className={`date-select-card flex-grow-1 text-center p-3 ${updateForm.bulkStrategy === 'P1' ? 'active' : ''}`}
                          onClick={() => setUpdateForm({ ...updateForm, bulkStrategy: 'P1' })}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="badge bg-primary mb-2">ตัวเลือกที่ 1 (หลัก)</div>
                          <h5 className="mb-0 fw-bold text-dark">ใช้วันนัดหลัก</h5>
                          <small className="text-muted">ของทุกคน</small>
                        </div>

                        <div
                          className={`date-select-card flex-grow-1 text-center p-3 ${updateForm.bulkStrategy === 'P2' ? 'active' : ''}`}
                          onClick={() => setUpdateForm({ ...updateForm, bulkStrategy: 'P2' })}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="badge bg-secondary mb-2">ตัวเลือกที่ 2 (รอง)</div>
                          <h5 className="mb-0 fw-bold text-dark">ใช้วันนัดรอง</h5>
                          <small className="text-muted">ของทุกคน (ถ้ามี)</small>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="bg-light p-3 rounded border">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="small text-muted mb-1">เวลาที่นัด</label>
                        <input type="time" className="form-control bg-white" value={updateForm.confirmedTime} onChange={e => setUpdateForm({ ...updateForm, confirmedTime: e.target.value })} />
                      </div>
                      <div className="col-12"><label className="small text-muted mb-1">หมายเหตุเพิ่มเติม (Note)</label><textarea className="form-control bg-white" rows="2" value={updateForm.note} onChange={e => setUpdateForm({ ...updateForm, note: e.target.value })} placeholder="ระบุสิ่งที่คนไข้ต้องเตรียมตัว..."></textarea></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-danger-soft p-3 rounded border border-danger-subtle animate-slide-up">
                  <div className="mb-3">
                    <label className="small text-muted mb-1 fw-bold">สาเหตุการปฏิเสธ</label>
                    <select className="form-select" onChange={e => setUpdateForm({ ...updateForm, note: e.target.value })}>
                      <option value="">-- กรุณาเลือกสาเหตุ --</option>
                      <option value="คิวแพทย์เต็ม">คิวแพทย์เต็มในวันดังกล่าว</option>
                      <option value="แพทย์ลา/ไม่สะดวก">แพทย์ติดภารกิจ/ลาพักร้อน</option>
                      <option value="คนไข้ปฏิเสธ">ติดต่อแล้ว คนไข้ขอยกเลิกเอง</option>
                      <option value="อื่นๆ">อื่นๆ</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="small text-muted mb-1 fw-bold">เสนอวันนัดใหม่ (ถ้ามี)</label>
                    <CustomDatePicker
                      value={updateForm.newProposedDate}
                      onChange={(date) => setUpdateForm({ ...updateForm, newProposedDate: date })}
                      placeholder="เสนอวันใหม่..."
                      disablePast={true}
                    />
                  </div>
                  <div className="col-12">
                    <label className="small text-muted mb-1">รายละเอียดเพิ่มเติม</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="เช่น แนะนำให้จองใหม่เดือนหน้า..."
                      value={updateForm.note}
                      onChange={e => setUpdateForm({ ...updateForm, note: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
              <button className="btn btn-light text-muted px-3" onClick={() => setShowModal(false)}>ยกเลิก</button>
              <button className="btn btn-primary px-4 shadow-sm" onClick={handleSaveUpdate}><Save size={18} className="me-2" /> บันทึกผล</button>
            </div>
          </div>
        </div>
      )}
    {/* --- MODAL: Read Only Details --- */}
      {showDetailsModal && detailsItem && (
        <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="modal-content-custom animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-start mb-4 border-bottom pb-3">
              <div>
                <h5 className="mb-1 fw-bold">รายละเอียดการจองคิว</h5>
                <p className="mb-0 text-muted small">คนไข้: {detailsItem.name} {detailsItem.lastname || ''}</p>
              </div>
              <button className="btn-close-custom" onClick={() => setShowDetailsModal(false)}><X size={20} /></button>
            </div>

            <div className="modal-body p-0">
              <div className="bg-light p-3 rounded mb-3">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <p className="text-muted small mb-1">เลขประจำตัว(ID)</p>
                    <p className="fw-bold mb-0">{detailsItem.idCard || detailsItem.userId}</p>
                  </div>
                  <div className="col-12 col-md-6">
                    <p className="text-muted small mb-1">สถานะ</p>
                    <StatusBadge status={detailsItem.status} hasSuggestion={!!detailsItem.suggestedDate} />
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="p-3 border rounded h-100">
                    <h6 className="fw-bold fs-6 mb-3 border-bottom pb-2">สถานที่ และ แพทย์</h6>
                    <div className="mb-2">
                      <span className="text-muted small d-block">โรงพยาบาล:</span>
                      <span className="fw-medium">{detailsItem.hospitalName || "-"}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-muted small d-block">แผนก:</span>
                      <span className="fw-medium">{detailsItem.departmentName || "-"}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-muted small d-block">แพทย์ที่เลือก:</span>
                      <span className="fw-medium">{detailsItem.doctorName || "-"}</span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="p-3 border rounded h-100">
                    <h6 className="fw-bold fs-6 mb-3 border-bottom pb-2">วันที่นัดหมาย & อาการ</h6>
                    <div className="mb-2">
                      <span className="text-muted small d-block">วันนัด (ทางเลือก 1):</span>
                      <span className="fw-medium">{detailsItem.priority1Date ? new Date(detailsItem.priority1Date).toLocaleDateString('th-TH') : "-"}</span>
                    </div>
                    {detailsItem.priority2Date && (
                      <div className="mb-2">
                        <span className="text-muted small d-block">วันนัด (ทางเลือก 2):</span>
                        <span className="fw-medium">{new Date(detailsItem.priority2Date).toLocaleDateString('th-TH')}</span>
                      </div>
                    )}
                    <div className="mb-0 mt-3">
                      <span className="text-muted small d-block mb-1">อาการที่ระบุ:</span>
                      <div className="bg-white border p-2 rounded small" style={{ minHeight: '60px' }}>
                        {detailsItem.symptom || "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
              <button className="btn btn-secondary px-4 rounded-pill shadow-sm" onClick={() => setShowDetailsModal(false)}>ปิด</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}