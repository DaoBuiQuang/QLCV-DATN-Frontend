import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";
import Select from "react-select";
function PartnerAdd() {
  const navigate = useNavigate();
  const [maDoiTac, setMaDoiTac] = useState("");
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

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleAddPartner = async () => {
    try {
      await callAPI({
        method: "post",
        endpoint: "/partner/add",
        data: {
          maDoiTac,
          tenDoiTac,
          maQuocGia,
        },
      });
      alert("Thêm đối tác thành công!");
      setMaDoiTac("");
      setTenDoiTac("");
      setMaQuocGia("");
    } catch (error) {
      console.error("Lỗi khi thêm đối tác!", error);
    }
  };
  const formatOptions = (data, valueKey, labelKey) => {
    return data.map(item => ({
      value: item[valueKey],
      label: item[labelKey]
    }));
  };
  return (
    <div className="p-1 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Thêm đối tác mới</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-left">Mã đối tác</label>
            <input
              type="text"
              value={maDoiTac}
              onChange={(e) => setMaDoiTac(e.target.value)}
              placeholder="Nhập mã đối tác"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-left">Tên đối tác</label>
            <input
              type="text"
              value={tenDoiTac}
              onChange={(e) => setTenDoiTac(e.target.value)}
              placeholder="Nhập tên đối tác"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-left">Quốc gia</label>
            <Select
              options={formatOptions(countries, "maQuocGia", "tenQuocGia")}
              value={maQuocGia ? formatOptions(countries, "maQuocGia", "tenQuocGia").find(opt => opt.value === maQuocGia) : null}
              onChange={selectedOption => setMaQuocGia(selectedOption?.value)}
              placeholder="Chọn quốc gia"
              className="w-full  mt-1  rounded-lg"
              isClearable
            />
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
            onClick={handleAddPartner}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Thêm đối tác
          </button>
        </div>
      </div>
    </div>
  );
}

export default PartnerAdd;
