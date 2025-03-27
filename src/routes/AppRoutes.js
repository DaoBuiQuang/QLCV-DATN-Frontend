import React, {useState} from "react";
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

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mặc định hiển thị

  return (
    <div className="flex h-screen">
      {/* Sidebar có hiệu ứng trượt vào/ra */}
      <div
        className={`fixed top-0 left-0 h-full w-56 bg-white shadow-md transform transition-transform duration-300 
        ${isMenuOpen ? "translate-x-0" : "-translate-x-56"} lg:translate-x-0 lg:relative`}
      >
        <MenuLeft />
      </div>

      <div className="flex flex-col flex-1">
        {/* Truyền hàm toggle xuống Header */}
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
        <Route  element={<MainLayout />}>
          <Route path="/" element={<ListCustomer />} />


          <Route path="/stafflist" element={<StaffList />} />
          <Route path="/staffadd" element={<StaffAdd></StaffAdd>}/>

          <Route path="/countrylist" element={<CountryList></CountryList>}/>
          <Route path="/countryadd" element={<CountryAdd></CountryAdd>}/>
          <Route path="/countryedit/:maQuocGia" element={<CountryEdit></CountryEdit>}/>
          <Route path="/countrydetail/:maQuocGia" element={<CountryDetail></CountryDetail>}/>
        </Route>
        <Route path="/login" element={<Login />} />
      
      </Routes>
    </Router>
  );
};

export default AppRoutes;
