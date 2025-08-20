import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    PieChart, Users, Briefcase, Handshake, Globe, UserCheck,
    FileText, Layers, Settings, Tag, ShoppingCart, LayoutDashboard, Key, User,
    ChevronDown, ChevronUp
} from "lucide-react";
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import logoweb from "../assets/image/logo-web-big.jpg";

function MenuLeft() {
    const location = useLocation();
    const role = useSelector((state) => state.auth.role);
    const { t } = useTranslation();

    const [openSettingSubmenu, setOpenSettingSubmenu] = useState({
        dashboard: false,
        settings: false,
        application: false,
    });

    useEffect(() => {
        setOpenSettingSubmenu({
            dashboard: location.pathname.startsWith("/dashboard"),
            settings: ["/changepassword", "/profile"].some(path =>
                location.pathname.startsWith(path)
            ),
            application: ["/applicationlist", "/applicationlist_kh", "/application_gh_nh_vn_list", "application_gh_nh_vn_list"].some(path =>
                location.pathname.startsWith(path)
            ),
        });
    }, [location.pathname]);

    const navLinkClass = ({ isActive }) =>
        `flex items-center space-x-2 p-2 rounded-lg w-full transition 
        ${isActive
            ? "border border-[#009999] text-[#009999] fill-[#009999]"
            : "hover:border hover:border-[#009999] hover:text-[#009999] hover:fill-[#009999]"}`;

    return (
        <aside className="bg-white w-56 h-screen shadow-md flex flex-col overflow-y-auto">
            {/* Logo */}
            <div className="p-2 flex justify-center">
                <img src={logoweb} alt="Logo" className="w-32" />
            </div>

            <nav className="flex-1 px-4 py-4">
                <ul className="space-y-2 text-[#009999] text-sm font-bold">
                    {/* Đơn đăng ký */}
                    <li>
                        <div>
                            <button
                                onClick={() =>
                                    setOpenSettingSubmenu((prev) => ({
                                        ...prev,
                                        application: !prev.application,
                                    }))
                                }
                                className={`flex items-center justify-between space-x-2 p-2 rounded-lg w-full transition ${
                                    openSettingSubmenu.application
                                        ? "border border-[#009999] text-[#009999]"
                                        : "hover:border hover:border-[#009999] hover:text-[#009999]"
                                }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <PieChart size={16} color={openSettingSubmenu.application ? "#009999" : undefined} />
                                    <span>Nhãn hiệu</span>
                                </div>
                                {openSettingSubmenu.application ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {openSettingSubmenu.application && (
                                <ul className="ml-6 mt-1 space-y-1 text-sm">
                                    <li>
                                        <NavLink to="/applicationlist" className={navLinkClass}>
                                            <PieChart size={14} />
                                            <span>Đơn đăng ký NH_VN</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/applicationlist_kh" className={navLinkClass}>
                                            <PieChart size={14} />
                                            <span>Đơn đăng ký NH_Cam</span>
                                        </NavLink>
                                    </li>
                                    {/* <li>
                                        <NavLink to="/application_kdlist_vn" className={navLinkClass}>
                                            <PieChart size={14} />
                                            <span>Đơn đăng ký KD_VN</span>
                                        </NavLink>
                                    </li> */}
                                    <li>
                                        <NavLink to="/application_gh_nh_vn_list" className={navLinkClass}>
                                            <PieChart size={14} />
                                            <span>Đơn gia hạn NH_VN</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </li>

                    {/* Các mục không có submenu */}
                    <li><NavLink to="/caselist" className={navLinkClass}><FileText size={16} /><span>{t("hoSoVuViec")}</span></NavLink></li>
                    <li><NavLink to="/customerlist" className={navLinkClass}><Users size={16} /><span>{t("khachHang")}</span></NavLink></li>
                    {/* Dashboard */}
                    <li>
                        <div>
                            <button
                                onClick={() =>
                                    setOpenSettingSubmenu((prev) => ({
                                        ...prev,
                                        dashboard: !prev.dashboard,
                                    }))
                                }
                                className={`flex items-center justify-between space-x-2 p-2 rounded-lg w-full transition ${
                                    openSettingSubmenu.dashboard
                                        ? "border border-[#009999] text-[#009999]"
                                        : "hover:border hover:border-[#009999] hover:text-[#009999]"
                                }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <LayoutDashboard size={16} color={openSettingSubmenu.dashboard ? "#009999" : undefined} />
                                    <span>{t("dashboard")}</span>
                                </div>
                                {openSettingSubmenu.dashboard ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {openSettingSubmenu.dashboard && (
                                <ul className="ml-6 mt-1 space-y-1 text-sm">
                                    <li>
                                        <NavLink to="/dashboard/application" className={navLinkClass}>
                                            <PieChart size={14} />
                                            <span>{t("thongKeDonDangKy")}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/country" className={navLinkClass}>
                                            <Globe size={14} />
                                            <span>{t("thongKeQuocGia")}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/partner" className={navLinkClass}>
                                            <Handshake size={14} />
                                            <span>{t("thongKeDoiTac")}</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </li>
                    <li><NavLink to="/partnerlist" className={navLinkClass}><Handshake size={16} /><span>{t("doiTac")}</span></NavLink></li>
                    <li><NavLink to="/joblist" className={navLinkClass}><Briefcase size={16} /><span>{t("nganhNghe")}</span></NavLink></li>
                    <li><NavLink to="/countrylist" className={navLinkClass}><Globe size={16} /><span>{t("quocGia")}</span></NavLink></li>
                    <li><NavLink to="/casetypelist" className={navLinkClass}><Layers size={16} /><span>{t("loaiVuViec")}</span></NavLink></li>
                    <li><NavLink to="/applicationtypelist" className={navLinkClass}><Briefcase size={16} /><span>Loại đơn</span></NavLink></li>
                    <li><NavLink to="/brandlist" className={navLinkClass}><Tag size={16} /><span>{t("nhanHieu")}</span></NavLink></li>
                    <li><NavLink to="/productandserviceslist" className={navLinkClass}><ShoppingCart size={16} /><span>{t("sanPhamDichVu")}</span></NavLink></li>

                    {(role === "admin" || role === "staff") && (
                        <li><NavLink to="/stafflist" className={navLinkClass}><UserCheck size={16} /><span>{t("nhanSu")}</span></NavLink></li>
                    )}

                    {/* Cài đặt */}
                    <li>
                        <button
                            onClick={() =>
                                setOpenSettingSubmenu((prev) => ({
                                    ...prev,
                                    settings: !prev.settings,
                                }))
                            }
                            className={`flex items-center justify-between space-x-2 p-2 rounded-lg w-full transition ${
                                location.pathname.startsWith("/settings") ||
                                location.pathname === "/changepassword" ||
                                location.pathname === "/profile"
                                    ? "border border-[#009999] text-[#009999]"
                                    : "hover:border hover:border-[#009999] hover:text-[#009999]"
                            }`}
                        >
                            <div className="flex items-center space-x-2">
                                <Settings size={16} color={
                                    location.pathname.startsWith("/settings") ||
                                    location.pathname === "/changepassword" ||
                                    location.pathname === "/profile" ? "#009999" : undefined
                                } />
                                <span>{t("caiDat")}</span>
                            </div>
                            {openSettingSubmenu.settings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {openSettingSubmenu.settings && (
                            <ul className="ml-6 mt-1 space-y-1 text-sm">
                                <li>
                                    <NavLink to="/changepassword" className={navLinkClass}>
                                        <Key size={14} />
                                        <span>{t("doiMatKhau")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/profile" className={navLinkClass}>
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
