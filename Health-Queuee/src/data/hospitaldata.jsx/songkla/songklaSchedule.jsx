const songklanagarindSchedule = [
  // -------------------- แผนก 0 (ไม่ระบุ) --------------------
  {
    departmentId: "SGK001-D00",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],
    doctors: [],
    bookings: []
  },

  // -------------------- อายุรกรรม --------------------
  {
    departmentId: "SGK001-D01",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"], // คลินิกนอกเวลา

    doctors: [
      { doctorId: "SGK001-D01-DR01" },
      { doctorId: "SGK001-D01-DR02" },
      { doctorId: "SGK001-D01-DR03" },
      { doctorId: "SGK001-D01-DR04" },
      { doctorId: "SGK001-D01-DR05" }
    ],
    bookings: []
  },

  // -------------------- ศัลยกรรม --------------------
  {
    departmentId: "SGK001-D02",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "SGK001-D02-DR01" },
      { doctorId: "SGK001-D02-DR02" },
      { doctorId: "SGK001-D02-DR03" },
      { doctorId: "SGK001-D02-DR04" },
      { doctorId: "SGK001-D02-DR05" }
    ],
    bookings: []
  },

  // -------------------- กุมารเวชกรรม --------------------
  {
    departmentId: "SGK001-D03",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"],

    doctors: [
      { doctorId: "SGK001-D03-DR01" },
      { doctorId: "SGK001-D03-DR02" },
      { doctorId: "SGK001-D03-DR03" },
      { doctorId: "SGK001-D03-DR04" },
      { doctorId: "SGK001-D03-DR05" }
    ],
    bookings: []
  },

  // -------------------- นรีเวชกรรม --------------------
  {
    departmentId: "SGK001-D04",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "SGK001-D04-DR01" },
      { doctorId: "SGK001-D04-DR02" },
      { doctorId: "SGK001-D04-DR03" },
      { doctorId: "SGK001-D04-DR04" },
      { doctorId: "SGK001-D04-DR05" }
    ],
    bookings: []
  },

  // -------------------- หัวใจ --------------------
  {
    departmentId: "SGK001-D05",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "SGK001-D05-DR01" },
      { doctorId: "SGK001-D05-DR02" },
      { doctorId: "SGK001-D05-DR03" },
      { doctorId: "SGK001-D05-DR04" },
      { doctorId: "SGK001-D05-DR05" }
    ],
    bookings: []
  },

  // -------------------- จิตเวช --------------------
  {
    departmentId: "SGK001-D06",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "SGK001-D06-DR01" },
      { doctorId: "SGK001-D06-DR02" },
      { doctorId: "SGK001-D06-DR03" },
      { doctorId: "SGK001-D06-DR04" },
      { doctorId: "SGK001-D06-DR05" }
    ],
    bookings: []
  }
];

export default songklanagarindSchedule;