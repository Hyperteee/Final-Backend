import hospitalMap from "../data/hospitaldata.jsx/allhospitaldata";

const MALE_MARKERS = ["นพ.", "นายแพทย์", "dr.", "mr.", "sir"];
const FEMALE_MARKERS = ["พญ.", "แพทย์หญิง", "นางแพทย์", "mrs.", "ms.", "madam"];

const UNIVERSITY_POOL = [
  "คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  "คณะแพทยศาสตร์ มหาวิทยาลัยมหิดล",
  "คณะแพทยศาสตร์ศิริราชพยาบาล",
  "คณะแพทยศาสตร์โรงพยาบาลรามาธิบดี",
  "คณะแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่",
  "คณะแพทยศาสตร์ มหาวิทยาลัยขอนแก่น",
  "คณะแพทยศาสตร์ มหาวิทยาลัยสงขลานครินทร์",
  "คณะแพทยศาสตร์ มหาวิทยาลัยธรรมศาสตร์",
  "คณะแพทยศาสตร์ มหาวิทยาลัยนเรศวร",
  "คณะแพทยศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ",
];

const EXPERIENCE_SENTENCES = [
  "มีประสบการณ์ดูแลผู้ป่วยด้าน{specialty}มากกว่า 5 ปี",
  "ผ่านการดูแลผู้ป่วยเฉพาะทาง{specialty}ทั้งในคลินิกและหอผู้ป่วยหนัก",
  "ร่วมทีมสหสาขาด้าน{specialty}ในหลายโรงพยาบาลชั้นนำ",
  "เคยศึกษาต่อยอดด้าน{specialty}ในต่างประเทศและถ่ายทอดสู่การรักษาในไทย",
];

const CARE_STYLE_SENTENCES = [
  "เน้นการสื่อสารแบบเข้าใจง่ายและติดตามอาการอย่างใกล้ชิด",
  "ให้ความสำคัญกับการป้องกันก่อนเกิดโรครุนแรงและออกแบบแผนการรักษาเฉพาะบุคคล",
  "ใช้ข้อมูลเชิงลึกและเทคโนโลยีวินิจฉัยยุคใหม่ช่วยให้ผู้ป่วยตัดสินใจได้มั่นใจ",
  "ดูแลคนไข้ด้วยความใส่ใจในรายละเอียดและทำงานร่วมกับครอบครัวผู้ป่วยเสมอ",
];

const FOCUS_SENTENCES = [
  "สนใจการวิจัยด้าน{specialty}เชิงป้องกันเพื่อลดความเสี่ยงในระยะยาว",
  "ถนัดการดูแลผู้ป่วย{specialty}ที่ต้องฟื้นฟูอย่างต่อเนื่อง",
  "มุ่งพัฒนาการรักษาแบบผสมผสานทั้งการแพทย์แผนปัจจุบันและการดูแลตนเอง",
  "เชี่ยวชาญการวางแผนติดตามอาการ{specialty}ด้วยเครื่องมือสวมใส่และแอปสุขภาพ",
];

const COMMUNITY_SENTENCES = [
  "นอกจากงานประจำยังร่วมถ่ายทอดความรู้ให้ชุมชนในโครงการโรงพยาบาล{hospital}",
  "ทำหน้าที่ที่ปรึกษาให้สตาร์ทอัปสุขภาพและทีมอาสาสมัครของ{hospital}",
  "เป็นหนึ่งในทีมจัดอบรมครอบครัวผู้ป่วยที่{hospital}",
  "ร่วมเวิร์กช็อปกับองค์กรท้องถิ่นเพื่อเพิ่มการเข้าถึงบริการที่{hospital}",
];

const LANGUAGE_SENTENCES = [
  "สามารถสื่อสารได้ทั้งภาษาไทย อังกฤษ และภาษาญี่ปุ่นระดับพื้นฐาน",
  "พูดคุยได้ทั้งภาษาไทย อังกฤษ และมีล่ามออนไลน์สำหรับผู้ป่วยต่างชาติ",
  "ถนัดภาษาไทย อังกฤษ และจีนกลางสำหรับผู้ป่วยนักธุรกิจ",
  "สื่อสารภาษาไทย อังกฤษ พร้อมมีคู่มือภาษามือสำหรับผู้ป่วยที่ต้องการ",
];

const createScheduleLookup = (schedule = []) => {
  const map = new Map();
  schedule.forEach((department) => {
    department?.doctors?.forEach((doctor) => {
      const slots = [];
      Object.entries(doctor?.bookings ?? {}).forEach(([day, times]) => {
        Object.entries(times ?? {}).forEach(([time, reservations]) => {
          slots.push({
            day,
            time,
            isBooked: Array.isArray(reservations) && reservations.length > 0,
          });
        });
      });
      map.set(doctor.doctorId, slots);
    });
  });
  return map;
};

const hashString = (input = "") => {
  if (!input) return 0;
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const selectFromList = (items, key) => {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }
  const index = Math.abs(hashString(key)) % items.length;
  return items[index];
};

const pickEducation = (doctor, hospital) => {
  if (doctor?.education) return doctor.education;
  if (!UNIVERSITY_POOL.length) {
    return "คณะแพทยศาสตร์ มหาวิทยาลัยการแพทย์แห่งชาติ";
  }
  const key = doctor?.id || doctor?.name || hospital?.id || hospital?.name || "default";
  const index = hashString(key) % UNIVERSITY_POOL.length;
  return UNIVERSITY_POOL[index];
};

const buildDoctorBio = (doctor, hospital, education) => {
  if (doctor?.bio) return doctor.bio;
  const name = doctor?.name || "แพทย์ประจำโรงพยาบาล";
  const specialty = doctor?.specialization || "การแพทย์ทั่วไป";
  const hospitalName = hospital?.name || "โรงพยาบาลชั้นนำ";
  const doctorKey = doctor?.id || `${name}-${hospitalName}`;

  const expTemplate = selectFromList(EXPERIENCE_SENTENCES, `${doctorKey}-exp`);
  const experience = expTemplate ? expTemplate.replaceAll("{specialty}", specialty) : "";
  const careStyle = selectFromList(CARE_STYLE_SENTENCES, `${doctorKey}-care`);
  const focusTemplate = selectFromList(FOCUS_SENTENCES, `${doctorKey}-focus`);
  const focusArea = focusTemplate ? focusTemplate.replaceAll("{specialty}", specialty) : "";
  const communityTemplate = selectFromList(COMMUNITY_SENTENCES, `${doctorKey}-community`);
  const communityRole = communityTemplate ? communityTemplate.replaceAll("{hospital}", hospitalName) : "";
  const language = selectFromList(LANGUAGE_SENTENCES, `${doctorKey}-lang`);

  return `${name} จบการศึกษาจาก${education} ${experience} ${careStyle} ${focusArea} ${communityRole} ${language}`.replace(/\s+/g, " ").trim();
};

/**
 * Normalize doctors data from hospitalMap
 * @returns {Array} Array of normalized doctor objects
 */
export const normalizeDoctors = () => {
  const hospitalEntries = Object.values(hospitalMap);
  return hospitalEntries.flatMap(({ info: hospital, schedule }) => {
    const departments = hospital?.departments ?? [];
    const scheduleLookup = createScheduleLookup(schedule);
    return departments.flatMap((department) => {
      const doctors = department?.doctors ?? [];
      return doctors.map((doctor, idx) => {
        const education = pickEducation(doctor, hospital);
        return {
          id: doctor.id ?? `${hospital.id}-${department.name}-${idx}`,
          name: doctor.name ?? "",
          specialization: doctor.specialization ?? "",
          schedule: scheduleLookup.get(doctor.id) ?? [],
          education,
          bio: buildDoctorBio(doctor, hospital, education),
          dept: department.name ?? "",
          hospital: hospital.name ?? "",
          hospitalLogo: hospital.logo ?? "",
        };
      });
    });
  });
};

/**
 * Sort doctors by name (Thai), hospital, and department
 * @param {Array} doctors - Array of doctor objects
 * @returns {Array} Sorted doctors
 */
export const sortDoctors = (doctors) => {
  return doctors.sort(
    (a, b) =>
      a.name.localeCompare(b.name, "th") ||
      a.hospital.localeCompare(b.hospital, "th") ||
      a.dept.localeCompare(b.dept, "th")
  );
};

/**
 * Get top N doctors
 * @param {number} count - Number of top doctors to return
 * @returns {Array} Top N doctors
 */
export const getTopDoctors = (count = 4) => {
  const allDoctors = normalizeDoctors();
  const sortedDoctors = sortDoctors(allDoctors);
  return sortedDoctors.slice(0, count);
};

/**
 * Get all sorted doctors
 * @returns {Array} All normalized and sorted doctors
 */
export const getAllDoctors = () => {
  const allDoctors = normalizeDoctors();
  return sortDoctors(allDoctors);
};
