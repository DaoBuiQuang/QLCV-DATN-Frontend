import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";
const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/login",
                data: { username, password },
            });
    
            if (response.token) {
                localStorage.setItem("token", response.token);
                alert("Đăng nhập thành công!");
                console.log("Token nhận được:", response.token);
                navigate("/");
            } else {
                throw new Error("Không nhận được token từ server!");
            }
        } catch (error) {
            setError(error.message || "Đăng nhập thất bại!");
        }
    };
    

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img 
                        src="https://ipac.vn/image/catalog/logo/rsz_1logo.jpg" 
                        alt="Logo" 
                        className="w-32"
                    />
                </div>

                {/* Tiêu đề */}
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Đăng nhập</h2>

                {/* Hiển thị lỗi nếu có */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Form đăng nhập */}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Tài khoản</label>
                        <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Nhập tài khoản"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Mật khẩu</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Đăng nhập
                    </button>
                </form>

                {/* Đăng ký & Quên mật khẩu */}
                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>Chưa có tài khoản? <a href="#" className="text-blue-500 hover:underline">Đăng ký</a></p>
                    <p><a href="#" className="text-blue-500 hover:underline">Quên mật khẩu?</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
