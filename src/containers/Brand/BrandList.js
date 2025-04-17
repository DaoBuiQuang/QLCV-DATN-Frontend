import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import callAPI from "../../utils/api";

function BrandList() {
    const [brands, setBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchBrands = async (searchValue) => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/brand/list",
                data: { search: searchValue },
            });
            setBrands(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu nhãn hiệu:", error);
        }
    };

    useEffect(() => {
        fetchBrands("");
    }, []);

    return (
        <div className="p-1 bg-gray-100 min-h-screen">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">🏷️ Danh sách nhãn hiệu</h2>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="🔍 Nhập tên nhãn hiệu"
                        className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="flex gap-3">
                        <button
                            onClick={() => fetchBrands(searchTerm)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition"
                        >
                            🔎 Tìm kiếm
                        </button>
                        <button
                            onClick={() => navigate("/brandadd")}
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
                        <th className="p-2 font-normal">Mã nhãn hiệu</th>
                        <th className="p-2 font-normal">Tên nhãn hiệu</th>
                        <th className="p-2 font-normal">Ảnh</th>
                        <th className="p-2 text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map((brand, index) => (
                        <tr key={brand.maNhanHieu} className="hover:bg-gray-100 text-center border-b">
                            <td className="p-2">{index + 1}</td>
                            <td
                                className="p-2 text-blue-500 cursor-pointer hover:underline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/branddetail/${brand.maNhanHieu}`);
                                }}
                            >
                                {brand.maNhanHieu}
                            </td>
                            <td className="p-2">{brand.tenNhanHieu}</td>
                            <td className="p-2">
                                {brand.linkAnh ? (
                                    <img src={brand.linkAnh} alt="Brand" className="w-16 h-16 object-contain mx-auto" />
                                ) : (
                                    <span className="text-gray-400 italic">Không có ảnh</span>
                                )}
                            </td>

                            <td className="p-2">
                                <div className="flex gap-2 justify-center">
                                    <button
                                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                                        onClick={() => navigate(`/brandedit/${brand.maNhanHieu}`)}
                                    >
                                        📝
                                    </button>
                                    <button className="px-3 py-1 bg-red-200 text-red-600 rounded-md hover:bg-red-300">
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

export default BrandList;
