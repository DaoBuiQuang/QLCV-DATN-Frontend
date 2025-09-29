import React, { useState, useEffect } from "react";
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
import BrandList from "../containers/Brand/BrandList";
import BrandAdd from "../containers/Brand/BrandAdd";
import BrandEdit from "../containers/Brand/BrandEdit";
import BrandDetail from "../containers/Brand/BrandDetail";
import ProductAndServicesEdit from "../containers/ProductAndServices/ProductAndServicesEdit";
import ProductAndServicesList from "../containers/ProductAndServices/ProductAndServicesList";
import ProductAndServicesAdd from "../containers/ProductAndServices/ProductAndServicesAdd";
import ProductAndServicesDetail from "../containers/ProductAndServices/ProductAndServicesDetail";
import JobEdit from "../containers/Job/JobEdit";
import JobDetail from "../containers/Job/JobDetail";
import ChangePassword from "../containers/Auth/ChangePassword";
import Profile from "../containers/Auth/Profile";
import NotificationDetail from "../containers/Notification/NotificationDetail";
import Dashboard from "../containers/Dashboard/Dashboard";
import ApplicationDetailTest from "../containers/Application/ApplicationDetailTest";
import NotificationPopup from "../containers/Notification/NotificationPopup";
import DashboardApplications from "../containers/Dashboard/DashboardApplication";
import DashboardCountry from "../containers/Dashboard/DashboardCountry";
import DashboardPartner from "../containers/Dashboard/DashboardPartner";
import { Home, Upload } from "lucide-react";
import ExcelUpload from "../containers/UploadExcel/UploadExcel";
import ApplicationDetail_KH from "../containers/Application_KH/ApplicationDetail_KH.js";
import ApplicationList_KH from "../containers/Application_KH/ApplicationList_KH";
import ApplicationAdd_KH from "../containers/Application_KH/ApplicationAdd_KH";
import ApplicationEdit_KH from "../containers/Application_KH/ApplicationEdit_KH";
import ApplicationKD_VNList from "../containers/ApplicationKD_VN/ApplicationKD_VNList.js";
import ApplicationKD_VNAdd from "../containers/ApplicationKD_VN/ApplicationKD_VNAdd.js";
import ApplicationKD_VNEdit from "../containers/ApplicationKD_VN/ApplicationKD_VNEdit.js";
import ApplicationKD_VNDetail from "../containers/ApplicationKD_VN/ApplicationKD_VNDetail.js";
import Application_GH_VNList from "../containers/Application_GH_NH_VN/Application_GH_NH_VNList.js";
import Application_GH_VNAdd from "../containers/Application_GH_NH_VN/Application_GH_NH_VNAdd.js";
import Application_GH_NH_VNAdd from "../containers/Application_GH_NH_VN/Application_GH_NH_VNAdd.js";
import Application_GH_NH_VNList from "../containers/Application_GH_NH_VN/Application_GH_NH_VNList.js";
import Application_GH_NH_VNEdit from "../containers/Application_GH_NH_VN/Application_GH_NH_VNEdit.js";
import Application_GH_NH_VNDetail from "../containers/Application_GH_NH_VN/Application_GH_NH_VNDetail.js";
import VuViec_BillList from "../containers/Bill/VuViec_BillList.js";
import DebitNoteAdd from "../containers/DebitNote/debitNoteAdd.js";
import HomePage from "../containers/Home/HomePage.js";
import Application_SD_NH_VNAdd from "../containers/Application_SD_NH_VN/Application_SD_NH_VNAdd.js";
import Application_TD_NH_VNAdd from "../containers/Application_TD_NH_VN/Application_TD_NH_VNAdd.js";
import DebitNoteList from "../containers/DebitNote/debitNoteList.js";
import DebitNoteDetail from "../containers/DebitNote/debitNoteDetail.js";
import Case_KHList from "../containers/Case/Case_KHList.js";
import VuViec_Bill_KHList from "../containers/Bill/VuViec_Bill_KHList.js";
import DebitNote_KHList from "../containers/DebitNote/debitNote_KHList.js";
import VuViec_BillChuaDuyetList from "../containers/Bill/VuViec_BillChuaDuyetList.js";
import VuViec_Bill_KHChuaDuyetList from "../containers/Bill/VuViec_Bill_KHChuaDuyetList.js";
import VuViec_Bill_VN_FullList from "../containers/Bill/VuViec_Bill_VN_FullList.js";
import VuViec_BillBiTuChoiList from "../containers/Bill/VuViec_BillBiTuChoiList.js";
import DebitNoteEdit from "../containers/DebitNote/detailNoteEdit.js";
import VuViec_Bill_KH_FullList from "../containers/Bill/VuViec_Bill_KH_FullList.js";
import VuViec_Bil_KHBiTuChoiList from "../containers/Bill/VuViec_Bil_KHBiTuChoiList.js";
import GCN_NH_VNList from "../containers/GCN_NH_VN/GCN_NH_VNList.js";
import GCN_NH_VNDetail from "../containers/GCN_NH_VN/GCN_NH_VNDetail.js";
import GCN_NH_VNAdd from "../containers/GCN_NH_VN/GCN_NH_VNAdd.js";

const MainLayout = ({ notification, setNotification }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMenuOpen(false);
      } else {
        setIsMenuOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-x-hidden">
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-md transform transition-transform duration-300 
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <MenuLeft />
      </div>

      <div className={`flex flex-col flex-1 transition-all duration-300 ${isMenuOpen ? "ml-[280px]" : "ml-0"}`}>
        <Header
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
        />
        <main
          className="flex-1 p-4 bg-gray-100"
          style={{
            width: window.innerWidth >= 1024
              ? (isMenuOpen ? 'calc(100vw - 280px)' : '100vw')
              : '100vw'
          }}
        >
          <Outlet />
        </main>
        {notification && (
          <NotificationPopup
            title={notification.title}
            body={notification.body}
            id={notification.id}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </div>
  );
};
const AppRoutes = ({ notification, setNotification }) => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout notification={notification} setNotification={setNotification} />}>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/customerlist" element={<CustomerList />} />
          <Route path="/customeradd" element={<CustomerAdd></CustomerAdd>} />
          <Route path="/customeredit/:id" element={<CustomerEdit></CustomerEdit>} />
          <Route path="/customerdetail/:id" element={<CustomerDetail></CustomerDetail>} />

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
          <Route path="/jobedit/:maNganhNghe" element={<JobEdit></JobEdit>} />
          <Route path="/jobdetail/:maNganhNghe" element={<JobDetail></JobDetail>} />

          <Route path="/partnerlist" element={<PartnerList></PartnerList>} />
          <Route path="/partneradd" element={<PartnerAdd></PartnerAdd>} />
          <Route path="/partneredit/:id" element={<PartnerEdit></PartnerEdit>} />
          <Route path="/partnerdetail/:id" element={<PartnerDetail></PartnerDetail>} />

          <Route path="/casetypelist" element={<CaseTypeList></CaseTypeList>} />
          <Route path="/casetypeadd" element={<CaseTypeAdd></CaseTypeAdd>} />
          <Route path="/casetypeedit/:maLoaiVuViec" element={<CaseTypeEdit></CaseTypeEdit>} />
          <Route path="/casetypedetail/:maLoaiVuViec" element={<CaseTypeDetail></CaseTypeDetail>} />

          <Route path="/caselist" element={<CaseList></CaseList>} />
          <Route path="/caseadd" element={<CaseAdd></CaseAdd>} />
          <Route path="/caseedit/:id" element={<CaseEdit></CaseEdit>} />
          <Route path="/casedetail/:id" element={<CaseDetail></CaseDetail>} />

          <Route path="/applicationtypelist" element={<ApplicationTypeList></ApplicationTypeList>} />
          <Route path="/applicationtypeadd" element={<ApplicationTypeAdd></ApplicationTypeAdd>} />
          <Route path="/applicationtypeedit/:maLoaiDon" element={<ApplicationTypeEdit></ApplicationTypeEdit>} />
          <Route path="/applicationtypedetail/:maLoaiDon" element={<ApplicationTypeDetail></ApplicationTypeDetail>} />

          <Route path="/applicationlist" element={<ApplicationList></ApplicationList>} />
          <Route path="/applicationadd/:maHoSoVuViec" element={<ApplicationAdd></ApplicationAdd>} />
          <Route
            path="/applicationadd/:maHoSoVuViec/:id"
            element={<ApplicationAdd />}
          />
          <Route path="/applicationadd" element={<ApplicationAdd />} />
          <Route path="/applicationedit/:maDonDangKy" element={<ApplicationEdit></ApplicationEdit>} />
          {/* <Route path="/applicationdetail/:maDonDangKy" element={<ApplicationDetail></ApplicationDetail>} /> */}
          <Route path="/applicationdetail/:maDonDangKy" element={<ApplicationDetailTest></ApplicationDetailTest>} />
          <Route path="/applicationdetail/:soDon" element={<ApplicationDetailTest></ApplicationDetailTest>} />

          <Route path="/brandlist" element={<BrandList></BrandList>} />
          <Route path="/brandadd" element={<BrandAdd></BrandAdd>} />
          <Route path="/brandedit/:maNhanHieu" element={<BrandEdit></BrandEdit>} />
          <Route path="/branddetail/:maNhanHieu" element={<BrandDetail></BrandDetail>} />

          <Route path="/productandserviceslist" element={<ProductAndServicesList></ProductAndServicesList>} />
          <Route path="/productandservicesadd" element={<ProductAndServicesAdd></ProductAndServicesAdd>} />
          <Route path="/productandservicesedit/:maSPDV" element={<ProductAndServicesEdit></ProductAndServicesEdit>} />
          <Route path="/productandservicesdetail/:maSPDV" element={<ProductAndServicesDetail></ProductAndServicesDetail>} />

          <Route path="/changepassword" element={<ChangePassword></ChangePassword>} />
          <Route path="/profile" element={<Profile></Profile>} />

          <Route path="/notificationdetail/:id" element={<NotificationDetail></NotificationDetail>} />
          <Route path="/dashboard" element={<Dashboard></Dashboard>} />
          {/* <Route path="/" element={<DashboardApplications />} /> */}

          <Route path="/dashboard/application" element={<DashboardApplications />} />
          <Route path="/dashboard/country" element={<DashboardCountry />} />
          <Route path="/dashboard/partner" element={<DashboardPartner />} />
          <Route path="/upload" element={<ExcelUpload></ExcelUpload>} />

          <Route path="/applicationlist_kh" element={<ApplicationList_KH></ApplicationList_KH>} />
          <Route path="/applicationadd_kh/:maHoSoVuViec" element={<ApplicationAdd_KH></ApplicationAdd_KH>} />
          <Route
            path="/applicationadd_kh/:maHoSoVuViec/:id"
            element={<ApplicationAdd_KH />}
          />
          <Route
            path="/applicationadd_kh"
            element={<ApplicationAdd_KH />}
          />
          <Route path="/applicationedit_kh/:maDonDangKy" element={<ApplicationEdit_KH></ApplicationEdit_KH>} />
          <Route path="/applicationdetail_kh/:maDonDangKy" element={<ApplicationDetail_KH></ApplicationDetail_KH>} />

          <Route path="/application_kdlist_vn" element={<ApplicationKD_VNList></ApplicationKD_VNList>} />
          <Route path="/application_kdadd_vn/:maHoSoVuViec/:id" element={<ApplicationKD_VNAdd></ApplicationKD_VNAdd>} />
          <Route path="/application_kdedit_vn/:maDonDangKy" element={<ApplicationKD_VNEdit></ApplicationKD_VNEdit>} />
          <Route path="/application_kddetail_vn/:maDonDangKy" element={<ApplicationKD_VNDetail></ApplicationKD_VNDetail>} />

          <Route path="/application_gh_nh_vn_list" element={<Application_GH_NH_VNList></Application_GH_NH_VNList>} />
          <Route path="/application_gh_nh_vn_add" element={<Application_GH_NH_VNAdd></Application_GH_NH_VNAdd>} />
          <Route path="/application_gh_nh_vn_edit/:maDonGiaHan" element={<Application_GH_NH_VNEdit></Application_GH_NH_VNEdit>} />
          <Route path="/application_gh_nh_vn_detail/:maDonGiaHan" element={<Application_GH_NH_VNDetail></Application_GH_NH_VNDetail>} />

          <Route path="/application_sd_nh_vn_list" element={<Application_GH_VNList></Application_GH_VNList>} />
          <Route path="/application_sd_nh_vn_add/:maDonDangKy" element={<Application_SD_NH_VNAdd></Application_SD_NH_VNAdd>} />
          <Route path="/application_td_nh_vn_add/:maDonDangKy" element={<Application_TD_NH_VNAdd></Application_TD_NH_VNAdd>} />

          <Route path="/vuviec_bill" element={<VuViec_Bill_VN_FullList></VuViec_Bill_VN_FullList>} />
          <Route path="/vuviec_bill_da_duyet" element={<VuViec_BillList></VuViec_BillList>} />
          <Route path="/vuviec_bill_kh" element={<VuViec_Bill_KH_FullList></VuViec_Bill_KH_FullList>} />
          <Route path="/vuviec_bill_kh_da_duyet" element={<VuViec_Bill_KHList></VuViec_Bill_KHList>} />
          <Route path="/vuviec_bill_chua_duyet" element={<VuViec_BillChuaDuyetList></VuViec_BillChuaDuyetList>} />
          <Route path="/vuviec_bill_kh_chua_duyet" element={<VuViec_Bill_KHChuaDuyetList></VuViec_Bill_KHChuaDuyetList>} />

          <Route path="/vuviec_bill_tu_choi" element={<VuViec_BillBiTuChoiList></VuViec_BillBiTuChoiList>} />
          <Route path="/vuviec_bill_kh_tu_choi" element={<VuViec_Bil_KHBiTuChoiList></VuViec_Bil_KHBiTuChoiList>} />

          <Route path="/debitnote_add" element={<DebitNoteAdd></DebitNoteAdd>} />
          <Route path="/debitnote_list" element={<DebitNoteList></DebitNoteList>} />
          <Route path="/debitnote_kh_list" element={<DebitNote_KHList></DebitNote_KHList>} />
          <Route path="/debitnote_detail/:id" element={<DebitNoteDetail></DebitNoteDetail>} />
          <Route path="/debitnote_edit/:id" element={<DebitNoteEdit></DebitNoteEdit>} />

          <Route path="/case_khlist" element={<Case_KHList></Case_KHList>} />
          <Route path="/gcn_nhlist" element={<GCN_NH_VNList></GCN_NH_VNList>} />
          <Route path="/gcn_nhdetail/:id" element={<GCN_NH_VNDetail></GCN_NH_VNDetail>} />
          <Route path="/gcn_nhadd" element={<GCN_NH_VNAdd></GCN_NH_VNAdd>} />
        </Route>
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
