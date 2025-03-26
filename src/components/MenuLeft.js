import { Home, PieChart, Users, Briefcase, Handshake, Globe, UserCheck, FileText, Layers, Settings } from "lucide-react";

function MenuLeft() {
    return (
        <aside className="bg-white w-56 h-screen shadow-md flex flex-col">
            {/* Logo */}
            <div className="p-2 flex justify-center">
                <img src="https://ipac.vn/image/catalog/logo/rsz_1logo.jpg" alt="Logo" className="w-32" />
            </div>
            <nav className="flex-1 px-4 py-4">
                <ul className="space-y-2 text-[#B1B1B1] text-sm">
                    <li className="p-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
                        <a href="#" className="flex items-center space-x-2 block w-full">
                            <PieChart size={16} />
                            <span>Biểu đồ</span>  
                        </a>
                    </li>
                    <li className="p-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
                        <a href="/detail" className="flex items-center space-x-2 block w-full">
                            <Users size={16} />
                            <span>Khách hàng</span>
                        </a>
                    </li>
                    <li className="p-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
                        <a href="/industry" className="flex items-center space-x-2 block w-full">
                            <Briefcase size={16} />
                            <span>Ngành nghề</span>
                        </a>
                    </li>
                    <li className="p-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
                        <a href="/industry/add" className="flex items-center space-x-2 block w-full">
                            <Handshake size={16} />
                            <span>Đối tác</span>
                        </a>
                    </li>
                    <li className="p-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
                        <a href="/industry" className="flex items-center space-x-2 block w-full">
                            <Globe size={16} />
                            <span>Quốc gia</span>
                        </a>
                    </li>
                    <li className="p-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
                        <a href="/industry" className="flex items-center space-x-2 block w-full">
                            <UserCheck size={16} />
                            <span>Nhân sự</span>
                        </a>
                    </li>
                    <li className="p-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
                        <a href="/industry" className="flex items-center space-x-2 block w-full">
                            <FileText size={16} />
                            <span>Hồ sơ vụ việc</span>
                        </a>
                    </li>
                    <li className="p-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
                        <a href="/industry" className="flex items-center space-x-2 block w-full">
                            <Layers size={16} />
                            <span>Loại vụ việc</span>
                        </a>
                    </li>
                    <li className="p-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
                        <a href="#" className="flex items-center space-x-2 block w-full">
                            <Settings size={16} />
                            <span>Cài đặt</span>
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Đăng xuất */}
            <div className="p-4 border-t flex items-center space-x-2 text-[#B1B1B1] text-sm">
                {/* <img src="/avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full" /> */}
                <span>Bùi Quang Đạo</span>
            </div>
        </aside>
    );
}

export default MenuLeft;
