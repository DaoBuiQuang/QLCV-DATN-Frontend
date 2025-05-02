import { Menu } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../../src/features/authSlice";
import callAPI from "../utils/api";

function Header({ toggleMenu,isMenuOpen  }) {
  const [username, setUsername] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // 👈 Modal state
  const authId = useSelector((state) => state.auth.authId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp > currentTime) {
          setUsername(decoded.tenNhanSu || "Người dùng");
        } else {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Token không hợp lệ");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  const handleLogout = async () => {
    try {
      await callAPI({
        method: "post",
        endpoint: "/logout",
        data: { authId: authId },
      });
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    } finally {
      localStorage.removeItem("token");
      dispatch(clearAuth());
      navigate("/login");
    }
  };

  return (
    <>
      <header
        className="bg-white shadow-md px-6 py-3 flex items-center justify-between w-full"
        style={{ width: isMenuOpen && window.innerWidth >= 1024 ? "calc(100vw - 224px)" : "100vw" }}
      >

        <button className="text-gray-600 hover:text-gray-800" onClick={toggleMenu}>
          <Menu size={24} />
        </button>
        {username && (
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">{username}</span>
            <button
              onClick={() => setShowLogoutModal(true)} // 👈 mở modal
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </header>
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Xác nhận đăng xuất</h2>
            <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn đăng xuất không?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)} // 👈 hủy modal
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleLogout} 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
