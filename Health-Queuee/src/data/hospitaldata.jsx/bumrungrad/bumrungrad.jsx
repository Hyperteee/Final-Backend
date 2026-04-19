import dataIcon from "../../../../images/icon-department/icon-department";

const bumrungrad = {
    id: "BKK006",
    name: "โรงพยาบาลบำรุงราษฎร์",
    state: "กรุงเทพมหานคร",
    type: "โรงพยาบาลเอกชน",
    logo: "images/logohospital/bumrungrad.png",
    stars: 4.9,
    reviews: 1280,
    location: { lat: 13.7469, lng: 100.5557 },
    district: "วัฒนา",
    departments: [
      {
        id: "BKK006-D01",
        name: "อายุรกรรม",
        logo: dataIcon.ayurkum,
        doctors: [
          {id: "BKK006-D01-DR01", name: "นพ. สมชาย รักดี", specialization: "อายุรศาสตร์ทั่วไป" },
          {id: "BKK006-D01-DR02", name: "พญ. นภาพร ใจดี", specialization: "อายุรศาสตร์โรคติดเชื้อ" },
          {id: "BKK006-D01-DR03", name: "นพ. วิชัย มีสุข", specialization: "อายุรศาสตร์โรคไต" },
          {id: "BKK006-D01-DR04", name: "พญ. สุชาดา งามพิรุณ", specialization: "อายุรศาสตร์โรคระบบทางเดินหายใจ" },
          {id: "BKK006-D01-DR05", name: "นพ. กิตติศักดิ์ บุญประคอง", specialization: "อายุรศาสตร์โลหิตวิทยา" }
        ]
      },
      {
        id: "BKK006-D02",
        name: "ศูนย์หัวใจ",
        logo: dataIcon.huajai,
        doctors: [
          {id: "BKK006-D02-DR01", name: "นพ. เกรียงไกร ชนะภัย", specialization: "ศัลยกรรมหัวใจ" },
          {id: "BKK006-D02-DR02", name: "พญ. รักษ์ใจ สุขุม", specialization: "อายุรศาสตร์โรคหัวใจ" }
        ]
      }
    ]
};

export default bumrungrad;

