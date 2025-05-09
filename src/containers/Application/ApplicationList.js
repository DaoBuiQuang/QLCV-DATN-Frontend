import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import callAPI from "../../utils/api";
import Select from "react-select";
import { exportToExcel } from "../../components/ExportFile/ExportExcel";
function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [productAndService, setProductAndService] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedProductAndService, setSelectedProductAndService] = useState("");
  const fetchApplications = async (searchValue) => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/application/list",
        data: { searchText: searchValue },
      });
      setApplications(response);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn đăng ký:", error);
    }
  };
  const fetchBrands = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/brand/shortlist",
        data: {},
      });
      setBrands(response);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu nhãn hiệu:", error);
    }
  };
  const fetchItems = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/productsandservices/list",
        data: {},
      });
      setProductAndService(response);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm/dịch vụ:", error);
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
    fetchBrands();
    fetchItems();
  }, []);
  const columns = [
    { label: "Mã đơn đăng ký", key: "maDonDangKy" },
    { label: "Số Đơn", key: "soDon" },
    { label: "Mã hồ sơ vụ việc", key: "maHoSoVuViec" },
    { label: "Mã nhãn hiệu", key: "maNhanHieu" },
    { label: "Trạng thái đơn", key: "trangThaiDon" },
    { label: "Trạng thái hoàn thành hồ sơ tài liệu", key: "trangThaiHoanThienHoSoTaiLieu" },
    { label: "Ngày nộp đơn", key: "ngayNopDon" },
    { label: "Ngày hoàn thành hồ sơ tài liệu", key: "ngayHoanThanhHoSoTaiLieu" },
    { label: "Ngày có kết quả thẩm định hình thức", key: "ngayKQThamDinhHinhThuc" },
    { label: "Ngày công bố đơn", key: "ngayCongBoDon" },
    { label: "Ngày có kết quả thẩm định nội dung", key: "ngayKQThamDinhND" },
    { label: "Ngày trả lời kết quả thẩm định nội dung", key: "ngayTraLoiKQThamDinhND" },
    { label: "Ngày thông báo cấp bằng", key: "ngayThongBaoCapBang" },
    { label: "Ngày nộp phí cấp bằng", key: "ngayNopPhiCapBang" },
    { label: "Ngày nhận bằng", key: "ngayNhanBang" },
    { label: "Số bằng", key: "soBang" },
    { label: "Ngày cấp bằng", key: "ngayCapBang" },
    { label: "Ngày hết hạn bằng", key: "ngayHetHanBang" },
    { label: "Ngày gửi bằng cho khách hàng", key: "ngayGuiBangChoKhachHang" },
  ];
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
              onClick={() => exportToExcel(applications, columns, "DanhSachĐonK")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              📁 Xuất Excel
            </button>

            {/* <button
              onClick={() => navigate("/applicationadd")}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              ➕ Thêm mới
            </button> */}
          </div>

        </div>
        <div className="flex flex-wrap gap-3">
          <Select
            options={formatOptions(brands, "maNhanHieu", "tenNhanHieu")}
            value={selectedBrand ? formatOptions(brands, "maNhanHieu", "tenNhanHieu").find(opt => opt.value === selectedBrand) : null}
            onChange={selectedOption => setSelectedBrand(selectedOption?.value)}
            placeholder="Chọn nhãn hiệu"
            className="w-full md:w-1/6 text-left"
            isClearable
          />
          <Select
            options={formatOptions(productAndService, "maSPDV", "tenSPDV")}
            value={selectedProductAndService ? formatOptions(productAndService, "maSPDV", "tenSPDV").find(opt => opt.value === selectedProductAndService) : null}
            onChange={selectedOption => setSelectedProductAndService(selectedOption?.value)}
            placeholder="Chọn sản phẩm/dịch vụ"
            className="w-full md:w-1/6 text-left"
            isClearable
          />
        </div>

      </div>
      <div class="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-sm mt-4">
          <thead>
            <tr className="bg-[#EAECF0] text-[#667085] text-center font-normal">
              <th className="p-2">STT</th>
              <th className="p-2">Mã đơn đăng ký</th>
              <th className="p-2">Số Đơn</th>
              <th className="p-2">Mã hồ sơ vụ việc</th>
              <th className="p-2">Mã nhãn hiệu</th>
              <th className="p-2">Trạng thái đơn</th>
              <th className="p-2">Trạng thái hoàn thành hồ sơ tài liệu</th>
              <th className="p-2">Ngày nộp đơn</th>
              <th className="p-2">Ngày hoàn thành hồ sơ tài liệu</th>
              <th className="p-2">Ngày có kết quả thẩm định hình thức</th>
              <th className="p-2">Ngày công bố đơn</th>
              <th className="p-2">Ngày có kết quả thẩm định nội dung</th>
              <th className="p-2">Ngày trả lời kết quả thẩm định nội dung</th>
              <th className="p-2">Ngày thông báo cấp bằng</th>
              <th className="p-2">Ngày nộp phí cấp bằng</th>
              <th className="p-2">Ngày nhận bằng</th>
              <th className="p-2">Số bằng</th>
              <th className="p-2">Ngày cấp bằng</th>
              <th className="p-2">Ngày hết hạn bằng</th>
              <th className="p-2">Ngày gửi bằng cho khách hàng </th>
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
                <td className="p-2">{app.soDon}</td>
                <td className="p-2">{app.maHoSoVuViec}</td>
                <td className="p-2">{app.maNhanHieu}</td>
                <td className="p-2">{app.trangThaiDon}</td>
                <td className="p-2">
                  <div className="flex flex-col items-center">
                    <span>
                      {app.trangThaiHoanThienHoSoTaiLieu === "hoan_thanh"
                        ? "Hoàn thành"
                        : app.trangThaiHoanThienHoSoTaiLieu === "chua_hoan_thanh"
                          ? "Chưa hoàn thành"
                          : app.trangThaiHoanThienHoSoTaiLieu}
                    </span>

                    {app.ngayHoanThanhHoSoTaiLieu_DuKien && app.trangThaiHoanThienHoSoTaiLieu !== "hoan_thanh" && (
                      (() => {
                        const today = new Date();
                        const dueDate = new Date(app.ngayHoanThanhHoSoTaiLieu_DuKien);
                        const diffTime = dueDate - today;
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        const textColor = diffDays < 0 ? "text-red-500" : "text-yellow-500";

                        return (
                          <span className={`text-xs ${textColor}`}>
                            {diffDays > 0
                              ? `Còn ${diffDays} ngày`
                              : diffDays === 0
                                ? "Hạn là hôm nay"
                                : `Quá hạn ${Math.abs(diffDays)} ngày`}
                          </span>
                        );
                      })()
                    )}
                  </div>

                </td>

                <td className="p-2">
                  {app.ngayNopDon ? new Date(app.ngayNopDon).toLocaleDateString('vi-VN') : ""}
                </td>
                <td className="p-2">
                  {app.ngayHoanThanhHoSoTaiLieu ? new Date(app.ngayHoanThanhHoSoTaiLieu).toLocaleDateString('vi-VN') : ""}
                </td>
                <td className="p-2">
                  {app.ngayKQThamDinhHinhThuc ? new Date(app.ngayKQThamDinhHinhThuc).toLocaleDateString('vi-VN') : ""}
                </td>
                <td className="p-2">
                  {app.ngayCongBoDon ? new Date(app.ngayCongBoDon).toLocaleDateString('vi-VN') : ""}
                </td>
                <td className="p-2">
                  {app.ngayKQThamDinhND ? new Date(app.ngayKQThamDinhND).toLocaleDateString('vi-VN') : ""}
                </td>
                <td className="p-2">
                  {app.ngayTraLoiKQThamDinhND ? new Date(app.ngayTraLoiKQThamDinhND).toLocaleDateString('vi-VN') : ""}
                </td>
                {/* test */}
                <td className="p-2">
                  {app.ngayThongBaoCapBang ? new Date(app.ngayThongBaoCapBang).toLocaleDateString('vi-VN') : ""}
                </td>
                <td className="p-2">
                  {app.ngayNopPhiCapBang ? new Date(app.ngayNopPhiCapBang).toLocaleDateString('vi-VN') : ""}
                </td>
                <td className="p-2">
                  {app.ngayNhanBang ? new Date(app.ngayNhanBang).toLocaleDateString('vi-VN') : ""}
                </td>
                <td className="p-2">
                  {app.soBang}
                </td>
                <td className="p-2">
                  {app.ngayCapBang ? new Date(app.ngayCapBang).toLocaleDateString('vi-VN') : ""}
                </td>
                <td className="p-2">
                  {app.ngayHetHanBang ? new Date(app.ngayHetHanBang).toLocaleDateString('vi-VN') : ""}
                </td>
                <td className="p-2">
                  {app.ngayGuiBangChoKhachHang ? new Date(app.ngayGuiBangChoKhachHang).toLocaleDateString('vi-VN') : ""}
                </td>

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
