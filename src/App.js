import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
// import { AuthProvider } from "./components/AuthContext/AuthContext.js";
import { setAuth } from "./features/authSlice";
import { useDispatch } from 'react-redux';
import "./App.css";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from 'jwt-decode';
export default function App() {
  const dispatch = useDispatch();

 useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(setAuth({ authId: decoded.id, role: decoded.role, maNhanSu: decoded.maNhanSu }));
        localStorage.setItem("maNhanSu", decoded.maNhanSu);

      } catch (error) {
        console.error("Token không hợp lệ:", error);
      }
    }
  }, [dispatch]);
  return (
    <div className="App">
      {/* <AuthProvider> */}
      <ToastContainer />
      <AppRoutes />
      {/* </AuthProvider> */}
    </div>
  );
}

