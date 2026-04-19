import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HealthcarePage from "./components/HealthcarePage";
import Listsearch from "./components/Hospital-Search/listsearch";
import Queue1 from "./components/Hospital-Search/Queue1";
import Login2 from "./Login-Pages/login2";

import Queue2 from "./components/Hospital-Search/Queue2";
import Queue3 from "./components/Hospital-Search/Queue3";
import Queue4 from "./components/Hospital-Search/Queue4";
import Testdata from "./components/Hospital-Search/testdata";
import Profile from "../src/Profile-User/Profile";
import ProfileBook from "../src/Profile-User/Profile-book";
import ChatBot from "../src/components/ChatBot/ChatBot"

// Context
import { HospitalScheduleProvider } from "./data/context/allSchedule";
import { UserAppointmentProvider } from "./data/context/appointment";


import Adminlayout from "../Layout/Adminlayout"
import AdminDashboard from "../pages/Dashboard";
import AdminExport from "../pages/Export";
import AdminTracking from "../pages/Tracking";
import AdminDataManagement from "../pages/Manage";
import AdminPatients from "../pages/ManagePatients";
import Register2 from "./Login-Pages/register2";
import OTPVerify from "./login-Pages/otpverify";
import ProfileHistory from "./Profile-User/Profile-History";
import ProfilePrivacy from "./Profile-User/Profile-Privacy";
import DoctorList from "./Doctor-List/Doctor-List";
import Layout from "./components/Layout/Layout";
// import PackagePage from "./components/aom/PackagePage";
function App() {
  return (
    <HospitalScheduleProvider>
      <UserAppointmentProvider>
        <BrowserRouter basename="/Final-Project2-Frontendd/">
          <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HealthcarePage />} />
            <Route path="hospitals" element={<Listsearch />} />
            <Route path="queue1" element={<Queue1 />} />
            {/* <Route path="login" element={<Login2 />} /> */}
            {/* <Route path="register" element={<Register2 />} /> */}
            <Route path="queue2" element={<Queue2 />} />
            <Route path="queue3" element={<Queue3 />} />
            <Route path="queue4" element={<Queue4 />} />
            <Route path="testdata" element={<Testdata />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profilebook" element={<ProfileBook />} />
            <Route path="profileHistory" element={<ProfileHistory />} />
            <Route path="profilePrivacy" element={<ProfilePrivacy />} />
            <Route path="doctors" element={<DoctorList />} />
            <Route path="chatbot" element={<ChatBot/> } />
          </Route>

          <Route>
            <Route path="/login" element={<Login2 />} />
            <Route path="/register" element={<Register2 />} />
            <Route path="/otpverify" element={<OTPVerify />} />
          </Route>

            <Route element={<Adminlayout />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

              <Route path="/admin/export" element={<AdminExport />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/tracking" element={<AdminTracking />} />
              <Route path="/admin/resources" element={<AdminDataManagement />} />
              <Route path="/admin/users" element={<AdminPatients />} />
            </Route>
            </Routes>
        </BrowserRouter>
      </UserAppointmentProvider>
    </HospitalScheduleProvider>
  );
}

export default App;
