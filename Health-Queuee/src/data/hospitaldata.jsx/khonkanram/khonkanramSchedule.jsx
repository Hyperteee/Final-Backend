const khonkaenRamSchedule = [
  // -------------------- แผนก 0 (ไม่ระบุ) --------------------
  {
    departmentId: "KNK001-D00",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],
    doctors: [],
    bookings: []
  },

  // -------------------- อายุรกรรม --------------------
  {
    departmentId: "KNK001-D01",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],

    doctors: [
      { doctorId: "KNK001-D01-DR01" },
      { doctorId: "KNK001-D01-DR02" },
      { doctorId: "KNK001-D01-DR03" },
      { doctorId: "KNK001-D01-DR04" },
      { doctorId: "KNK001-D01-DR05" }
    ],
    bookings: []
  },

  // -------------------- ศัลยกรรม --------------------
  {
    departmentId: "KNK001-D02",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],

    doctors: [
      { doctorId: "KNK001-D02-DR01" },
      { doctorId: "KNK001-D02-DR02" },
      { doctorId: "KNK001-D02-DR03" },
      { doctorId: "KNK001-D02-DR04" },
      { doctorId: "KNK001-D02-DR05" }
    ],
    bookings: []
  },

  // -------------------- กุมารเวชกรรม --------------------
  {
    departmentId: "KNK001-D03",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],

    doctors: [
      { doctorId: "KNK001-D03-DR01" },
      { doctorId: "KNK001-D03-DR02" },
      { doctorId: "KNK001-D03-DR03" },
      { doctorId: "KNK001-D03-DR04" },
      { doctorId: "KNK001-D03-DR05" }
    ],
    bookings: []
  },

  // -------------------- นรีเวชกรรม --------------------
  {
    departmentId: "KNK001-D04",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],

    doctors: [
      { doctorId: "KNK001-D04-DR01" },
      { doctorId: "KNK001-D04-DR02" },
      { doctorId: "KNK001-D04-DR03" },
      { doctorId: "KNK001-D04-DR04" },
      { doctorId: "KNK001-D04-DR05" }
    ],
    bookings: []
  },

  // -------------------- หัวใจ --------------------
  {
    departmentId: "KNK001-D05",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],

    doctors: [
      { doctorId: "KNK001-D05-DR01" },
      { doctorId: "KNK001-D05-DR02" },
      { doctorId: "KNK001-D05-DR03" },
      { doctorId: "KNK001-D05-DR04" },
      { doctorId: "KNK001-D05-DR05" }
    ],
    bookings: []
  },

  // -------------------- จิตเวช --------------------
  {
    departmentId: "KNK001-D06",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],

    doctors: [
      { doctorId: "KNK001-D06-DR01" },
      { doctorId: "KNK001-D06-DR02" },
      { doctorId: "KNK001-D06-DR03" },
      { doctorId: "KNK001-D06-DR04" },
      { doctorId: "KNK001-D06-DR05" }
    ],
    bookings: []
  }
];

export default khonkaenRamSchedule;