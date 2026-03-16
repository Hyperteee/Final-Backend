import dataIcon from "../../../../images/icon-department/icon-department";

const chiangmaiRam = {
  id: "CHM001", // อิงตาม hospitalData ของคุณ
  name: "เชียงใหม่ราม",
  state: "เชียงใหม่",
  type: "โรงพยาบาลเอกชน",
  logo: "images/logohospital/chiangmai.png", // อิงตาม hospitalData
  stars: 4.6,
  reviews: 90,
  location: { lat: 18.7867, lng: 98.9853 }, // อิงตาม hospitalData
  district: "เมืองเชียงใหม่",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "CHM001-D00",
      name: "ไม่รู้แผนก"
    },
    // -------------------- อายุรกรรม --------------------
    {
      id: "CHM001-D01",
      name: "อายุรกรรม",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "CHM001-D01-DR01", name: "นพ. กฤษดา รักษาดี", specialization: "อายุรแพทย์ทั่วไป" },
        { id: "CHM001-D01-DR02", name: "พญ. นภัสสร วงศ์คำ", specialization: "ระบบประสาทและสมอง" },
        { id: "CHM001-D01-DR03", name: "นพ. วิชัย เมืองเหนือ", specialization: "โรคไต" },
        { id: "CHM001-D01-DR04", name: "พญ. อรุณี มีสุข", specialization: "โรคต่อมไร้ท่อ" },
        { id: "CHM001-D01-DR05", name: "นพ. ธนพล คนเก่ง", specialization: "อายุรกรรมโรคมะเร็ง" },
      ],
    },

    // -------------------- ศัลยกรรม --------------------
    {
      id: "CHM001-D02",
      name: "ศัลยกรรม",
      logo: dataIcon.surgery,
      doctors: [
        { id: "CHM001-D02-DR01", name: "นพ. ประเสริฐ ผ่าตัดเก่ง", specialization: "ศัลยกรรมทั่วไป" },
        { id: "CHM001-D02-DR02", name: "พญ. วรารัตน์ งามดี", specialization: "ศัลยกรรมความงาม" },
        { id: "CHM001-D02-DR03", name: "นพ. สมศักดิ์ ภักดี", specialization: "ศัลยกรรมกระดูกและข้อ" },
        { id: "CHM001-D02-DR04", name: "พญ. กานดา ใจกล้า", specialization: "ศัลยกรรมระบบปัสสาวะ" },
        { id: "CHM001-D02-DR05", name: "นพ. อุดมทรัพย์ ทรัพย์มาก", specialization: "ศัลยกรรมอุบัติเหตุ" },
      ],
    },

    // -------------------- กุมารเวชกรรม --------------------
    {
      id: "CHM001-D03",
      name: "กุมารเวชกรรม",
      logo: dataIcon.child,
      doctors: [
        { id: "CHM001-D03-DR01", name: "พญ. สมศรี รักเด็ก", specialization: "กุมารแพทย์ทารกแรกเกิด" },
        { id: "CHM001-D03-DR02", name: "นพ. ปิติ ยินดี", specialization: "โรคระบบทางเดินหายใจเด็ก" },
        { id: "CHM001-D03-DR03", name: "พญ. มานี มีตา", specialization: "กุมารเวชศาสตร์ทั่วไป" },
        { id: "CHM001-D03-DR04", name: "นพ. มานะ อดทน", specialization: "โรคเลือดในเด็ก" },
        { id: "CHM001-D03-DR05", name: "พญ. ชูใจ ใส่ใจ", specialization: "โภชนาการเด็ก" },
      ],
    },

    // -------------------- นรีเวชกรรม --------------------
    {
      id: "CHM001-D04",
      name: "นรีเวชกรรม",
      logo: dataIcon.woman,
      doctors: [
        { id: "CHM001-D04-DR01", name: "พญ. กุลสตรี ศรีเชียงใหม่", specialization: "สูติ-นรีเวชทั่วไป" },
        { id: "CHM001-D04-DR02", name: "นพ. ณัฐวุฒิ บุญมี", specialization: "ภาวะมีบุตรยาก" },
        { id: "CHM001-D04-DR03", name: "พญ. พรพิมล งามตา", specialization: "ผ่าตัดผ่านกล้องทางนรีเวช" },
        { id: "CHM001-D04-DR04", name: "นพ. สุรชัย ใจดีมาก", specialization: "มะเร็งปากมดลูก" },
        { id: "CHM001-D04-DR05", name: "พญ. วิไลวรรณ ฝันดี", specialization: "วัยทอง" },
      ],
    },

    // -------------------- หัวใจ --------------------
    {
      id: "CHM001-D05",
      name: "หัวใจ",
      logo: dataIcon.heart,
      doctors: [
        { id: "CHM001-D05-DR01", name: "นพ. หัวใจ แข็งแรง", specialization: "อายุรกรรมหัวใจ" },
        { id: "CHM001-D05-DR02", name: "พญ. ดวงใจ ไร้โรค", specialization: "สวนหัวใจและหลอดเลือด" },
        { id: "CHM001-D05-DR03", name: "นพ. รักษา ยั่งยืน", specialization: "ฟื้นฟูสมรรถภาพหัวใจ" },
        { id: "CHM001-D05-DR04", name: "พญ. กมลวรรณ ปันสุข", specialization: "โรคลิ้นหัวใจ" },
        { id: "CHM001-D05-DR05", name: "นพ. ศิริชัย ไกลโรค", specialization: "ศัลยกรรมหัวใจและทรวงอก" },
      ],
    },

    // -------------------- จิตเวช --------------------
    {
      id: "CHM001-D06",
      name: "จิตเวช",
      logo: dataIcon.pyscho,
      doctors: [
        { id: "CHM001-D06-DR01", name: "พญ. สบายใจ ไร้ทุกข์", specialization: "จิตแพทย์ผู้ใหญ่" },
        { id: "CHM001-D06-DR02", name: "นพ. สงบ สยบความเคลื่อนไหว", specialization: "บำบัดสารเสพติด" },
        { id: "CHM001-D06-DR03", name: "พญ. รื่นรมย์ สมหวัง", specialization: "ปรึกษาปัญหาครอบครัว" },
        { id: "CHM001-D06-DR04", name: "นพ. ปัญญา รู้แจ้ง", specialization: "โรคซึมเศร้า" },
        { id: "CHM001-D06-DR05", name: "พญ. เมตตา ปรานี", specialization: "จิตเวชเด็ก" },
      ],
    },
  ],
};

export default chiangmaiRam;