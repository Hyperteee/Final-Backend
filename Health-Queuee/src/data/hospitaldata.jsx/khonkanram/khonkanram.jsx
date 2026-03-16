import dataIcon from "../../../../images/icon-department/icon-department";

const khonkaenRam = {
  id: "KNK001", // อิงตาม hospitalData
  name: "ขอนแก่นราม",
  state: "ขอนแก่น",
  type: "โรงพยาบาลเอกชน",
  logo: "images/logohospital/khonkaenram.png", // อิงตาม hospitalData
  stars: 4.3,
  reviews: 78,
  location: { lat: 16.4357, lng: 102.8335 }, // อิงตาม hospitalData
  district: "เมืองขอนแก่น",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "KNK001-D00",
      name: "ไม่รู้แผนก"
    },
    // -------------------- อายุรกรรม --------------------
    {
      id: "KNK001-D01",
      name: "อายุรกรรม",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "KNK001-D01-DR01", name: "นพ. สมชาย สบายดี", specialization: "อายุรแพทย์ทั่วไป" },
        { id: "KNK001-D01-DR02", name: "พญ. มาลี สีสวย", specialization: "โรคเบาหวาน" },
        { id: "KNK001-D01-DR03", name: "นพ. ไพศาล นานา", specialization: "โรคทางเดินอาหาร" },
        { id: "KNK001-D01-DR04", name: "พญ. กานดา พาเพลิน", specialization: "โรคไต" },
        { id: "KNK001-D01-DR05", name: "นพ. วรวิทย์ คิดดี", specialization: "ระบบประสาท" },
      ],
    },

    // -------------------- ศัลยกรรม --------------------
    {
      id: "KNK001-D02",
      name: "ศัลยกรรม",
      logo: dataIcon.surgery,
      doctors: [
        { id: "KNK001-D02-DR01", name: "นพ. กล้าหาญ ชาญชัย", specialization: "ศัลยกรรมทั่วไป" },
        { id: "KNK001-D02-DR02", name: "พญ. วิจิตรา งามตา", specialization: "ศัลยกรรมตกแต่ง" },
        { id: "KNK001-D02-DR03", name: "นพ. คมสัน มั่นคง", specialization: "ศัลยกรรมกระดูกและข้อ" },
        { id: "KNK001-D02-DR04", name: "พญ. สุภาพร อ่อนโยน", specialization: "ศัลยกรรมทางเดินปัสสาวะ" },
        { id: "KNK001-D02-DR05", name: "นพ. เดชา พลัง", specialization: "ศัลยกรรมประสาท" },
      ],
    },

    // -------------------- กุมารเวชกรรม --------------------
    {
      id: "KNK001-D03",
      name: "กุมารเวชกรรม",
      logo: dataIcon.child,
      doctors: [
        { id: "KNK001-D03-DR01", name: "พญ. สุดา รักเด็ก", specialization: "กุมารแพทย์ทั่วไป" },
        { id: "KNK001-D03-DR02", name: "นพ. ปิติ ยิ้มแย้ม", specialization: "โรคภูมิแพ้เด็ก" },
        { id: "KNK001-D03-DR03", name: "พญ. แวววาว สดใส", specialization: "พัฒนาการเด็ก" },
        { id: "KNK001-D03-DR04", name: "นพ. อาทิตย์ จิตดี", specialization: "โรคติดเชื้อในเด็ก" },
        { id: "KNK001-D03-DR05", name: "พญ. จันทร์เพ็ญ เด่นฟ้า", specialization: "โภชนาการเด็ก" },
      ],
    },

    // -------------------- นรีเวชกรรม --------------------
    {
      id: "KNK001-D04",
      name: "นรีเวชกรรม",
      logo: dataIcon.woman,
      doctors: [
        { id: "KNK001-D04-DR01", name: "พญ. กนกวรรณ พันธุ์ดี", specialization: "สูติ-นรีเวชทั่วไป" },
        { id: "KNK001-D04-DR02", name: "นพ. ธีระ วงศ์ตระกูล", specialization: "ภาวะมีบุตรยาก" },
        { id: "KNK001-D04-DR03", name: "พญ. รัชนี มีสุข", specialization: "เวชศาสตร์มารดาและทารก" },
        { id: "KNK001-D04-DR04", name: "นพ. วิชัย ใจดี", specialization: "มะเร็งนรีเวช" },
        { id: "KNK001-D04-DR05", name: "พญ. สิริพร พรประเสริฐ", specialization: "วัยทอง" },
      ],
    },

    // -------------------- หัวใจ --------------------
    {
      id: "KNK001-D05",
      name: "หัวใจ",
      logo: dataIcon.heart,
      doctors: [
        { id: "KNK001-D05-DR01", name: "นพ. หัวใจ แข็งแกร่ง", specialization: "อายุรศาสตร์หัวใจ" },
        { id: "KNK001-D05-DR02", name: "พญ. สายใจ ผูกพัน", specialization: "โรคหัวใจเด็ก" },
        { id: "KNK001-D05-DR03", name: "นพ. ชีพจร ลงเท้า", specialization: "สวนหัวใจ" },
        { id: "KNK001-D05-DR04", name: "พญ. ฤทัย งาม", specialization: "ฟื้นฟูสมรรถภาพหัวใจ" },
        { id: "KNK001-D05-DR05", name: "นพ. มั่นคง ทรงพลัง", specialization: "ศัลยกรรมหัวใจ" },
      ],
    },

    // -------------------- จิตเวช --------------------
    {
      id: "KNK001-D06",
      name: "จิตเวช",
      logo: dataIcon.pyscho,
      doctors: [
        { id: "KNK001-D06-DR01", name: "พญ. จิตแจ่มใส ใจเบิกบาน", specialization: "จิตเวชทั่วไป" },
        { id: "KNK001-D06-DR02", name: "นพ. สงบ สยบความเคลื่อนไหว", specialization: "บำบัดสารเสพติด" },
        { id: "KNK001-D06-DR03", name: "พญ. ปัญญา ดีเลิศ", specialization: "จิตเวชเด็กและวัยรุ่น" },
        { id: "KNK001-D06-DR04", name: "นพ. สติ มาปัญญาเกิด", specialization: "โรคซึมเศร้า" },
        { id: "KNK001-D06-DR05", name: "พญ. เมตตา ปรานี", specialization: "จิตเวชผู้สูงอายุ" },
      ],
    },
  ],
};

export default khonkaenRam;