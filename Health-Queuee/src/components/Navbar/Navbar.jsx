import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { User, LogOut, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavigationBar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const PRIMARY_BLUE = "#0040FF";
  const DARK_BLUE = "#020A1B";

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    setCurrentUser(null);
    navigate("/login");
    console.log ("isLoggedIn ===>", localStorage.getItem("isLoggedIn"));
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const displayName = currentUser
    ? currentUser.fullname || currentUser.name || currentUser.email
    : null;

  return (
    <header
      className="py-3 shadow-lg sticky-top"
      style={{ backgroundColor: DARK_BLUE, backdropFilter: "blur(12px)" }}
    >
      <div className="container d-flex align-items-center justify-content-between">
        
        {/* --- ส่วน Logo --- */}
        <div
          className="d-flex align-items-center gap-3"
          role="button"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <div
            className="d-flex align-items-center justify-content-center bg-primary rounded-3"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: PRIMARY_BLUE,
            }}
          >
            <span className="text-white fw-bold fs-4">H</span>
          </div>
          <div>
            <h1
              className="text-white fw-bold mb-0"
              style={{ fontSize: "2rem" }}
            >
              HFU
            </h1>
          </div>
        </div>

        <nav
          className="d-none d-md-flex align-items-center gap-4 "
          style={{
            marginLeft: "10px",
            cursor: "pointer",
          }}
        >
          <a
            onClick={() => navigate("/hospitals")}
            className="text-light text-decoration-none opacity-75 hover-opacity-100"
          >
            {t("nav_appointment")}
          </a>
          <a
            onClick={() => navigate("/doctors")}
            className="text-light text-decoration-none opacity-75 hover-opacity-100"
          >
            {t("nav_doctors")}
          </a>
          {/* <a
            onClick={() => navigate("/packages")}
            className="text-light text-decoration-none opacity-75 hover-opacity-100"
          >
            {t("nav_packages")}
          </a> */}
          <a
            onClick={() => navigate("/chatbot")}
            className="text-light text-decoration-none opacity-75 hover-opacity-100"
          >
            {t("nav_chatbot")}
          </a>
        </nav>

        {/* --- ส่วนขวา: ปุ่มเปลี่ยนภาษา + User Profile --- */}
        <div className="d-flex align-items-center gap-3">
          

          {/* User Profile Dropdown */}
          {currentUser ? (
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="primary"
                id="user-menu"
                className="d-flex align-items-center gap-2 px-3 py-2 fw-semibold"
                style={{ backgroundColor: PRIMARY_BLUE, borderColor: PRIMARY_BLUE }}
              >
                <User size={18} />
                {displayName || t("user_account")}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {(currentUser?.role === "admin" ||
                  currentUser?.role === "super_admin") && (
                  <Dropdown.Item
                    onClick={() => navigate("/admin/dashboard")}
                    className="d-flex align-items-center gap-2 fw-semibold text-warning"
                  >
                    <Shield size={16} />
                    {t("admin_dashboard")}
                  </Dropdown.Item>
                )}

                <Dropdown.Item
                  onClick={() => navigate("/Profile")}
                  className="d-flex align-items-center gap-2"
                >
                  <User size={16} />
                  {t("view_profile")}
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item
                  className="d-flex align-items-center gap-2 text-danger"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  {t("logout")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <button
              className="btn btn-primary px-4 py-2 fw-semibold"
              onClick={() => navigate("/login")}
              style={{ backgroundColor: PRIMARY_BLUE, borderColor: PRIMARY_BLUE }}
            >
              {t("btn_login")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}