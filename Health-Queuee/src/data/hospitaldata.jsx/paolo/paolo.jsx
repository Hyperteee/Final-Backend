import dataIcon from "../../../../images/icon-department/icon-department";

const paoloSamutPrakan = {
  id: "SPK001", // อิงตาม hospitalData
  name: "เปาโล สมุทรปราการ",
  state: "สมุทรปราการ",
  type: "โรงพยาบาลเอกชน",
  logo: "images/logohospital/paolo.png", // อิงตาม hospitalData
  stars: 3.9,
  reviews: 60,
  location: { lat: 13.5850, lng: 100.5800 }, // อิงตาม hospitalData
  district: "เมืองสมุทรปราการ",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "SPK001-D00",
      name: "ไม่รู้แผนก"
    },
    // -------------------- อายุรกรรม --------------------
    {
      id: "SPK001-D01",
      name: "อายุรกรรม",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "SPK001-D01-DR01", name: "นพ. สมชาย สบายดี", specialization: "อายุรแพทย์ทั่วไป" },
        { id: "SPK001-D01-DR02", name: "พญ. วรรณภา รักษาดี", specialization: "โรคเบาหวานและต่อมไร้ท่อ" },
        { id: "SPK001-D01-DR03", name: "นพ. พิชัย ใจสู้", specialization: "โรคไต" },
        { id: "SPK001-D01-DR04", name: "พญ. นิตยา พาหายป่วย", specialization: "โรคระบบทางเดินอาหาร" },
        { id: "SPK001-D01-DR05", name: "นพ. ธีระ ชนะโรค", specialization: "อายุรกรรมระบบประสาท" },
      ],
    },

    // -------------------- ศัลยกรรม --------------------
    {
      id: "SPK001-D02",
      name: "ศัลยกรรม",
      logo: dataIcon.surgery,
      doctors: [
        { id: "SPK001-D02-DR01", name: "นพ. เกรียงไกร ไวว่อง", specialization: "ศัลยกรรมทั่วไป" },
        { id: "SPK001-D02-DR02", name: "พญ. งามพรรณ สรรค์สร้าง", specialization: "ศัลยกรรมความงาม" },
        { id: "SPK001-D02-DR03", name: "นพ. ดนัย ไกลเจ็บ", specialization: "ศัลยกรรมกระดูกและข้อ" },
        { id: "SPK001-D02-DR04", name: "พญ. สุพัตรา ผ่าตัดเก่ง", specialization: "ศัลยกรรมอุบัติเหตุ" },
        { id: "SPK001-D02-DR05", name: "นพ. วีระชัย ใจเด็ด", specialization: "ศัลยกรรมระบบปัสสาวะ" },
      ],
    },

    // -------------------- กุมารเวชกรรม --------------------
    {
      id: "SPK001-D03",
      name: "กุมารเวชกรรม",
      logo: dataIcon.child,
      doctors: [
        { id: "SPK001-D03-DR01", name: "พญ. อรุณี มีรัก", specialization: "กุมารแพทย์ทั่วไป" },
        { id: "SPK001-D03-DR02", name: "นพ. เด็กดี มีสุข", specialization: "โรคภูมิแพ้ในเด็ก" },
        { id: "SPK001-D03-DR03", name: "พญ. สดใส วัยซน", specialization: "พัฒนาการเด็ก" },
        { id: "SPK001-D03-DR04", name: "นพ. กล้าหาญ ชาญชัย", specialization: "โรคติดเชื้อในเด็ก" },
        { id: "SPK001-D03-DR05", name: "พญ. เมตตา ปรานี", specialization: "ทารกแรกเกิด" },
      ],
    },

    // -------------------- นรีเวชกรรม --------------------
    {
      id: "SPK001-D04",
      name: "นรีเวชกรรม",
      logo: dataIcon.woman,
      doctors: [
        { id: "SPK001-D04-DR01", name: "พญ. กุลธิดา ฟ้าสวย", specialization: "สูติ-นรีเวชทั่วไป" },
        { id: "SPK001-D04-DR02", name: "นพ. สมศักดิ์ รักครอบครัว", specialization: "ฝากครรภ์และคลอดบุตร" },
        { id: "SPK001-D04-DR03", name: "พญ. รุ้งลาวัลย์ ฝันดี", specialization: "วัยทอง" },
        { id: "SPK001-D04-DR04", name: "นพ. ปรีชา สามารถ", specialization: "ผ่าตัดผ่านกล้อง" },
        { id: "SPK001-D04-DR05", name: "พญ. สิริพร พรประเสริฐ", specialization: "มะเร็งนรีเวช" },
      ],
    },

    // -------------------- หัวใจ --------------------
    {
      id: "SPK001-D05",
      name: "หัวใจ",
      logo: dataIcon.heart,
      doctors: [
        { id: "SPK001-D05-DR01", name: "นพ. หัวใจ แกร่ง", specialization: "อายุรศาสตร์หัวใจ" },
        { id: "SPK001-D05-DR02", name: "พญ. สายเลือด เดินดี", specialization: "โรคความดันโลหิตสูง" },
        { id: "SPK001-D05-DR03", name: "นพ. ชีพจร ลงเท้า", specialization: "คลื่นไฟฟ้าหัวใจ" },
        { id: "SPK001-D05-DR04", name: "พญ. ดูแล ใจ", specialization: "ฟื้นฟูสมรรถภาพหัวใจ" },
        { id: "SPK001-D05-DR05", name: "นพ. มั่นคง ยืนยาว", specialization: "โรคหลอดเลือดหัวใจ" },
      ],
    },

    // -------------------- จิตเวช --------------------
    {
      id: "SPK001-D06",
      name: "จิตเวช",
      logo: dataIcon.pyscho,
      doctors: [
        { id: "SPK001-D06-DR01", name: "พญ. สบายใจ ไร้ทุกข์", specialization: "จิตเวชทั่วไป" },
        { id: "SPK001-D06-DR02", name: "นพ. ผ่อนคลาย หายห่วง", specialization: "ความเครียดและการนอนหลับ" },
        { id: "SPK001-D06-DR03", name: "พญ. เข้าใจ วัยรุ่น", specialization: "จิตเวชเด็กและวัยรุ่น" },
        { id: "SPK001-D06-DR04", name: "นพ. สมดุล ชีวิต", specialization: "บำบัดสารเสพติด" },
        { id: "SPK001-D06-DR05", name: "พญ. ยิ้มแย้ม แจ่มใส", specialization: "จิตเวชผู้สูงอายุ" },
      ],
    },
  ],
};

export default paoloSamutPrakan;