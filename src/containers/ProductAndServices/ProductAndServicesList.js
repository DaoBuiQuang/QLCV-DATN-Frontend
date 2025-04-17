import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import callAPI from "../../utils/api";

function ProductAndServicesList() {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchItems = async (searchValue) => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/productsandservices/list", // Đổi endpoint nếu khác
                data: { search: searchValue },
            });
            setItems(response);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm/dịch vụ:", error);
        }
    };

    useEffect(() => {
        fetchItems("");
    }, []);

    return (
        <div className="p-1 bg-gray-100 min-h-screen">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">📦 Danh sách sản phẩm & dịch vụ</h2>

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="🔍 Nhập tên sản phẩm/dịch vụ"
                        className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="flex gap-3">
                        <button
                            onClick={() => fetchItems(searchTerm)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition"
                        >
                            🔎 Tìm kiếm
                        </button>
                        <button
                            onClick={() => navigate("/productandservicesadd")}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-md transition"
                        >
                            ➕ Thêm mới
                        </button>
                    </div>
                </div>
            </div>

            <table className="w-full border-collapse bg-white text-sm mt-4">
                <thead>
                    <tr className="bg-[#EAECF0] text-[#667085] text-center font-normal">
                        <th className="p-2 font-normal">STT</th>
                        <th className="p-2 font-normal">Mã SP/DV</th>
                        <th className="p-2 font-normal">Tên SP/DV</th>
                        <th className="p-2 font-normal">Mô tả</th>
                        <th className="p-2 text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.maSPDV} className="hover:bg-gray-100 text-center border-b">
                            <td className="p-2">{index + 1}</td>
                            <td
                                className="p-2 text-blue-500 cursor-pointer hover:underline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/productandservicesdetail/${item.maSPDV}`);
                                }}
                            >
                                {item.maSPDV}
                            </td>
                            <td className="p-2">{item.tenSPDV}</td>
                            <td className="p-2">{item.moTa || <i className="text-gray-400">Không có mô tả</i>}</td>
                            <td className="p-2">
                                <div className="flex gap-2 justify-center">
                                    <button
                                        onClick={() => navigate(`/productandservicesedit/${item.maSPDV}`)}
                                        className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300"
                                    >
                                        📝
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-red-200 text-red-600 rounded hover:bg-red-300"
                                    // Bạn có thể thêm xử lý xóa ở đây
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductAndServicesList;
