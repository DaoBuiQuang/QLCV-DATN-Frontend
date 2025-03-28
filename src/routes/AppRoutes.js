import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Header from "../components/Header";
import MenuLeft from "../components/MenuLeft";
import ListCustomer from "../containers/Customer/ListCustomer";
import Login from "../containers/Auth/Login";
import StaffList from "../containers/Staff/StaffList";
import StaffAdd from "../containers/Staff/StaffAdd";
import CountryList from "../containers/Country/CountryList";
import CountryAdd from "../containers/Country/CountryAdd";
import CountryEdit from "../containers/Country/CountryEdit";
import CountryDetail from "../containers/Country/CountryDetail";
import JobList from "../containers/Job/JobList";
import JobAdd from "../containers/Job/JobAdd";
import PartnerList from "../containers/Partner/PartnerList";
import PartnerAdd from "../containers/Partner/PartnerAdd";
import PartnerEdit from "../containers/Partner/PartnerEdit";
import PartnerDetail from "../containers/Partner/PartnerDetail";

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar có hiệu ứng trượt vào/ra */}
      <div
        className={`fixed top-0 left-0 h-full w-56 bg-white shadow-md transform transition-transform duration-300 
        ${isMenuOpen ? "translate-x-0" : "-translate-x-56"}`}
      >
        <MenuLeft />
      </div>

      <div className={`flex flex-col flex-1 transition-all duration-300 ${isMenuOpen ? "ml-56" : "ml-0"}`}>
        <Header toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
        <main className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Bọc layout chung */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<ListCustomer />} />


          <Route path="/stafflist" element={<StaffList />} />
          <Route path="/staffadd" element={<StaffAdd></StaffAdd>} />

          <Route path="/countrylist" element={<CountryList></CountryList>} />
          <Route path="/countryadd" element={<CountryAdd></CountryAdd>} />
          <Route path="/countryedit/:maQuocGia" element={<CountryEdit></CountryEdit>} />
          <Route path="/countrydetail/:maQuocGia" element={<CountryDetail></CountryDetail>} />

          <Route path="/joblist" element={<JobList></JobList>} />
          <Route path="/jobadd" element={<JobAdd></JobAdd>} />

          <Route path="/partnerlist" element={<PartnerList></PartnerList>} />
          <Route path="/partneradd" element={<PartnerAdd></PartnerAdd>} />
          <Route path="/partneredit/:maDoiTac" element={<PartnerEdit></PartnerEdit>} />
          <Route path="/partnerdetail/:maDoiTac" element={<PartnerDetail></PartnerDetail>} />
        </Route>
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
