import React, { createContext, useState, useEffect } from "react";

export const UserAppointment = createContext();

export const UserAppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([
    {
      id: "BK-1701001",
      userId: "15418597",
      batchId: null,
      hospitalId: "BKK001",
      hospitalName: "จุฬาลงกรณ์",
      departmentName: "อายุรกรรม",
      doctorId: "BKK001-D01-DR01",
      doctorName: "นพ. สมชาย ใจดี",
      name: "นาย รักษา ดีมาก",
      symptom: "มีอาการปวดหัวเรื้อรัง บ้านหมุน เป็นมา 2 สัปดาห์",
      files: [{ name: "history_checkup.pdf", url: "#" }],
      priority1Date: "2025-12-01",
      priority2Date: "2025-12-05",
      status: "NEW",
      createdAt: "2025-11-20T09:00:00Z"
    }, 
    {
      id: "BK-1701002",
      userId: "15418797",
      batchId: null,
      hospitalId: "BKK001",
      hospitalName: "จุฬาลงกรณ์",
      departmentName: "อายุรกรรม",
      doctorId: "BKK001-D01-DR01",
      doctorName: "นพ. สมชาย ใจดี",
      name: "นาง สมหญิง วิ่งเร็ว",
      symptom: "dasda",
      files: [{ name: "referral.pdf", url: "#" }],
      priority1Date: "2025-12-02",
      priority2Date: "2025-12-05",
      status: "NEW",
      createdAt: "2025-11-20T10:00:00Z"
    }
    // {
    //   id: "BK-1701003",
    //   userId: "47895497",
    //   batchId: null,
    //   hospitalId: "BKK002",
    //   hospitalName: "ศิริราช",
    //   departmentName: "จักษุ",
    //   doctorId: null,
    //   doctorName: "-",
    //   name: "ด.ช. เก่ง กล้า",
    //   symptom: "สายตาสั้น มองไม่ชัด",
    //   files: [],
    //   priority1Date: "2025-12-10",
    //   priority2Date: "2025-12-12",
    //   status: "NEW",
    //   createdAt: "2025-11-24T14:00:00Z"
    // }
  ]);

  const [batches, setBatches] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addAppointment = (appointment) => {
    const newAppt = { ...appointment, id: `BK-${Date.now()}` };
    setAppointments(prev => [...prev, newAppt]);
  };

  const cancelAppointment = (appointmentId) => {
    setAppointments((prev) =>
      prev.map((appt) => appt.id === appointmentId ? { ...appt, status: "CANCELLED" } : appt)
    );
  };
  const createBatchExport = (selectedIds) => {
    const selectedItems = appointments.filter(app => selectedIds.includes(app.id));
    if (selectedItems.length === 0) return;

    const hospId = selectedItems[0].hospitalId || "ALL";
    const hospName = selectedItems[0].hospitalName || "ไม่ระบุโรงพยาบาล";

    const rawDates = selectedItems.map(item => {
      const d = item.priority1Date;
      if (!d) return null;
      if (d instanceof Date) return d.toISOString().split('T')[0];
      return String(d);
    }).filter(d => d !== null).sort();

    const startDate = rawDates.length > 0 ? rawDates[0].replace(/-/g, "") : "00000000";
    const endDate = rawDates.length > 0 ? rawDates[rawDates.length - 1].replace(/-/g, "") : "00000000";

    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5).replace(/:/g, "");

    const newBatchId = `BATCH-${hospId}-${startDate}-${endDate}-${timeStr}`;
    const exportedDate = now.toISOString();

    setAppointments((prevAppointments) =>
      prevAppointments.map((appt) => {
        if (selectedIds.includes(appt.id)) {
          return {
            ...appt,
            status: "SENT",
            batchId: newBatchId,
            updatedAt: exportedDate
          };
        }
        return appt;
      })
    );

    const newBatch = {
      id: newBatchId,
      hospitalName: hospName,
      date: exportedDate,
      totalItems: selectedItems.length,
      status: "SENT",
      itemIds: selectedIds
    };

    setBatches(prev => [newBatch, ...prev]);

    return newBatchId;
  }

  const checkBatchCompletion = (batchId, updatedAppointments) => {
    const itemsInBatch = updatedAppointments.filter(a => a.batchId === batchId);
    if (itemsInBatch.length === 0) return;

    const isAllComplete = itemsInBatch.every(item => 
      ['CONFIRMED', 'REJECTED', 'CANCELLED'].includes(item.status)
    );

    setBatches(prevBatches => prevBatches.map(batch => {
      if (batch.id === batchId) {
        return {
          ...batch,
          status: isAllComplete ? "COMPLETED" : "SENT"
        };
      }
      return batch;
    }));
  };

  const updateAppointmentStatus = (id, newStatus, extraData = {}) => {
    setAppointments(prevAppointments => {
      const updatedList = prevAppointments.map(appt => {
        if (appt.id === id) {
          return { ...appt, status: newStatus, ...extraData };
        }
        return appt;
      });

      const targetAppt = updatedList.find(a => a.id === id);
      if (targetAppt && targetAppt.batchId) {
        checkBatchCompletion(targetAppt.batchId, updatedList);
      }

      return updatedList;
    });
  };

  return (
    <UserAppointment.Provider value={{ 
        appointments, 
        batches, 
        addAppointment, 
        cancelAppointment, 
        createBatchExport, 
        updateAppointmentStatus 
    }}>
      {children}
    </UserAppointment.Provider>
  );
};