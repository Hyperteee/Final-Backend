import dataIcon from "../../../../images/icon-department/icon-department";

const bumrungrad = {
    id: "BKK004",
    name: "โรงพยาบาลบำรุงราษฎร์",
    state: "กรุงเทพมหานคร",
    type: "โรงพยาบาลเอกชนระดับนานาชาติ",
    logo: "images/logohospital/bumrungrad.png",
    stars: 4.9,
    reviews: 1280,
    location: { lat: 13.7469, lng: 100.5557 },
    district: "เขตวัฒนา",
    departments: [
      {
        id: "BKK004-D01",
        name: "อายุรกรรม",
        logo: dataIcon.ayurkum,
        doctors: [
          {id: "BKK004-D01-DR01", name: "นพ. อดิศักดิ์ ศรีสุข", specialization: "อายุรแพทย์ทั่วไป" },
          {id: "BKK004-D01-DR02", name: "พญ. วราภรณ์ ใจดี", specialization: "โรคเบาหวานและต่อมไร้ท่อ" },
          {id: "BKK004-D01-DR03", name: "นพ. ธนพล สุขสวัสดิ์", specialization: "โรคหัวใจและหลอดเลือด" },
          {id: "BKK004-D01-DR04", name: "นพ. ศุภชัย ใจกว้าง", specialization: "อายุรกรรมประสาทวิทยา" },
          {id: "BKK004-D01-DR05", name: "นพ. ศุภชัย ใจกว้าง", specialization: "อายุรกรรมประสาทวิทยา" }
        ]
      },
      {
        id: "BKK004-D02",
        name: "ศูนย์หัวใจครบวงจร",
        logo: dataIcon.huajai,
        doctors: [
          {id: "BKK004-D02-DR01", name: "นพ. ปริญญา นวลน้อย", specialization: "จักษุแพทยศาสตร์" },
          {id: "BKK004-D02-DR02", name: "นพ. สมชัย สายสุข", specialization: "ศัลยกรรมหัวใจและหลอดเลือด" }
        ]
      }
    ]
};

export default bumrungrad;

