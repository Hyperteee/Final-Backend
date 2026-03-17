import dataIcon from "../../../../images/icon-department/icon-department";

const somdetPhraTtheprat = {
    id: "BKK011",
    name: "โรงพยาบาลศูนย์การแพทย์สมเด็จพระเทพรัตน์",
    state: "กรุงเทพมหานคร",
    type: "ศูนย์การแพทย์เฉพาะทาง",
    logo: "images/logohospital/somdet-phra-theprat.png",
    stars: 4.8,
    reviews: 1020,
    location: { lat: 13.7654, lng: 100.5233 },
    district: "เขตราชเทวี",
    departments: [
      {
        id: "BKK011-D01",
        name: "ศูนย์เวชศาสตร์แม่และเด็ก",
        logo: dataIcon.woman,
        doctors: [
          {
            id: "BKK011-D01-DR01",
            name: "พญ. เมทินี กรณิศ",
            specialization: "เวชศาสตร์มารดาและทารกในครรภ์",
          },
          {
            id: "BKK011-D01-DR02",
            name: "นพ. ธนะศักดิ์ พิพัฒน์",
            specialization: "สูตินรีแพทย์เฉพาะทาง",
          },
        ],
      },
      {
        id: "BKK011-D02",
        name: "ศูนย์หัวใจขั้นสูง",
        logo: dataIcon.heart,
        doctors: [
          {
            id: "BKK011-D02-DR01",
            name: "นพ. สรัลภพ สุทธิรักษ์",
            specialization: "อายุรแพทย์หัวใจผู้ใหญ่",
          },
          {
            id: "BKK011-D02-DR02",
            name: "พญ. กมลวรรณ ศรีเมือง",
            specialization: "ศัลยแพทย์หัวใจ",
          },
        ],
      },
      {
        id: "BKK011-D03",
        name: "ศูนย์วิศวกรรมชีวการแพทย์",
        logo: dataIcon.surgery,
        doctors: [
          {
            id: "BKK011-D03-DR01",
            name: "นพ. ณรงค์เดช วิริยะพงศ์",
            specialization: "ศัลยกรรมหุ่นยนต์",
          },
          {
            id: "BKK011-D03-DR02",
            name: "พญ. ชญาดา ดำรงเดช",
            specialization: "เวชศาสตร์ฟื้นฟูขั้นสูง",
          },
        ],
      },
      {
        id: "BKK011-D04",
        name: "ศูนย์ประสาทวิทยาและสมอง",
        logo: dataIcon.pyscho,
        doctors: [
          {
            id: "BKK011-D04-DR01",
            name: "นพ. ภาณุวัชร์ วัฒนวณิช",
            specialization: "ประสาทวิทยา",
          },
          {
            id: "BKK011-D04-DR02",
            name: "พญ. อัจฉรา ศุภจิตรา",
            specialization: "ประสาทศัลยแพทย์",
          },
        ],
      },
    ],
  };

export default somdetPhraTtheprat;

