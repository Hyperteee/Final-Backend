import { useEffect, useState } from "react";
import { User, CreditCard, Calendar, Lock, Shield, LogOut, Edit, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  
  // เพิ่ม state สำหรับจัดการข้อมูลฟอร์ม และ โหมดการแก้ไข
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));
    if (loggedInUser && loggedInUser.id) {
      // ยิง API ดึงข้อมูลส่วนตัวของผู้ใช้งานจากฐานข้อมูล
      fetch(`http://localhost:3000/users/profile/${loggedInUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          setCurrentUser(data);
          
          // แปลงวันที่ให้อยู่ในรูปแบบ YYYY-MM-DD สำหรับ input type="date"
          let formattedDate = "";
          if (data.birth_date) {
            const d = new Date(data.birth_date);
            formattedDate = d.toISOString().split("T")[0];
          }

          // จัดเตรียมข้อมูลเริ่มต้นสำหรับฟอร์ม
          setFormData({
            ...data,
            birthDate: formattedDate,
            identificationNumber: data.identification_number // แมปชื่อตัวแปรให้ตรงกัน
          });
        })
        .catch((err) => console.error("Error fetching profile:", err));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const calculateAge = (birthdate) => {
    if (!birthdate) return "NaN";
    const today = new Date();
    const birth = new Date(birthdate);

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return isNaN(age) ? "NaN" : age;
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // ฟังก์ชันสำหรับรับค่าจากอินพุตเพื่อเก็บใน state formData
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ฟังก์ชันสำหรับการบันทึกข้อมูล (ยิง PUT Request)
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/users/profile/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          name: formData.name,
          lastname: formData.lastname,
          gender: formData.gender,
          identificationNumber: formData.identificationNumber,
          phone: formData.phone,
          birthDate: formData.birthDate,
          email: formData.email,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("อัปเดตข้อมูลสำเร็จ");
        setIsEditing(false); // ปิดโหมดแก้ไข
        
        // อัปเดตข้อมูลที่แสดงบนหน้าจอทันที
        setCurrentUser(result.data);
        
        // อัปเดตข้อมูลใน Local Storage บางส่วนเพื่อความสอดคล้อง
        const localUser = JSON.parse(localStorage.getItem("currentUser"));
        localStorage.setItem("currentUser", JSON.stringify({
           ...localUser, 
           name: result.data.name,
           email: result.data.email
        }));
      } else {
        alert("เกิดข้อผิดพลาด: " + result.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("ไม่สามารถอัปเดตข้อมูลได้");
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        <h1 className="text-center mb-4 fw-semibold text-black">
          ข้อมูลของคุณ
        </h1>
        <div className="d-flex justify-content-center mb-4 ">
          <div
            style={{
              height: "4px",
              width: "100px",
              backgroundColor: "#001B45",
              borderRadius: "2px",
            }}
          ></div>
        </div>

        <div className="row g-4">
          <div className="col-lg-3">
            <div className="card shadow-sm border-0">
              <h1 className="fw-medium ">ข้อมูลส่วนตัว</h1>

              <div
                style={{
                  height: "4px",
                  width: "20px",
                  backgroundColor: "#001B45",
                  borderRadius: "2px",
                }}
              ></div>

              <div className="list-group list-group-flush mt-3">
                <button
                  onClick={() => navigate("/Profile")}
                  className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
                >
                  <User size={20} />
                  <span>โปรไฟล์ของคุณ</span>
                </button>

                <button
                  onClick={() => navigate("/ProfileBook")}
                  className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
                >
                  <CreditCard size={20} />
                  <span>นัดหมาย</span>
                </button>

                <button
                  onClick={() => navigate("/ProfileHistory")}
                  className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
                >
                  <Calendar size={20} />
                  <span>ประวัติการรักษา</span>
                </button>

                <button
                  onClick={() => navigate("/ProfilePrivacy")}
                  className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
                >
                  <Shield size={20} />
                  <span>จัดการข้อมูลส่วนบุคคล</span>
                </button>
              </div>

              <div className="card-footer bg-white border-top p-3">
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                >
                  <LogOut size={18} />
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            {/* ฟอร์มสำหรับการแสดงผลและแก้ไขข้อมูล */}
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-lg-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold mb-0">ข้อมูลส่วนบุคคล</h4>
                  {!isEditing ? (
                    <button 
                      className="btn btn-primary d-flex align-items-center gap-2"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit size={18} /> แก้ไขข้อมูล
                    </button>
                  ) : (
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-secondary d-flex align-items-center gap-2"
                        onClick={() => {
                          setIsEditing(false);
                          // รีเซ็ตฟอร์มกลับไปเป็นค่าเดิม
                          setFormData({
                            ...currentUser,
                            birthDate: currentUser?.birth_date ? new Date(currentUser.birth_date).toISOString().split("T")[0] : "",
                            identificationNumber: currentUser?.identification_number
                          });
                        }}
                      >
                        <X size={18} /> ยกเลิก
                      </button>
                      <button 
                        className="btn btn-success d-flex align-items-center gap-2"
                        onClick={handleSave}
                      >
                        <Save size={18} /> บันทึกข้อมูล
                      </button>
                    </div>
                  )}
                </div>

                <form>
                  <div className="mb-4">
                    <label className="form-label fw-medium text-secondary">
                      เบอร์โทรศัพท์
                    </label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="form-control" 
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="fs-5 fw-semibold text-success">
                        {currentUser?.phone || "ไม่พบข้อมูล"}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-medium text-secondary">
                      คำนำหน้าชื่อ
                    </label>
                    {isEditing ? (
                      <select 
                        className="form-select" 
                        name="title" 
                        value={formData.title || ""} 
                        onChange={handleInputChange}
                      >
                        <option value="">เลือกคำนำหน้า</option>
                        <option value="นาย">นาย</option>
                        <option value="นาง">นาง</option>
                        <option value="นางสาว">นางสาว</option>
                      </select>
                    ) : (
                      <p className="form-control border rounded px-2 py-2 bg-light m-0">
                        {currentUser?.title || "ไม่พบข้อมูล"}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-medium text-secondary">
                      ชื่อ
                    </label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="form-control" 
                        name="name"
                        value={formData.name || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="form-control border rounded px-2 py-2 bg-light m-0">
                        {currentUser?.name || "ไม่พบข้อมูล"}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-medium text-secondary">
                      นามสกุล
                    </label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="form-control" 
                        name="lastname"
                        value={formData.lastname || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="form-control border rounded px-2 py-2 bg-light m-0">
                        {currentUser?.lastname || "ไม่พบข้อมูล"}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-medium text-secondary">
                      เลขบัตรประชาชน
                    </label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="form-control" 
                        name="identificationNumber"
                        value={formData.identificationNumber || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="form-control border rounded px-2 py-2 bg-light m-0">
                        {currentUser?.identification_number || "ไม่พบข้อมูล"}
                      </p>
                    )}
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-8">
                      <label className="form-label fw-medium text-secondary">
                        วัน/เดือน/ปีเกิด
                      </label>
                      {isEditing ? (
                        <input 
                          type="date" 
                          className="form-control" 
                          name="birthDate"
                          value={formData.birthDate || ""}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="form-control border rounded px-2 py-2 bg-light m-0">
                          {currentUser?.birth_date ? new Date(currentUser.birth_date).toLocaleDateString('th-TH') : "ไม่พบข้อมูล"}
                        </p>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-medium text-secondary">
                        อายุ
                      </label>
                      <div className="fs-5 fw-semibold text-success mt-1">
                        {calculateAge(currentUser?.birth_date)} ปี
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-medium text-secondary">
                      เพศ
                    </label>
                    {isEditing ? (
                      <select 
                        className="form-select" 
                        name="gender" 
                        value={formData.gender || ""} 
                        onChange={handleInputChange}
                      >
                        <option value="">เลือกเพศ</option>
                        <option value="ชาย">ชาย</option>
                        <option value="หญิง">หญิง</option>
                        <option value="อื่นๆ">อื่นๆ</option>
                      </select>
                    ) : (
                      <div className="fs-5 fw-semibold text-success">
                        {currentUser?.gender || "ไม่ระบุ"}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-medium text-secondary">
                      อีเมล
                    </label>
                    {isEditing ? (
                      <input 
                        type="email" 
                        className="form-control" 
                        name="email"
                        value={formData.email || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="form-control border rounded px-2 py-2 bg-light m-0">
                        {currentUser?.email || "ไม่พบข้อมูล"}
                      </p>
                    )}
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ width: "100%", overflow: "hidden", lineHeight: 0 }}>
        <img
          src={"./images/wave-navy.png"}
          alt="footer wave"
          style={{
            width: "100%",
            height: "120px",
            display: "block",
            marginBottom: "-5px",
            marginTop: "-5px",
            
          }}
        />
      </div>
      
      <footer
        id="contact"
        className="custom-footer py-5"
        style={{ backgroundColor: "rgb(2, 10, 27)" }}
      >
        <div className="row mb-5 ms-5 me-5">

          <div className="col-12 col-lg-4 mb-4 mb-lg-0">
            <div className="d-flex align-items-center mb-4">
              <span className="h3 fw-bold text-white mb-0">HFU</span>
            </div>
            <p className="text-light small opacity-75 mb-4">
              Health Queue Management System
            </p>

            <h5 className="fw-bold fs-5 mb-3">Contact</h5>
            <ul className="list-unstyled small contact-list">
              <li className="d-flex align-items-start mb-2">
                <i className="bi bi-geo-alt-fill"></i>
                <p className="mb-0">
                  123 Bangkhen, Sripatum, Bangkok, Thailand 10110
                </p>
              </li>
              <li className="d-flex align-items-center mb-2">
                <i className="bi bi-telephone-fill"></i>
                <a href="tel:+6621234567">(66) 9 999 9999</a>
              </li>
              <li className="d-flex align-items-center">
                <i className="bi bi-envelope-fill"></i>
                <a href="mailto:support@hfu.co">support@hfu.co.th</a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <h4 className="fw-bold fs-5 mb-4">Products</h4>
            <ul className="list-unstyled space-y-3">
              <li>
                <a href="#">Queue Management</a>
              </li>
              <li>
                <a href="#">Appointment System</a>
              </li>
              <li>
                <a href="#">Analytics Dashboard</a>
              </li>
              <li>
                <a href="#">Mobile App</a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <h4 className="fw-bold fs-5 mb-4">Company</h4>
            <ul className="list-unstyled space-y-3">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">
                  Careers
                </a>
              </li>
              <li>
                <a href="#">Blog & News</a>
              </li>
              <li>
                <a href="#">Our Vision</a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-4 col-lg-4 mt-4 mt-md-0">
            <h4 className="fw-bold fs-5 mb-4">Support & Legal</h4>
            <ul className="list-unstyled space-y-3">
              <li>
                <a href="#">Help Center (FAQ)</a>
              </li>
              <li>
                <a href="#">API Documentation</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-top border-secondary-subtle pt-4 mt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-light opacity-50 small mb-3 mb-md-0">
            &copy; 2025 HFU Healthcare Technologies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
