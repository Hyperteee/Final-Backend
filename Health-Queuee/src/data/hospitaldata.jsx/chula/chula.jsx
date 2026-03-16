import dataIcon from "../../../../images/icon-department/icon-department";

const chulalongkorn = {
  id: "BKK001",
  name: "โรงพยาบาลจุฬาลงกรณ์",
  state: "กรุงเทพมหานคร",
  type: "โรงพยาบาลรัฐ",
  logo: "images/logohospital/chula.png",
  stars: 4.8,
  reviews: 321,
  location: { lat: 13.7367, lng: 100.5331 },
  district: "ปทุมวัน",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "BKK001-D00",
      name:"ไม่รู้แผนก"
    },// -------------------- อายุรกรรม --------------------
    {
      id: "BKK001-D01",
      name: "อายุรกรรม",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "BKK001-D01-DR01", name: "นพ. สมชาย ใจดี", specialization: "อายุรแพทย์ทั่วไป" },
        { id: "BKK001-D01-DR02", name: "พญ. สมหญิง แพทย์ดี", specialization: "โรคเบาหวาน" },
        { id: "BKK001-D01-DR03", name: "นพ. ธนชัย บำรุงสุข", specialization: "โรคหัวใจ" },
        { id: "BKK001-D01-DR04", name: "พญ. มณีรัตน์ สายใจ", specialization: "ทางเดินอาหาร" },
        { id: "BKK001-D01-DR05", name: "นพ. กิตติคุณ ชาญณรงค์", specialization: "โรคปอดและระบบหายใจ" },
      ],
    },

    // -------------------- ศัลยกรรม --------------------
    {
      id: "BKK001-D02",
      name: "ศัลยกรรม",
      logo: dataIcon.surgery,
      doctors: [
        { id: "BKK001-D02-DR01", name: "นพ. วิศิษฐ์ แข็งแรง", specialization: "ศัลยกรรมทั่วไป" },
        { id: "BKK001-D02-DR02", name: "พญ. พิมพ์พร รักษ์แผล", specialization: "ศัลยกรรมตกแต่ง" },
        { id: "BKK001-D02-DR03", name: "นพ. ธีรภัทร แข็งกล้า", specialization: "ศัลยกรรมหลอดเลือด" },
        { id: "BKK001-D02-DR04", name: "พญ. สุภาวดี ใจงาม", specialization: "ศัลยกรรมเต้านม" },
        { id: "BKK001-D02-DR05", name: "นพ. กนกวัฒน์ อารีย์สุข", specialization: "ศัลยกรรมช่องท้อง" },
      ],
    },

    // -------------------- กุมารเวชกรรม --------------------
    {
      id: "BKK001-D03",
      name: "กุมารเวชกรรม",
      logo: dataIcon.child,
      doctors: [
        { id: "BKK001-D03-DR01", name: "พญ. ดารารัตน์ เด็กดี", specialization: "กุมารแพทย์ทั่วไป" },
        { id: "BKK001-D03-DR02", name: "นพ. อนุชา ยิ้มแย้ม", specialization: "โรคภูมิแพ้ในเด็ก" },
        { id: "BKK001-D03-DR03", name: "พญ. ขวัญใจ อ่อนโยน", specialization: "พัฒนาการเด็ก" },
        { id: "BKK001-D03-DR04", name: "นพ. วีรพงศ์ มีเมตตา", specialization: "โรคติดเชื้อในเด็ก" },
        { id: "BKK001-D03-DR05", name: "พญ. จิราภา สุขุม", specialization: "โรคหัวใจเด็ก" },
      ],
    },

    // -------------------- นรีเวชกรรม --------------------
    {
      id: "BKK001-D04",
      name: "นรีเวชกรรม",
      logo: dataIcon.woman,
      doctors: [
        { id: "BKK001-D04-DR01", name: "พญ. นลินี สายอ่อน", specialization: "สูติแพทย์ทั่วไป" },
        { id: "BKK001-D04-DR02", name: "นพ. ภูวเดช สุขใจ", specialization: "ผ่าคลอดและฝากครรภ์" },
        { id: "BKK001-D04-DR03", name: "พญ. ชุติมา วงศ์เพ็ญ", specialization: "โรคทางนรีเวช" },
        { id: "BKK001-D04-DR04", name: "นพ. ศักดา มั่นสุข", specialization: "มะเร็งนรีเวช" },
        { id: "BKK001-D04-DR05", name: "พญ. สุธาสินี หอมหวล", specialization: "วางแผนครอบครัว" },
      ],
    },

    // -------------------- หัวใจ --------------------
    {
      id: "BKK001-D05",
      name: "หัวใจ",
      logo: dataIcon.heart,
      doctors: [
        { id: "BKK001-D05-DR01", name: "นพ. สมพงษ์ หูดี", specialization: "หัวใจ" },
        { id: "BKK001-D05-DR02", name: "พญ. มาริสา ตาดี", specialization: "หัวใจ" },
        { id: "BKK001-D05-DR03", name: "นพ. ธนากร กลิ่นหอม", specialization: "หัวใจ" },
        { id: "BKK001-D05-DR04", name: "พญ. พรทิพย์ คำดี", specialization: "หัวใจ" },
        { id: "BKK001-D05-DR05", name: "นพ. อนุรักษ์ ใจเย็น", specialization: "ผ่าตัดตา" },
      ],
    },

    // -------------------- จิตเวช --------------------
    {
      id: "BKK001-D06",
      name: "จิตเวช",
      logo: dataIcon.pyscho,
      doctors: [
        { id: "BKK001-D06-DR01", name: "พญ. ศุภรัตน์ จิตดี", specialization: "จิตแพทย์ทั่วไป" },
        { id: "BKK001-D06-DR02", name: "นพ. ณัฐพล ใจเย็น", specialization: "จิตเวชเด็กและวัยรุ่น" },
        { id: "BKK001-D06-DR03", name: "พญ. กรรณิกา สุขสันต์", specialization: "บำบัดความเครียด" },
        { id: "BKK001-D06-DR04", name: "นพ. ภาคิน ธรรมโชติ", specialization: "จิตเวชผู้สูงอายุ" },
        { id: "BKK001-D06-DR05", name: "พญ. สุมนา พงษ์ดี", specialization: "จิตเวชทั่วไป" },
      ],
    },
  ],
};

export default chulalongkorn;
