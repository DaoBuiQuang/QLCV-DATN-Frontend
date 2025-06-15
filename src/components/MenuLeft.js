import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PieChart, Users, Briefcase, Handshake, Globe, UserCheck, FileText, Layers, Settings, Tag, ShoppingCart,LayoutDashboard  } from "lucide-react";
import { useSelector } from 'react-redux';
import {Key, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoweb from "../assets/image/logo-web-big.jpg";
function MenuLeft() {
    const location = useLocation();
    const role = useSelector((state) => state.auth.role);
    const [openSettingSubmenu, setOpenSettingSubmenu] = useState(false);
    const { t } = useTranslation();
    return (
        <aside className="bg-white w-56 h-screen shadow-md flex flex-col overflow-y-auto">

            {/* Logo */}
            <div className="p-2 flex justify-center">
                <img src={logoweb} alt="Logo" className="w-32" />
            </div>
            {/* <div className="p-2 flex justify-center">
                <img src="https://ipac.vn/image/catalog/Logo-Slogan-PNG.png" alt="Logo" className="w-32" />
            </div> */}
            <nav className="flex-1 px-4 py-4">
                <ul className="space-y-2 text-[#B1B1B1] text-sm">
                    <li>
                        <NavLink
                            to="/"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <LayoutDashboard  size={16} />
                            <span>{t("dashboard")}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/customerlist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/customerlist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <Users size={16} />
                            <span>{t("khachHang")}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/caselist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/caselist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <FileText size={16} />
                            <span>{t("hoSoVuViec")}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/applicationlist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/applicationlist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <PieChart size={16} />
                            <span>{t("donDangKy")}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/joblist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/joblist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <Briefcase size={16} />
                            <span>{t("nganhNghe")}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/partnerlist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/partnerlist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <Handshake size={16} />
                            <span>{t("doiTac")}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/countrylist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/countrylist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <Globe size={16} />
                            <span>{t("quocGia")}</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/casetypelist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/casetypelist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <Layers size={16} />
                            <span>{t("loaiVuViec")}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/applicationtypelist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/applicationtypelist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <Briefcase size={16} />
                            <span>{t("loaiDonDangKy")}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/brandlist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/brandlist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <Tag size={16} />
                            <span>{t("nhanHieu")}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/productandserviceslist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${location.pathname === "/productandserviceslist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <ShoppingCart size={16} />
                            <span>{t("sanPhamDichVu")}</span>
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
                                <span>{t("nhanSu")}</span>
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
                                <span>{t("caiDat")}</span>
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
                                        <span>{t("doiMatKhau")}</span>
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
                                        <span>{t("thongTinTaiKhoan")}</span>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>

                </ul>
            </nav>
        </aside>
    );
}

export default MenuLeft;
