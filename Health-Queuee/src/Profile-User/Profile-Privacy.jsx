import { useState } from "react";
import { User, CreditCard, Calendar, Lock, Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePrivacy() {
  const [formData, setFormData] = useState({
    phone: "เบอร์โทรศัพท์",
    title: "นาย",
    firstName: "ประหยัด",
    lastName: "จันทร์โทรลา",
    nationalId: "1100897576431",
    birthDate: "2548-10-20",
    gender: "ชาย",
    email: "Prayard@gmail.com",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birth = new Date(birthdate);

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

    const navigate = useNavigate();

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
                className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3">
                  <User size={20} />
                  <span>โปรไฟล์ของคุณ</span>
                </button>

                <button 
                onClick={() => navigate("/ProfileBook")}
                className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3">
                  <CreditCard size={20} />
                  <span>นัดหมาย</span>
                </button>

                <button 
                onClick={() => navigate("/ProfileHistory")}
                className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3">
                  <Calendar size={20} />
                  <span>ประวัติการรักษา</span>
                </button>

                <button className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3">
                  <Shield size={20} />
                  <span>จัดการข้อมูลส่วนบุคคล</span>
                </button>
              </div>

              <div className="card-footer bg-white border-top p-3">
                <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2">
                  <LogOut size={18} />
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
        <form onSubmit="user-Profile">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-lg-5">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-medium text-secondary">
                      การจัดการข้อมูลส่วนบุคคล
                    </label>
                    <div className="fs-5 fw-semibold text-success">
                      เปลี่ยนรหัสผ่าน
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-medium text-secondary">
                      รหัสผ่านปัจจุบัน
                    </label>
                    <input
                      type="text"
                      name="Current-Password"
                      className="form-control"
                      placeholder="Current Password"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-medium text-secondary">
                      รหัสผ่านใหม่
                    </label>
                    <input
                      type="text"
                      name="New-Password"
                      className="form-control"
                      placeholder="New Password"
                    />
                  </div>                  

                  <div className="mb-4">
                    <input
                      type="text"
                      name="Confirm-Password"
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                  </div>

                  <div className="d-flex justify-content-end mt-5">
                    <button
                      type="submit"
                      className="btn btn-success px-5 py-2 fw-medium"
                    >
                      บันทึก
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </form>

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
