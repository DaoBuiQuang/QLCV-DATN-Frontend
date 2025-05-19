import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
// import { AuthProvider } from "./components/AuthContext/AuthContext.js";
import { setAuth } from "./features/authSlice";
import { useDispatch } from 'react-redux';
import "./App.css";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import { messaging, getToken, onMessage } from './firebase';
import NotificationPopup from "./containers/Notification/NotificationPopup";
import { triggerNotificationRefresh } from "./features/notificationSlice";
export default function App() {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(null);
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
    const registerFCMToken = async (token) => {
      try {
        const maNhanSu = localStorage.getItem("maNhanSu");
        if (!maNhanSu) {
          console.warn("Không có mã nhân sự, không gửi FCM token");
          return;
        }

        await axios.post("http://localhost:3000/api/save-token", {
          maNhanSu,
          token,
        });
        console.log("FCM token đã gửi lên server!");
      } catch (error) {
        console.error("Lỗi khi gửi token lên server:", error);
      }
    };

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging, {
          vapidKey: "BO8l5RV8jUti5DfRNG6DVGNpAqkQUH8wCxZETSVjCfBA3awtoq-QOwUqeM2tvFKXBNtrfW1WjKCxicXLt-VSPK0",
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("FCM Token:", currentToken);
              registerFCMToken(currentToken); // Gửi token lên backend
            } else {
              console.log("Không có token FCM khả dụng.");
            }
          })
          .catch((err) => {
            console.error("Lỗi khi lấy FCM token:", err);
          });
      } else {
        console.warn("Người dùng từ chối nhận thông báo.");
      }
    });
    onMessage(messaging, (payload) => {
      console.log("📨 Đã nhận được thông báo:", payload);
      const { title, body } = payload.notification;
      dispatch(triggerNotificationRefresh());
      setNotification({ title, body });
    });
  }, []);
  return (
    <div className="App">
      {/* <AuthProvider> */}
      <ToastContainer />
      <AppRoutes />
      {notification && (
        <NotificationPopup
          title={notification.title}
          body={notification.body}
          onClose={() => setNotification(null)}
        />
      )}
      {/* </AuthProvider> */}
    </div>
  );
}

