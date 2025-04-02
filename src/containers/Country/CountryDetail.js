import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CountryDetail() {
  const navigate = useNavigate();
  const { maQuocGia } = useParams(); // Lấy maQuocGia từ URL

  const [tenQuocGia, setTenQuocGia] = useState("");

  // Gọi API lấy thông tin quốc gia khi vào trang
  useEffect(() => {
    const fetchCountryDetail = async () => {
        debugger
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/country/detail",
          { maQuocGia },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        setTenQuocGia(data.tenQuocGia);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết quốc gia:", error);
        alert("Không thể lấy dữ liệu quốc gia!");
      }
    };

  
    fetchCountryDetail();

  }, []);

  return (
    <div className="p-1 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Chi tiết quốc gia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Mã quốc gia</label>
            <input
              type="text"
              value={maQuocGia}
              disabled
              className="w-full p-2 mt-1 border rounded-lg bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Tên quốc gia</label>
            <input
              type="text"
              value={tenQuocGia}
              onChange={(e) => setTenQuocGia(e.target.value)}
              disabled
              className="w-full p-2 mt-1 border rounded-lg bg-gray-200"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
