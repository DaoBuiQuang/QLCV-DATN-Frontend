import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";
function JobAdd() {
  const navigate = useNavigate();
  const [maNganhNghe, setMaNganhNghe] = useState("");
  const [tenNganhNghe, setTenNganhNghe] = useState("");
  const handleAddJob = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/industry/add",
        data: {
            maNganhNghe,
            tenNganhNghe,
        },
      });
      alert("Thêm quốc gia thành công!");
      setMaNganhNghe("");
      setTenNganhNghe("");
    } catch (error) {
      console.error("Lỗi khi thêm quốc gia!", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Thêm ngành nghề mới</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Mã ngành nghề</label>
            <input
              type="text"
              value={maNganhNghe}
              onChange={(e) => setMaNganhNghe(e.target.value)}
              placeholder="Nhập mã ngành nghề"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Tên ngành nghề</label>
            <input
              type="text"
              value={tenNganhNghe}
              onChange={(e) => setTenNganhNghe(e.target.value)}
              placeholder="Nhập tên ngành nghề"
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
            onClick={handleAddJob}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Thêm quốc gia
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobAdd;
