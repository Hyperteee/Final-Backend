import dataIcon from "../../../../images/icon-department/icon-department";

const synphaet = {
  id: "BKK002",
  name: "โรงพยาบาลสินแพทย์",
  state: "กรุงเทพมหานคร",
  district: "ห้วยขวาง",
  type: "โรงพยาบาลเอกชน",
  logo: "images/logohospital/synphaet.png",
  stars: 4.2,
  reviews: 153,
  location: { lat: 13.7620, lng: 100.5673 },

  departments: [
    {
      id: "BKK002-D01",
      name: "อายุรกรรม",
      logo: dataIcon.ayurkum,
      doctors: [
        {
          id: "BKK002-D01-DR01",
          name: "นพ. พงษ์พัฒน์ กล่ำอยู่สุข",
          specialization: "อายุรแพทย์ทั่วไป",
        },
        {
          id: "BKK002-D01-DR02",
          name: "พญ. ปรียาภรณ์ ใจใส",
          specialization: "อายุรแพทย์โรคไต",
        },
        {
          id: "BKK002-D01-DR03",
          name: "นพ. ดุษฎี เซี่ยงหลอ",
          specialization: "อายุรแพทย์โรคหัวใจ",
        },
      ],
    },
    {
      id: "BKK002-D02",
      name: "ศัลยกรรม",
      logo: dataIcon.surgery,
      doctors: [
        {
          id: "BKK002-D02-DR01",
          name: "นพ. วรวิทย์ พัฒนา",
          specialization: "ศัลยกรรมทั่วไป",
        },
        {
          id: "BKK002-D02-DR02",
          name: "พญ. เสาวรส ภู่แก้ว",
          specialization: "ศัลยกรรมกระดูกและข้อ",
        },
      ],
    },
    {
      id: "BKK002-D03",
      name: "กุมารเวชกรรม",
      logo: dataIcon.child,
      doctors: [
        {
          id: "BKK002-D03-DR01",
          name: "พญ. กินรี สรพิพัฒน์เจริญ",
          specialization: "กุมารแพทย์ทั่วไป",
        },
        {
          id: "BKK002-D03-DR02",
          name: "นพ. ธีรพงศ์ ว่องวิภาสมิตกุล",
          specialization: "โรคภูมิแพ้ในเด็ก",
        },
      ],
    },
    {
      id: "BKK002-D04",
      name: "สูตินรีเวชกรรม",
      logo: dataIcon.woman,
      doctors: [
        {
          id: "BKK002-D04-DR01",
          name: "พญ. อริสรา คุปตารักษ์",
          specialization: "สูติแพทย์ทั่วไป",
        },
        {
          id: "BKK002-D04-DR02",
          name: "พญ. กัญญาพัชร วรรธโนรมณ์",
          specialization: "การตั้งครรภ์ความเสี่ยงสูง",
        },
      ],
    },
    {
      id: "BKK002-D05",
      name: "หัวใจ",
      logo: dataIcon.heart,
      doctors: [
        {
          id: "BKK002-D05-DR01",
          name: "นพ. ดุษฎี เซี่ยงหลอ",
          specialization: "อายุรแพทย์โรคหัวใจ",
        },
        {
          id: "BKK002-D05-DR02",
          name: "นพ. อภิชัย บำรุง",
          specialization: "สวนหัวใจและหลอดเลือด",
        },
      ],
    },
  ],
};

export default synphaet;

