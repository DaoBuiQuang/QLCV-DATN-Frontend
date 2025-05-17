import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
// import { AuthProvider } from "./components/AuthContext/AuthContext.js";
import { setAuth } from "./features/authSlice";
import { useDispatch } from 'react-redux';
import "./App.css";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from 'jwt-decode';
import { messaging, getToken, onMessage } from './firebase';
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
  useEffect(() => {
    debugger
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        getToken(messaging, { vapidKey: 'BO8l5RV8jUti5DfRNG6DVGNpAqkQUH8wCxZETSVjCfBA3awtoq-QOwUqeM2tvFKXBNtrfW1WjKCxicXLt-VSPK0' }) // lấy từ Firebase Console
          .then((currentToken) => {
            if (currentToken) {
              console.log('Token:', currentToken);
            } else {
              console.log('No token available');
            }
          }).catch(err => console.error('An error occurred while retrieving token. ', err));
      }
    });
    // Lắng nghe khi có tin nhắn
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // Hiển thị thông báo nếu cần
    });
  }, []);
  return (
    <div className="App">
      {/* <AuthProvider> */}
      <ToastContainer />
      <AppRoutes />
      {/* </AuthProvider> */}
    </div>
  );
}

