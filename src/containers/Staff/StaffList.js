import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
function StaffList() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      code: "T00001",
      name: "Nguyễn Văn A",
      client: "IPAC",
      date: "04-09-2024",
      address: "CA 94043, USA",
      country: "USA",
      status: "Ngừng",
      updateDate: "04-09-2024",
      industry: "Công nghệ",
    },
    {
      id: 2,
      code: "G00001",
      name: "Trần Thị B",
      client: "IPAC",
      date: "04-09-2024",
      address: "London EC3A, United Kingdom",
      country: "United Kingdom",
      status: "Hoạt động",
      updateDate: "04-09-2024",
      industry: "Thực phẩm",
    },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
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

      <table className="w-full border-collapse bg-white text-sm">
        <thead>
          <tr className="bg-[#EAECF0] text-[#667085] text-center font-normal">
            <th className="p-2 font-normal">Số thứ tự</th>
            <th className="p-2 font-normal">Mã khách hàng</th>
            <th className="p-2 font-normal">Tên khách hàng</th>
            <th className="p-2 font-normal">Client</th>
            <th className="p-2 font-normal">Ngày tạo</th>
            <th className="p-2 font-normal">Địa chỉ</th>
            <th className="p-2 font-normal">Quốc gia</th>
            <th className="p-2 font-normal">Trạng thái</th>
            <th className="p-2 font-normal">Ngày cập nhật</th>
            <th className="p-2 font-normal">Ngành nghề</th>
            <th className="p-2 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr
              key={customer.id}
              className="hover:bg-gray-100 text-center border-b"
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2 text-blue-500 cursor-pointer">
                {customer.code}
              </td>
              <td className="p-2">{customer.name}</td>
              <td className="p-2">{customer.client}</td>
              <td className="p-2">{customer.date}</td>
              <td className="p-2">{customer.address}</td>
              <td className="p-2">{customer.country}</td>
              <td className="p-2">{customer.status}</td>
              <td className="p-2">{customer.updateDate}</td>
              <td className="p-2">{customer.industry}</td>
              <td className="p-2 relative">
                <button className="p-2 hover:bg-gray-200 rounded-full">
                  <MoreHorizontal size={20} className="text-[#6495F5]" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StaffList;
