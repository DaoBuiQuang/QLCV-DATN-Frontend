import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../../src/features/authSlice";
import callAPI from "../utils/api";
import { Menu, Bell } from "lucide-react";
import vietnam from "../assets/image/VietNam.png";
import england from "../assets/image/Anh.png";
import i18n from "../components/MultiLang/i18n.js";
import { useTranslation } from "react-i18next";

function Header({ toggleMenu, isMenuOpen }) {
  const [username, setUsername] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language || "vi");
  const authId = useSelector((state) => state.auth.authId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    // Lấy token và username như trước
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp > now) {
          setUsername(decoded.tenNhanSu || t("username"));
        } else {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } catch {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    const saved = localStorage.getItem("language");
    if (saved) {
      i18n.changeLanguage(saved);
      setCurrentLang(saved);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await callAPI({ method: "post", endpoint: "/logout", data: { authId } });
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("token");
      dispatch(clearAuth());
      navigate("/login");
    }
  };

  const toggleLangModal = (e) => {
    e.stopPropagation();
    setShowLangModal(!showLangModal);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    localStorage.setItem("language", lng);
    setShowLangModal(false);
  };

  const getFlag = (lng) => (lng === "en" ? england : vietnam);

  return (
    <>
      <header
        className="bg-white shadow-md px-6 py-3 flex items-center justify-between"
        style={{
          width:
            isMenuOpen && window.innerWidth >= 1024
              ? "calc(100vw - 224px)"
              : "100vw",
        }}
      >
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={toggleMenu}
        >
          <Menu size={24} />
        </button>

        {username && (
          <div className="flex items-center gap-4 ">
            {/* Hiển thị cờ hiện tại */}
            <div
              className="cursor-pointer relative w-max"
              onClick={toggleLangModal}
            >
              <img
                src={getFlag(currentLang)}
                alt="Lang"
                className="w-6 h-6 rounded-full border"
              />
              {showLangModal && (
                <div
                  className="absolute top-8 right-0 bg-white border border-gray-300 shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded w-max z-50"
                  onClick={(e) => e.stopPropagation()}
                >

                  <ul>
                    <li
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => changeLanguage("vi")}
                    >
                      <img src={vietnam} alt="VN" className="w-5 h-5" />
                      Tiếng Việt
                    </li>
                    <li
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => changeLanguage("en")}
                    >
                      <img src={england} alt="EN" className="w-5 h-5" />
                      Tiếng Anh
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <span className="text-gray-700 font-medium">{username}</span>

            <div className="relative cursor-pointer">
              <Bell size={22} className="text-gray-600 hover:text-blue-600" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </div>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              {t("logout")}
            </button>
          </div>
        )}
      </header>

      {/* Modal xác nhận đăng xuất */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              {t("logoutTitle")}
            </h2>
            <p className="text-gray-600 mb-6">{t("confirmLogout")}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {t("logout")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
