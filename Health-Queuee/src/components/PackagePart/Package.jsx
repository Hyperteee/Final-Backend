import React from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PackagePart() {
  return (
    <div>
      <section
        className="position-relative mx-3 mt-3 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2d3561 0%, #1a1f3a 100%)",
          borderRadius: "2rem",
        }}
      >
        {/* ชั้น overlay มืด + เบลอ */}
        <div className="absolute inset-0 bg-black/0 backdrop-blur-[3px]"></div>

        {/* เนื้อหาหลัก */}
        <div className="relative max-w-7xl mx-auto mt-5">
          <h2 className="text-3xl font-bold text-white mb-1">
            แพ็กเกจ <span className="text-blue-300">และโปรโมชั่น</span>
          </h2>
          <div className="h-1 w-24 bg-white mt-3 rounded-full"></div>

          {/* แถบตัวกรอง */}
          <div className="grid grid-cols-2 gap-6 mb-8 mt-8">
            {/* 🔽 Dropdown แทนปุ่ม “ทั้งหมด” */}
            <div>
              <label className="block text-white mb-2">เลือกประเภท</label>
              <div className="relative">
                <Dropdown>
                  <Dropdown.Toggle
                    id="package-dropdown"
                    variant=""
                    className="bg-white text-black px-20 py-2 rounded-pill border-0 text-sm hover:bg-gray-100 transition"
                  >
                    ทั้งหมด
                  </Dropdown.Toggle>

                  <Dropdown.Menu menuVariant="dark">
                    <Dropdown.Item href="#">ตรวจสุขภาพ</Dropdown.Item>
                    <Dropdown.Item href="#">ความงาม</Dropdown.Item>
                    <Dropdown.Item href="#">วัคซีน</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">ทั้งหมด</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            {/* 🔍 ช่องค้นหา */}
            <div className="bg-white/90 backdrop-blur-md rounded-full shadow-lg px-[20px] py-[20px] flex items-center gap-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="ค้นหา"
                className="flex-1 outline-none text-gray-700 bg-transparent"
              />
            </div>
          </div>

          {/* การ์ดโปรโมชั่น */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="bg-gray-100 h-48"></div>
                <div className="bg-gray-200 p-4">
                  <p className="text-gray-800 font-semibold mb-1">
                    แพ็กเกจสุขภาพ
                  </p>
                  <p className="text-gray-800 font-semibold mb-3">
                    ตรวจสุขภาพ / ความงาม / วัคซีน
                  </p>
                  <div className="flex gap-2">
                    <button className="bg-white text-gray-800 px-4 py-2 rounded-pill text-sm font-medium hover:bg-gray-50 transition-colors">
                      ดูรายละเอียด
                    </button>
                    <button className="bg-white text-gray-800 px-4 py-2 rounded-pill text-sm font-medium hover:bg-gray-50 transition-colors">
                      จองเลย
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ปุ่มเลื่อน */}
          <div className="flex gap-3 mb-8 justify-center">
            <button className="w-10 h-10 bg-white/90 rounded-pill flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md">
              <svg
                className="w-5 h-5 text-[#000066]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="w-10 h-10 bg-white/90 rounded-pill flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md">
              <svg
                className="w-5 h-5 text-[#000066]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
