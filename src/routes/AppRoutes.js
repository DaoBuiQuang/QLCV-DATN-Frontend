import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Header from "../components/Header";
import MenuLeft from "../components/MenuLeft";
import ListCustomer from "../containers/Customer/ListCustomer";
import Login from "../containers/Auth/Login";
import StaffList from "../containers/Staff/StaffList";
import StaffAdd from "../containers/Staff/StaffAdd";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <MenuLeft />
      <div className="flex flex-col flex-1">
        <Header />
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
        </Route>
        <Route path="/login" element={<Login />} />
      
      </Routes>
    </Router>
  );
};

export default AppRoutes;
