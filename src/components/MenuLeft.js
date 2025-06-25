import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PieChart, Users, Briefcase, Handshake, Globe, UserCheck, FileText, Layers, Settings, Tag, ShoppingCart, LayoutDashboard } from "lucide-react";
import { useSelector } from 'react-redux';
import { Key, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoweb from "../assets/image/logo-web-big.jpg";
function MenuLeft() {
    const location = useLocation();
    const role = useSelector((state) => state.auth.role);
    const [openSettingSubmenu, setOpenSettingSubmenu] = useState({
        dashboard: false,
        settings: false,
    });

    const { t } = useTranslation();
    useEffect(() => {
        setOpenSettingSubmenu({
            dashboard: location.pathname.startsWith("/dashboard"),
            settings: ["/changepassword", "/profile"].some(path =>
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
            {/* <div className="p-2 flex justify-center">
                <img src="https://ipac.vn/image/catalog/Logo-Slogan-PNG.png" alt="Logo" className="w-32" />
            </div> */}
            <nav className="flex-1 px-4 py-4">
                <ul className="space-y-2 text-[#009999] text-sm font-bold">
                    <li>
                        <div>
                            <button
                                onClick={() =>
                                    setOpenSettingSubmenu((prev) => ({
                                        ...prev,
                                        dashboard: !prev.dashboard,
                                    }))
                                }
                                className={`flex items-center justify-between space-x-2 p-2 rounded-lg w-full transition ${openSettingSubmenu.dashboard
                                        ? "border border-[#009999] text-[#009999]"
                                        : "hover:border hover:border-[#009999] hover:text-[#009999]"
                                    }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <LayoutDashboard size={16} color={openSettingSubmenu.dashboard ? "#009999" : undefined} />
                                    <span>{t("dashboard")}</span>
                                </div>
                                <span>{openSettingSubmenu?.dashboard ? "▲" : "▼"}</span>
                            </button>

                            {openSettingSubmenu?.dashboard && (
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

                    <li><NavLink to="/customerlist" className={navLinkClass}><Users size={16} /><span>{t("khachHang")}</span></NavLink></li>
                    <li><NavLink to="/caselist" className={navLinkClass}><FileText size={16} /><span>{t("hoSoVuViec")}</span></NavLink></li>
                    <li><NavLink to="/applicationlist" className={navLinkClass}><PieChart size={16} /><span>{t("donDangKy")}</span></NavLink></li>
                    <li><NavLink to="/partnerlist" className={navLinkClass}><Handshake size={16} /><span>{t("doiTac")}</span></NavLink></li>
                    <li><NavLink to="/joblist" className={navLinkClass}><Briefcase size={16} /><span>{t("nganhNghe")}</span></NavLink></li>
                    <li><NavLink to="/countrylist" className={navLinkClass}><Globe size={16} /><span>{t("quocGia")}</span></NavLink></li>
                    <li><NavLink to="/casetypelist" className={navLinkClass}><Layers size={16} /><span>{t("loaiVuViec")}</span></NavLink></li>
                    <li><NavLink to="/applicationtypelist" className={navLinkClass}><Briefcase size={16} /><span>{t("loaiDonDangKy")}</span></NavLink></li>
                    <li><NavLink to="/brandlist" className={navLinkClass}><Tag size={16} /><span>{t("nhanHieu")}</span></NavLink></li>
                    <li><NavLink to="/productandserviceslist" className={navLinkClass}><ShoppingCart size={16} /><span>{t("sanPhamDichVu")}</span></NavLink></li>

                    {(role === "admin" || role === "staff") && (
                        <li><NavLink to="/stafflist" className={navLinkClass}><UserCheck size={16} /><span>{t("nhanSu")}</span></NavLink></li>
                    )}

                    <li>
                        <button
                            onClick={() =>
                                setOpenSettingSubmenu((prev) => ({
                                    ...prev,
                                    settings: !prev.settings,
                                }))
                            }
                            className={`flex items-center justify-between space-x-2 p-2 rounded-lg w-full transition ${location.pathname.startsWith("/settings") ||
                                    location.pathname === "/changepassword" ||
                                    location.pathname === "/profile"
                                    ? "border border-[#009999] text-[#009999]"
                                    : "hover:border hover:border-[#009999] hover:text-[#009999]"
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                <Settings size={16} color={(location.pathname.startsWith("/settings") || location.pathname === "/changepassword" || location.pathname === "/profile") ? "#009999" : undefined} />
                                <span>{t("caiDat")}</span>
                            </div>
                            <span>{openSettingSubmenu?.settings ? "▲" : "▼"}</span>
                        </button>

                        {openSettingSubmenu?.settings && (
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
