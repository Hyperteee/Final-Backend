import dataIcon from "../../../../images/icon-department/icon-department";

const phyathai = {
  id: "BKK003",
  name: "โรงพยาบาลพญาไท 2",
  state: "กรุงเทพมหานคร",
  type: "โรงพยาบาลเอกชนตติยภูมิ",
  logo: "images/logohospital/phyathai.png",
  stars: 4.6,
  reviews: 412,
  location: { lat: 13.7568, lng: 100.5331 },
  district: "ราชเทวี",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "BKK003-D00",
      name: "ไม่รู้แผนก"
    },
    // -------------------- อายุรกรรมและเวชศาสตร์วินิจฉัย --------------------
    {
      id: "BKK003-D01",
      name: "อายุรกรรมและเวชศาสตร์วินิจฉัย",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "BKK003-D01-DR01", name: "พญ. กนกวรรณ อธิสุข", specialization: "อายุรกรรมทั่วไปและเวชศาสตร์เชิงลึก" },
        { id: "BKK003-D01-DR02", name: "นพ. ธีรภัทร ศิริพันธ์", specialization: "ต่อมไร้ท่อและเมตะบอลิสม" },
        { id: "BKK003-D01-DR03", name: "นพ. ปิยะวุฒิ ลิ้มสกุล", specialization: "ระบบทางเดินอาหารและตับ" },
        { id: "BKK003-D01-DR04", name: "นพ. สมศักดิ์ โรคไต", specialization: "โรคไตและระบบสั่งปัสสาวะ" },
        { id: "BKK003-D01-DR05", name: "พญ. นัทนา ปอด", specialization: "โรคปอดและการหายใจ" },
      ],
    },

    // -------------------- สถาบันศัลยกรรมขั้นสูง --------------------
    {
      id: "BKK003-D02",
      name: "สถาบันศัลยกรรมขั้นสูง",
      logo: dataIcon.surgery,
      doctors: [
        { id: "BKK003-D02-DR01", name: "นพ. รัชนนนท์ กฤตเทพ", specialization: "ศัลยกรรมส่องกล้องและแผลเล็ก" },
        { id: "BKK003-D02-DR02", name: "พญ. สรินยา เทพวิไล", specialization: "ศัลยกรรมกระดูกและอุบัติเหตุ" },
        { id: "BKK003-D02-DR03", name: "นพ. ชนินทร์ เมฆธนา", specialization: "ศัลยกรรมหัวใจและทรวงอก" },
        { id: "BKK003-D02-DR04", name: "พญ. สิรินนา แก้วดี", specialization: "ศัลยกรรม" },
        { id: "BKK003-D02-DR05", name: "นพ. อนุชา มั่นสุข", specialization: "ศัลยกรรม" },
      ],
    },

    // -------------------- ศูนย์สตรีและภาวะมีบุตรยาก --------------------
    {
      id: "BKK003-D03",
      name: "ศูนย์สตรีและภาวะมีบุตรยาก",
      logo: dataIcon.woman,
      doctors: [
        { id: "BKK003-D03-DR01", name: "พญ. พิมพ์ชนก เลิศประเสริฐ", specialization: "เวชศาสตร์การเจริญพันธุ์และ IVF" },
        { id: "BKK003-D03-DR02", name: "พญ. ศิริวรรณ อภิชาตกุล", specialization: "มะเร็งนรีเวช" },
        { id: "BKK003-D03-DR03", name: "พญ. วิชุดา ไชยวัน", specialization: "นรีเวชกรรม" },
        { id: "BKK003-D03-DR04", name: "นพ. สมบูรณ์ บุตรศรี", specialization: "นรีเวชกรรม" },
        { id: "BKK003-D03-DR05", name: "พญ. อุษา อ่อนนวล", specialization: "นรีเวชกรรม" },
      ],
    },

    // -------------------- ศูนย์หัวใจและหลอดเลือด --------------------
    {
      id: "BKK003-D04",
      name: "ศูนย์หัวใจและหลอดเลือด",
      logo: dataIcon.heart,
      doctors: [
        { id: "BKK003-D04-DR01", name: "นพ. วีรชัย ชาติมงคล", specialization: "อายุรกรรมหัวใจร่วมสวนหัวใจ" },
        { id: "BKK003-D04-DR02", name: "พญ. กฤชญา บุญมา", specialization: "คลื่นไฟฟ้าหัวใจและจังหวะผิดปกติ" },
        { id: "BKK003-D04-DR03", name: "นพ. ธนา หัวใจแข็ง", specialization: "หัวใจ" },
        { id: "BKK003-D04-DR04", name: "พญ. ปรัชญา หัวใจดี", specialization: "หัวใจ" },
        { id: "BKK003-D04-DR05", name: "นพ. กีรณฐ หัวใจใจดี", specialization: "หัวใจ" },
      ],
    },

    // -------------------- กุมารเวชและทารกแรกเกิด --------------------
    {
      id: "BKK003-D05",
      name: "กุมารเวชและทารกแรกเกิด",
      logo: dataIcon.child,
      doctors: [
        { id: "BKK003-D05-DR01", name: "พญ. จารุณี จันทร์อาภรณ์", specialization: "กุมารเวชทั่วไปและวัคซีน" },
        { id: "BKK003-D05-DR02", name: "นพ. ฐิติภณ รักษ์ศรี", specialization: "เวชศาสตร์ทารกแรกเกิดและทารกคลอดก่อนกำหนด" },
        { id: "BKK003-D05-DR03", name: "พญ. สุชาดา เด็กรัก", specialization: "กุมารแพทย์" },
        { id: "BKK003-D05-DR04", name: "นพ. วิสุทธิ์ เด็กดี", specialization: "กุมารแพทย์" },
        { id: "BKK003-D05-DR05", name: "พญ. ณัฐกา ทารก", specialization: "กุมารแพทย์" },
      ],
    },

    // -------------------- สุขภาพจิตและพฤติกรรม --------------------
    {
      id: "BKK003-D06",
      name: "สุขภาพจิตและพฤติกรรม",
      logo: dataIcon.pyscho,
      doctors: [
        { id: "BKK003-D06-DR01", name: "นพ. ธนวัฒน์ ประมวลศักดิ์", specialization: "จิตเวชผู้ใหญ่และการจัดการความวิตกกังวล" },
        { id: "BKK003-D06-DR02", name: "พญ. ชลิตา พงษ์วรรณ", specialization: "จิตวิทยาเด็กและบำบัดครอบครัว" },
        { id: "BKK003-D06-DR03", name: "นพ. สัมโพธิ จิตเย็น", specialization: "จิตเวช" },
        { id: "BKK003-D06-DR04", name: "พญ. รัตนา จิตหมาย", specialization: "จิตเวช" },
        { id: "BKK003-D06-DR05", name: "นพ. สุนทร บำบัด", specialization: "จิตเวช" },
      ],
    },
  ],
};

export default phyathai;

