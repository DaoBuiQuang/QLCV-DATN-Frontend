import React, { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
function StaffList() {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Không tìm thấy token");
          return;
        }

        const response = await fetch("http://localhost:3000/api/nhansu", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu nhân sự");
        }

        const data = await response.json();
        setStaffs(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchStaffs();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Danh sách nhân sự</h2>
        {/* Thanh tìm kiếm */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="🔍 Nhập tên hoặc mã khách hàng"
            className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition">
            🔎 Tìm kiếm
          </button>
        </div>

        {/* Bộ lọc */}
        <div className="flex flex-wrap gap-3">
          <select className="border p-2 text-sm rounded-md w-full md:w-1/6 bg-white shadow-sm">
            <option>🔹 Đối tác</option>
          </select>
          <select className="border p-2 text-sm rounded-md w-full md:w-1/6 bg-white shadow-sm">
            <option>🌍 Quốc gia</option>
          </select>
          <select className="border p-2 text-sm rounded-md w-full md:w-1/6 bg-white shadow-sm">
            <option>🏢 Ngành nghề</option>
          </select>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-md shadow-sm transition">
            ➕ Thêm mới
          </button>
        </div>
      </div>

      <table className="w-full border-collapse bg-white text-sm mt-4">
        <thead>
          <tr className="bg-[#EAECF0] text-[#667085] text-center font-normal">
            <th className="p-2 font-normal">STT</th>
            <th className="p-2 font-normal">Mã nhân sự</th>
            <th className="p-2 font-normal">Họ tên</th>
            <th className="p-2 font-normal">Chức vụ</th>
            <th className="p-2 font-normal">Phòng ban</th>
            <th className="p-2 font-normal">Số điện thoại</th>
            <th className="p-2 font-normal">Email</th>
            <th className="p-2 font-normal">Ngày sinh</th>
            <th className="p-2 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((staff, index) => (
            <tr key={staff.maNhanSu} className="hover:bg-gray-100 text-center border-b">
              <td className="p-2">{index + 1}</td>
              <td className="p-2 text-blue-500 cursor-pointer">{staff.maNhanSu}</td>
              <td className="p-2">{staff.hoTen}</td>
              <td className="p-2">{staff.chucVu}</td>
              <td className="p-2">{staff.phongBan}</td>
              <td className="p-2">{staff.sdt}</td>
              <td className="p-2">{staff.email}</td>
              <td className="p-2">{staff.ngayThangNamSinh}</td>
              <td className="p-2">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">
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
