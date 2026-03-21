// import React from "react";
// import { Dropdown } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";


// export default function PoppularDoc() {
//   return (
//     <div>
//       <section
//         className="relative py-12 px-6 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: "url('./images/BG/BG-White.png')" }}
//       >
//         <div className="max-w-7xl mx-auto">
//           {/* หัวข้อ + ปุ่ม Dropdown */}
//           <div className="flex items-end justify-between mb-8">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">แพทย์ยอดนิยม</h2>
//               <div className="h-2 bg-[#000066] mt-3 w-24 rounded"></div>
//             </div>

//             {/* 🔽 Dropdown แทนปุ่ม “ทั้งหมด” */}
//             <Dropdown>
//               <Dropdown.Toggle
//                 id="dropdown-custom-button"
//                 variant=""
//                 className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-pill text-sm border-0 hover:bg-gray-300 transition"
//               >
//                 ทั้งหมด
//               </Dropdown.Toggle>

//               <Dropdown.Menu menuVariant="dark">
//                 <Dropdown.Item href="#">Dashboard</Dropdown.Item>
//                 <Dropdown.Item href="#">Settings</Dropdown.Item>
//                 <Dropdown.Item href="#">Earnings</Dropdown.Item>
//                 <Dropdown.Divider />
//                 <Dropdown.Item href="#">Sign out</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>

//           {/* การ์ดแพทย์ */}
//       <section className="container py-5" >
//         <div className="row" >
//           <div className="col-12">
//             {/* <h1 className="fw-bold mb-4" style={{ color: "#2d3561", fontSize: "2.5rem" }}>
//               Book an appointment for an
//               <br />
//               in-clinic consultation
//             </h1> */}

//             {/* Specialty Filter Pills
//             <div className="d-flex gap-3 mb-5 flex-wrap">
//               <button
//                 className="btn d-flex align-items-center gap-2 px-4 py-2"
//                 style={{
//                   backgroundColor: "#f8f9fa",
//                   color: "#2d3561",
//                   borderRadius: "2rem",
//                   border: "none",
//                 }}
//               >
//                 <span>🦴</span>
//                 <span>Orthopedists</span>
//               </button>

//               <button
//                 className="btn d-flex align-items-center gap-2 px-4 py-2"
//                 style={{
//                   backgroundColor: "#2d3561",
//                   color: "white",
//                   borderRadius: "2rem",
//                   border: "none",
//                 }}
//               >
//                 <span>👤</span>
//                 <span>Obesity</span>
//               </button>

//               <button
//                 className="btn d-flex align-items-center gap-2 px-4 py-2"
//                 style={{
//                   backgroundColor: "#f8f9fa",
//                   color: "#2d3561",
//                   borderRadius: "2rem",
//                   border: "none",
//                 }}
//               >
//                 <span>🦒</span>
//                 <span>Neck pain</span>
//               </button>

//               <button
//                 className="btn d-flex align-items-center gap-2 px-4 py-2"
//                 style={{
//                   backgroundColor: "#f8f9fa",
//                   color: "#2d3561",
//                   borderRadius: "2rem",
//                   border: "none",
//                 }}
//               >
//                 <span>🧠</span>
//                 <span>Neurology</span>
//               </button>

//               <button
//                 className="btn d-flex align-items-center gap-2 px-4 py-2"
//                 style={{
//                   backgroundColor: "#f8f9fa",
//                   color: "#2d3561",
//                   borderRadius: "2rem",
//                   border: "none",
//                 }}
//               >
//                 <span>🤕</span>
//                 <span>Headache</span>
//               </button>

//               <button
//                 className="btn d-flex align-items-center gap-2 px-4 py-2"
//                 style={{
//                   backgroundColor: "#f8f9fa",
//                   color: "#2d3561",
//                   borderRadius: "2rem",
//                   border: "none",
//                 }}
//               >
//                 <span>💪</span>
//                 <span>Shoulder</span>
//               </button>

//               <button
//                 className="btn d-flex align-items-center gap-2 px-4 py-2"
//                 style={{
//                   backgroundColor: "#f8f9fa",
//                   color: "#2d3561",
//                   borderRadius: "2rem",
//                   border: "none",
//                 }}
//               >
//                 <span>👁️</span>
//                 <span>Eye care</span>
//               </button>
//             </div> */}

//             {/* Doctor Cards Grid */}
//             <div className="row g-4" >
//               <div className="col-12 col-md-6 col-lg-3" >
//                 <div className="card border-0 shadow-sm h-100" style={{
//           background: "linear-gradient(135deg, #2d3561 0%, #1a1f3a 100%)",
//           borderRadius: "2rem",
//         }}>
//                   <div className="card-body p-0">
//                     <div
//                       className="d-flex align-items-end justify-content-center"
//                       style={{
//                         height: "280px",
//                         backgroundColor: "#ecf6ffff",
//                         borderRadius: "1rem 1rem 0 0",
//                         overflow: "hidden",
//                       }}
//                     >
//                       <img
//                         src="./images/Doctor-Oshi.png"
//                         alt="Dr. Oshi"
//                         className="img-fluid"
//                         style={{ height: "100%", objectFit: "cover" }}
//                       />
//                     </div>
//                     <div className="p-3">
//                       <h5 className="fw-bold mb-1 text-white">
//                         Dr. Oshi
//                       </h5>
//                       <p className="mb-0 text-white">แผนก: อยุรกรรม</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-12 col-md-6 col-lg-3">
//                 <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "1rem" }}>
//                   <div className="card-body p-0" style={{
//           background: "linear-gradient(135deg, #2d3561 0%, #1a1f3a 100%)",
//           borderRadius: "2rem",
//         }}>
//                     <div
//                       className="d-flex align-items-end justify-content-center"
//                       style={{
//                         height: "280px",
//                         backgroundColor: "#ecf6ffff",
//                         borderRadius: "1rem 1rem 0 0",
//                         overflow: "hidden",
//                       }}
//                     >
//                       <img
//                         src="./images/Doctor-Mook.png"
//                         alt="Dr. Mook"
//                         className="img-fluid"
//                         style={{ height: "100%", objectFit: "cover" }}
//                       />
//                     </div>
//                     <div className="p-3">
//                       <h5 className="fw-bold mb-1 text-white">
//                         Dr. Mook
//                       </h5>
//                       <p className="text-white small mb-0">แผนก: เวชกรรม</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Dr. Sanjana Gupta */}
//               <div className="col-12 col-md-6 col-lg-3">
//                 <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "1rem" }}>
//                   <div className="card-body p-0"style={{
//           background: "linear-gradient(135deg, #2d3561 0%, #1a1f3a 100%)",
//           borderRadius: "2rem",
//         }}>
//                     <div
//                       className="d-flex align-items-end justify-content-center"
//                       style={{
//                         height: "280px",
//                         backgroundColor: "#ecf6ffff",
//                         borderRadius: "1rem 1rem 0 0",
//                         overflow: "hidden",
//                       }}
//                     >
//                       <img
//                         src="./images/Doctor-Frame.png"
//                         alt="Dr. Frame"
//                         className="img-fluid"
//                         style={{ height: "100%", objectFit: "cover" }}
//                       />
//                     </div>
//                     <div className="p-3">
//                       <h5 className="fw-bold mb-1 text-white" >
//                         Dr. Frame
//                       </h5>
//                       <p className="text-white small mb-0">แผนก: ศูนย์ระบบทางเดินอาหารและตับ</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Dr. Jen Gunter */}
//               <div className="col-12 col-md-6 col-lg-3">
//                 <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "1rem" }}>
//                   <div className="card-body p-0"style={{
//           background: "linear-gradient(135deg, #2d3561 0%, #1a1f3a 100%)",
//           borderRadius: "2rem",
//         }}>
//                     <div
//                       className="d-flex align-items-end justify-content-center"
//                       style={{
//                         height: "280px",
//                         backgroundColor: "#ecf6ffff",
//                         borderRadius: "1rem 1rem 0 0",
//                         overflow: "hidden",
//                       }}
//                     >
//                       <img
//                         src="./images/Doctor-T.png"
//                         alt="Dr. Jen Gunter"
//                         className="img-fluid"
//                         style={{ height: "100%", objectFit: "cover" }}
//                       />
//                     </div>
//                     <div className="p-3">
//                       <h5 className="fw-bold mb-1 text-white" >
//                         Dr. TEE
//                       </h5>
//                       <p className="text-white small mb-0">แผนก: กุมารเวชกรรม</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//           {/* ปุ่มเลื่อนซ้ายขวา */}
//           <div className="flex gap-3 mb-6">
//             <button
//               onClick={() =>
//                 setCurrentOrgSlide(Math.max(0, currentOrgSlide - 1))
//               }
//               className="w-10 h-10 border-2 border-gray-300 rounded-pill flex items-center justify-center hover:bg-gray-100 transition"
//               aria-label="ก่อนหน้า"
//             >
//               <svg
//                 className="w-5 h-5 text-gray-700"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//             </button>
//             <button
//               onClick={() => setCurrentOrgSlide(currentOrgSlide + 1)}
//               className="w-10 h-10 border-2 border-gray-300 rounded-pill flex items-center justify-center hover:bg-gray-100 transition"
//               aria-label="ถัดไป"
//             >
//               <svg
//                 className="w-5 h-5 text-gray-700"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* ปุ่มลงทะเบียน */}
//           <div className="flex justify-end ml-0 md:ml-20">
//             <button className="bg-[#000066] text-white px-8 py-3 rounded-pill hover:bg-[#000088] transition">
//               ลงทะเบียน
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
