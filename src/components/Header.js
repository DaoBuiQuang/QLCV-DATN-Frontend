import { Menu } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

function Header({ toggleMenu }) {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        debugger
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
    
                const currentTime = Date.now() / 1000;
                if (decoded.exp && decoded.exp > currentTime) {
                    setUsername(decoded.tenNhanSu ||  "Người dùng");
                } else {
                    localStorage.removeItem("token");
                    window.location.href = "/login"; // token hết hạn
                }
            } catch (error) {
                console.error("Token không hợp lệ");
                localStorage.removeItem("token");
                window.location.href = "/login"; // token không hợp lệ
            }
        } else {
            window.location.href = "/login"; // không có token
        }
    }, []);
    

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login"; // hoặc dùng navigate nếu bạn đang dùng react-router
    };

    return (
        <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
            {/* Nút menu bên trái */}
            <button className="text-gray-600 hover:text-gray-800" onClick={toggleMenu}>
                <Menu size={24} />
            </button>

            {/* Thông tin tài khoản và đăng xuất */}
            {username && (
                <div className="flex items-center gap-4">
                    <span className="text-gray-700 font-medium">{username}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Đăng xuất
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
