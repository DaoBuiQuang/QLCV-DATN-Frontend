import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Hook điều hướng

  const fetchCountries = async (searchValue) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Không tìm thấy token");
        return;
      }

      const response = await fetch("http://localhost:3000/api/country/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ search: searchValue }),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu quốc gia");
      }

      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchCountries("");
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Danh sách quốc gia</h2>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Nhập tên quốc gia"
            className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-3">
            <button
              onClick={() => fetchCountries(searchTerm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              🔎 Tìm kiếm
            </button>
            <button
              onClick={() => navigate("/countryadd")} // Chuyển hướng khi bấm nút
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
            <th className="p-2 font-normal">Mã quốc gia</th>
            <th className="p-2 font-normal">Tên quốc gia</th>
            <th className="p-2 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, index) => (
            <tr
              key={country.id}
              className="hover:bg-gray-100 text-center border-b"
            >
              <td className="p-2">{index + 1}</td>
              <td
                className="p-2 text-blue-500 cursor-pointer hover:underline"
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn chặn sự kiện lan truyền
                  navigate(`/countrydetail/${country.maQuocGia}`);
                }}
              >
                {country.maQuocGia}
              </td>
              <td className="p-2">{country.tenQuocGia}</td>
              <td className="p-2">
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    onClick={() => navigate(`/countryedit/${country.maQuocGia}`)}
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

export default CountryList;
