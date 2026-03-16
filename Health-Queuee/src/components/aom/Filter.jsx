import React from "react";
import "./package.css";

const diseaseList = [
  "ชุดตรวจสุขภาพหลัก",
  "สุขภาพหัวใจ",
  "สุขภาพสมอง",
  "ตรวจคัดกรองกระดูก",
  "ตรวจคัดกรองมะเร็ง",
  "สุขภาพผู้หญิง",
  "วัคซีน",
  "รายการ Beauty",
  "สุขภาพตาและเลสิก",
  "สุขภาพเด็ก",
  "รายการตรวจพิเศษ",
];

export default function Filter({ selected, setSelected }) {
  const toggle = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  return (
    <div className="filter-container">
      {diseaseList.map((item, index) => (
        <button
          key={index}
          className={`filter-btn ${
            selected.includes(item) ? "active" : ""
          }`}
          onClick={() => toggle(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
