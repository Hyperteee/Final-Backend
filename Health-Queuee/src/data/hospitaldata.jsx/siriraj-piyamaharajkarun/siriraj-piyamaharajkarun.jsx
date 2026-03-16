import dataIcon from "../../../../images/icon-department/icon-department";

const sirirajPiyamaharajkarun = {
    id: "BKK006",
    name: "โรงพยาบาลศิริราช ปิยมหาราชการุณย์",
    state: "กรุงเทพมหานคร",
    type: "โรงพยาบาลมหาวิทยาลัย",
    logo: "images/logohospital/siriraj-piyamaharajkarun.png",
    stars: 4.9,
    reviews: 1345,
    location: { lat: 13.7567, lng: 100.4862 },
    district: "เขตบางกอกน้อย",
    departments: [
      {
        id: "BKK006-D01",
        name: "ศูนย์อายุรกรรมชั้นสูง",
        logo: dataIcon.ayurkum,
        doctors: [
          {
            id: "BKK006-D01-DR01",
            name: "นพ. ณัฐพงศ์ รัตนพานิช",
            specialization: "อายุรกรรมต่อมไร้ท่อ",
          },
          {
            id: "BKK006-D01-DR02",
            name: "พญ. ภัทรานิษฐ์ พนาสี",
            specialization: "อายุรกรรมโรคไต",
          },
        ],
      },
      {
        id: "BKK006-D02",
        name: "ศูนย์ศัลยกรรมระบบประสาท",
        logo: dataIcon.pyscho,
        doctors: [
          {
            id: "BKK006-D02-DR01",
            name: "นพ. บดินทร์ ธรรมโชติ",
            specialization: "ประสาทศัลยแพทย์",
          },
          {
            id: "BKK006-D02-DR02",
            name: "พญ. เพียงใจ เลิศวิทยา",
            specialization: "ประสาทวิทยา",
          },
        ],
      },
      {
        id: "BKK006-D03",
        name: "ศูนย์หัวใจศิริราช",
        logo: dataIcon.heart,
        doctors: [
          {
            id: "BKK006-D03-DR01",
            name: "นพ. วุฒิชัย พีรวัชร์",
            specialization: "อายุรแพทย์หัวใจและหลอดเลือด",
          },
          {
            id: "BKK006-D03-DR02",
            name: "นพ. ธิติ ปัญญากร",
            specialization: "ศัลยแพทย์หัวใจ",
          },
        ],
      },
      {
        id: "BKK006-D04",
        name: "ศูนย์มะเร็งบูรณาการ",
        logo: dataIcon.surgery,
        doctors: [
          {
            id: "BKK006-D04-DR01",
            name: "พญ. จิตลดา สุขสมบูรณ์",
            specialization: "ศัลยแพทย์มะเร็ง",
          },
          {
            id: "BKK006-D04-DR02",
            name: "นพ. ธเนศ รัตนสถิตย์",
            specialization: "อายุรแพทย์มะเร็ง",
          },
        ],
      },
    ],
  };

export default sirirajPiyamaharajkarun;

