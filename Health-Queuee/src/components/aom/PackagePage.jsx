import React, { useState } from "react";
import Filter from "./Filter";
import "./package.css";

export default function PackagePage() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchText, setSearchText] = useState("");

  const packages = [
    {
      id: 1,
      image: "/โปรจจจ.png",
      title: "ชุดตรวจสุขภาพ Essence Check-up ชาย-หญิง อายุ 15-30 ปี",
      detail: "ราคา 11,980 บาท",
      tags: ["ชุดตรวจสุขภาพหลัก"],
    },
    {
      id: 2,
      title: "ชุดตรวจสุขภาพ Superior Check-up ชาย-หญิง อายุ 30-40 ปี",
      detail: "ราคา 23,980 บาท",
      tags: ["ชุดตรวจสุขภาพหลัก"],
    },
    {
      id: 3,
      title: "ชุดตรวจสุขภาพ Prestige Male Check-up (Non EST) ชาย อายุ 40-50 ปี",
      detail: "ราคา 34,335 บาท",
      tags: ["ชุดตรวจสุขภาพหลัก"],
    },
    {
      id: 4,
      title: "ชุดตรวจสุขภาพ Prestige Female Check-up (Non EST) หญิง อายุ 40-50 ปี",
      detail: "ราคา 41,225 บาท",
      tags: ["ชุดตรวจสุขภาพหลัก"],
    },
    {
      id: 5,
      title: "ชุดตรวจสุขภาพ Prestige Male Check-up ชาย อายุ 40-50 ปี",
      detail: "ราคา 40,885 บาท",
      tags: ["ชุดตรวจสุขภาพหลัก"],
    },
    {
      id: 6,
      title: "ชุดตรวจสุขภาพ Prestige Female Check-up หญิง อายุ 40-50 ปี",
      detail: "ราคา 47,775 บาท",
      tags: ["ชุดตรวจสุขภาพหลัก"],
    },



    {
      id: 7,
      title: "ชุดตรวจสุขภาพหัวใจโดยการวิ่งสายพาน",
      detail: "ราคา 16,650 บาท",
      tags: ["สุขภาพหัวใจ"],
    },
    {
      id: 8,
      title: "ชุดตรวจสุขภาพหัวใจด้วยคลื่นเสียงความถี่สูง",
      detail: "ราคา 16,910 บาท",
      tags: ["สุขภาพหัวใจ"],
    },
    {
      id: 9,
      title: "ชุดตรวจสุขภาพหัวใจ Preventive Heart Silver",
      detail: "ราคา 18,800 บาท",
      tags: ["สุขภาพหัวใจ"],
    },
    {
      id: 10,
      title: "แพ็กเกจตรวจหัวใจเต้นผิดจังหวะ",
      detail: "ราคา 11,340 บาท",
      tags: ["สุขภาพหัวใจ"],
    },
    {
      id: 11,
      title: "ชุดตรวจสุขภาพสมอง Stop Stroke",
      detail: "ราคา 34,283 บาท",
      tags: ["สุขภาพสมอง"],
    },
    {
      id: 12,
      title: "ชุดตรวจคัดกรองสุขภาพสมอง",
      detail: "ราคา 40,068 บาท",
      tags: ["สุขภาพสมอง"],
    },
    {
      id: 13,
      title: "แพ็กเกจการตรวจการนอนหลับ Sleep Lab Package",
      detail: "ราคา 31,500 บาท",
      tags: ["สุขภาพสมอง"],
    },
    {
      id: 14,
      title: "การตรวจอัลตราซาวนด์หลอดเลือดคอที่ไปเลี้ยงสมอง Carotid Doppler Ultrasound",
      detail: "ราคา 5,290 บาท",
      tags: ["สุขภาพสมอง"],
    },
    {
      id: 15,
      title: "แพ็กเกจตรวจความเสี่ยงอัลไซเมอร์",
      detail: "ราคา 35,000 บาท",
      tags: ["สุขภาพสมอง"],
    },



    {
      id: 16,
      title: "แพ็กเกจตรวจคัดกรองอาการปวดเข่า หรือข้อเข่าเสื่อม",
      detail: "ราคา 3,650 บาท",
      tags: ["ตรวจคัดกรองกระดูก"],
    },
    {
      id: 17,
      title: "แพ็กเกจตรวจคัดกรองกระดูกพรุนเชิงลึก",
      detail: "ราคา 12,530 บาท",
      tags: ["ตรวจคัดกรองกระดูก"],
    },



    {
      id: 18,
      title: "ชุดตรวจคัดกรองมะเร็ง Absolute early Cancer detection Male",
      detail: "ราคา 75,972 บาท",
      tags: ["ตรวจคัดกรองมะเร็ง"],
    },
    {
      id: 19,
      title: "ชุดตรวจคัดกรองมะเร็ง Absolute early Cancer detection Female",
      detail: "ราคา 90,577 บาท",
      tags: ["ตรวจคัดกรองมะเร็ง"],
    },
    {
      id: 20,
      title: "ชุดตรวจคัดกรองมะเร็ง Absolute early Cancer detection with PET/CT Scan (Male)",
      detail: "ราคา 142,741 บาท",
      tags: ["ตรวจคัดกรองมะเร็ง"],
    },
    {
      id: 21,
      title: "ชุดตรวจคัดกรองมะเร็ง Absolute early Cancer detection with PET/CT Scan (Female)",
      detail: "ราคา 157,347 บาท",
      tags: ["ตรวจคัดกรองมะเร็ง"],
    },
    {
      id: 22,
      title: "ชุดตรวจคัดกรองมะเร็ง Standard Cancer Screening",
      detail: "ราคา 13,666 บาท",
      tags: ["ตรวจคัดกรองมะเร็ง"],
    },
    {
      id: 23,
      title: "ตรวจคัดกรองมะเร็งเต้านม Digital mammogram with breast ultrasound",
      detail: "ราคา 6,950 บาท",
      tags: ["ตรวจคัดกรองมะเร็ง"],
    },



    {
      id: 24,
      title: "ตรวจมะเร็งปากมดลูกโดยสูติ-นรีแพทย์ (Liquid Based Cytology)",
      detail: "ราคา 2,468 บาท",
      tags: ["สุขภาพผู้หญิง"],
    },
    {
      id: 25,
      title: "ตรวจมะเร็งปากมดลูกพร้อมตรวจหาเชื้อไวรัส HPV ที่ทำให้เกิดมะเร็งปากมดลูก",
      detail: "ราคา 5,890 บาท",
      tags: ["สุขภาพผู้หญิง"],
    },
    {
      id: 26,
      title: "ชุดตรวจสุขภาพสำหรับสุภาพสตรี Feminine Program",
      detail: "ราคา 12,348 บาท",
      tags: ["สุขภาพผู้หญิง"],
    },
    {
      id: 27,
      title: "ชุดตรวจศูนย์สุขภาพสตรี Women's Health Program",
      detail: "ราคา 19,208 บาท",
      tags: ["สุขภาพผู้หญิง"],
    },
    {
      id: 28,
      title: "ชุดตรวจสุขภาพพร้อมวิวาห์ สุภาพสตรี",
      detail: "ราคา 11,117 บาท",
      tags: ["สุขภาพผู้หญิง"],
    },



    {
      id: 29,
      title: "วัคซีนป้องกันไข้หวัดใหญ่ 4 สายพันธุ์",
      detail: "ราคา 1,820 บาท",
      tags: ["วัคซีน"],
    },
    {
      id: 30,
      title: "วัคซีนไข้หวัดใหญ่สำหรับผู้สูงอายุ 65 ปีขึ้นไป",
      detail: "ราคา 3,600 บาท",
      tags: ["วัคซีน"],
    },
    {
      id: 31,
      title: "วัคซีนป้องกันโรคไข้เลือดออก (ชนิดใหม่ 2 เข็ม)",
      detail: "ราคา 6,800 บาท",
      tags: ["วัคซีน"],
    },
    {
      id: 32,
      title: "วัคซีนป้องกันโรคงูสวัด",
      detail: "ราคา 16,400 บาท",
      tags: ["วัคซีน"],
    },
    {
      id: 33,
      title: "วัคซีนป้องกันโรคพิษสุนัขบ้า (แบบก่อนสัมผัสโรค) 2 เข็ม",
      detail: "ราคา 3,630 บาท",
      tags: ["วัคซีน"],
    },



    {
      id: 34,
      title: "Medilux แก้ปัญหาผมร่วง กระตุ้นผมใหม่ 10 ครั้ง ฟรี! 2 ครั้ง",
      detail: "ราคา 19,200 บาท",
      tags: ["รายการ Beauty"],
    },
    {
      id: 35,
      title: "Aqua Therapy ผลัดเซลล์ผิวด้วยออกซิเจนและเพิ่มวิตามิน 10 ครั้ง ฟรี! Face Mask 10 ครั้ง",
      detail: "ราคา 49,000 บาท",
      tags: ["รายการ Beauty"],
    },



    {
      id: 36,
      title: "เลสิกไร้ใบมีดแบบแผลเล็ก ReLEx SMILE LASIK",
      detail: "ราคา 140,000 บาท",
      tags: ["สุขภาพตาและเลสิก"],
    },
    {
      id: 37,
      title: "เลสิกไร้ใบมีด แก้สายตาสั้น/เอียง/ยาว แต่กำเนิด FemtoLASIK",
      detail: "ราคา 138,000 บาท",
      tags: ["สุขภาพตาและเลสิก"],
    },
    {
      id: 38,
      title: "เลสิกไร้ใบมีดแก้สายตาสั้น เอียง ยาวตามอายุ FemtoLASIK Presbyond",
      detail: "ราคา 140,000 บาท",
      tags: ["สุขภาพตาและเลสิก"],
    },
    {
      id: 39,
      title: "เลนส์เสริมแก้สายตาสั้น ไม่รวมเอียง (1 ข้าง) ICL",
      detail: "ราคา 141,000 บาท",
      tags: ["สุขภาพตาและเลสิก"],
    },



    {
      id: 40,
      title: "ชุดตรวจสุขภาพเด็กตามวัย อายุ 6-15 ปี สำหรับเด็กไทย",
      detail: "ราคา 7,940 บาท",
      tags: ["สุขภาพเด็ก"],
    },


    {
      id: 41,
      title: "ชุดตรวจประเมินภาวะความดันโลหิตสูง",
      detail: "ราคา 12,170 บาท",
      tags: ["รายการตรวจพิเศษ"],
    },
    {
      id: 42,
      title: "การตรวจเพื่อค้นหาความเสี่ยงมะเร็งในช่องปากและคอ",
      detail: "ราคา 3,900 บาท",
      tags: ["รายการตรวจพิเศษ"],
    },
    {
      id: 43,
      title: "ชุดตรวจคัดกรองโรคข้ออักเสบรูมาตอยด์",
      detail: "ราคา 18,580 บาท",
      tags: ["รายการตรวจพิเศษ"],
    },
    {
      id: 44,
      title: "ชุดตรวจคัดกรองโรคข้ออักเสบ",
      detail: "ราคา 10,550 บาท",
      tags: ["รายการตรวจพิเศษ"],
    },
  ];

// ฟิลเตอร์ตามหมวดหมู่ + ค้นหา
const filteredPackages = packages.filter((item) => {
  const matchFilter =
    selectedFilters.length === 0 ||
    item.tags.some((tag) => selectedFilters.includes(tag));

  const matchSearch =
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.detail.toLowerCase().includes(searchText.toLowerCase());

  return matchFilter && matchSearch;
});

// จำกัดจำนวนแสดง 10 อันแรก เมื่อยังไม่ได้เลือกฟิลเตอร์และยังไม่ค้นหา
const defaultLimit = 10;

const packagesToShow =
  selectedFilters.length === 0 && searchText === ""
    ? filteredPackages.slice(0, defaultLimit)
    : filteredPackages;


  return (
    <div className="page-container">

      {/* Banner */}
      <section className="banner">
        <h2 className="banner-title">แพ็กเกจและโปรโมชั่น</h2>

        <div className="banner-box">
          <img src="โปรจจจ.jpg" className="banner-image" alt="banner" />
          <div className="banner-info">ชื่อแพ็กเกจ รายละเอียดต่างๆ</div>
        </div>
      </section>

      {/* Search */}
      <section className="search-section">
        <h2 className="section-title">ค้นหาแพ็คเกจ</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="ชื่อแพ็กเกจ"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
        </div>

        <Filter
          selected={selectedFilters}
          setSelected={setSelectedFilters}
        />
      </section>

      {/* Results */}
      <section className="package-list">
        {packagesToShow.map((pkg) => (
          <div className="package-card" key={pkg.id}>
            <img src={pkg.image} className="img-box" alt={pkg.title} />
            <div className="pkg-info">
              <h4>{pkg.title}</h4>
              <p>{pkg.detail}</p>
            </div>
            <button className="buy-btn">ซื้อเลย</button>
          </div>
        ))}
      </section>

    </div>
  );
}
