// import { createContext, useState } from "react";
// import hospitalMap from "../hospitaldata.jsx/allhospitaldata";

// export const HospitalScheduleContext = createContext();

// export const HospitalScheduleProvider = ({ children }) => {
//   const [hospitalSchedules, setHospitalSchedules] = useState({
//     "จุฬาลงกรณ์": hospitalMap["จุฬาลงกรณ์"].schedule || {},
//     "สินแพทย์": hospitalMap["สินแพทย์"].schedule || {},
//   });

//   return (
//     <HospitalScheduleContext.Provider value={{ hospitalSchedules, setHospitalSchedules }}>
//       {children}
//     </HospitalScheduleContext.Provider>
//   );
// };
import { createContext, useState } from "react";
import hospitalMap from "../hospitaldata.jsx/allhospitaldata";

export const HospitalScheduleContext = createContext();

export const HospitalScheduleProvider = ({ children }) => {
  const [hospitalSchedules, setHospitalSchedules] = useState({
    "จุฬาลงกรณ์": hospitalMap["จุฬาลงกรณ์"]?.schedule || [],
    "สินแพทย์": hospitalMap["สินแพทย์"]?.schedule || [],
    "เชียงใหม่ราม": hospitalMap["เชียงใหม่ราม"]?.schedule || [],
    "ศิริราช": hospitalMap["ศิริราช"]?.schedule || [],
    "กรุงเทพ": hospitalMap["กรุงเทพ"]?.schedule || [],
    "มหาราชนครเชียงใหม่": hospitalMap["มหาราชนครเชียงใหม่"]?.schedule || [],
    "ราชวิถี": hospitalMap["ราชวิถี"]?.schedule || [],
    "บำรุงราษฎร์": hospitalMap["บำรุงราษฎร์"]?.schedule || [],
    "ขอนแก่นราม": hospitalMap["ขอนแก่นราม"]?.schedule || [],
    "สงขลานครินทร์": hospitalMap["สงขลานครินทร์"]?.schedule || [],
    "วิภาวดี": hospitalMap["วิภาวดี"]?.schedule || [],
    "สมิติเวช สุขุมวิท": hospitalMap["สมิติเวช สุขุมวิท"]?.schedule || [],
    "พระมงกุฎเกล้า": hospitalMap["พระมงกุฎเกล้า"]?.schedule || [],
    "หาดใหญ่": hospitalMap["หาดใหญ่"]?.schedule || [],
    "เปาโล สมุทรปราการ": hospitalMap["เปาโล สมุทรปราการ"]?.schedule || [],
    "ศรีนครินทร์": hospitalMap["ศรีนครินทร์"]?.schedule || [],
  });

  return (
    <HospitalScheduleContext.Provider value={{ hospitalSchedules, setHospitalSchedules }}>
      {children}
    </HospitalScheduleContext.Provider>
  );
};