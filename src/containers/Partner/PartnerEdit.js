import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import callAPI from "../../utils/api";

function PartnerEdit() {
  const navigate = useNavigate();
  const { maDoiTac } = useParams();
  const [tenDoiTac, setTenDoiTac] = useState("");
  const [maQuocGia, setMaQuocGia] = useState("");
  const [countries, setCountries] = useState([]);

  // Fetch danh sách quốc gia
  const fetchCountries = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/country/list",
        data: { search: "" },
      });
      setCountries(response);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu quốc gia:", error);
    }
  };

  // Fetch thông tin đối tác cần chỉnh sửa
  const fetchPartnerDetails = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/partner/detail",
        data: { maDoiTac },
      });
      setTenDoiTac(response.tenDoiTac);
      setMaQuocGia(response.maQuocGia);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin đối tác:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchPartnerDetails();
  }, [maDoiTac]);

  const handleUpdatePartner = async () => {
    try {
      await callAPI({
        method: "put",
        endpoint: "/partner/update",
        data: {
          maDoiTac,
          tenDoiTac,
          maQuocGia,
        },
      });
      alert("Cập nhật đối tác thành công!");
      navigate(-1);
    } catch (error) {
      console.error("Lỗi khi cập nhật đối tác!", error);
    }
  };

  return (
    <div className="p-1 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">✏️ Chỉnh sửa đối tác</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Mã đối tác</label>
            <input
              type="text"
              value={maDoiTac}
              disabled
              className="w-full p-2 mt-1 border rounded-lg bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Tên đối tác</label>
            <input
              type="text"
              value={tenDoiTac}
              onChange={(e) => setTenDoiTac(e.target.value)}
              placeholder="Nhập tên đối tác"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Quốc gia</label>
            <select
              value={maQuocGia}
              onChange={(e) => setMaQuocGia(e.target.value)}
              className="w-full p-2 mt-1 border rounded-lg bg-white"
            >
              <option value="">Chọn quốc gia</option>
              {countries.map((country) => (
                <option key={country.maQuocGia} value={country.maQuocGia}>
                  {country.tenQuocGia}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
          <button
            onClick={handleUpdatePartner}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Cập nhật đối tác
          </button>
        </div>
      </div>
    </div>
  );
}

export default PartnerEdit;
