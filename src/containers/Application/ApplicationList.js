import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import callAPI from "../../utils/api";
import Select from "react-select";
function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchApplications = async (searchValue) => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/application/list",
        data: { search: searchValue },
      });
      setApplications(response);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn đăng ký:", error);
    }
  };
  const formatOptions = (data, valueKey, labelKey) => {
    return data.map(item => ({
      value: item[valueKey],
      label: item[labelKey]
    }));
  };
  useEffect(() => {
    fetchApplications("");
  }, []);

  return (
    <div className="p-1 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Danh sách đơn đăng kí</h2>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Nhập mã đơn hoặc mã hồ sơ"
            className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-3">
            <button
              onClick={() => fetchApplications(searchTerm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              🔎 Tìm kiếm
            </button>
            <button
              onClick={() => navigate("/applicationadd")}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              ➕ Thêm mới
            </button>
          </div>

        </div>
       
      </div>
      <div class="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-sm mt-4">
          <thead>
            <tr className="bg-[#EAECF0] text-[#667085] text-center font-normal">
              <th className="p-2">STT</th>
              <th className="p-2">Số Đơn</th>
              <th className="p-2">Mã hồ sơ vụ việc</th>
              <th className="p-2">Mã nhãn hiệu</th>
              <th className="p-2">Ngày nộp đơn</th>
              <th className="p-2">Ngày hoàn thành hồ sơ tài liệu</th>
              <th className="p-2">Ngày có kết quả thẩm đi</th>
              <th className="p-2">Ngày quyết định đơn hợp lệ</th>
              <th className="p-2">Ngày công bố đơn dự kiến</th>
              <th className="p-2">Ngày công bố đơn</th>
              <th className="p-2">Ngày thẩm định nội dung dự kiến</th>
              <th className="p-2">Ngày kết quả thâm định nội dung</th>
              <th className="p-2">Trạng thái hoàn thành hồ sơ tài liệu</th>
              <th className="p-2">Trạng thái đơn</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app.maDonDangKy} className="hover:bg-gray-100 text-center border-b">
                <td className="p-2">{index + 1}</td>
                <td
                  className="p-2 text-blue-500 cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/applicationdetail/${app.maDonDangKy}`);
                  }}
                >
                  {app.maDonDangKy}
                </td>
                <td className="p-2">{app.maHoSoVuViec}</td>
                <td className="p-2">
                  {app.ngayNopDon ? new Date(app.ngayNopDon).toLocaleDateString() : ""}
                </td>
                <td className="p-2">
                  {app.ngayHoanThanhHoSoTaiLieu ? new Date(app.ngayHoanThanhHoSoTaiLieu).toLocaleDateString() : ""}
                </td>
                <td className="p-2">{app.trangThaiHoanThienHoSoTaiLieu}</td>
                <td className="p-2">
                  {app.ngayQuyetDinhDonHopLeDuKien ? new Date(app.ngayQuyetDinhDonHopLeDuKien).toLocaleDateString() : ""}
                </td>
                <td className="p-2">
                  {app.ngayQuyetDinhDonHopLe ? new Date(app.ngayQuyetDinhDonHopLe).toLocaleDateString() : ""}
                </td>
                <td className="p-2">
                  {app.ngayCongBoDonDuKien ? new Date(app.ngayCongBoDonDuKien).toLocaleDateString() : ""}
                </td>
                <td className="p-2">
                  {app.ngayCongBoDon ? new Date(app.ngayCongBoDon).toLocaleDateString() : ""}
                </td>
                <td className="p-2">
                  {app.ngayThamDinhNoiDungDuKien ? new Date(app.ngayThamDinhNoiDungDuKien).toLocaleDateString() : ""}
                </td>
                <td className="p-2">
                  {app.ngayKetQuaThamDinhNoiDung ? new Date(app.ngayKetQuaThamDinhNoiDung).toLocaleDateString() : ""}
                </td>

                <td className="p-2">{app.trangThaiDon}</td>
                <td className="p-2">
                  <div className="flex gap-2 justify-center">
                    <button
                      className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                      onClick={() => navigate(`/applicationedit/${app.maDonDangKy}`)}
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
    </div>
  );
}

export default ApplicationList;
