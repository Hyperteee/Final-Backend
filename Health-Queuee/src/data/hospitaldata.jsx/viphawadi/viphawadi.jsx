import dataIcon from "../../../../images/icon-department/icon-department";

const vibhavadi = {
  id: "BKK007", // อิงตาม hospitalData
  name: "วิภาวดี",
  state: "กรุงเทพมหานคร",
  type: "โรงพยาบาลเอกชน",
  logo: "images/logohospital/vibhavadi.png", // อิงตาม hospitalData
  stars: 4.1,
  reviews: 115,
  location: { lat: 13.8430, lng: 100.5695 }, // อิงตาม hospitalData
  district: "จตุจักร",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "BKK007-D00",
      name: "ไม่รู้แผนก"
    },
    // -------------------- อายุรกรรม --------------------
    {
      id: "BKK007-D01",
      name: "อายุรกรรม",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "BKK007-D01-DR01", name: "นพ. วิทยา ก้าวหน้า", specialization: "อายุรแพทย์ทั่วไป" },
        { id: "BKK007-D01-DR02", name: "พญ. ภาวนา พารักษา", specialization: "โรคระบบทางเดินอาหาร" },
        { id: "BKK007-D01-DR03", name: "นพ. วุฒิชัย ไกรฤกษ์", specialization: "โรคระบบประสาท" },
        { id: "BKK007-D01-DR04", name: "พญ. ดีใจ หายป่วย", specialization: "โรคต่อมไร้ท่อ" },
        { id: "BKK007-D01-DR05", name: "นพ. เอกสิทธิ์ สิทธิชัย", specialization: "โรคไต" },
      ],
    },

    // -------------------- ศัลยกรรม --------------------
    {
      id: "BKK007-D02",
      name: "ศัลยกรรม",
      logo: dataIcon.surgery,
      doctors: [
        { id: "BKK007-D02-DR01", name: "นพ. ชาญชัย ใจสู้", specialization: "ศัลยกรรมทั่วไป" },
        { id: "BKK007-D02-DR02", name: "พญ. วิไลลักษณ์ งามตา", specialization: "ศัลยกรรมความงาม" },
        { id: "BKK007-D02-DR03", name: "นพ. ดำรง คงอยู่", specialization: "ศัลยกรรมกระดูกและข้อ" },
        { id: "BKK007-D02-DR04", name: "พญ. สุชาดา นานา", specialization: "ศัลยกรรมช่องท้อง" },
        { id: "BKK007-D02-DR05", name: "นพ. เกรียงศักดิ์ รักษาดี", specialization: "ศัลยกรรมระบบปัสสาวะ" },
      ],
    },

    // -------------------- กุมารเวชกรรม --------------------
    {
      id: "BKK007-D03",
      name: "กุมารเวชกรรม",
      logo: dataIcon.child,
      doctors: [
        { id: "BKK007-D03-DR01", name: "พญ. วัยใส ใจดี", specialization: "กุมารแพทย์ทั่วไป" },
        { id: "BKK007-D03-DR02", name: "นพ. ภูเบศร์ วิเศษ", specialization: "โรคภูมิแพ้ในเด็ก" },
        { id: "BKK007-D03-DR03", name: "พญ. ออมสิน ยินดี", specialization: "พัฒนาการเด็ก" },
        { id: "BKK007-D03-DR04", name: "นพ. ต้นกล้า เติบโต", specialization: "โรคระบบทางเดินหายใจเด็ก" },
        { id: "BKK007-D03-DR05", name: "พญ. ขวัญใจ เด็กน้อย", specialization: "ทารกแรกเกิด" },
      ],
    },

    // -------------------- นรีเวชกรรม --------------------
    {
      id: "BKK007-D04",
      name: "นรีเวชกรรม",
      logo: dataIcon.woman,
      doctors: [
        { id: "BKK007-D04-DR01", name: "พญ. วิมล วงศ์วิภา", specialization: "สูติ-นรีเวชทั่วไป" },
        { id: "BKK007-D04-DR02", name: "นพ. ภิรมย์ ชมชอบ", specialization: "ผ่าตัดผ่านกล้อง" },
        { id: "BKK007-D04-DR03", name: "พญ. สราญจิต คิดบวก", specialization: "วัยทอง" },
        { id: "BKK007-D04-DR04", name: "นพ. บรรพต มั่นคง", specialization: "ภาวะมีบุตรยาก" },
        { id: "BKK007-D04-DR05", name: "พญ. กานต์สินี มีสุข", specialization: "มะเร็งนรีเวช" },
      ],
    },

    // -------------------- หัวใจ --------------------
    {
      id: "BKK007-D05",
      name: "หัวใจ",
      logo: dataIcon.heart,
      doctors: [
        { id: "BKK007-D05-DR01", name: "นพ. หัวใจ แข็งแรง", specialization: "อายุรกรรมหัวใจ" },
        { id: "BKK007-D05-DR02", name: "พญ. สายเลือด เดินดี", specialization: "สวนหัวใจและหลอดเลือด" },
        { id: "BKK007-D05-DR03", name: "นพ. ชีพจร มั่นคง", specialization: "โรคหัวใจเต้นผิดจังหวะ" },
        { id: "BKK007-D05-DR04", name: "พญ. ดวงกมล คนเก่ง", specialization: "เวชศาสตร์ฟื้นฟูหัวใจ" },
        { id: "BKK007-D05-DR05", name: "นพ. ผ่าตัด ชัดเจน", specialization: "ศัลยกรรมหัวใจ" },
      ],
    },

    // -------------------- จิตเวช --------------------
    {
      id: "BKK007-D06",
      name: "จิตเวช",
      logo: dataIcon.pyscho,
      doctors: [
        { id: "BKK007-D06-DR01", name: "พญ. สบายใจ ไร้กังวล", specialization: "จิตเวชทั่วไป" },
        { id: "BKK007-D06-DR02", name: "นพ. สมดุล อุ่นใจ", specialization: "ความเครียดและการนอนหลับ" },
        { id: "BKK007-D06-DR03", name: "พญ. ร่าเริง บันเทิงใจ", specialization: "จิตเวชเด็กและวัยรุ่น" },
        { id: "BKK007-D06-DR04", name: "นพ. เข้าใจ วัยเก๋า", specialization: "จิตเวชผู้สูงอายุ" },
        { id: "BKK007-D06-DR05", name: "พญ. ฟ้าใหม่ สดใส", specialization: "บำบัดสารเสพติด" },
      ],
    },
  ],
};

export default vibhavadi;