const hatyaiSchedule = [
  // -------------------- แผนก 0 (ไม่ระบุ) --------------------
  {
    departmentId: "SGK002-D00",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],
    doctors: [],
    bookings: []
  },

  // -------------------- อายุรกรรม --------------------
  {
    departmentId: "SGK002-D01",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"], // คลินิกนอกเวลา

    doctors: [
      { doctorId: "SGK002-D01-DR01" },
      { doctorId: "SGK002-D01-DR02" },
      { doctorId: "SGK002-D01-DR03" },
      { doctorId: "SGK002-D01-DR04" },
      { doctorId: "SGK002-D01-DR05" }
    ],
    bookings: []
  },

  // -------------------- ศัลยกรรม --------------------
  {
    departmentId: "SGK002-D02",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "SGK002-D02-DR01" },
      { doctorId: "SGK002-D02-DR02" },
      { doctorId: "SGK002-D02-DR03" },
      { doctorId: "SGK002-D02-DR04" },
      { doctorId: "SGK002-D02-DR05" }
    ],
    bookings: []
  },

  // -------------------- กุมารเวชกรรม --------------------
  {
    departmentId: "SGK002-D03",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"],

    doctors: [
      { doctorId: "SGK002-D03-DR01" },
      { doctorId: "SGK002-D03-DR02" },
      { doctorId: "SGK002-D03-DR03" },
      { doctorId: "SGK002-D03-DR04" },
      { doctorId: "SGK002-D03-DR05" }
    ],
    bookings: []
  },

  // -------------------- นรีเวชกรรม --------------------
  {
    departmentId: "SGK002-D04",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "SGK002-D04-DR01" },
      { doctorId: "SGK002-D04-DR02" },
      { doctorId: "SGK002-D04-DR03" },
      { doctorId: "SGK002-D04-DR04" },
      { doctorId: "SGK002-D04-DR05" }
    ],
    bookings: []
  },

  // -------------------- หัวใจ --------------------
  {
    departmentId: "SGK002-D05",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "SGK002-D05-DR01" },
      { doctorId: "SGK002-D05-DR02" },
      { doctorId: "SGK002-D05-DR03" },
      { doctorId: "SGK002-D05-DR04" },
      { doctorId: "SGK002-D05-DR05" }
    ],
    bookings: []
  },

  // -------------------- จิตเวช --------------------
  {
    departmentId: "SGK002-D06",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "SGK002-D06-DR01" },
      { doctorId: "SGK002-D06-DR02" },
      { doctorId: "SGK002-D06-DR03" },
      { doctorId: "SGK002-D06-DR04" },
      { doctorId: "SGK002-D06-DR05" }
    ],
    bookings: []
  }
];

export default hatyaiSchedule;