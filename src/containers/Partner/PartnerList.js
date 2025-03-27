import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import callAPI from "../../utils/api";

function PartnerList() {
  const [partners, setPartners] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(""); // Lưu maQuocGia được chọn
  const navigate = useNavigate(); // Hook điều hướng

  const fetchPartners = async (searchValue, countryCode) => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/partner/list",
        data: { tenDoiTac: searchValue, maQuocGia: countryCode },
      });
      setPartners(response);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu đối tác:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/country/list",
        data: {},
      });
      setCountries(response);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu quốc gia:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchPartners("", "");
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Danh sách đối tác</h2>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Nhập tên đối tác"
            className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-3">
            <button
              onClick={() => fetchPartners(searchTerm, selectedCountry)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              🔎 Tìm kiếm
            </button>
            <button
              onClick={() => navigate("/partneradd")}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              ➕ Thêm mới
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            className="border p-2 text-sm rounded-md w-full md:w-1/6 bg-white shadow-sm"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">🌍 Chọn quốc gia</option>
            {countries.map((country) => (
              <option key={country.maQuocGia} value={country.maQuocGia}>
                {country.tenQuocGia}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="w-full border-collapse bg-white text-sm mt-4">
        <thead>
          <tr className="bg-[#EAECF0] text-[#667085] text-center font-normal">
            <th className="p-2 font-normal">STT</th>
            <th className="p-2 font-normal">Mã đối tác</th>
            <th className="p-2 font-normal">Tên đối tác</th>
            <th className="p-2 font-normal">Tên quốc gia</th>
            <th className="p-2 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {partners.map((partner, index) => (
            <tr key={partner.maDoiTac} className="hover:bg-gray-100 text-center border-b">
              <td className="p-2">{index + 1}</td>
              <td
                className="p-2 text-blue-500 cursor-pointer hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/partnerdetail/${partner.maDoiTac}`);
                }}
              >
                {partner.maDoiTac}
              </td>
              <td className="p-2">{partner.tenDoiTac}</td>
              <td className="p-2">{partner.tenQuocGia}</td>
              <td className="p-2">
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    onClick={() => navigate(`/partneredit/${partner.maDoiTac}`)}
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

export default PartnerList;
