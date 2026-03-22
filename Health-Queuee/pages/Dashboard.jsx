import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  FileUp, Clock, Users, CheckCircle,
  ChevronRight, Bell, Package
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { UserAppointment } from "../src/data/context/appointment";


export default function AdminDashboard() {
  const navigate = useNavigate()
  const { appointments, batches } = useContext(UserAppointment);

  const [users, setUsers] = useState([])

  useEffect(() => {
    
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);

    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    const userRole = loggedInUser?.role || loggedInUser?.role_id;
    if (!loggedInUser || (userRole !== "admin" && userRole !== "super_admin" && userRole !== 1 && userRole !== 2)) {
        alert("คุณไม่มีสิทธิเข้าถึงหน้านี้");
        navigate('/'); 
    }

  }, [])  

  const filteredUsers = users.filter(user => user.role == 'pending')
  console.log(filteredUsers)

  const stats = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    return {
      newRequests: appointments.filter(a => a.status === "NEW").length,
      pendingBatches: batches.filter(b => b.status === "SENT").length,
      pendingUsers: filteredUsers.length,
      todayAppts: appointments.filter(a => {
          const isConfirmed = a.status === 'CONFIRMED';
          const apptDate = a.confirmedDate || a.priority1Date;
          return isConfirmed && apptDate === todayStr;
      }).length
    };
  }, [appointments, batches, filteredUsers]);

  const formatDateTh = (dateObj) => {
    if (!dateObj) return "-";
    const d = new Date(dateObj); 
    if (isNaN(d)) return "-";

    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = (d.getFullYear() + 543).toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const recentBatches = batches.slice(0, 10);

  const notifications = [
    { id: 1, title: "⚠️ งานล่าช้า: Batch #005", desc: "รพ. จุฬาฯ ยังไม่ตอบกลับมาเกิน 24 ชม. แล้ว กรุณาโทรติดตาม", type: "red", time: "10 นาทีที่แล้ว" },
    { id: 2, title: "✅ Batch #004 เสร็จสมบูรณ์", desc: "บันทึกผลครบถ้วนแล้ว ระบบส่งเมลแจ้งคนไข้เรียบร้อย", type: "green", time: "30 นาทีที่แล้ว" },
    { id: 3, title: "👤 ผู้ใช้ใหม่: สมชาย ใจดี", desc: "ลงทะเบียนเข้ามาใหม่ รอการตรวจสอบเอกสาร", type: "orange", time: "1 ชั่วโมงที่แล้ว" },
    { id: 4, title: "📢 ประกาศจากระบบ", desc: "พรุ่งนี้ระบบจะปิดปรับปรุงช่วง 02:00 - 04:00 น.", type: "blue", time: "เมื่อวาน" },
  ];

  const goToTodayList = () => {
    navigate('/admin/tracking', { 
      state: { filterMode: 'TODAY' } 
    });
  };

  return (
    <div className="admin-content-wrapper">

      <header className="dashboard-header">
        <div>
          <h1 className="page-title">ภาพรวมระบบ</h1>
          <p className="page-subtitle">ข้อมูล ณ วันที่ {new Date().toLocaleDateString('th-TH')}</p>
        </div>
        <div className="notification-btn">
          <Bell size={20} />
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card" onClick={() => navigate('/admin/export')}>
          <div className="stat-icon-box bg-blue"><FileUp size={24} /></div>
          <div className="stat-info">
            <div className="stat-count">{stats.newRequests}</div>
            <div className="stat-label">คำขอจองใหม่</div>
            <div className="stat-link" style={{ color: '#4318FF' }}>ไปหน้า Export <ChevronRight size={12} /></div>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/admin/tracking')}>
          <div className="stat-icon-box bg-orange"><Clock size={24} /></div>
          <div className="stat-info">
            <div className="stat-count">{stats.pendingBatches}</div>
            <div className="stat-label">Batch รอผล</div>
            <div className="stat-link" style={{ color: '#ff9f43' }}>ไปหน้า Tracking <ChevronRight size={12} /></div>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/admin/users')}>
          <div className="stat-icon-box bg-red"><Users size={24} /></div>
          <div className="stat-info">
            <div className="stat-count">{stats.pendingUsers}</div>
            <div className="stat-label">ผู้ใช้รออนุมัติ</div>
            <div className="stat-link" style={{ color: '#ef4444' }}>ตรวจสอบ <ChevronRight size={12} /></div>
          </div>
        </div>

        {/* ปุ่มนัดหมายวันนี้ กดแล้วไปหน้า Tracking แบบกรองวันที่ */}
        <div className="stat-card" onClick={goToTodayList}>
          <div className="stat-icon-box bg-green"><CheckCircle size={24} /></div>
          <div className="stat-info">
            <div className="stat-count">{stats.todayAppts}</div>
            <div className="stat-label">นัดหมายวันนี้</div>
            <div className="stat-link" style={{ color: '#05cd99' }}>ดูรายชื่อ <ChevronRight size={12} /></div>
          </div>
        </div>
      </div>

      <div className="content-row">

        {/* Left Table */}
        <div className="dashboard-card" style={{ flex: 2.5 }}>
          <div className="card-title-row">
            <div className="card-title-text">
              <Package size={20} color="#4318FF" /> สถานะการนำส่งล่าสุด
            </div>
            <button className="card-action btn btn-link text-decoration-none" onClick={() => navigate('/admin/tracking')}>
                ดูทั้งหมด
            </button>
          </div>

          <div className="scrollable-content">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Batch ID</th>
                  <th>โรงพยาบาล</th>
                  <th>วันที่</th>
                  <th>สถานะ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentBatches.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-4 text-muted">ยังไม่มีรายการนำส่ง</td></tr>
                ) : recentBatches.map((batch, idx) => (
                  <tr key={idx}>
                    <td className="batch-id">
                        {batch.id.length > 25 ? batch.id.substring(0, 22) + "..." : batch.id}
                    </td>
                    <td>{batch.hospitalName}</td>
                    <td style={{ color: '#a3aed0', fontSize: '0.85rem' }}>{formatDateTh(batch.date)}</td>
                    <td>
                      {batch.status === 'SENT' ? (
                        <span className="badge-custom badge-wait">รอผล</span>
                      ) : (
                        <span className="badge-custom badge-done">เสร็จสิ้น</span>
                      )}
                    </td>
                    <td className="text-end">
                        <button className="btn btn-sm p-0" onClick={() => navigate('/admin/tracking')}>
                            <ChevronRight size={16} color="#a3aed0" />
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Notification */}
        <div className="dashboard-card" style={{ flex: 1 }}>
          <div className="card-title-row">
            <div className="card-title-text">
              <Bell size={20} color="#ff9f43" /> การแจ้งเตือน
            </div>
          </div>

          <div className="scrollable-content notif-list">
            {notifications.map((n) => (
              <div key={n.id} className={`notif-item ${n.type}`}>
                <div className="notif-dot"></div>
                <div className="notif-text">
                  <h5>{n.title}</h5>
                  <p>{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}