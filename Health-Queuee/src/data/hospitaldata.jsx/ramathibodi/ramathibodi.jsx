import dataIcon from "../../../../images/icon-department/icon-department";

const ramathibodi = {
    id: "BKK009",
    name: "โรงพยาบาลรามาธิบดี",
    state: "กรุงเทพมหานคร",
    type: "โรงพยาบาลมหาวิทยาลัย",
    logo: "images/logohospital/ramathibodi.png",
    stars: 4.9,
    reviews: 2100,
    location: { lat: 13.7669, lng: 100.523 },
    district: "เขตราชเทวี",
    departments: [
      {
        id: "BKK009-D01",
        name: "ศูนย์อายุรกรรมเฉพาะทาง",
        logo: dataIcon.ayurkum,
        doctors: [
          {
            id: "BKK009-D01-DR01",
            name: "นพ. อภิรักษ์ เจนกิจ",
            specialization: "อายุรแพทย์โรคเลือด",
          },
          {
            id: "BKK009-D01-DR02",
            name: "พญ. กุลชา ชัยเดชา",
            specialization: "อายุรแพทย์ไต",
          },
        ],
      },
      {
        id: "BKK009-D02",
        name: "ศูนย์ปลูกถ่ายและศัลยกรรมขั้นสูง",
        logo: dataIcon.surgery,
        doctors: [
          {
            id: "BKK009-D02-DR01",
            name: "นพ. พงศ์ภัทร พันธุมะ",
            specialization: "ศัลยแพทย์ปลูกถ่ายตับ",
          },
          {
            id: "BKK009-D02-DR02",
            name: "นพ. สถาพร ชัยบุญ",
            specialization: "ศัลยกรรมทรวงอก",
          },
        ],
      },
      {
        id: "BKK009-D03",
        name: "ศูนย์มะเร็งรามาธิบดี",
        logo: dataIcon.pyscho,
        doctors: [
          {
            id: "BKK009-D03-DR01",
            name: "พญ. ภูษณิศา กิตติรุจาวงศ์",
            specialization: "อายุรแพทย์มะเร็ง",
          },
          {
            id: "BKK009-D03-DR02",
            name: "นพ. จิรายุส เฉลิมศิลป์",
            specialization: "รังสีรักษา",
          },
        ],
      },
      {
        id: "BKK009-D04",
        name: "ศูนย์กุมารเวชรามาธิบดี",
        logo: dataIcon.child,
        doctors: [
          {
            id: "BKK009-D04-DR01",
            name: "นพ. ปฏิภาณ สวัสดิพร",
            specialization: "กุมารแพทย์โรคหัวใจ",
          },
          {
            id: "BKK009-D04-DR02",
            name: "พญ. ปวีณา ชลธี",
            specialization: "กุมารแพทย์มะเร็ง",
          },
        ],
      },
    ],
  };

export default ramathibodi;

