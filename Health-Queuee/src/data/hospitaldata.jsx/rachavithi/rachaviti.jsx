import dataIcon from "../../../../images/icon-department/icon-department";

const rajavithi = {
  id: "BKK005", // อิงตาม hospitalData
  name: "ราชวิถี",
  state: "กรุงเทพมหานคร",
  type: "โรงพยาบาลรัฐ",
  logo: "images/logohospital/rajvithi.png", // อิงตาม hospitalData
  stars: 4.5,
  reviews: 195,
  location: { lat: 13.7663, lng: 100.5372 }, // อิงตาม hospitalData
  district: "ราชเทวี",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "BKK005-D00",
      name: "ไม่รู้แผนก"
    },
    // -------------------- อายุรกรรม --------------------
    {
      id: "BKK005-D01",
      name: "อายุรกรรม",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "BKK005-D01-DR01", name: "นพ. กิตติศักดิ์ ภักดี", specialization: "อายุรแพทย์ทั่วไป" },
        { id: "BKK005-D01-DR02", name: "พญ. นภา แสงสุริยะ", specialization: "โรคต่อมไร้ท่อและเบาหวาน" },
        { id: "BKK005-D01-DR03", name: "นพ. วีรชาติ ชาติทหาร", specialization: "โรคติดเชื้อ" },
        { id: "BKK005-D01-DR04", name: "พญ. กมลชนก งามจิต", specialization: "โรคไต" },
        { id: "BKK005-D01-DR05", name: "นพ. อนุสรณ์ สอนใจ", specialization: "โรคระบบทางเดินหายใจ" },
      ],
    },

    // -------------------- ศัลยกรรม --------------------
    {
      id: "BKK005-D02",
      name: "ศัลยกรรม",
      logo: dataIcon.surgery,
      doctors: [
        { id: "BKK005-D02-DR01", name: "นพ. ณรงค์ องอาจ", specialization: "ศัลยกรรมอุบัติเหตุ" }, // ราชวิถีเด่นเรื่องอุบัติเหตุ
        { id: "BKK005-D02-DR02", name: "พญ. สุพัตรา ผ่าตัดดี", specialization: "ศัลยกรรมทั่วไป" },
        { id: "BKK005-D02-DR03", name: "นพ. บดินทร์ ศิลา", specialization: "ศัลยกรรมประสาท" },
        { id: "BKK005-D02-DR04", name: "พญ. พรรณราย สายน้ำ", specialization: "ศัลยกรรมหลอดเลือด" },
        { id: "BKK005-D02-DR05", name: "นพ. เอกบุรุษ สุดยอด", specialization: "ศัลยกรรมระบบปัสสาวะ" },
      ],
    },

    // -------------------- กุมารเวชกรรม --------------------
    {
      id: "BKK005-D03",
      name: "กุมารเวชกรรม",
      logo: dataIcon.child,
      doctors: [
        { id: "BKK005-D03-DR01", name: "พญ. ดวงกมล คนดี", specialization: "กุมารแพทย์ทั่วไป" },
        { id: "BKK005-D03-DR02", name: "นพ. ภัทร พัฒนา", specialization: "โรคหัวใจเด็ก" },
        { id: "BKK005-D03-DR03", name: "พญ. อรอนงค์ วงศ์ษา", specialization: "ทารกแรกเกิด" },
        { id: "BKK005-D03-DR04", name: "นพ. ชลทิศ ทิศทางดี", specialization: "โรคปอดในเด็ก" },
        { id: "BKK005-D03-DR05", name: "พญ. ศิริพร พรประเสริฐ", specialization: "โรคไตในเด็ก" },
      ],
    },

    // -------------------- นรีเวชกรรม --------------------
    {
      id: "BKK005-D04",
      name: "นรีเวชกรรม",
      logo: dataIcon.woman,
      doctors: [
        { id: "BKK005-D04-DR01", name: "พญ. โสภิตา นารี", specialization: "สูติ-นรีเวชทั่วไป" },
        { id: "BKK005-D04-DR02", name: "นพ. ธนดล คนเก่ง", specialization: "มะเร็งวิทยานรีเวช" },
        { id: "BKK005-D04-DR03", name: "พญ. ปรียา น่ารัก", specialization: "เวชศาสตร์การเจริญพันธุ์" },
        { id: "BKK005-D04-DR04", name: "นพ. วิทยา พาเพลิน", specialization: "ผ่าตัดผ่านกล้อง" },
        { id: "BKK005-D04-DR05", name: "พญ. กุลธิดา ฟ้าใส", specialization: "เวชศาสตร์มารดาและทารก" },
      ],
    },

    // -------------------- หัวใจ --------------------
    {
      id: "BKK005-D05",
      name: "หัวใจ",
      logo: dataIcon.heart,
      doctors: [
        { id: "BKK005-D05-DR01", name: "นพ. หัวใจ สิงห์", specialization: "อายุรศาสตร์หัวใจ" },
        { id: "BKK005-D05-DR02", name: "พญ. หทัยรัตน์ รักดี", specialization: "สวนหัวใจและหลอดเลือด" },
        { id: "BKK005-D05-DR03", name: "นพ. ชีวิน ยืนยาว", specialization: "สรีรวิทยาไฟฟ้าหัวใจ" },
        { id: "BKK005-D05-DR04", name: "พญ. มนฤดี มีสุข", specialization: "โรคลิ้นหัวใจ" },
        { id: "BKK005-D05-DR05", name: "นพ. เกษม เปรมปรีดิ์", specialization: "ศัลยกรรมทรวงอกและหัวใจ" },
      ],
    },

    // -------------------- จิตเวช --------------------
    {
      id: "BKK005-D06",
      name: "จิตเวช",
      logo: dataIcon.pyscho,
      doctors: [
        { id: "BKK005-D06-DR01", name: "พญ. จิตผ่องใส ใจเย็น", specialization: "จิตเวชทั่วไป" },
        { id: "BKK005-D06-DR02", name: "นพ. ปรุงจิต คิดดี", specialization: "บำบัดผู้ติดสารเสพติด" },
        { id: "BKK005-D06-DR03", name: "พญ. นวลปราง วางใจ", specialization: "จิตเวชเด็กและวัยรุ่น" },
        { id: "BKK005-D06-DR04", name: "นพ. สงบ พบสุข", specialization: "นิติบุคลิกภาพ" },
        { id: "BKK005-D06-DR05", name: "พญ. เมตตา ธรรม", specialization: "จิตบำบัด" },
      ],
    },
  ],
};

export default rajavithi;