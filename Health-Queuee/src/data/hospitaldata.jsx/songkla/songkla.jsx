import dataIcon from "../../../../images/icon-department/icon-department";

const songklanagarind = {
  id: "SGK001", // อิงตาม hospitalData
  name: "สงขลานครินทร์",
  state: "สงขลา",
  type: "โรงพยาบาลรัฐ",
  logo: "images/logohospital/psu.png", // อิงตาม hospitalData
  stars: 4.7,
  reviews: 120,
  location: { lat: 7.0055, lng: 100.4984 }, // อิงตาม hospitalData
  district: "หาดใหญ่",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "SGK001-D00",
      name: "ไม่รู้แผนก"
    },
    // -------------------- อายุรกรรม --------------------
    {
      id: "SGK001-D01",
      name: "อายุรกรรม",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "SGK001-D01-DR01", name: "นพ. ทักษิณ ถิ่นใต้", specialization: "อายุรแพทย์ทั่วไป" },
        { id: "SGK001-D01-DR02", name: "พญ. ปักษ์ใต้ บ้านเรา", specialization: "โรคระบบทางเดินหายใจ" },
        { id: "SGK001-D01-DR03", name: "นพ. สมิหลา สงขลา", specialization: "โรคไต" },
        { id: "SGK001-D01-DR04", name: "พญ. ดารารัตน์ ชัดเจน", specialization: "โรคต่อมไร้ท่อ" },
        { id: "SGK001-D01-DR05", name: "นพ. เกรียงไกร ใจสู้", specialization: "โรคเลือดและมะเร็ง" },
      ],
    },

    // -------------------- ศัลยกรรม --------------------
    {
      id: "SGK001-D02",
      name: "ศัลยกรรม",
      logo: dataIcon.surgery,
      doctors: [
        { id: "SGK001-D02-DR01", name: "นพ. หาดใหญ่ ใจดี", specialization: "ศัลยกรรมทั่วไป" },
        { id: "SGK001-D02-DR02", name: "พญ. ไข่มุก อันดามัน", specialization: "ศัลยกรรมตกแต่ง" },
        { id: "SGK001-D02-DR03", name: "นพ. คอหงส์ คงกระพัน", specialization: "ศัลยกรรมอุบัติเหตุ" },
        { id: "SGK001-D02-DR04", name: "พญ. สกุณา พาเพลิน", specialization: "ศัลยกรรมเด็ก" },
        { id: "SGK001-D02-DR05", name: "นพ. สิงหนคร วรเดช", specialization: "ศัลยกรรมระบบประสาท" },
      ],
    },

    // -------------------- กุมารเวชกรรม --------------------
    {
      id: "SGK001-D03",
      name: "กุมารเวชกรรม",
      logo: dataIcon.child,
      doctors: [
        { id: "SGK001-D03-DR01", name: "พญ. หนูน้อย คอยรัก", specialization: "กุมารแพทย์ทั่วไป" },
        { id: "SGK001-D03-DR02", name: "นพ. ตะวัน ส่องแสง", specialization: "โรคหัวใจเด็ก" },
        { id: "SGK001-D03-DR03", name: "พญ. จันทร์เจ้า ขวัญใจ", specialization: "ทารกแรกเกิด" },
        { id: "SGK001-D03-DR04", name: "นพ. ทะเล สีคราม", specialization: "โรคภูมิแพ้ในเด็ก" },
        { id: "SGK001-D03-DR05", name: "พญ. ทรายแก้ว แวววับ", specialization: "พัฒนาการเด็ก" },
      ],
    },

    // -------------------- นรีเวชกรรม --------------------
    {
      id: "SGK001-D04",
      name: "นรีเวชกรรม",
      logo: dataIcon.woman,
      doctors: [
        { id: "SGK001-D04-DR01", name: "พญ. บุหงา ปัตตานี", specialization: "สูติ-นรีเวชทั่วไป" },
        { id: "SGK001-D04-DR02", name: "นพ. ยะลา พาสุข", specialization: "เวชศาสตร์มารดาและทารก" },
        { id: "SGK001-D04-DR03", name: "พญ. นราธิวาส วาดฝัน", specialization: "มะเร็งวิทยานรีเวช" },
        { id: "SGK001-D04-DR04", name: "นพ. สตูล สมบูรณ์", specialization: "ผ่าตัดผ่านกล้อง" },
        { id: "SGK001-D04-DR05", name: "พญ. พัทลุง มุ่งมั่น", specialization: "ภาวะมีบุตรยาก" },
      ],
    },

    // -------------------- หัวใจ --------------------
    {
      id: "SGK001-D05",
      name: "หัวใจ",
      logo: dataIcon.heart,
      doctors: [
        { id: "SGK001-D05-DR01", name: "นพ. หัวใจ แดนใต้", specialization: "อายุรศาสตร์หัวใจ" },
        { id: "SGK001-D05-DR02", name: "พญ. เลือดเนื้อ เชื้อไข", specialization: "สวนหัวใจและหลอดเลือด" },
        { id: "SGK001-D05-DR03", name: "นพ. แข็งแรง ทนทาน", specialization: "ศัลยกรรมหัวใจและทรวงอก" },
        { id: "SGK001-D05-DR04", name: "พญ. ห่วงใย ใส่ใจ", specialization: "ฟื้นฟูสมรรถภาพหัวใจ" },
        { id: "SGK001-D05-DR05", name: "นพ. ชีพจร อ่อนโยน", specialization: "สรีรวิทยาไฟฟ้าหัวใจ" },
      ],
    },

    // -------------------- จิตเวช --------------------
    {
      id: "SGK001-D06",
      name: "จิตเวช",
      logo: dataIcon.pyscho,
      doctors: [
        { id: "SGK001-D06-DR01", name: "พญ. สงบ จบที่ใจ", specialization: "จิตเวชศาสตร์ทั่วไป" },
        { id: "SGK001-D06-DR02", name: "นพ. สบายกาย สบายใจ", specialization: "จิตเวชศาสตร์ผู้สูงอายุ" },
        { id: "SGK001-D06-DR03", name: "พญ. ยิ้มสู้ ชูใจ", specialization: "จิตเวชเด็กและวัยรุ่น" },
        { id: "SGK001-D06-DR04", name: "นพ. ปล่อยวาง ทางสงบ", specialization: "บำบัดสารเสพติด" },
        { id: "SGK001-D06-DR05", name: "พญ. รู้ใจ ไร้ทุกข์", specialization: "นิติบุคลิกภาพ" },
      ],
    },
  ],
};

export default songklanagarind;