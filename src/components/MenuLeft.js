import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PieChart, Users, Briefcase, Handshake, Globe, UserCheck, FileText, Layers, Settings, Tag, ShoppingCart } from "lucide-react";
import { useSelector } from 'react-redux';
import {Key, User } from "lucide-react";
function MenuLeft() {
    const location = useLocation(); // Lấy đường dẫn hiện tại
    const role = useSelector((state) => state.auth.role);
    const [openSettingSubmenu, setOpenSettingSubmenu] = useState(false);

    return (
        <aside className="bg-white w-56 h-screen shadow-md flex flex-col">
            {/* Logo */}
            <div className="p-2 flex justify-center">
                <img src="https://ipac.vn/image/catalog/Logo-Slogan-PNG.png" alt="Logo" className="w-32" />
            </div>
            <nav className="flex-1 px-4 py-4">
                <ul className="space-y-2 text-[#B1B1B1] text-sm">
                    <li>
                        <NavLink
                            to="/"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <Users size={16} />
                            <span>Khách hàng</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/caselist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/caselist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <FileText size={16} />
                            <span>Hồ sơ vụ việc</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/applicationlist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/applicationlist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <PieChart size={16} />
                            <span>Đơn đăng kí</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/joblist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/joblist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <Briefcase size={16} />
                            <span>Ngành nghề</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/partnerlist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/partnerlist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <Handshake size={16} />
                            <span>Đối tác</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/countrylist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/countrylist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <Globe size={16} />
                            <span>Quốc gia</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/casetypelist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/casetypelist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <Layers size={16} />
                            <span>Loại vụ việc</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/applicationtypelist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/applicationtypelist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <Briefcase size={16} />
                            <span>Loại đơn đăng kí</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/brandlist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/brandlist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <Tag size={16} />
                            <span>Nhãn hiệu</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/productandserviceslist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/productandserviceslist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <ShoppingCart size={16} />
                            <span>Sản phẩm và dịch vụ</span>
                        </NavLink>
                    </li>
                    {(role === 'admin' || role === 'staff') && (
                        <li>
                            <NavLink
                                to="/stafflist"
                                className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/stafflist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                    }`}
                            >
                                <UserCheck size={16} />
                                <span>Nhân sự</span>
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <button
                            onClick={() => setOpenSettingSubmenu(!openSettingSubmenu)}
                            className={`flex items-center justify-between space-x-2 p-2 rounded-lg w-full transition ${location.pathname.startsWith("/settings") ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                <Settings size={16} />
                                <span>Cài đặt</span>
                            </div>
                            <span>{openSettingSubmenu ? "▲" : "▼"}</span>
                        </button>

                        {/* Submenu */}
                        {openSettingSubmenu && (
                            <ul className="ml-6 mt-1 space-y-1 text-sm">
                                <li>
                                    <NavLink
                                        to="/changepassword"
                                        className={({ isActive }) =>
                                            `flex items-center space-x-2 p-2 rounded-lg w-full transition ${isActive ? "bg-blue-400 text-white" : "hover:bg-blue-400 hover:text-white"
                                            }`
                                        }
                                    >
                                        <Key size={14} />
                                        <span>Đổi mật khẩu</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/profile"
                                        className={({ isActive }) =>
                                            `flex items-center space-x-2 p-2 rounded-lg w-full transition ${isActive ? "bg-blue-400 text-white" : "hover:bg-blue-400 hover:text-white"
                                            }`
                                        }
                                    >
                                        <User size={14} />
                                        <span>Thông tin tài khoản</span>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>

                </ul>
            </nav>

            {/* Đăng xuất */}
            {/* <div className="p-4 border-t flex items-center space-x-2 text-[#B1B1B1] text-sm">
                <span>Bùi Quang Đạo</span>
            </div> */}
        </aside>
    );
}

export default MenuLeft;
