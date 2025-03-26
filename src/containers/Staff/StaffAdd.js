import React from "react";

function StaffAdd() {
  return (
    <div className="p-6 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-2 rounded-lg shadow-md w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Mã khách hàng */}
          <div>
            <label className="block text-gray-700">Mã khách hàng</label>
            <input
              type="text"
              value="D0001"
              readOnly
              className="w-full p-2 mt-1 bg-gray-200 border rounded-lg"
            />
          </div>
          {/* Tên khách hàng */}
          <div>
            <label className="block text-gray-700">Tên khách hàng</label>
            <input
              type="text"
              placeholder="Nhập tên khách hàng"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          {/* Địa chỉ */}
          <div>
            <label className="block text-gray-700">Địa chỉ</label>
            <input
              type="text"
              placeholder="Nhập địa chỉ"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Đối tác */}
          <div>
            <label className="block text-gray-700">Đối tác</label>
            <input
              type="text"
              placeholder="Nhập đối tác"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          {/* Mô tả */}
          <div>
            <label className="block text-gray-700">Mô tả</label>
            <textarea
              placeholder="Nhập mô tả"
              className="w-full p-2 mt-1 border rounded-lg h-20"
            ></textarea>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Ghi chú */}
          <div>
            <label className="block text-gray-700">Ghi chú</label>
            <textarea
              placeholder="Nhập ghi chú"
              className="w-full p-2 mt-1 border rounded-lg h-20"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">
            Quay lại
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Thêm khách hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default StaffAdd;