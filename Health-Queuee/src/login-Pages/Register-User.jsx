export default function RegisterPage() {
  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row g-0 h-100">
        <div
          className="col-md-6 text-white d-none d-md-flex flex-column justify-content-between p-5"
          style={{
            backgroundImage: "url('./images/login-bg.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div>
            {/* <h3 className="mb-5" style={{ marginTop: "-50px" }}>
              <img src="./images/HFU-Logo.png" alt="HFU" className="h-48 w-auto " />
            </h3> */}
          </div>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center p-5">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h2 className="mb-4">สมัครสมาชิก</h2>

            <form>
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label fw-semibold">
                  ชื่อ-นามสกุล
                </label>
                <input type="text" className="form-control" id="fullname" placeholder="ชื่อ-นามสกุล" />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email
                </label>
                <input type="email" className="form-control" id="email" placeholder="อีเมล" />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label fw-semibold">
                  เบอร์โทรศัพท์
                </label>
                <input type="tel" className="form-control" id="phone" placeholder="เบอร์โทรศัพท์" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <input type="password" className="form-control" id="password" placeholder="รหัสผ่าน" />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label fw-semibold">
                  Confirm Password
                </label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="ยืนยันรหัสผ่าน" />
              </div>

              <div className="mb-4">
                <button type="submit" className="btn btn-primary w-100">
                  สมัครสมาชิก
                </button>
              </div>

              <div className="mb-4 text-center">
                <small>
                  มีบัญชีอยู่แล้ว?{" "}
                  <a href="#" className="text-primary text-decoration-none">
                    เข้าสู่ระบบ
                  </a>
                </small>
              </div>

              <div className="mb-3">
                <p className="text-center mb-3">หรือ เข้าสู่ระบบด้วย</p>
                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-light border d-flex align-items-center justify-content-center gap-2 py-2"
                    style={{ borderRadius: "8px" }}
                  >
                    <img
                      src="./images/facebook-logo.png"
                      alt="Facebook"
                      style={{ width: "24px", height: "24px" }}
                    />
                    <span className="fw-semibold text-dark">หมายเลขประจำตัวผู้ป่วย</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light border d-flex align-items-center justify-content-center gap-2 py-2"
                    style={{ borderRadius: "8px" }}
                  >
                    <img
                      src="./images/google-logo.png"
                      alt="Google"
                      style={{ width: "24px", height: "24px" }}
                    />
                    <span className="fw-semibold text-dark">เบอร์โทร</span>
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5 text-center">
              <small className="text-muted">ติดต่อสอบถาม:</small>
              <div className="mt-2">
                <i className="bi bi-telephone me-2"></i>
                <span>+66 1234 5678</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
