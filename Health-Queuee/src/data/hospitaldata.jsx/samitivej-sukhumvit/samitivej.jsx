import dataIcon from "../../../../images/icon-department/icon-department";

const samitivej = {
  id: "BKK008", // อิงตาม hospitalData
  name: "สมิติเวช สุขุมวิท",
  state: "กรุงเทพมหานคร",
  type: "โรงพยาบาลเอกชน",
  logo: "images/logohospital/samitivej.png", // อิงตาม hospitalData
  stars: 4.5,
  reviews: 288,
  location: { lat: 13.7317, lng: 100.5828 }, // อิงตาม hospitalData
  district: "วัฒนา",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "BKK008-D00",
      name: "ไม่รู้แผนก"
    },
    // -------------------- อายุรกรรม --------------------
    {
      id: "BKK008-D01",
      name: "อายุรกรรม",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "BKK008-D01-DR01", name: "นพ. อินเตอร์ สากล", specialization: "อายุรแพทย์ทั่วไป (International)" },
        { id: "BKK008-D01-DR02", name: "พญ. รักษิณา วงศ์ผู้ดี", specialization: "โรคระบบทางเดินอาหารและตับ" },
        { id: "BKK008-D01-DR03", name: "นพ. ภูมิ คุ้มกัน", specialization: "โรคภูมิแพ้และอิมมูโนโลยี" },
        { id: "BKK008-D01-DR04", name: "พญ. เบาหวิว สบายตัว", specialization: "โรคต่อมไร้ท่อและเบาหวาน" },
        { id: "BKK008-D01-DR05", name: "นพ. สมอง ไว", specialization: "อายุรกรรมระบบประสาท" },
      ],
    },

    // -------------------- ศัลยกรรม --------------------
    {
      id: "BKK008-D02",
      name: "ศัลยกรรม",
      logo: dataIcon.surgery,
      doctors: [
        { id: "BKK008-D02-DR01", name: "นพ. เฉียบขาด บาดใจ", specialization: "ศัลยกรรมทั่วไป" },
        { id: "BKK008-D02-DR02", name: "พญ. บิวตี้ สวยใส", specialization: "ศัลยกรรมตกแต่ง" },
        { id: "BKK008-D02-DR03", name: "นพ. สปอร์ต แมน", specialization: "ศัลยกรรมกระดูกและข้อ (เวชศาสตร์การกีฬา)" },
        { id: "BKK008-D02-DR04", name: "พญ. ส่องกล้อง มองเห็น", specialization: "ศัลยกรรมผ่านกล้องแผลเล็ก" },
        { id: "BKK008-D02-DR05", name: "นพ. กระดูกสันหลัง มั่นคง", specialization: "ศัลยกรรมกระดูกสันหลัง" },
      ],
    },

    // -------------------- กุมารเวชกรรม --------------------
    // สมิติเวชโดดเด่นเรื่องโรงพยาบาลเด็ก
    {
      id: "BKK008-D03",
      name: "กุมารเวชกรรม",
      logo: dataIcon.child,
      doctors: [
        { id: "BKK008-D03-DR01", name: "พญ. แฮปปี้ ดีใจ", specialization: "กุมารแพทย์ทั่วไป" },
        { id: "BKK008-D03-DR02", name: "นพ. จูเนียร์ เติบโต", specialization: "โรคต่อมไร้ท่อในเด็ก (ความสูง)" },
        { id: "BKK008-D03-DR03", name: "พญ. นางฟ้า ตัวน้อย", specialization: "ทารกแรกเกิดและวิกฤตบำบัด" },
        { id: "BKK008-D03-DR04", name: "นพ. ภูมิ ต้านทาน", specialization: "โรคภูมิแพ้ทางเดินหายใจเด็ก" },
        { id: "BKK008-D03-DR05", name: "พญ. สมาร์ท คิดส์", specialization: "พัฒนาการเด็กและพฤติกรรม" },
      ],
    },

    // -------------------- นรีเวชกรรม --------------------
    {
      id: "BKK008-D04",
      name: "นรีเวชกรรม",
      logo: dataIcon.woman,
      doctors: [
        { id: "BKK008-D04-DR01", name: "พญ. เลดี้ เฟิร์ส", specialization: "สูติ-นรีเวชทั่วไป" },
        { id: "BKK008-D04-DR02", name: "นพ. ปลอดภัย ไร้กังวล", specialization: "เวชศาสตร์มารดาและทารก" },
        { id: "BKK008-D04-DR03", name: "พญ. สวยสง่า น่านับถือ", specialization: "เวชศาสตร์ชะลอวัยสตรี" },
        { id: "BKK008-D04-DR04", name: "นพ. สมหวัง ตั้งครรภ์", specialization: "ภาวะมีบุตรยาก" },
        { id: "BKK008-D04-DR05", name: "พญ. คล่องแคล่ว ว่องไว", specialization: "ผ่าตัดผ่านกล้องทางนรีเวช" },
      ],
    },

    // -------------------- หัวใจ --------------------
    {
      id: "BKK008-D05",
      name: "หัวใจ",
      logo: dataIcon.heart,
      doctors: [
        { id: "BKK008-D05-DR01", name: "นพ. แข็งแรง แรงดี", specialization: "อายุรศาสตร์หัวใจ" },
        { id: "BKK008-D05-DR02", name: "พญ. หทัย สดใส", specialization: "ภาพวินิจฉัยโรคหัวใจ" },
        { id: "BKK008-D05-DR03", name: "นพ. บอลลูน ขยายหลอดเลือด", specialization: "มัณฑนากรหลอดเลือดหัวใจ" },
        { id: "BKK008-D05-DR04", name: "พญ. จังหวะ ชีวิต", specialization: "สรีรวิทยาไฟฟ้าหัวใจ" },
        { id: "BKK008-D05-DR05", name: "นพ. พิทักษ์ หัวใจ", specialization: "ศัลยกรรมหัวใจ" },
      ],
    },

    // -------------------- จิตเวช --------------------
    {
      id: "BKK008-D06",
      name: "จิตเวช",
      logo: dataIcon.pyscho,
      doctors: [
        { id: "BKK008-D06-DR01", name: "พญ. สบายใจ ไร้ทุกข์", specialization: "จิตเวชทั่วไป" },
        { id: "BKK008-D06-DR02", name: "นพ. ผ่อนคลาย หายเครียด", specialization: "ความเครียดและโรคนอนไม่หลับ" },
        { id: "BKK008-D06-DR03", name: "พญ. เข้าใจ วัยรุ่น", specialization: "จิตเวชเด็กและวัยรุ่น" },
        { id: "BKK008-D06-DR04", name: "นพ. ปรึกษา ได้เสมอ", specialization: "จิตบำบัดครอบครัว" },
        { id: "BKK008-D06-DR05", name: "พญ. ความจำ ดีเลิศ", specialization: "จิตเวชผู้สูงอายุ" },
      ],
    },
  ],
};

export default samitivej;