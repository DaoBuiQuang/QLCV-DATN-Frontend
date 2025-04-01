import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import callAPI from "../../utils/api";

function StaffList() {
  const [staffs, setStaffs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchStaffs = async (searchValue) => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/staff/list",
        data: {
          hoTen: searchValue
        },
      });
      setStaffs(response);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu nhân viên:", error);
    }
  };

  useEffect(() => {
    fetchStaffs("");
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Danh sách nhân sự</h2>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Nhập tên nhân viên"
            className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-3">
            <button
              onClick={() => fetchStaffs(searchTerm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              🔎 Tìm kiếm
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/staffadd")}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-md transition"
              >
                ➕ Thêm mới
              </button>
            </div>
          </div>

        </div>
      </div>

      <table className="w-full border-collapse bg-white text-sm mt-4">
        <thead>
          <tr className="bg-[#EAECF0] text-[#667085] text-center font-normal">
            <th className="p-2">STT</th>
            <th className="p-2">Mã NV</th>
            <th className="p-2">Họ Tên</th>
            <th className="p-2">Chức Vụ</th>
            <th className="p-2">Phòng Ban</th>
            <th className="p-2">SĐT</th>
            <th className="p-2">Email</th>
            <th className="p-2 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((staff, index) => (
            <tr key={staff.maNhanSu} className="hover:bg-gray-100 text-center border-b">
              <td className="p-2">{index + 1}</td>
              <td className="p-2 text-blue-500 cursor-pointer hover:underline" onClick={(e) => {
                e.stopPropagation();
                navigate(`/staffdetail/${staff.maNhanSu}`);
              }}>{staff.maNhanSu}</td>
              <td className="p-2">{staff.hoTen}</td>
              <td className="p-2">{staff.chucVu}</td>
              <td className="p-2">{staff.phongBan}</td>
              <td className="p-2">{staff.sdt}</td>
              <td className="p-2">{staff.email}</td>
              <td className="p-2">
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    onClick={() => navigate(`/staffedit/${staff.maNhanSu}`)}
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

export default StaffList;