import dataIcon from "../../../../images/icon-department/icon-department";

const phramongkut = {
  id: "BKK009", // อิงตาม hospitalData
  name: "พระมงกุฎเกล้า",
  state: "กรุงเทพมหานคร",
  type: "โรงพยาบาลรัฐ",
  logo: "images/logohospital/phramongkut.png", // อิงตาม hospitalData
  stars: 4.6,
  reviews: 240,
  location: { lat: 13.7674, lng: 100.5360 }, // อิงตาม hospitalData
  district: "ราชเทวี",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "BKK009-D00",
      name: "ไม่รู้แผนก"
    },
    // -------------------- อายุรกรรม --------------------
    {
      id: "BKK009-D01",
      name: "อายุรกรรม",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "BKK009-D01-DR01", name: "นพ. อาจหาญ ชาญชัย", specialization: "อายุรแพทย์ทั่วไป" },
        { id: "BKK009-D01-DR02", name: "พญ. ระเบียบ วินัย", specialization: "โรคระบบทางเดินหายใจ" },
        { id: "BKK009-D01-DR03", name: "นพ. มั่นคง ทรงพลัง", specialization: "โรคไต" },
        { id: "BKK009-D01-DR04", name: "พญ. จิตใจ เข้มแข็ง", specialization: "โรคต่อมไร้ท่อ" },
        { id: "BKK009-D01-DR05", name: "นพ. ปกป้อง รักษา", specialization: "โรคติดเชื้อ" },
      ],
    },

    // -------------------- ศัลยกรรม --------------------
    {
      id: "BKK009-D02",
      name: "ศัลยกรรม",
      logo: dataIcon.surgery,
      doctors: [
        { id: "BKK009-D02-DR01", name: "นพ. กล้าหาญ ชาญศึก", specialization: "ศัลยกรรมอุบัติเหตุและฉุกเฉิน" }, // โดดเด่นด้านเวชศาสตร์ทหาร
        { id: "BKK009-D02-DR02", name: "พญ. แผลสวย เรียบเนียน", specialization: "ศัลยกรรมตกแต่ง" },
        { id: "BKK009-D02-DR03", name: "นพ. กระดูก เหล็ก", specialization: "ศัลยกรรมกระดูกและข้อ" },
        { id: "BKK009-D02-DR04", name: "พญ. แม่นยำ ชำนาญ", specialization: "ศัลยกรรมระบบประสาท" },
        { id: "BKK009-D02-DR05", name: "นพ. ผ่าตัด จัดการ", specialization: "ศัลยกรรมทั่วไป" },
      ],
    },

    // -------------------- กุมารเวชกรรม --------------------
    {
      id: "BKK009-D03",
      name: "กุมารเวชกรรม",
      logo: dataIcon.child,
      doctors: [
        { id: "BKK009-D03-DR01", name: "พญ. อ่อนโยน ปลอดภัย", specialization: "กุมารแพทย์ทั่วไป" },
        { id: "BKK009-D03-DR02", name: "นพ. เติบโต แข็งแรง", specialization: "โภชนาการเด็ก" },
        { id: "BKK009-D03-DR03", name: "พญ. สดใส ร่าเริง", specialization: "โรคภูมิแพ้ในเด็ก" },
        { id: "BKK009-D03-DR04", name: "นพ. ดูแล ลูกหลาน", specialization: "โรคหัวใจเด็ก" },
        { id: "BKK009-D03-DR05", name: "พญ. ห่วงใย ใส่ใจ", specialization: "ทารกแรกเกิด" },
      ],
    },

    // -------------------- นรีเวชกรรม --------------------
    {
      id: "BKK009-D04",
      name: "นรีเวชกรรม",
      logo: dataIcon.woman,
      doctors: [
        { id: "BKK009-D04-DR01", name: "พญ. มารดา แห่งชาติ", specialization: "สูติ-นรีเวชทั่วไป" },
        { id: "BKK009-D04-DR02", name: "นพ. กำเนิด ใหม่", specialization: "เวชศาสตร์มารดาและทารก" },
        { id: "BKK009-D04-DR03", name: "พญ. กุลสตรี ศรีสยาม", specialization: "มะเร็งวิทยานรีเวช" },
        { id: "BKK009-D04-DR04", name: "นพ. สร้างสรรค์ ครอบครัว", specialization: "ภาวะมีบุตรยาก" },
        { id: "BKK009-D04-DR05", name: "พญ. ดูแล หญิงไทย", specialization: "วัยทอง" },
      ],
    },

    // -------------------- หัวใจ --------------------
    {
      id: "BKK009-D05",
      name: "หัวใจ",
      logo: dataIcon.heart,
      doctors: [
        { id: "BKK009-D05-DR01", name: "นพ. หัวใจ ทหาร", specialization: "อายุรศาสตร์หัวใจ" },
        { id: "BKK009-D05-DR02", name: "พญ. เลือด สูบฉีด", specialization: "โรคหลอดเลือดหัวใจ" },
        { id: "BKK009-D05-DR03", name: "นพ. แข็งแกร่ง อดทน", specialization: "ฟื้นฟูสมรรถภาพหัวใจ" },
        { id: "BKK009-D05-DR04", name: "พญ. จังหวะ มั่นคง", specialization: "สรีรวิทยาไฟฟ้าหัวใจ" },
        { id: "BKK009-D05-DR05", name: "นพ. ผ่าตัด หัวใจ", specialization: "ศัลยกรรมหัวใจและทรวงอก" },
      ],
    },

    // -------------------- จิตเวช --------------------
    {
      id: "BKK009-D06",
      name: "จิตเวช",
      logo: dataIcon.pyscho,
      doctors: [
        { id: "BKK009-D06-DR01", name: "พญ. จิตใจ ดีงาม", specialization: "จิตเวชศาสตร์ทั่วไป" },
        { id: "BKK009-D06-DR02", name: "นพ. พลัง ใจ", specialization: "จิตเวชทหารและชุมชน" }, // สาขาเฉพาะทางที่น่าสนใจ
        { id: "BKK009-D06-DR03", name: "พญ. สงบ สยบความเครียด", specialization: "บำบัดความเครียด" },
        { id: "BKK009-D06-DR04", name: "นพ. เข้าใจ ปัญหา", specialization: "จิตเวชเด็กและวัยรุ่น" },
        { id: "BKK009-D06-DR05", name: "พญ. เยียวยา จิตใจ", specialization: "จิตบำบัด" },
      ],
    },
  ],
};

export default phramongkut;