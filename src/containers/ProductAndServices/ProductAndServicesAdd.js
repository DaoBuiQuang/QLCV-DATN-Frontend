import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";

function ProductAndServicesAdd() {
  const navigate = useNavigate();
  const [maSPDV, setMaSPDV] = useState("");
  const [tenSPDV, setTenSPDV] = useState("");
  const [moTa, setMoTa] = useState("");

  const handleAddProduct = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/productsandservices/add", 
        data: {
          maSPDV,
          tenSPDV,
          moTa,
        },
      });
      alert("✅ Thêm sản phẩm/dịch vụ thành công!");
      setMaSPDV("");
      setTenSPDV("");
      setMoTa("");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm/dịch vụ:", error);
      alert("Lỗi khi thêm sản phẩm/dịch vụ. Vui lòng kiểm tra lại!");
    }
  };

  return (
    <div className="p-1 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">➕ Thêm sản phẩm / dịch vụ mới</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium">Mã SP/DV</label>
            <input
              type="text"
              value={maSPDV}
              onChange={(e) => setMaSPDV(e.target.value)}
              placeholder="Nhập mã sản phẩm / dịch vụ"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Tên SP/DV</label>
            <input
              type="text"
              value={tenSPDV}
              onChange={(e) => setTenSPDV(e.target.value)}
              placeholder="Nhập tên sản phẩm / dịch vụ"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium">Mô tả</label>
            <textarea
              value={moTa}
              onChange={(e) => setMoTa(e.target.value)}
              placeholder="Nhập mô tả sản phẩm / dịch vụ"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg h-28 resize-none focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 px-5 py-3 rounded-lg text-gray-700 transition"
          >
            Quay lại
          </button>
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
          >
            Thêm mới
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductAndServicesAdd;
