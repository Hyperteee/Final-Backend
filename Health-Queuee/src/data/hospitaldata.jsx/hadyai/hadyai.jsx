import dataIcon from "../../../../images/icon-department/icon-department";

const hatyai = {
  id: "SGK002", // อิงตาม hospitalData
  name: "หาดใหญ่",
  state: "สงขลา",
  type: "โรงพยาบาลรัฐ",
  logo: "images/logohospital/hatyai.png", // อิงตาม hospitalData
  stars: 4.4,
  reviews: 95,
  location: { lat: 7.0135, lng: 100.4795 }, // อิงตาม hospitalData
  district: "หาดใหญ่",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "SGK002-D00",
      name: "ไม่รู้แผนก"
    },
    // -------------------- อายุรกรรม --------------------
    {
      id: "SGK002-D01",
      name: "อายุรกรรม",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "SGK002-D01-DR01", name: "นพ. สันติสุข แดนใต้", specialization: "อายุรแพทย์ทั่วไป" },
        { id: "SGK002-D01-DR02", name: "พญ. บุปผา มาลา", specialization: "โรคระบบทางเดินหายใจ" },
        { id: "SGK002-D01-DR03", name: "นพ. คมสันต์ มั่นคง", specialization: "โรคไต" },
        { id: "SGK002-D01-DR04", name: "พญ. รัตนา พาดี", specialization: "โรคต่อมไร้ท่อและเบาหวาน" },
        { id: "SGK002-D01-DR05", name: "นพ. ชัยชนะ ชนะโรค", specialization: "โรคติดเชื้อ" },
      ],
    },

    // -------------------- ศัลยกรรม --------------------
    {
      id: "SGK002-D02",
      name: "ศัลยกรรม",
      logo: dataIcon.surgery,
      doctors: [
        { id: "SGK002-D02-DR01", name: "นพ. แกร่งกล้า หาดใหญ่", specialization: "ศัลยกรรมทั่วไป" },
        { id: "SGK002-D02-DR02", name: "พญ. งามพรรณ สรรสร้าง", specialization: "ศัลยกรรมตกแต่ง" },
        { id: "SGK002-D02-DR03", name: "นพ. ภูผา ศิลา", specialization: "ศัลยกรรมกระดูกและข้อ" },
        { id: "SGK002-D02-DR04", name: "พญ. คล่องแคล่ว ว่องไว", specialization: "ศัลยกรรมระบบปัสสาวะ" },
        { id: "SGK002-D02-DR05", name: "นพ. สมอง ปัญญา", specialization: "ศัลยกรรมประสาท" },
      ],
    },

    // -------------------- กุมารเวชกรรม --------------------
    {
      id: "SGK002-D03",
      name: "กุมารเวชกรรม",
      logo: dataIcon.child,
      doctors: [
        { id: "SGK002-D03-DR01", name: "พญ. นุ่มนวล ชวนฝัน", specialization: "กุมารแพทย์ทั่วไป" },
        { id: "SGK002-D03-DR02", name: "นพ. สดชื่น รื่นรมย์", specialization: "โรคภูมิแพ้ในเด็ก" },
        { id: "SGK002-D03-DR03", name: "พญ. ดวงใจ แม่", specialization: "ทารกแรกเกิด" },
        { id: "SGK002-D03-DR04", name: "นพ. พัฒนา ก้าวไกล", specialization: "พัฒนาการเด็ก" },
        { id: "SGK002-D03-DR05", name: "พญ. หวานใจ เด็กๆ", specialization: "โรคเลือดในเด็ก" },
      ],
    },

    // -------------------- นรีเวชกรรม --------------------
    {
      id: "SGK002-D04",
      name: "นรีเวชกรรม",
      logo: dataIcon.woman,
      doctors: [
        { id: "SGK002-D04-DR01", name: "พญ. กัลยา นารี", specialization: "สูติ-นรีเวชทั่วไป" },
        { id: "SGK002-D04-DR02", name: "นพ. สืบสาน วงศ์ตระกูล", specialization: "ภาวะมีบุตรยาก" },
        { id: "SGK002-D04-DR03", name: "พญ. ผุดผ่อง ยองใย", specialization: "วัยทอง" },
        { id: "SGK002-D04-DR04", name: "นพ. ปกป้อง คุ้มภัย", specialization: "มะเร็งวิทยานรีเวช" },
        { id: "SGK002-D04-DR05", name: "พญ. อุ่นใจ ใกล้หมอ", specialization: "ฝากครรภ์คุณภาพ" },
      ],
    },

    // -------------------- หัวใจ --------------------
    {
      id: "SGK002-D05",
      name: "หัวใจ",
      logo: dataIcon.heart,
      doctors: [
        { id: "SGK002-D05-DR01", name: "นพ. ใจเด็ด เพชรฆาต", specialization: "อายุรศาสตร์หัวใจ" },
        { id: "SGK002-D05-DR02", name: "พญ. เลือดลม ดี", specialization: "โรคความดันโลหิตสูง" },
        { id: "SGK002-D05-DR03", name: "นพ. เต้น จังหวะ", specialization: "คลื่นไฟฟ้าหัวใจ" },
        { id: "SGK002-D05-DR04", name: "พญ. แข็งแรง ทนทาน", specialization: "ฟื้นฟูสมรรถภาพหัวใจ" },
        { id: "SGK002-D05-DR05", name: "นพ. ผ่าตัด ชัดเจน", specialization: "ศัลยกรรมหัวใจ" },
      ],
    },

    // -------------------- จิตเวช --------------------
    {
      id: "SGK002-D06",
      name: "จิตเวช",
      logo: dataIcon.pyscho,
      doctors: [
        { id: "SGK002-D06-DR01", name: "พญ. สงบ ร่มเย็น", specialization: "จิตเวชศาสตร์ทั่วไป" },
        { id: "SGK002-D06-DR02", name: "นพ. สติ ปัญญา", specialization: "บำบัดสารเสพติด" },
        { id: "SGK002-D06-DR03", name: "พญ. เมตตา ปรานี", specialization: "จิตเวชเด็กและวัยรุ่น" },
        { id: "SGK002-D06-DR04", name: "นพ. เข้าใจ วัยเก๋า", specialization: "จิตเวชผู้สูงอายุ" },
        { id: "SGK002-D06-DR05", name: "พญ. คลาย ทุกข์", specialization: "โรคซึมเศร้า" },
      ],
    },
  ],
};

export default hatyai;