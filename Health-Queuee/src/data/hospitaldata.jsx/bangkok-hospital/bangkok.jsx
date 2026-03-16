import dataIcon from "../../../../images/icon-department/icon-department";

const bangkokHospital = {
  id: "BKK004", // อิงตาม hospitalData
  name: "กรุงเทพ",
  state: "กรุงเทพมหานคร",
  type: "โรงพยาบาลเอกชน",
  logo: "images/logohospital/bangkok.png", // อิงตาม hospitalData
  stars: 4.2,
  reviews: 210,
  location: { lat: 13.7506, lng: 100.5849 }, // อิงตาม hospitalData
  district: "ห้วยขวาง",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "BKK004-D00",
      name: "ไม่รู้แผนก"
    },
    // -------------------- อายุรกรรม --------------------
    {
      id: "BKK004-D01",
      name: "อายุรกรรม",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "BKK004-D01-DR01", name: "นพ. ธนกฤต มิตรภาพ", specialization: "อายุรแพทย์ทั่วไป" },
        { id: "BKK004-D01-DR02", name: "พญ. วิมลวรรณ สุขกาย", specialization: "โรคระบบทางเดินหายใจ" },
        { id: "BKK004-D01-DR03", name: "นพ. ก้องเกียรติ เกียรติขจร", specialization: "โรคไตและทางเดินปัสสาวะ" },
        { id: "BKK004-D01-DR04", name: "พญ. นันทิดา พาเพลิน", specialization: "โรคต่อมไร้ท่อและเมตาบอลิสม" },
        { id: "BKK004-D01-DR05", name: "นพ. ศุภชัย ใจกว้าง", specialization: "อายุรกรรมประสาทวิทยา" },
      ],
    },

    // -------------------- ศัลยกรรม --------------------
    {
      id: "BKK004-D02",
      name: "ศัลยกรรม",
      logo: dataIcon.surgery,
      doctors: [
        { id: "BKK004-D02-DR01", name: "นพ. ปกรณ์ มือหนึ่ง", specialization: "ศัลยกรรมทั่วไป" },
        { id: "BKK004-D02-DR02", name: "พญ. สวยเสมอ เลอโฉม", specialization: "ศัลยกรรมตกแต่งและเสริมสร้าง" },
        { id: "BKK004-D02-DR03", name: "นพ. ทรงยศ ยอดเยี่ยม", specialization: "ศัลยกรรมกระดูกและข้อ" },
        { id: "BKK004-D02-DR04", name: "พญ. รักษ์ตา พาฝัน", specialization: "จักษุศัลยกรรม" },
        { id: "BKK004-D02-DR05", name: "นพ. ไกรสร แข็งแรง", specialization: "ศัลยกรรมสมองและระบบประสาท" },
      ],
    },

    // -------------------- กุมารเวชกรรม --------------------
    {
      id: "BKK004-D03",
      name: "กุมารเวชกรรม",
      logo: dataIcon.child,
      doctors: [
        { id: "BKK004-D03-DR01", name: "พญ. หรรษา ร่าเริง", specialization: "กุมารแพทย์ทั่วไป" },
        { id: "BKK004-D03-DR02", name: "นพ. โอฬาร บานเย็น", specialization: "โรคหัวใจเด็ก" },
        { id: "BKK004-D03-DR03", name: "พญ. แก้วตา ดวงใจ", specialization: "ทารกแรกเกิด" },
        { id: "BKK004-D03-DR04", name: "นพ. พีรพล คนเก่ง", specialization: "โรคระบบทางเดินหายใจเด็ก" },
        { id: "BKK004-D03-DR05", name: "พญ. ขวัญข้าว ชาวนา", specialization: "โภชนาการเด็ก" },
      ],
    },

    // -------------------- นรีเวชกรรม --------------------
    {
      id: "BKK004-D04",
      name: "นรีเวชกรรม",
      logo: dataIcon.woman,
      doctors: [
        { id: "BKK004-D04-DR01", name: "พญ. แพรวพรรณ งามตา", specialization: "สูติ-นรีเวชทั่วไป" },
        { id: "BKK004-D04-DR02", name: "นพ. สันติ สุขใจ", specialization: "ภาวะมีบุตรยาก" },
        { id: "BKK004-D04-DR03", name: "พญ. เดือนเพ็ญ เด่นฟ้า", specialization: "เวชศาสตร์มารดาและทารก" },
        { id: "BKK004-D04-DR04", name: "นพ. องอาจ มาดแมน", specialization: "มะเร็งนรีเวช" },
        { id: "BKK004-D04-DR05", name: "พญ. พลอยไพลิน งามงอน", specialization: "นรีเวชทางเดินปัสสาวะ" },
      ],
    },

    // -------------------- หัวใจ --------------------
    {
      id: "BKK004-D05",
      name: "หัวใจ",
      logo: dataIcon.heart,
      doctors: [
        { id: "BKK004-D05-DR01", name: "นพ. หัวใจ เหล็ก", specialization: "อายุรกรรมโรคหัวใจ" },
        { id: "BKK004-D05-DR02", name: "พญ. น้ำทิพย์ ชโลมใจ", specialization: "หัวใจเต้นผิดจังหวะ" },
        { id: "BKK004-D05-DR03", name: "นพ. แข็งแกร่ง แรงดี", specialization: "สวนหัวใจและหลอดเลือด" },
        { id: "BKK004-D05-DR04", name: "พญ. สุชาดา น่าชม", specialization: "เวชศาสตร์ฟื้นฟูหัวใจ" },
        { id: "BKK004-D05-DR05", name: "นพ. เกรียงไกร ชัยชนะ", specialization: "ศัลยกรรมหัวใจ" },
      ],
    },

    // -------------------- จิตเวช --------------------
    {
      id: "BKK004-D06",
      name: "จิตเวช",
      logo: dataIcon.pyscho,
      doctors: [
        { id: "BKK004-D06-DR01", name: "พญ. สบายดี มีสุข", specialization: "จิตแพทย์ทั่วไป" },
        { id: "BKK004-D06-DR02", name: "นพ. ผ่อนคลาย หายห่วง", specialization: "ความเครียดและโรคนอนไม่หลับ" },
        { id: "BKK004-D06-DR03", name: "พญ. อาทิตยา ฟ้าสว่าง", specialization: "จิตเวชเด็กและวัยรุ่น" },
        { id: "BKK004-D06-DR04", name: "นพ. ปรมาจารย์ ด้านใจ", specialization: "บำบัดสารเสพติด" },
        { id: "BKK004-D06-DR05", name: "พญ. รมณีย์ ยินดี", specialization: "จิตบำบัด" },
      ],
    },
  ],
};

export default bangkokHospital;