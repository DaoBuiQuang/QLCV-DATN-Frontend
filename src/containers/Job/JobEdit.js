import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import callAPI from "../../utils/api";

function JobEdit() {
  const navigate = useNavigate();
  const { id } = useParams(); // lấy id ngành nghề từ URL

  const [maNganhNghe, setMaNganhNghe] = useState("");
  const [tenNganhNghe, setTenNganhNghe] = useState("");

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await callAPI({
          method: "get",
          endpoint: `/industry/${id}`,
          data: {
            maNganhNghe,
          },
        });

        setMaNganhNghe(response.data.maNganhNghe);
        setTenNganhNghe(response.data.tenNganhNghe);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin ngành nghề!", error);
      }
    };

    fetchJobDetail();
  }, [id]);

  const handleEditJob = async () => {
    try {
      await callAPI({
        method: "put", // hoặc "post" nếu backend bạn quy định khác
        endpoint: `/industry/edit`,
        data: {
          maNganhNghe,
          tenNganhNghe,
        },
      });

      alert("Cập nhật ngành nghề thành công!");
      navigate(-1); // quay lại trang trước
    } catch (error) {
      console.error("Lỗi khi cập nhật ngành nghề!", error);
    }
  };

  return (
    <div className="p-1 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Sửa ngành nghề</h2>
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
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
          <button
            onClick={handleEditJob}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Cập nhật ngành nghề
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobEdit;
