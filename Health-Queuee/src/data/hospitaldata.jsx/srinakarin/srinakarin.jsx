import dataIcon from "../../../../images/icon-department/icon-department";

const srinagarind = {
  id: "KNK002", // อิงตาม hospitalData
  name: "ศรีนครินทร์",
  state: "ขอนแก่น",
  type: "โรงพยาบาลรัฐ",
  logo: "images/logohospital/srinagarind.png", // อิงตาม hospitalData
  stars: 4.8,
  reviews: 150,
  location: { lat: 16.4674, lng: 102.8229 }, // อิงตาม hospitalData
  district: "เมืองขอนแก่น",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "KNK002-D00",
      name: "ไม่รู้แผนก"
    },
    // -------------------- อายุรกรรม --------------------
    {
      id: "KNK002-D01",
      name: "อายุรกรรม",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "KNK002-D01-DR01", name: "นพ. ปราชญ์ อีสาน", specialization: "อายุรแพทย์ทั่วไป" },
        { id: "KNK002-D01-DR02", name: "พญ. ดอกคูน เสียงแคน", specialization: "โรคเขตร้อน" }, // เด่นเรื่องนี้ในภูมิภาค
        { id: "KNK002-D01-DR03", name: "นพ. แคน ขอนแก่น", specialization: "โรคพยาธิใบไม้ตับและท่อน้ำดี" }, // โรคประจำถิ่น
        { id: "KNK002-D01-DR04", name: "พญ. มะลิวัลย์ พันธุ์ไม้", specialization: "โรคไต" },
        { id: "KNK002-D01-DR05", name: "นพ. ภูเวียง เสียงทอง", specialization: "โรคระบบทางเดินหายใจ" },
      ],
    },

    // -------------------- ศัลยกรรม --------------------
    {
      id: "KNK002-D02",
      name: "ศัลยกรรม",
      logo: dataIcon.surgery,
      doctors: [
        { id: "KNK002-D02-DR01", name: "นพ. ผา แต้ม", specialization: "ศัลยกรรมทั่วไป" },
        { id: "KNK002-D02-DR02", name: "พญ. แพรวา กาฬสินธุ์", specialization: "ศัลยกรรมตกแต่ง" },
        { id: "KNK002-D02-DR03", name: "นพ. ไดโน เสาร์", specialization: "ศัลยกรรมกระดูกและข้อ" },
        { id: "KNK002-D02-DR04", name: "พญ. ลำเพลิน เจริญใจ", specialization: "ศัลยกรรมตับและทางเดินน้ำดี" },
        { id: "KNK002-D02-DR05", name: "นพ. บึงแก่น นคร", specialization: "ศัลยกรรมระบบประสาท" },
      ],
    },

    // -------------------- กุมารเวชกรรม --------------------
    {
      id: "KNK002-D03",
      name: "กุมารเวชกรรม",
      logo: dataIcon.child,
      doctors: [
        { id: "KNK002-D03-DR01", name: "พญ. ข้าวเหนียว ปั้นน้อย", specialization: "กุมารแพทย์ทั่วไป" },
        { id: "KNK002-D03-DR02", name: "นพ. หมอลำ ม่วนซื่น", specialization: "โรคเลือดในเด็ก" },
        { id: "KNK002-D03-DR03", name: "พญ. ส้มตำ รสเด็ด", specialization: "โรคติดเชื้อในเด็ก" },
        { id: "KNK002-D03-DR04", name: "นพ. ภูพาน ตระการตา", specialization: "โรคไตในเด็ก" },
        { id: "KNK002-D03-DR05", name: "พญ. ไหมไทย ใจดี", specialization: "ทารกแรกเกิด" },
      ],
    },

    // -------------------- นรีเวชกรรม --------------------
    {
      id: "KNK002-D04",
      name: "นรีเวชกรรม",
      logo: dataIcon.woman,
      doctors: [
        { id: "KNK002-D04-DR01", name: "พญ. กัลปพฤกษ์ งามตา", specialization: "สูติ-นรีเวชทั่วไป" },
        { id: "KNK002-D04-DR02", name: "นพ. มอดินแดง แข็งแรง", specialization: "มะเร็งนรีเวช" },
        { id: "KNK002-D04-DR03", name: "พญ. ศรีฐาน สำราญ", specialization: "เวชศาสตร์มารดาและทารก" },
        { id: "KNK002-D04-DR04", name: "นพ. กังสดาล บานชื่น", specialization: "ผ่าตัดผ่านกล้อง" },
        { id: "KNK002-D04-DR05", name: "พญ. โนนม่วง ห่วงใย", specialization: "ภาวะมีบุตรยาก" },
      ],
    },

    // -------------------- หัวใจ --------------------
    {
      id: "KNK002-D05",
      name: "หัวใจ",
      logo: dataIcon.heart,
      doctors: [
        { id: "KNK002-D05-DR01", name: "นพ. หัวใจ อีสาน", specialization: "อายุรศาสตร์หัวใจ" },
        { id: "KNK002-D05-DR02", name: "พญ. เลือดเนื้อ เชื้อไข", specialization: "ศัลยกรรมหัวใจและทรวงอก" },
        { id: "KNK002-D05-DR03", name: "นพ. เต้น ตามจังหวะ", specialization: "สรีรวิทยาไฟฟ้าหัวใจ" },
        { id: "KNK002-D05-DR04", name: "พญ. แคร์ คักคัก", specialization: "ฟื้นฟูสมรรถภาพหัวใจ" },
        { id: "KNK002-D05-DR05", name: "นพ. แข็งแรง บึกบึน", specialization: "สวนหัวใจ" },
      ],
    },

    // -------------------- จิตเวช --------------------
    {
      id: "KNK002-D06",
      name: "จิตเวช",
      logo: dataIcon.pyscho,
      doctors: [
        { id: "KNK002-D06-DR01", name: "พญ. จิตใจ งาม", specialization: "จิตเวชศาสตร์ทั่วไป" },
        { id: "KNK002-D06-DR02", name: "นพ. สติ มาปัญญาเกิด", specialization: "บำบัดสารเสพติด" },
        { id: "KNK002-D06-DR03", name: "พญ. ฮักแพง แบ่งปัน", specialization: "จิตเวชเด็กและวัยรุ่น" },
        { id: "KNK002-D06-DR04", name: "นพ. ปล่อยวาง สบายใจ", specialization: "จิตเวชผู้สูงอายุ" },
        { id: "KNK002-D06-DR05", name: "พญ. ยิ้มสยาม งามแท้", specialization: "โรคซึมเศร้า" },
      ],
    },
  ],
};

export default srinagarind;