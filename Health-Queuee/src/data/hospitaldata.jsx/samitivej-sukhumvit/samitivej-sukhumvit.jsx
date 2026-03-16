import dataIcon from "../../../../images/icon-department/icon-department";

const samitivej = {
    id: "BKK005",
    name: "โรงพยาบาลสมิติเวช สุขุมวิท",
    state: "กรุงเทพมหานคร",
    type: "โรงพยาบาลเอกชน",
    logo: "images/logohospital/samitivej-sukhumvit.png",
    stars: 4.8,
    reviews: 980,
    location: { lat: 13.7334, lng: 100.5802 },
    district: "เขตวัฒนา",
    departments: [
      {
        id: "BKK005-D01",
        name: "ศูนย์การแพทย์ครอบครัว",
        logo: dataIcon.ayurkum,
        doctors: [
          {
            id: "BKK005-D01-DR01",
            name: "นพ. อนวัช พุ่มพฤกษ์",
            specialization: "เวชศาสตร์ครอบครัว",
          },
          {
            id: "BKK005-D01-DR02",
            name: "พญ. สินีนาถ คงเจริญ",
            specialization: "อายุรกรรมทั่วไป",
          },
        ],
      },
      {
        id: "BKK005-D02",
        name: "ศูนย์สูตินรีกรรมและภาวะมีบุตรยาก",
        logo: dataIcon.woman,
        doctors: [
          {
            id: "BKK005-D02-DR01",
            name: "พญ. รวิภา ธีระวัฒน์",
            specialization: "เวชศาสตร์การเจริญพันธุ์",
          },
          {
            id: "BKK005-D02-DR02",
            name: "นพ. พุฒิเมธ ไตรภพ",
            specialization: "สูตินรีแพทย์เฉพาะทางผ่าตัดส่องกล้อง",
          },
        ],
      },
      {
        id: "BKK005-D03",
        name: "ศูนย์กุมารเวชชั้นสูง",
        logo: dataIcon.child,
        doctors: [
          {
            id: "BKK005-D03-DR01",
            name: "นพ. สหภูมิ สิริไพบูลย์",
            specialization: "กุมารแพทย์โรคระบบทางเดินหายใจ",
          },
          {
            id: "BKK005-D03-DR02",
            name: "พญ. กมลชนก แสงเพ็ญ",
            specialization: "กุมารแพทย์ต่อมไร้ท่อ",
          },
        ],
      },
      {
        id: "BKK005-D04",
        name: "ศูนย์กระดูกและข้อ",
        logo: dataIcon.surgery,
        doctors: [
          {
            id: "BKK005-D04-DR01",
            name: "นพ. ภราดร ชื่นใจ",
            specialization: "ศัลยแพทย์ออร์โธปิดิกส์",
          },
          {
            id: "BKK005-D04-DR02",
            name: "นพ. เชษฐา สุภกิจ",
            specialization: "แพทย์เวชศาสตร์ฟื้นฟู",
          },
        ],
      },
    ],
  };

export default samitivej;

