// src/components/NotificationDropdown.jsx
import { useEffect, useRef, useState } from "react";
import callAPI from "../utils/api";
import dayjs from "dayjs"; // Cần cài thư viện này: npm install dayjs
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const NotificationDropdown = () => {
  const refreshTrigger = useSelector((state) => state.notification.refreshTrigger);
  console.log("refreshTrigger", refreshTrigger);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotifications(); 
    }, 1000);
    return () => clearTimeout(timer);
  }, [refreshTrigger]);

  const fetchNotifications = async () => {
    const maNhanSu = localStorage.getItem("maNhanSu");
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/send-notification-to-many",
        data: { maNhanSu },
      });
      setNotifications(response.notifications || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thông báo:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative cursor-pointer">
      <div onClick={toggleDropdown}>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 hover:text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {notifications.some(noti => !noti.isRead) && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-md rounded z-50">
          <div className="p-3 font-semibold border-b">Thông báo</div>
          {notifications.length === 0 ? (
            <div className="p-3 text-sm text-gray-500">Không có thông báo</div>
          ) : (
            <ul className="max-h-60 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-3 text-sm text-gray-500">Không có thông báo</div>
              ) : (
                <ul className="max-h-60 overflow-y-auto">
                  {notifications.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => navigate(`/notificationdetail/${item.id}`)}
                      className={`cursor-pointer px-4 py-2 text-sm ${item.isRead ? "text-gray-400" : "text-gray-800 font-semibold"
                        } hover:bg-gray-100`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-base">{item.title}</span>
                        <span className="text-xs text-gray-400 italic ml-4 whitespace-nowrap">
                          {dayjs(item.sentAt).format("HH:mm DD/MM/YYYY")}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">{item.body}</div>
                    </li>
                  ))}
                </ul>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
