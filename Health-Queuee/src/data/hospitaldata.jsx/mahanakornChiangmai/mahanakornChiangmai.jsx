import dataIcon from "../../../../images/icon-department/icon-department";

const maharajChiangMai = {
  id: "CHM002", // อิงตาม hospitalData
  name: "มหาราชนครเชียงใหม่",
  state: "เชียงใหม่",
  type: "โรงพยาบาลรัฐ",
  logo: "images/logohospital/maharajcm.png", // อิงตาม hospitalData
  stars: 4.7,
  reviews: 180,
  location: { lat: 18.7909, lng: 98.9818 }, // อิงตาม hospitalData
  district: "เมืองเชียงใหม่",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "CHM002-D00",
      name: "ไม่รู้แผนก"
    },
    // -------------------- อายุรกรรม --------------------
    {
      id: "CHM002-D01",
      name: "อายุรกรรม",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "CHM002-D01-DR01", name: "นพ. วิชาญ ล้านนา", specialization: "อายุรแพทย์ทั่วไป" },
        { id: "CHM002-D01-DR02", name: "พญ. บัวตอง ผ่องอำไพ", specialization: "โรคระบบทางเดินหายใจ" },
        { id: "CHM002-D01-DR03", name: "นพ. สิงห์คำ นำโชค", specialization: "โรคไต" },
        { id: "CHM002-D01-DR04", name: "พญ. มะลิวัลย์ ขวัญยืน", specialization: "โรคต่อมไร้ท่อ" },
        { id: "CHM002-D01-DR05", name: "นพ. คำรณ คนเก่ง", specialization: "อายุรกรรมโรคมะเร็ง" },
      ],
    },

    // -------------------- ศัลยกรรม --------------------
    {
      id: "CHM002-D02",
      name: "ศัลยกรรม",
      logo: dataIcon.surgery,
      doctors: [
        { id: "CHM002-D02-DR01", name: "นพ. ไกรสร ดอนแก้ว", specialization: "ศัลยกรรมทั่วไป" },
        { id: "CHM002-D02-DR02", name: "พญ. จันทร์เจ้า ขาวผ่อง", specialization: "ศัลยกรรมตกแต่ง" },
        { id: "CHM002-D02-DR03", name: "นพ. ขุนศึก ศึกสงคราม", specialization: "ศัลยกรรมอุบัติเหตุ" },
        { id: "CHM002-D02-DR04", name: "พญ. แก้วกัลยา นารี", specialization: "ศัลยกรรมเด็ก" },
        { id: "CHM002-D02-DR05", name: "นพ. ภูผา สง่างาม", specialization: "ศัลยกรรมระบบประสาท" },
      ],
    },

    // -------------------- กุมารเวชกรรม --------------------
    {
      id: "CHM002-D03",
      name: "กุมารเวชกรรม",
      logo: dataIcon.child,
      doctors: [
        { id: "CHM002-D03-DR01", name: "พญ. เอื้องเหนือ เชื้อสาย", specialization: "กุมารแพทย์ทั่วไป" },
        { id: "CHM002-D03-DR02", name: "นพ. น้อยหน่า น่ารัก", specialization: "โรคเลือดในเด็ก" },
        { id: "CHM002-D03-DR03", name: "พญ. คำแก้ว แวววาว", specialization: "โรคติดเชื้อในเด็ก" },
        { id: "CHM002-D03-DR04", name: "นพ. ตะวัน ฉายแสง", specialization: "ทารกแรกเกิด" },
        { id: "CHM002-D03-DR05", name: "พญ. สายไหม ใจดี", specialization: "พัฒนาการเด็ก" },
      ],
    },

    // -------------------- นรีเวชกรรม --------------------
    {
      id: "CHM002-D04",
      name: "นรีเวชกรรม",
      logo: dataIcon.woman,
      doctors: [
        { id: "CHM002-D04-DR01", name: "พญ. กาสะลอง ดอกงาม", specialization: "สูติ-นรีเวชทั่วไป" },
        { id: "CHM002-D04-DR02", name: "นพ. อินทนนท์ สูงส่ง", specialization: "เวชศาสตร์มารดาและทารก" },
        { id: "CHM002-D04-DR03", name: "พญ. ฝ้ายคำ จำปา", specialization: "มะเร็งวิทยานรีเวช" },
        { id: "CHM002-D04-DR04", name: "นพ. แสนแสบ แสบสัน", specialization: "ผ่าตัดผ่านกล้อง" },
        { id: "CHM002-D04-DR05", name: "พญ. สร้อยฟ้า ดาราราย", specialization: "ภาวะมีบุตรยาก" },
      ],
    },

    // -------------------- หัวใจ --------------------
    {
      id: "CHM002-D05",
      name: "หัวใจ",
      logo: dataIcon.heart,
      doctors: [
        { id: "CHM002-D05-DR01", name: "นพ. ใจเด็ด เพชรฆาต", specialization: "อายุรศาสตร์หัวใจ" },
        { id: "CHM002-D05-DR02", name: "พญ. ขวัญฤดี มีชัย", specialization: "โรคหัวใจเด็ก" },
        { id: "CHM002-D05-DR03", name: "นพ. ศิลา แกร่ง", specialization: "ศัลยกรรมหัวใจและทรวงอก" },
        { id: "CHM002-D05-DR04", name: "พญ. อัมรา พาเพลิน", specialization: "ฟื้นฟูสมรรถภาพหัวใจ" },
        { id: "CHM002-D05-DR05", name: "นพ. สายฟ้า ฟาด", specialization: "สวนหัวใจ" },
      ],
    },

    // -------------------- จิตเวช --------------------
    {
      id: "CHM002-D06",
      name: "จิตเวช",
      logo: dataIcon.pyscho,
      doctors: [
        { id: "CHM002-D06-DR01", name: "พญ. คำหล้า น่าฮัก", specialization: "จิตเวชศาสตร์ทั่วไป" },
        { id: "CHM002-D06-DR02", name: "นพ. สมอง ป้องกัน", specialization: "จิตเวชศาสตร์ผู้สูงอายุ" },
        { id: "CHM002-D06-DR03", name: "พญ. จิตดี มีสุข", specialization: "จิตเวชเด็กและวัยรุ่น" },
        { id: "CHM002-D06-DR04", name: "นพ. สมาธิ มั่นคง", specialization: "บำบัดสารเสพติด" },
        { id: "CHM002-D06-DR05", name: "พญ. ผ่อนคลาย หายห่วง", specialization: "นิติบุคลิกภาพ" },
      ],
    },
  ],
};

export default maharajChiangMai;