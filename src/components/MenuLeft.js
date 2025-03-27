import { NavLink, useLocation } from "react-router-dom";
import { PieChart, Users, Briefcase, Handshake, Globe, UserCheck, FileText, Layers, Settings } from "lucide-react";

function MenuLeft() {
    const location = useLocation(); // Lấy đường dẫn hiện tại

    return (
        <aside className="bg-white w-56 h-screen shadow-md flex flex-col">
            {/* Logo */}
            <div className="p-2 flex justify-center">
                <img src="https://ipac.vn/image/catalog/logo/rsz_1logo.jpg" alt="Logo" className="w-32" />
            </div>
            <nav className="flex-1 px-4 py-4">
                <ul className="space-y-2 text-[#B1B1B1] text-sm">
                    <li>
                        <NavLink 
                            to="/dashboard"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${
                                location.pathname === "/dashboard" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                            }`}
                        >
                            <PieChart size={16} />
                            <span>Biểu đồ</span>  
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/detail"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${
                                location.pathname === "/detail" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                            }`}
                        >
                            <Users size={16} />
                            <span>Khách hàng</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/joblist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${
                                location.pathname === "/joblist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                            }`}
                        >
                            <Briefcase size={16} />
                            <span>Ngành nghề</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/partnerlist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${
                                location.pathname === "/partnerlist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                            }`}
                        >
                            <Handshake size={16} />
                            <span>Đối tác</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/countrylist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${
                                location.pathname === "/countrylist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                            }`}
                        >
                            <Globe size={16} />
                            <span>Quốc gia</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/stafflist"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${
                                location.pathname === "/stafflist" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                            }`}
                        >
                            <UserCheck size={16} />
                            <span>Nhân sự</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/cases"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${
                                location.pathname === "/cases" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                            }`}
                        >
                            <FileText size={16} />
                            <span>Hồ sơ vụ việc</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/casetype"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${
                                location.pathname === "/casetype" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                            }`}
                        >
                            <Layers size={16} />
                            <span>Loại vụ việc</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/settings"
                            className={`flex items-center space-x-2 p-2 rounded-lg w-full transition ${
                                location.pathname === "/settings" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
                            }`}
                        >
                            <Settings size={16} />
                            <span>Cài đặt</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            {/* Đăng xuất */}
            <div className="p-4 border-t flex items-center space-x-2 text-[#B1B1B1] text-sm">
                <span>Bùi Quang Đạo</span>
            </div>
        </aside>
    );
}

export default MenuLeft;
