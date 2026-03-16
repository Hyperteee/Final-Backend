const sirirajSchedule = [
  // -------------------- แผนก 0 (ไม่ระบุ) --------------------
  {
    departmentId: "BKK003-D00",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],
    doctors: [],
    bookings: []
  },

  // -------------------- อายุรกรรม --------------------
  {
    departmentId: "BKK003-D01",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"], // เพิ่มเสาร์สำหรับคลินิกพิเศษ

    doctors: [
      { doctorId: "BKK003-D01-DR01" },
      { doctorId: "BKK003-D01-DR02" },
      { doctorId: "BKK003-D01-DR03" },
      { doctorId: "BKK003-D01-DR04" },
      { doctorId: "BKK003-D01-DR05" }
    ],
    bookings: []
  },

  // -------------------- ศัลยกรรม --------------------
  {
    departmentId: "BKK003-D02",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "BKK003-D02-DR01" },
      { doctorId: "BKK003-D02-DR02" },
      { doctorId: "BKK003-D02-DR03" },
      { doctorId: "BKK003-D02-DR04" },
      { doctorId: "BKK003-D02-DR05" }
    ],
    bookings: []
  },

  // -------------------- กุมารเวชกรรม --------------------
  {
    departmentId: "BKK003-D03",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"],

    doctors: [
      { doctorId: "BKK003-D03-DR01" },
      { doctorId: "BKK003-D03-DR02" },
      { doctorId: "BKK003-D03-DR03" },
      { doctorId: "BKK003-D03-DR04" },
      { doctorId: "BKK003-D03-DR05" }
    ],
    bookings: []
  },

  // -------------------- นรีเวชกรรม --------------------
  {
    departmentId: "BKK003-D04",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "BKK003-D04-DR01" },
      { doctorId: "BKK003-D04-DR02" },
      { doctorId: "BKK003-D04-DR03" },
      { doctorId: "BKK003-D04-DR04" },
      { doctorId: "BKK003-D04-DR05" }
    ],
    bookings: []
  },

  // -------------------- หัวใจ --------------------
  {
    departmentId: "BKK003-D05",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "BKK003-D05-DR01" },
      { doctorId: "BKK003-D05-DR02" },
      { doctorId: "BKK003-D05-DR03" },
      { doctorId: "BKK003-D05-DR04" },
      { doctorId: "BKK003-D05-DR05" }
    ],
    bookings: []
  },

  // -------------------- จิตเวช --------------------
  {
    departmentId: "BKK003-D06",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "BKK003-D06-DR01" },
      { doctorId: "BKK003-D06-DR02" },
      { doctorId: "BKK003-D06-DR03" },
      { doctorId: "BKK003-D06-DR04" },
      { doctorId: "BKK003-D06-DR05" }
    ],
    bookings: []
  }
];

export default sirirajSchedule;