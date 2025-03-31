import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import callAPI from "../../utils/api";

function CaseTypeEdit() {
  const navigate = useNavigate();
  const { maLoaiVuViec } = useParams();
  const [tenLoaiVuViec, setTenLoaiVuViec] = useState("");
  const [moTa, setMoTa] = useState("");

  useEffect(() => {
    const fetchCaseType = async () => {
      try {
        const response = await callAPI({
          method: "post",
          endpoint: "/casetype/detail",
          data: { maLoaiVuViec },
        });
        setTenLoaiVuViec(response.tenLoaiVuViec || "");
        setMoTa(response.moTa || "");
      } catch (error) {
        console.error("Lỗi khi lấy thông tin loại vụ việc!", error);
      }
    };
    fetchCaseType();
  }, [maLoaiVuViec]);

  const handleEditCaseType = async () => {
    try {
      await callAPI({
        method: "put",
        endpoint: "/casetype/edit",
        data: {
          maLoaiVuViec,
          tenLoaiVuViec,
          moTa,
        },
      });
      alert("Cập nhật loại vụ việc thành công!");
      navigate(-1);
    } catch (error) {
      console.error("Lỗi khi cập nhật loại vụ việc!", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">✏️ Chỉnh sửa loại vụ việc</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Mã loại vụ việc</label>
            <input
              type="text"
              value={maLoaiVuViec}
              readOnly
              className="w-full p-2 mt-1 border rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700">Tên loại vụ việc</label>
            <input
              type="text"
              value={tenLoaiVuViec}
              onChange={(e) => setTenLoaiVuViec(e.target.value)}
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Mô tả</label>
            <textarea
              value={moTa}
              onChange={(e) => setMoTa(e.target.value)}
              className="w-full p-2 mt-1 border rounded-lg h-24"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg" onClick={() => navigate(-1)}>
            Quay lại
          </button>
          <button
            onClick={handleEditCaseType}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}

export default CaseTypeEdit;
