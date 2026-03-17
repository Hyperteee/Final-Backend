import dataIcon from "../../../../images/icon-department/icon-department";

const praram9 = {
  id: "BKK008",
  name: "โรงพยาบาลพระรามเก้า",
  state: "กรุงเทพมหานคร",
  type: "โรงพยาบาลเอกชน",
  logo: "images/logohospital/praram9.png",
  stars: 4.6,
  reviews: 820,
  location: { lat: 13.7511, lng: 100.5831 },
  district: "เขตห้วยขวาง",

  departments: [
    ///////////////////// ไม่รู้แผนก
    {
      id: "BKK008-D00",
      name: "ไม่รู้แผนก"
    },
    // -------------------- ศูนย์เบาหวานและต่อมไร้ท่อ --------------------
    {
      id: "BKK008-D01",
      name: "ศูนย์เบาหวานและต่อมไร้ท่อ",
      logo: dataIcon.ayurkum,
      doctors: [
        { id: "BKK008-D01-DR01", name: "นพ. สุธีร์ สงวนวงษ์", specialization: "ต่อมไร้ท่อและเมตาบอลิซึม" },
        { id: "BKK008-D01-DR02", name: "พญ. จุฑามาศ เลิศมงคล", specialization: "อายุรกรรมเบาหวาน" },
        { id: "BKK008-D01-DR03", name: "นพ. อนุวัฒน์ สุขสวัสดิ์", specialization: "ต่อมไร้ท่อ" },
        { id: "BKK008-D01-DR04", name: "พญ. มาลี ชาญชัย", specialization: "เบาหวาน" },
        { id: "BKK008-D01-DR05", name: "นพ. ธานิน ไทยวัฒน์", specialization: "เบาหวาน" },
      ],
    },

    // -------------------- ศูนย์เวชศาสตร์การเจริญพันธุ์ --------------------
    {
      id: "BKK008-D02",
      name: "ศูนย์เวชศาสตร์การเจริญพันธุ์",
      logo: dataIcon.woman,
      doctors: [
        { id: "BKK008-D02-DR01", name: "นพ. อภินัช เหล่าศักดา", specialization: "เวชศาสตร์การเจริญพันธุ์และ IVF" },
        { id: "BKK008-D02-DR02", name: "พญ. ญาดา วิรัชกุล", specialization: "สูตินรีเวชเฉพาะทาง" },
        { id: "BKK008-D02-DR03", name: "พญ. สุนิสา บุตรศรี", specialization: "นรีเวชกรรม" },
        { id: "BKK008-D02-DR04", name: "นพ. สมพล บุตรศรี", specialization: "นรีเวชกรรม" },
        { id: "BKK008-D02-DR05", name: "พญ. นลิน สูติแพทย์", specialization: "สูตินรีเวช" },
      ],
    },

    // -------------------- ศูนย์หัวใจพระรามเก้า --------------------
    {
      id: "BKK008-D03",
      name: "ศูนย์หัวใจพระรามเก้า",
      logo: dataIcon.heart,
      doctors: [
        { id: "BKK008-D03-DR01", name: "นพ. ปริญญา จิตภักดี", specialization: "อายุรแพทย์หัวใจ" },
        { id: "BKK008-D03-DR02", name: "นพ. พิริยะ ภัควัฒน์", specialization: "ศัลยแพทย์หัวใจและทรวงอก" },
        { id: "BKK008-D03-DR03", name: "นพ. วิทวัส หัวใจแข็ง", specialization: "หัวใจ" },
        { id: "BKK008-D03-DR04", name: "พญ. กมล หัวใจดี", specialization: "หัวใจ" },
        { id: "BKK008-D03-DR05", name: "นพ. ธนา หัวใจเหล็ก", specialization: "หัวใจ" },
      ],
    },

    // -------------------- ศูนย์ตับและทางเดินน้ำดี --------------------
    {
      id: "BKK008-D04",
      name: "ศูนย์ตับและทางเดินน้ำดี",
      logo: dataIcon.surgery,
      doctors: [
        { id: "BKK008-D04-DR01", name: "นพ. นเรศ อรุณศิลป์", specialization: "ศัลยแพทย์ตับและตับอ่อน" },
        { id: "BKK008-D04-DR02", name: "พญ. กรองกาญจน์ บุญเรือง", specialization: "อายุรแพทย์ระบบทางเดินอาหาร" },
        { id: "BKK008-D04-DR03", name: "นพ. สมศักดิ์ ตับดี", specialization: "ศัลยกรรม" },
        { id: "BKK008-D04-DR04", name: "พญ. นิดา อาหาร", specialization: "ศัลยกรรม" },
        { id: "BKK008-D04-DR05", name: "นพ. ธีร ทางเดิน", specialization: "ศัลยกรรม" },
      ],
    },
  ],
};

export default praram9;

