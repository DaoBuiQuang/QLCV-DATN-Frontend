import { Menu } from "lucide-react";

function Header() {
    return (
        <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
            {/* Icon menu bên trái */}
            <button className="text-gray-600 hover:text-gray-800 ">
                <Menu size={24}  />
            </button>
            <h1 className="text-lg font-semibold text-gray-800"></h1>
        </header>
    );
}

export default Header;
