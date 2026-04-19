import React, { createContext, useState, useEffect } from "react";

export const UserAppointment = createContext();

export const UserAppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  
  // Load batches from localStorage
  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem('healthq_batches');
    return saved ? JSON.parse(saved) : [];
  });

  // Load appointment overrides (like batchId and SENT status) from localStorage
  const [overrides, setOverrides] = useState(() => {
    const saved = localStorage.getItem('healthq_overrides');
    return saved ? JSON.parse(saved) : {};
  });

  // Save changes to localStorage automatically
  useEffect(() => {
    localStorage.setItem('healthq_batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('healthq_overrides', JSON.stringify(overrides));
  }, [overrides]);

  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/data/getAppointments");
        if (response.ok) {
          const dbPayload = await response.json();
          const dbData = dbPayload.appointments || [];
          setAppointments(prev => {
            // Merge DB data with local state, avoiding duplicate IDs
            const existingIds = prev.map(a => String(a.id));
            // Merge overrides into new items from DB
            const newItems = dbData.filter(dbItem => !existingIds.includes(String(dbItem.id))).map(dbItem => {
              if (overrides[dbItem.id]) {
                return { ...dbItem, ...overrides[dbItem.id] };
              }
              return dbItem;
            });
            return [...prev, ...newItems];
          });
        }
      } catch (error) {
        console.error("Failed to fetch appointments from DB:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Auto-repair stale batches that have "ไม่ระบุโรงพยาบาล"
  useEffect(() => {
    const staleBatchesExist = batches.some(b => b.hospitalName === "ไม่ระบุโรงพยาบาล");
    if (staleBatchesExist && appointments.length > 0) {
      setBatches(prevBatches => {
        let changed = false;
        const newBatches = prevBatches.map(batch => {
          if (batch.hospitalName === "ไม่ระบุโรงพยาบาล" && batch.itemIds?.length > 0) {
            const sample = appointments.find(a => 
              batch.itemIds.includes(a.id) && 
              a.hospitalName && 
              a.hospitalName !== "-" && 
              a.hospitalName !== "ไม่ระบุโรงพยาบาล"
            );
            if (sample) {
              changed = true;
              return { ...batch, hospitalName: sample.hospitalName };
            }
          }
          return batch;
        });
        return changed ? newBatches : prevBatches;
      });
    }
  }, [appointments, batches]);

  const addAppointment = (appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  const cancelAppointment = async (appointmentId, note = "") => {
    try {
      await fetch(`http://127.0.0.1:3000/data/appointments/${appointmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled", note })
      });
    } catch (err) {
      console.error("Failed to cancel in DB:", err);
    }
    setAppointments((prev) =>
      prev.map((appt) => appt.id === appointmentId ? { ...appt, status: "CANCELLED", note } : appt)
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
          const updates = {
            status: "SENT",
            batchId: newBatchId,
            updatedAt: exportedDate
          };
          setOverrides(prev => ({ ...prev, [appt.id]: { ...(prev[appt.id] || {}), ...updates } }));
          return { ...appt, ...updates };
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

  const updateAppointmentStatus = async (id, newStatus, extraData = {}) => {
    // Determine backend status string
    let backendStatus = newStatus;
    if (newStatus === 'NEW') backendStatus = 'pending';
    else if (newStatus === 'CONFIRMED') backendStatus = 'confirmed';
    else if (newStatus === 'CANCELLED' || newStatus === 'USER_CANCELLED' || newStatus === 'REJECTED') backendStatus = 'cancelled';

    // Prepare payload
    const payload = {
        status: backendStatus,
    };
    if (extraData.confirmedDate) payload.confirmedDate = extraData.confirmedDate;
    if (extraData.confirmedTime) payload.confirmedTime = extraData.confirmedTime;
    if (extraData.note) payload.note = extraData.note;

    try {
      const response = await fetch(`http://127.0.0.1:3000/data/appointments/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("ไม่สามารถอัปเดตสถานะใน Server ได้");
      }

      setAppointments(prevAppointments => {
        const updatedList = prevAppointments.map(appt => {
          if (appt.id === id) {
            const updates = { status: newStatus, ...extraData };
            setOverrides(prev => ({ ...prev, [id]: { ...(prev[id] || {}), ...updates } }));
            return { ...appt, ...updates };
          }
          return appt;
        });

        const targetAppt = updatedList.find(a => a.id === id);
        if (targetAppt && targetAppt.batchId) {
          checkBatchCompletion(targetAppt.batchId, updatedList);
        }

        return updatedList;
      });

      console.log(`[Appointment Context] อัปเดตสถานะสำเร็จ`);
    } catch (error) {
      console.error("[Appointment Context] เกิดข้อผิดพลาด:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์: " + error.message);
    }
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