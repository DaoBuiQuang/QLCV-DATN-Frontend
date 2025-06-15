import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import callAPI from "../../utils/api";
import Select from "react-select";
import { exportToExcel } from "../../components/ExportFile/ExportExcel";
import FieldSelector from "../../components/FieldSelector";
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { DatePicker, Modal, Spin, Pagination } from 'antd';
import { useTranslation } from "react-i18next";
function ApplicationList() {
  const role = useSelector((state) => state.auth.role);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [productAndService, setProductAndService] = useState([]);
  const [selectedProductAndService, setSelectedProductAndService] = useState([]);
  const [selectedTrangThaiDon, setSelectedTrangThaiDon] = useState(null);

  const [selectedField, setSelectedField] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedHanXuLy, setSelectedHanXuLy] = useState(null);
  const [sortByHanXuLy, setSortByHanXuLy] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const filterCondition = {
    selectedField: selectedField?.value || "",
    fromDate,
    toDate,
    hanXuLyFilter: selectedHanXuLy?.value || "",
    sortByHanXuLy: sortByHanXuLy,
  };
  const trangThaiDonOptions = [
    { value: "Nộp đơn", label: "Nộp đơn" },
    { value: "Hoàn thành hồ sơ tài liệu", label: "Hoàn thành hồ sơ tài liệu" },
    { value: "Thẩm định hình thức", label: "Thẩm định hình thức" },
    { value: "Công bố đơn", label: "Công bố đơn" },
    { value: "Thẩm định nội dung", label: "Thẩm định nội dung" },
    { value: "Trả lời thẩm định nội dung", label: "Trả lời thẩm định nội dung" },
    { value: "Hoàn thành nhận bằng", label: "Hoàn thành nhận bằng" },
    { value: "Chờ nhận bằng", label: "Chờ nhận bằng" },
  ];

  const allFieldOptions = [
    { label: "Mã đơn đăng ký", key: "maDonDangKy" },
    { label: "Số Đơn", key: "soDon" },
    { label: "Mã hồ sơ vụ việc", key: "maHoSoVuViec" },
    { label: "Mã nhãn hiệu", key: "maNhanHieu" },
    { label: "Danh sách SPDV", key: "dsSPDV" },
    { label: "Trạng thái đơn", key: "trangThaiDon" },
    { label: "Hạn xử lý", key: "hanXuLy" },
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
  const hiddenFieldKeys = [
    "soBang",
    "ngayCapBang",
    "ngayHetHanBang",
    "ngayGuiBangChoKhachHang",
    "ngayNhanBang",
    "ngayTraLoiKQThamDinhND",
    "dsSPDV"
  ];
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [selectedFields, setSelectedFields] = useState(
    allFieldOptions
      .filter(field => !hiddenFieldKeys.includes(field.key))
      .map(field => field.key)
  );
  const fetchApplications = async (searchValue, page = 1, size = 10) => {
    setLoading(true);
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/application/list",
        data: { searchText: searchValue, maNhanHieu: selectedBrand, maSPDVList: selectedProductAndService, trangThaiDon: selectedTrangThaiDon, fields: selectedFields, filterCondition, pageIndex: page, pageSize: size, },
      });
      setApplications(response.data || []);
      setTotalItems(response.pagination?.totalItems || 0);
      setPageIndex(response.pagination?.pageIndex || 1);
      setPageSize(response.pagination?.pageSize || 10);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn đăng ký:", error);
    } finally {
      setLoading(false);
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
  const columns = allFieldOptions
    .filter(field => selectedFields.includes(field.key))
    .map(field => ({ label: field.label, key: field.key }));


  const fieldOptions = [
    { value: "ngayNopDon", label: "Ngày nộp đơn" },
    { value: "ngayHoanThanhHoSoTaiLieu", label: "Ngày hoàn thành hồ sơ tài liệu" },
    { value: "ngayKQThamDinhHinhThuc", label: "Ngày chấp nhận đơn hợp lệ" },
    { value: "ngayCongBoDon", label: "Ngày công bố đơn" },
    { value: "ngayKQThamDinhND", label: "Ngày kết quả thẩm định nội dung đơn" },
    { value: "ngayThongBaoCapBang", label: "Ngày thông báo cấp bằng" },
    { value: "ngayNopPhiCapBang", label: "Ngày nộp phí cấp bằng" },
    { value: "ngayGuiBangChoKhachHang", label: "Ngày gửi bằng cho khách hàng" },
    { value: "ngayHetHanBang", label: "Ngày hết hạn bằng" },
    // Thêm trường khác nếu cần
  ];
  const hanXuLyOptions = [
    { value: "<7", label: "Còn hạn dưới 7 ngày" },
    { value: "<3", label: "Còn hạn dưới 3 ngày" },
    { value: "overdue", label: "Đã quá hạn" }
  ];

  const [showFilters, setShowFilters] = useState(false);
  const getTenSPDVChuoi = (spdvList) => {
    if (!Array.isArray(spdvList) || spdvList.length === 0) return "";

    return spdvList
      .map(sp => {
        const found = productAndService.find(p => p.maSPDV === sp.maSPDV);
        return found?.tenSPDV || `${sp.maSPDV}`;
      })
      .join(", ");
  };
  const handleDeleteApplication = async () => {
    await callAPI({ method: "post", endpoint: "/application/delete", data: { maDonDangKy: applicationToDelete } });
    setShowDeleteModal(false);
    setApplicationToDelete(null);
    fetchApplications(searchTerm);
  };
  const handleClearFilters = () => {
    setSelectedBrand(null);
    setSelectedProductAndService([]);
    setSelectedTrangThaiDon(null);
    setSelectedField(null);
    setFromDate(null);
    setToDate(null);
    setSelectedHanXuLy(null);
    setSortByHanXuLy(false);
  };

  return (
    <div className="p-1 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Danh sách đơn đăng ký</h2>
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
              onClick={() => fetchApplications(searchTerm, 1, pageSize)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              🔎 Tìm kiếm
            </button>
            <button
              onClick={() => exportToExcel(applications, allFieldOptions, "DanhSachĐonK")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              📁 Xuất Excel
            </button>
            <button
              onClick={() => setShowFieldModal(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              Chọn cột hiển thị
            </button>
            {/* <button
              onClick={() => navigate("/applicationadd")}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              ➕ Thêm mới
            </button> */}
          </div>

        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-1 rounded-lg shadow-md transition"
        >
          {showFilters ? "Ẩn bộ lọc" : "🔽 Bộ lọc nâng cao"}
        </button>
        <Modal
          title="Bộ lọc nâng cao"
          visible={showFilters}
          onCancel={() => setShowFilters(false)}
          footer={[
            <button
              key="clear"
              onClick={handleClearFilters}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md mr-2"
            >
              🧹 Xóa bộ lọc
            </button>,
            <button
              key="cancel"
              onClick={() => setShowFilters(false)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
            >
              Đóng
            </button>,
            <button
              key="ok"
              onClick={() => setShowFilters(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Áp dụng
            </button>
          ]}
          width={1000}
        >
          <div className="flex flex-wrap gap-3">
            <Select
              options={formatOptions(brands, "maNhanHieu", "tenNhanHieu")}
              value={selectedBrand ? formatOptions(brands, "maNhanHieu", "tenNhanHieu").find(opt => opt.value === selectedBrand) : null}
              onChange={selectedOption => setSelectedBrand(selectedOption?.value)}
              placeholder="Chọn nhãn hiệu"
              className="w-full md:w-1/4 text-left"
              isClearable
            />
            <Select
              options={formatOptions(productAndService, "maSPDV", "tenSPDV")}
              value={formatOptions(productAndService, "maSPDV", "tenSPDV").filter(opt =>
                selectedProductAndService?.includes(opt.value)
              )}
              onChange={selectedOptions =>
                setSelectedProductAndService(selectedOptions ? selectedOptions.map(opt => opt.value) : [])
              }
              placeholder="Chọn sản phẩm/dịch vụ"
              className="w-full md:w-1/4 text-left"
              isClearable
              isMulti
            />
            <Select
              options={trangThaiDonOptions}
              value={trangThaiDonOptions.find(opt => opt.value === selectedTrangThaiDon)}
              onChange={selectedOption =>
                setSelectedTrangThaiDon(selectedOption ? selectedOption.value : null)
              }
              placeholder="Chọn trạng thái đơn"
              className="w-full md:w-1/4 text-left"
              isClearable
            />

            {/* Dòng 2: Lọc theo thời gian */}
            <div className="w-full mt-4">
              <label className="block text-gray-500 font-medium text-sm mb-2">
                📅 Lọc theo mốc thời gian
              </label>
              <div className="flex flex-wrap gap-3">
                <div className="w-full md:w-1/4">
                  <Select
                    options={fieldOptions}
                    value={selectedField}
                    onChange={(option) => setSelectedField(option)}
                    placeholder="Chọn trường ngày"
                    isClearable
                  />
                </div>
                <DatePicker
                  value={fromDate ? dayjs(fromDate) : null}
                  onChange={(date) =>
                    setFromDate(dayjs.isDayjs(date) && date.isValid() ? date.format("YYYY-MM-DD") : null)
                  }
                  format="DD/MM/YYYY"
                  placeholder="Từ ngày"
                  className="w-full md:w-1/6"
                />
                <DatePicker
                  value={toDate ? dayjs(toDate) : null}
                  onChange={(date) =>
                    setToDate(dayjs.isDayjs(date) && date.isValid() ? date.format("YYYY-MM-DD") : null)
                  }
                  format="DD/MM/YYYY"
                  placeholder="Đến ngày"
                  className="w-full md:w-1/6"
                />
              </div>
            </div>
            <div className="w-full mt-4">
              <label className="block text-gray-500 font-medium text-sm mb-2">
                📅 Lọc theo hạn xử lý
              </label>
              <div className="flex flex-wrap gap-3 w-full mt-4">
                <Select
                  options={hanXuLyOptions}
                  value={selectedHanXuLy}
                  onChange={(option) => setSelectedHanXuLy(option)}
                  placeholder="Lọc theo hạn xử lý"
                  isClearable
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={sortByHanXuLy}
                    onChange={(e) => setSortByHanXuLy(e.target.checked)}
                  />
                  <label>Sắp xếp theo hạn xử lý</label>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div class="overflow-x-auto">
        <Spin spinning={loading} tip="Loading..." size="large">
          <table className="w-full border-collapse bg-white text-sm mt-4">
            <thead>
              <tr className="bg-[#EAECF0] text-[#667085] text-center font-normal">
                <th className="p-2 text-table border-r">STT</th>
                {columns.map((col, idx) => (
                  <th key={col.key} className={`p-2 text-table ${idx < columns.length - 1 ? "border-r" : ""}`}>
                    {col.label}
                  </th>
                ))}
                <th className="p-2 text-table"></th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app.maDonDangKy} className="group hover:bg-gray-100 text-center border-b relative">
                  <td className="p-2 text-table border-r">{index + 1}</td>
                  {columns.map((col, colIndex) => {
                    const commonClass = `p-2 text-table ${colIndex < columns.length - 1 ? "border-r" : ""}`;
                    let content = app[col.key];

                    const isDateField = [
                      "ngayNopDon", "ngayHoanThanhHoSoTaiLieu", "ngayKQThamDinhHinhThuc",
                      "ngayCongBoDon", "ngayKQThamDinhND", "ngayTraLoiKQThamDinhND",
                      "ngayThongBaoCapBang", "ngayNopPhiCapBang", "ngayNhanBang",
                      "ngayCapBang", "ngayHetHanBang", "ngayGuiBangChoKhachHang"
                    ];

                    if (isDateField.includes(col.key)) {
                      return (
                        <td key={col.key} className={commonClass}>
                          {content ? new Date(content).toLocaleDateString("vi-VN") : ""}
                        </td>
                      );
                    }

                    if (col.key === "maDonDangKy") {
                      return (
                        <td
                          key={col.key}
                          className={`${commonClass} text-blue-500 cursor-pointer hover:underline`}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/applicationdetail/${app.maDonDangKy}`);
                          }}
                        >
                          {app.maDonDangKy}
                        </td>
                      );
                    }

                    if (col.key === "dsSPDV") {
                      return (
                        <td key={col.key} className={commonClass}>
                          {getTenSPDVChuoi(app.dsSPDV)}
                        </td>
                      );
                    }

                    if (col.key === "hanXuLy") {
                      const days = parseInt(app.hanXuLy, 10);
                      let text = "";
                      let textColor = "";

                      if (!isNaN(days)) {
                        if (days < 0) {
                          text = `Quá hạn ${Math.abs(days)} ngày`;
                          textColor = "text-red-500";
                        } else if (days <= 7) {
                          text = `Còn ${days} ngày`;
                          textColor = "text-yellow-500";
                        } else {
                          text = `Còn ${days} ngày`;
                          textColor = "text-green-600";
                        }
                      }

                      return (
                        <td key={col.key} className={`p-2 font-semibold ${textColor} ${colIndex < columns.length - 1 ? "border-r" : ""}`}>
                          {text}
                        </td>
                      );
                    }

                    if (col.key === "trangThaiHoanThienHoSoTaiLieu") {
                      return (
                        <td className={`p-2 min-w-[120px] ${colIndex < columns.length - 1 ? "border-r" : ""}`} key={col.key}>
                          <div className="flex flex-col items-center">
                            <span>
                              {app.trangThaiHoanThienHoSoTaiLieu === "hoan_thanh"
                                ? "Hoàn thành"
                                : app.trangThaiHoanThienHoSoTaiLieu === "chua_hoan_thanh"
                                  ? "Chưa hoàn thành"
                                  : app.trangThaiHoanThienHoSoTaiLieu}
                            </span>

                            {app.ngayHoanThanhHoSoTaiLieu_DuKien &&
                              app.trangThaiHoanThienHoSoTaiLieu !== "hoan_thanh" && (() => {
                                const today = new Date();
                                const dueDate = new Date(app.ngayHoanThanhHoSoTaiLieu_DuKien);
                                const diffTime = dueDate - today;
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                const textColor = diffDays < 0 ? "text-red-500" : "text-yellow-500";

                                return (
                                  <div>
                                    <span className={`text-xs ${textColor}`}>
                                      {diffDays > 0
                                        ? `Còn ${diffDays} ngày`
                                        : diffDays === 0
                                          ? "Hạn là hôm nay"
                                          : `Quá hạn ${Math.abs(diffDays)} ngày`}
                                    </span>
                                    {app.taiLieuChuaNop?.length > 0 && (
                                      <ul className="mt-1 list-disc list-inside text-xs text-gray-600">
                                        {app.taiLieuChuaNop.map((tl, index) => (
                                          <li key={index}>{tl.tenTaiLieu}</li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                );
                              })()}
                          </div>
                        </td>
                      );
                    }

                    return (
                      <td key={col.key} className={commonClass}>
                        {content}
                      </td>
                    );
                  })}

                  <td className="p-2 text-table">
                    {(role === "admin" || role === "staff") && (
                      <div className="hidden group-hover:flex gap-2 absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded shadow-md z-10">
                        <button
                          className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                          onClick={() => navigate(`/applicationedit/${app.maDonDangKy}`)}
                        >
                          📝
                        </button>
                        <button
                          className="px-3 py-1 bg-red-200 text-red-600 rounded-md hover:bg-red-300"
                          onClick={() => {
                            setApplicationToDelete(app.maDonDangKy);
                            setShowDeleteModal(true);
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Spin>
      </div>
      <div className="mt-4 flex flex-col items-center space-y-2">
        {totalItems > 0 && (
          <div className="text-sm text-gray-500 text-center ">
            <span className="mr-1"></span>
            <span className="font-medium text-gray-800">
              {(pageIndex - 1) * pageSize + 1} - {Math.min(pageIndex * pageSize, totalItems)}
            </span>
            <span className="mx-1"> / </span>
            <span className="font-medium text-gray-800">{totalItems}</span>
            <span className="ml-1"></span>
          </div>
        )}
        <Pagination
          current={pageIndex}
          total={totalItems}
          pageSize={pageSize}
          onChange={(page, size) => {
            setPageIndex(page);
            setPageSize(size);
            fetchApplications(searchTerm, page, size)
          }}
          showSizeChanger
          pageSizeOptions={['5', '10', '20', '50']}
          locale={{ items_per_page: t("bản ghi") }}
        />
      </div>
      <FieldSelector
        visible={showFieldModal}
        allFieldOptions={allFieldOptions}
        selectedFields={selectedFields}
        setSelectedFields={setSelectedFields}
        onClose={() => setShowFieldModal(false)}
        onConfirm={() => setShowFieldModal(false)}
      />

      <Modal
        title="Xác nhận xóa"
        open={showDeleteModal}
        onOk={handleDeleteApplication}
        onCancel={() => setShowDeleteModal(false)}
        okText="Xác nhận xóa"
        cancelText="Hủy"
        okButtonProps={{
          className: "bg-red-500 hover:bg-red-600 text-white",
        }}
      >
        <p>Bạn có chắc chắn muốn xóa đơn đăng ký này không?</p>
      </Modal>
    </div>
  );
}

export default ApplicationList;
