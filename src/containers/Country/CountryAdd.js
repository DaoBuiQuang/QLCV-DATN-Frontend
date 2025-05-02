import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";
function CountryAdd() {
  const navigate = useNavigate();
  const [maQuocGia, setMaQuocGia] = useState("");
  const [tenQuocGia, setTenQuocGia] = useState("");
  const handleAddCountry = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/country/add",
        data: {
          maQuocGia,
          tenQuocGia,
        },
      });
      alert("Thêm quốc gia thành công!");
      setMaQuocGia("");
      setTenQuocGia("");
    } catch (error) {
      console.error("Lỗi khi thêm quốc gia!", error);
    }
  };

  return (
    <div className="p-1 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Thêm quốc gia mới</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-left">Mã quốc gia</label>
            <input
              type="text"
              value={maQuocGia}
              onChange={(e) => setMaQuocGia(e.target.value)}
              placeholder="Nhập mã quốc gia"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-left">Tên quốc gia</label>
            <input
              type="text"
              value={tenQuocGia}
              onChange={(e) => setTenQuocGia(e.target.value)}
              placeholder="Nhập tên quốc gia"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
          <button
            onClick={handleAddCountry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Thêm quốc gia
          </button>
        </div>
      </div>
    </div>
  );
}

export default CountryAdd;
