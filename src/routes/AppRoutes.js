import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Header from "../components/Header";
import MenuLeft from "../components/MenuLeft";
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
import CustomerList from "../containers/Customer/CustomerList";
import CustomerAdd from "../containers/Customer/CustomerAdd";
import CustomerEdit from "../containers/Customer/CustomerEdit";
import CustomerDetail from "../containers/Customer/CustomerDetail";
import CaseTypeList from "../containers/CaseType/CaseTypeList";
import CaseTypeAdd from "../containers/CaseType/CaseTypeAdd";
import CaseTypeEdit from "../containers/CaseType/CaseTypeEdit";
import CaseTypeDetail from "../containers/CaseType/CaseTypeDetail";
import StaffEdit from "../containers/Staff/StaffEdit";
import StaffDetail from "../containers/Staff/StaffDetail";
import RegisterStaff from "../containers/Auth/RegisterStaff";
import CaseList from "../containers/Case/CaseList";
import CaseAdd from "../containers/Case/CaseAdd";
import CaseEdit from "../containers/Case/CaseEdit";
import CaseDetail from "../containers/Case/CaseDetail";
import ApplicationTypeList from "../containers/ApplicationType/ApplicationTypeList";
import ApplicationTypeAdd from "../containers/ApplicationType/ApplicationTypeAdd";
import ApplicationTypeEdit from "../containers/ApplicationType/ApplicationTypeEdit";
import ApplicationTypeDetail from "../containers/ApplicationType/ApplicationTypeDetail";
import ApplicationList from "../containers/Application/ApplicationList";
import ApplicationAdd from "../containers/Application/ApplicationAdd";
import ApplicationEdit from "../containers/Application/ApplicationEdit";
import ApplicationDetail from "../containers/Application/ApplicationDetail";

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="flex h-screen">
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
        <Route element={<MainLayout />}>
          <Route path="/" element={<CustomerList />} />
          <Route path="/customeradd" element={<CustomerAdd></CustomerAdd>} />
          <Route path="/customeredit/:maKhachHang" element={<CustomerEdit></CustomerEdit>} />
          <Route path="/customerdetail/:maKhachHang" element={<CustomerDetail></CustomerDetail>} />

          <Route path="/stafflist" element={<StaffList />} />
          <Route path="/staffadd" element={<StaffAdd></StaffAdd>} />
          <Route path="/staffedit/:maNhanSu" element={<StaffEdit></StaffEdit>} />
          <Route path="/staffdetail/:maNhanSu" element={<StaffDetail></StaffDetail>} />
          <Route path="/registerstaff/:maNhanSu" element={<RegisterStaff></RegisterStaff>} />

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

          <Route path="/casetypelist" element={<CaseTypeList></CaseTypeList>} />
          <Route path="/casetypeadd" element={<CaseTypeAdd></CaseTypeAdd>} />
          <Route path="/casetypeedit/:maLoaiVuViec" element={<CaseTypeEdit></CaseTypeEdit>} />
          <Route path="/casetypedetail/:maLoaiVuViec" element={<CaseTypeDetail></CaseTypeDetail>} />

          <Route path="/caselist" element={<CaseList></CaseList>} />
          <Route path="/caseadd" element={<CaseAdd></CaseAdd>} />
          <Route path="/caseedit/:maHoSoVuViec" element={<CaseEdit></CaseEdit>} />
          <Route path="/casedetail/:maHoSoVuViec" element={<CaseDetail></CaseDetail>} />

          <Route path="/applicationtypelist" element={<ApplicationTypeList></ApplicationTypeList>} />
          <Route path="/applicationtypeadd" element={<ApplicationTypeAdd></ApplicationTypeAdd>} />
          <Route path="/applicationtypeedit/:maLoaiDon" element={<ApplicationTypeEdit></ApplicationTypeEdit>} />
          <Route path="/applicationtypedetail/:maLoaiDon" element={<ApplicationTypeDetail></ApplicationTypeDetail>} />

          <Route path="/applicationlist" element={<ApplicationList></ApplicationList>} />
          <Route path="/applicationadd" element={<ApplicationAdd></ApplicationAdd>} />
          <Route path="/applicationedit/:maDonDangKy" element={<ApplicationEdit></ApplicationEdit>} />
          <Route path="/applicationdetail/:maDonDangKy" element={<ApplicationDetail></ApplicationDetail>} />
        </Route>
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
