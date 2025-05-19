import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";
import { useDispatch } from 'react-redux';
import { setAuth } from "../../features/authSlice";
import { showSuccess, showError } from "../../components/commom/Notification";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/login",
                data: { username, password },
            });

            if (response && response.token) {
                localStorage.setItem("token", response.token);
                const decoded = jwtDecode(response.token);
                dispatch(setAuth({ authId: decoded.id, role: decoded.role }));
                 await showSuccess("Thành công!", "Đăng nhập thành công!");
                navigate("/");
            } else {
                throw new Error("Đăng nhập thất bại. Không nhận được token.");
            }
        } catch (err) {
              showError("Thất bại!", "Đăng nhập không thành công.", err);
            setError(err?.response?.data?.message || err.message || "Đăng nhập thất bại!");
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img
                        src="https://ipac.vn/image/catalog/logo/rsz_1logo.jpg"
                        alt="Logo"
                        className="w-28"
                    />
                </div>

                {/* Tiêu đề */}
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
                    Chào mừng trở lại!
                </h2>

                {/* Hiển thị lỗi nếu có */}
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm text-center mb-4">
                        {error}
                    </div>
                )}

                {/* Form đăng nhập */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-left text-sm font-medium mb-1">Tài khoản</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập tài khoản"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left text-sm font-medium mb-1">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition duration-200"
                    >
                        Đăng nhập
                    </button>
                </div>


                {/* Đăng ký & Quên mật khẩu */}
                <div className="mt-6 text-center text-sm text-gray-600 space-y-1">
                    <p>
                        Chưa có tài khoản?{" "}
                        <a href="#" className="text-blue-500 hover:underline font-medium">Đăng ký</a>
                    </p>
                    <p>
                        <a href="#" className="text-blue-500 hover:underline font-medium">Quên mật khẩu?</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
