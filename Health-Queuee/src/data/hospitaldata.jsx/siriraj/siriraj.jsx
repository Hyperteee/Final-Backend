import dataIcon from "../../../../images/icon-department/icon-department";

const siriraj = {
  id: "BKK003", // อิงตาม hospitalData
  name: "ศิริราช",
  state: "กรุงเทพมหานคร",
  type: "โรงพยาบาลรัฐ",
  logo: "images/logohospital/siriraj.png", // อิงตาม hospitalData
  stars: 4.9,
  reviews: 450,
  location: { lat: 13.7570, lng: 100.4851 }, // อิงตาม hospitalData
  district: "บางกอกน้อย",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "BKK003-D00",
      name: "ไม่รู้แผนก"
    },
    // -------------------- อายุรกรรม --------------------
    {
      id: "BKK003-D01",
      name: "อายุรกรรม",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "BKK003-D01-DR01", name: "นพ. ปราชญ์ รักษาศิลป์", specialization: "อายุรแพทย์ทั่วไป" },
        { id: "BKK003-D01-DR02", name: "พญ. กนกพร อ่อนหวาน", specialization: "โรคระบบทางเดินอาหาร" },
        { id: "BKK003-D01-DR03", name: "นพ. วิชาญ เชี่ยวชาญ", specialization: "โรคหลอดเลือดสมอง" },
        { id: "BKK003-D01-DR04", name: "พญ. ดารณี มีเมตตา", specialization: "โรคข้อและรูมาติซั่ม" },
        { id: "BKK003-D01-DR05", name: "นพ. เอกชัย ใจมั่น", specialization: "โรคไต" },
      ],
    },

    // -------------------- ศัลยกรรม --------------------
    {
      id: "BKK003-D02",
      name: "ศัลยกรรม",
      logo: dataIcon.surgery,
      doctors: [
        { id: "BKK003-D02-DR01", name: "นพ. คมกริช มีดหมอ", specialization: "ศัลยกรรมทั่วไป" },
        { id: "BKK003-D02-DR02", name: "พญ. สิริโฉม งามสง่า", specialization: "ศัลยกรรมตกแต่ง" },
        { id: "BKK003-D02-DR03", name: "นพ. ภูผา แกร่ง", specialization: "ศัลยกรรมกระดูกสันหลัง" },
        { id: "BKK003-D02-DR04", name: "พญ. นารี รักษาดี", specialization: "ศัลยกรรมเต้านม" },
        { id: "BKK003-D02-DR05", name: "นพ. วีระ ผู้กล้า", specialization: "ศัลยกรรมหลอดเลือด" },
      ],
    },

    // -------------------- กุมารเวชกรรม --------------------
    {
      id: "BKK003-D03",
      name: "กุมารเวชกรรม",
      logo: dataIcon.child,
      doctors: [
        { id: "BKK003-D03-DR01", name: "พญ. ละมุน อุ่นไอรัก", specialization: "ทารกแรกเกิดและปริกำเนิด" },
        { id: "BKK003-D03-DR02", name: "นพ. เก่งกาจ ฉลาดล้ำ", specialization: "ประสาทวิทยาเด็ก" },
        { id: "BKK003-D03-DR03", name: "พญ. สดใส วัยใส", specialization: "โรคติดเชื้อในเด็ก" },
        { id: "BKK003-D03-DR04", name: "นพ. ภูริ ภูมิใจ", specialization: "โรคภูมิแพ้และภูมิคุ้มกัน" },
        { id: "BKK003-D03-DR05", name: "พญ. แววตา สดใส", specialization: "จักษุวิทยาเด็ก" },
      ],
    },

    // -------------------- นรีเวชกรรม --------------------
    {
      id: "BKK003-D04",
      name: "นรีเวชกรรม",
      logo: dataIcon.woman,
      doctors: [
        { id: "BKK003-D04-DR01", name: "พญ. มารดา อารี", specialization: "เวชศาสตร์มารดาและทารก" },
        { id: "BKK003-D04-DR02", name: "นพ. สืบสกุล วงศ์ตระกูล", specialization: "เวชศาสตร์การเจริญพันธุ์" },
        { id: "BKK003-D04-DR03", name: "พญ. บงกช สดสวย", specialization: "นรีเวชทางเดินปัสสาวะ" },
        { id: "BKK003-D04-DR04", name: "นพ. ชนะ โรคร้าย", specialization: "มะเร็งวิทยานรีเวช" },
        { id: "BKK003-D04-DR05", name: "พญ. กานดา ปรานี", specialization: "สูติศาสตร์ทั่วไป" },
      ],
    },

    // -------------------- หัวใจ --------------------
    {
      id: "BKK003-D05",
      name: "หัวใจ",
      logo: dataIcon.heart,
      doctors: [
        { id: "BKK003-D05-DR01", name: "นพ. หทัย ใจแกร่ง", specialization: "อายุรศาสตร์หัวใจ" },
        { id: "BKK003-D05-DR02", name: "พญ. สายใย เชื่อมใจ", specialization: "สรีรวิทยาไฟฟ้าหัวใจ" },
        { id: "BKK003-D05-DR03", name: "นพ. พลัง ใจดี", specialization: "หัวใจล้มเหลวและปลูกถ่าย" },
        { id: "BKK003-D05-DR04", name: "พญ. ฤดี มีสุข", specialization: "ฟื้นฟูหัวใจ" },
        { id: "BKK003-D05-DR05", name: "นพ. กล้า ผ่าตัด", specialization: "ศัลยกรรมหัวใจและทรวงอก" },
      ],
    },

    // -------------------- จิตเวช --------------------
    {
      id: "BKK003-D06",
      name: "จิตเวช",
      logo: dataIcon.pyscho,
      doctors: [
        { id: "BKK003-D06-DR01", name: "พญ. จิตตรา ผ่องใส", specialization: "จิตเวชศาสตร์ทั่วไป" },
        { id: "BKK003-D06-DR02", name: "นพ. สติ ปัญญา", specialization: "นิติบุคลิกภาพ" },
        { id: "BKK003-D06-DR03", name: "พญ. นิทรา ฝันดี", specialization: "เวชศาสตร์การนอนหลับ" },
        { id: "BKK003-D06-DR04", name: "นพ. อาวุโส โอบอ้อม", specialization: "จิตเวชผู้สูงอายุ" },
        { id: "BKK003-D06-DR05", name: "พญ. ห่วงใย ใส่ใจ", specialization: "จิตเวชเด็กและวัยรุ่น" },
      ],
    },
  ],
};

export default siriraj;