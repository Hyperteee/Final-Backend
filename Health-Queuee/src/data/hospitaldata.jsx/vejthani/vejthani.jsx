import dataIcon from "../../../../images/icon-department/icon-department";

const vejthani = {
    id: "BKK010",
    name: "โรงพยาบาลเวชธานี",
    state: "กรุงเทพมหานคร",
    type: "โรงพยาบาลเอกชน",
    logo: "images/logohospital/vejthani.png",
    stars: 4.5,
    reviews: 640,
    location: { lat: 13.7767, lng: 100.6144 },
    district: "เขตบางกะปิ",
    departments: [
      {
        id: "BKK010-D01",
        name: "ศูนย์กระดูกสันหลังและข้อ",
        logo: dataIcon.surgery,
        doctors: [
          {
            id: "BKK010-D01-DR01",
            name: "นพ. ภูชิต คำภู",
            specialization: "ศัลยกรรมกระดูกสันหลัง",
          },
          {
            id: "BKK010-D01-DR02",
            name: "นพ. นิติพงศ์ สถิตธนภพ",
            specialization: "เวชศาสตร์ฟื้นฟู",
          },
        ],
      },
      {
        id: "BKK010-D02",
        name: "ศูนย์หัวใจเวชธานี",
        logo: dataIcon.heart,
        doctors: [
          {
            id: "BKK010-D02-DR01",
            name: "นพ. ศุภฤกษ์ เกษมนุกูล",
            specialization: "อายุรแพทย์หัวใจ",
          },
          {
            id: "BKK010-D02-DR02",
            name: "นพ. ปกรณ์ แสงพุ่ม",
            specialization: "ศัลยแพทย์หลอดเลือด",
          },
        ],
      },
      {
        id: "BKK010-D03",
        name: "ศูนย์ผิวหนังและความงาม",
        logo: dataIcon.ayurkum,
        doctors: [
          {
            id: "BKK010-D03-DR01",
            name: "พญ. วนิดา กิตติกร",
            specialization: "ผิวหนังเลเซอร์",
          },
          {
            id: "BKK010-D03-DR02",
            name: "พญ. อลิสา สุวรรณมาศ",
            specialization: "เวชศาสตร์ชะลอวัย",
          },
        ],
      },
      {
        id: "BKK010-D04",
        name: "ศูนย์กุมารเวช",
        logo: dataIcon.child,
        doctors: [
          {
            id: "BKK010-D04-DR01",
            name: "นพ. เกรียงไกร ภาวนาสุข",
            specialization: "กุมารแพทย์โรคเลือด",
          },
          {
            id: "BKK010-D04-DR02",
            name: "พญ. สุทธิมา เลิศประภา",
            specialization: "กุมารแพทย์พัฒนาการ",
          },
        ],
      },
    ],
  };

export default vejthani;

