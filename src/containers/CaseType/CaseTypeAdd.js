import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";

function CaseTypeAdd() {
  const navigate = useNavigate();
  const [maLoaiVuViec, setMaLoaiVuViec] = useState("");
  const [tenLoaiVuViec, setTenLoaiVuViec] = useState("");
  const [moTa, setMoTa] = useState("");

  const handleAddCaseType = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/casetype/add",
        data: {
          maLoaiVuViec,
          tenLoaiVuViec,
          moTa,
        },
      });
      alert("Thêm loại vụ việc thành công!");
      setMaLoaiVuViec("");
      setTenLoaiVuViec("");
      setMoTa("");
    } catch (error) {
      console.error("Lỗi khi thêm loại vụ việc!", error);
    }
  };

  return (
    <div className="p-1 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Thêm loại vụ việc mới</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-left">Mã loại vụ việc</label>
            <input
              type="text"
              value={maLoaiVuViec}
              onChange={(e) => setMaLoaiVuViec(e.target.value)}
              placeholder="Nhập mã loại vụ việc"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-left">Tên loại vụ việc</label>
            <input
              type="text"
              value={tenLoaiVuViec}
              onChange={(e) => setTenLoaiVuViec(e.target.value)}
              placeholder="Nhập tên loại vụ việc"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 text-left">Mô tả</label>
            <textarea
              value={moTa}
              onChange={(e) => setMoTa(e.target.value)}
              placeholder="Nhập mô tả loại vụ việc"
              className="w-full p-2 mt-1 border rounded-lg h-24"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg" onClick={() => navigate(-1)}>
            Quay lại
          </button>
          <button
            onClick={handleAddCaseType}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Thêm loại vụ việc
          </button>
        </div>
      </div>
    </div>
  );
}

export default CaseTypeAdd;
