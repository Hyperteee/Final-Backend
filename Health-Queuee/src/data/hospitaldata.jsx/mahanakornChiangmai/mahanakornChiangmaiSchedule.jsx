const maharajChiangMaiSchedule = [
  // -------------------- แผนก 0 (ไม่ระบุ) --------------------
  {
    departmentId: "CHM002-D00",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],
    doctors: [],
    bookings: []
  },

  // -------------------- อายุรกรรม --------------------
  {
    departmentId: "CHM002-D01",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"], // คลินิกนอกเวลา

    doctors: [
      { doctorId: "CHM002-D01-DR01" },
      { doctorId: "CHM002-D01-DR02" },
      { doctorId: "CHM002-D01-DR03" },
      { doctorId: "CHM002-D01-DR04" },
      { doctorId: "CHM002-D01-DR05" }
    ],
    bookings: []
  },

  // -------------------- ศัลยกรรม --------------------
  {
    departmentId: "CHM002-D02",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "CHM002-D02-DR01" },
      { doctorId: "CHM002-D02-DR02" },
      { doctorId: "CHM002-D02-DR03" },
      { doctorId: "CHM002-D02-DR04" },
      { doctorId: "CHM002-D02-DR05" }
    ],
    bookings: []
  },

  // -------------------- กุมารเวชกรรม --------------------
  {
    departmentId: "CHM002-D03",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"],

    doctors: [
      { doctorId: "CHM002-D03-DR01" },
      { doctorId: "CHM002-D03-DR02" },
      { doctorId: "CHM002-D03-DR03" },
      { doctorId: "CHM002-D03-DR04" },
      { doctorId: "CHM002-D03-DR05" }
    ],
    bookings: []
  },

  // -------------------- นรีเวชกรรม --------------------
  {
    departmentId: "CHM002-D04",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "CHM002-D04-DR01" },
      { doctorId: "CHM002-D04-DR02" },
      { doctorId: "CHM002-D04-DR03" },
      { doctorId: "CHM002-D04-DR04" },
      { doctorId: "CHM002-D04-DR05" }
    ],
    bookings: []
  },

  // -------------------- หัวใจ --------------------
  {
    departmentId: "CHM002-D05",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "CHM002-D05-DR01" },
      { doctorId: "CHM002-D05-DR02" },
      { doctorId: "CHM002-D05-DR03" },
      { doctorId: "CHM002-D05-DR04" },
      { doctorId: "CHM002-D05-DR05" }
    ],
    bookings: []
  },

  // -------------------- จิตเวช --------------------
  {
    departmentId: "CHM002-D06",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "CHM002-D06-DR01" },
      { doctorId: "CHM002-D06-DR02" },
      { doctorId: "CHM002-D06-DR03" },
      { doctorId: "CHM002-D06-DR04" },
      { doctorId: "CHM002-D06-DR05" }
    ],
    bookings: []
  }
];

export default maharajChiangMaiSchedule;