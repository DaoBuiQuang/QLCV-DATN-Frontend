import React from "react";
import { Menu } from "lucide-react";

function Header() {
    return (
        <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
            {/* Icon menu bên trái */}
            <button className="text-gray-600 hover:text-gray-800 lg:hidden">
                <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Danh Sách Khách Hàng</h1>
            <div className="flex items-center space-x-3">
                {/* <img
                    src="/avatar.jpg"
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border border-gray-300"
                /> */}
            </div>
        </header>
    );
}

export default Header;
