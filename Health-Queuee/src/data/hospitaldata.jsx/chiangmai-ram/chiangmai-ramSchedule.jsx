const chiangmaiRamSchedule = [
  // -------------------- แผนก 0 (ไม่ระบุ) --------------------
  {
    departmentId: "CHM001-D00",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],
    doctors: [],
    bookings: []
  },

  // -------------------- อายุรกรรม --------------------
  {
    departmentId: "CHM001-D01",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],

    doctors: [
      { doctorId: "CHM001-D01-DR01" },
      { doctorId: "CHM001-D01-DR02" },
      { doctorId: "CHM001-D01-DR03" },
      { doctorId: "CHM001-D01-DR04" },
      { doctorId: "CHM001-D01-DR05" }
    ],
    bookings: []
  },

  // -------------------- ศัลยกรรม --------------------
  {
    departmentId: "CHM001-D02",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],

    doctors: [
      { doctorId: "CHM001-D02-DR01" },
      { doctorId: "CHM001-D02-DR02" },
      { doctorId: "CHM001-D02-DR03" },
      { doctorId: "CHM001-D02-DR04" },
      { doctorId: "CHM001-D02-DR05" }
    ],
    bookings: []
  },

  // -------------------- กุมารเวชกรรม --------------------
  {
    departmentId: "CHM001-D03",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],

    doctors: [
      { doctorId: "CHM001-D03-DR01" },
      { doctorId: "CHM001-D03-DR02" },
      { doctorId: "CHM001-D03-DR03" },
      { doctorId: "CHM001-D03-DR04" },
      { doctorId: "CHM001-D03-DR05" }
    ],
    bookings: []
  },

  // -------------------- นรีเวชกรรม --------------------
  {
    departmentId: "CHM001-D04",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],

    doctors: [
      { doctorId: "CHM001-D04-DR01" },
      { doctorId: "CHM001-D04-DR02" },
      { doctorId: "CHM001-D04-DR03" },
      { doctorId: "CHM001-D04-DR04" },
      { doctorId: "CHM001-D04-DR05" }
    ],
    bookings: []
  },

  // -------------------- หัวใจ --------------------
  {
    departmentId: "CHM001-D05",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],

    doctors: [
      { doctorId: "CHM001-D05-DR01" },
      { doctorId: "CHM001-D05-DR02" },
      { doctorId: "CHM001-D05-DR03" },
      { doctorId: "CHM001-D05-DR04" },
      { doctorId: "CHM001-D05-DR05" }
    ],
    bookings: []
  },

  // -------------------- จิตเวช --------------------
  {
    departmentId: "CHM001-D06",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"], // จิตเวชอาจหยุดวันอาทิตย์ในบาง รพ.

    doctors: [
      { doctorId: "CHM001-D06-DR01" },
      { doctorId: "CHM001-D06-DR02" },
      { doctorId: "CHM001-D06-DR03" },
      { doctorId: "CHM001-D06-DR04" },
      { doctorId: "CHM001-D06-DR05" }
    ],
    bookings: []
  }
];

export default chiangmaiRamSchedule;