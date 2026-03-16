const chulaSchedule = [
  // -------------------- แผนก 0 --------------------
  {
    departmentId: "BKK001-D00",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"],
    doctors: [],
    bookings: []
  },

  // -------------------- อายุรกรรม --------------------
  {
    departmentId: "BKK001-D01",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "BKK001-D01-DR01" },
      { doctorId: "BKK001-D01-DR02" },
      { doctorId: "BKK001-D01-DR03" },
      { doctorId: "BKK001-D01-DR04" },
      { doctorId: "BKK001-D01-DR05" }
    ],
    bookings: []
  },

  // -------------------- ศัลยกรรม --------------------
  {
    departmentId: "BKK001-D02",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี"],

    doctors: [
      { doctorId: "BKK001-D02-DR01" },
      { doctorId: "BKK001-D02-DR02" },
      { doctorId: "BKK001-D02-DR03" },
      { doctorId: "BKK001-D02-DR04" },
      { doctorId: "BKK001-D02-DR05" }
    ],
    bookings: []
  },

  // -------------------- กุมารเวชกรรม --------------------
  {
    departmentId: "BKK001-D03",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "BKK001-D03-DR01" },
      { doctorId: "BKK001-D03-DR02" },
      { doctorId: "BKK001-D03-DR03" },
      { doctorId: "BKK001-D03-DR04" },
      { doctorId: "BKK001-D03-DR05" }
    ],
    bookings: []
  },

  // -------------------- นรีเวชกรรม --------------------
  {
    departmentId: "BKK001-D04",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "BKK001-D04-DR01" },
      { doctorId: "BKK001-D04-DR02" },
      { doctorId: "BKK001-D04-DR03" },
      { doctorId: "BKK001-D04-DR04" },
      { doctorId: "BKK001-D04-DR05" }
    ],
    bookings: []
  },

  // -------------------- หัวใจ --------------------
  {
    departmentId: "BKK001-D05",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "BKK001-D05-DR01" },
      { doctorId: "BKK001-D05-DR02" },
      { doctorId: "BKK001-D05-DR03" },
      { doctorId: "BKK001-D05-DR04" },
      { doctorId: "BKK001-D05-DR05" }
    ],
    bookings: []
  },

  // -------------------- จิตเวช --------------------
  {
    departmentId: "BKK001-D06",
    workingDays: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],

    doctors: [
      { doctorId: "BKK001-D06-DR01" },
      { doctorId: "BKK001-D06-DR02" },
      { doctorId: "BKK001-D06-DR03" },
      { doctorId: "BKK001-D06-DR04" },
      { doctorId: "BKK001-D06-DR05" }
    ],
    bookings: []
  }
];

export default chulaSchedule;
