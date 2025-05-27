import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import callAPI from "../../utils/api";
import Select from "react-select";
import { exportToExcel } from "../../components/ExportFile/ExportExcel";
import FieldSelector from "../../components/FieldSelector";
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { DatePicker, Radio, Modal } from 'antd';
function ApplicationList() {
  const role = useSelector((state) => state.auth.role);
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

  useEffect(() => {
    console.log("Selected field:", selectedHanXuLy);
  }, [selectedHanXuLy]);

  const filterCondition = {
    selectedField: selectedField?.value || "",
    fromDate,
    toDate,
    hanXuLyFilter: selectedHanXuLy?.value || "",
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
  const fetchApplications = async (searchValue) => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/application/list",
        data: { searchText: searchValue, maNhanHieu: selectedBrand, maSPDVList: selectedProductAndService, trangThaiDon: selectedTrangThaiDon, fields: selectedFields, filterCondition },
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
    // fetchApplications("");
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

        {showFilters && (
          <div className="flex flex-wrap gap-3 mt-4">
            {/* Dòng 1: Select nhãn hiệu, sản phẩm, trạng thái */}
            <Select
              options={formatOptions(brands, "maNhanHieu", "tenNhanHieu")}
              value={selectedBrand ? formatOptions(brands, "maNhanHieu", "tenNhanHieu").find(opt => opt.value === selectedBrand) : null}
              onChange={selectedOption => setSelectedBrand(selectedOption?.value)}
              placeholder="Chọn nhãn hiệu"
              className="w-full md:w-1/5 text-left"
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
              className="w-full md:w-1/5 text-left"
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
              className="w-full md:w-1/5 text-left"
              isClearable
            />

            {/* Dòng 2: Trường ngày + từ ngày + đến ngày */}
            <div className="w-full">
              <label className="block text-gray-500 font-medium text-sm mb-2">
                📅 Lọc theo mốc thời gian
              </label>

              <div className="flex flex-wrap gap-3 w-full">
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
                <Select
                  options={hanXuLyOptions}
                  value={selectedHanXuLy}
                  onChange={(option) => setSelectedHanXuLy(option)}
                  placeholder="Lọc theo hạn xử lý"
                  isClearable
                />
              </div>
            </div>

          </div>
        )}

      </div>
      <div class="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-sm mt-4">
          <thead>
            <tr className="bg-[#EAECF0] text-[#667085] text-center font-normal">
              <th className="p-2">STT</th>
              {columns.map(col => (
                <th key={col.key} className="p-2">{col.label}</th>
              ))}
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app.maDonDangKy} className="group hover:bg-gray-100 text-center border-b relative">
                <td className="p-2">{index + 1}</td>
                {columns.map(col => {
                  let content = app[col.key];

                  // Format ngày
                  const isDateField = [
                    "ngayNopDon", "ngayHoanThanhHoSoTaiLieu", "ngayKQThamDinhHinhThuc",
                    "ngayCongBoDon", "ngayKQThamDinhND", "ngayTraLoiKQThamDinhND",
                    "ngayThongBaoCapBang", "ngayNopPhiCapBang", "ngayNhanBang",
                    "ngayCapBang", "ngayHetHanBang", "ngayGuiBangChoKhachHang"
                  ];

                  if (isDateField.includes(col.key)) {
                    return (
                      <td key={col.key} className="p-2">
                        {content ? new Date(content).toLocaleDateString("vi-VN") : ""}
                      </td>
                    );
                  }

                  // Clickable link for maDonDangKy
                  if (col.key === "maDonDangKy") {
                    return (
                      <td
                        key={col.key}
                        className="p-2 text-blue-500 cursor-pointer hover:underline"
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
                      <td>{getTenSPDVChuoi(app.dsSPDV)}</td>
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
                        textColor = "text-yellow-500"; // hoặc orange-500 tuỳ màu
                      } else {
                        text = `Còn ${days} ngày`;
                        textColor = "text-green-600";
                      }
                    }

                    return (
                      <td key={col.key} className={`p-2 font-semibold ${textColor}`}>
                        {text}
                      </td>
                    );
                  }
                  // Special logic for trangThaiHoanThienHoSoTaiLieu
                  if (col.key === "trangThaiHoanThienHoSoTaiLieu") {
                    return (
                      <td className="p-2 min-w-[120px]" key={col.key}>
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
                                <div>
                                  <span className={`text-xs ${textColor}`}>
                                    {diffDays > 0
                                      ? `Còn ${diffDays} ngày`
                                      : diffDays === 0
                                        ? "Hạn là hôm nay"
                                        : `Quá hạn ${Math.abs(diffDays)} ngày`}
                                  </span>

                                  {app.taiLieuChuaNop && app.taiLieuChuaNop.length > 0 && (
                                    <ul className="mt-1 list-disc list-inside text-xs text-gray-600">
                                      {app.taiLieuChuaNop.map((tl, index) => (
                                        <li key={index}>{tl.tenTaiLieu}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              );
                            })()
                          )}
                        </div>
                      </td>
                    );
                  }

                  // Default render
                  return (
                    <td key={col.key} className="p-2">
                      {content}
                    </td>
                  );
                })}

                <td className="p-2">
                  {(role === "admin" || role === "staff") && (
                    <div className="hidden group-hover:flex gap-2 absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded shadow-md z-10">
                      <button
                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                        onClick={() => navigate(`/applicationedit/${app.maDonDangKy}`)}
                      >
                        📝
                      </button>
                      <button className="px-3 py-1 bg-red-200 text-red-600 rounded-md hover:bg-red-300" onClick={() => { setApplicationToDelete(app.maDonDangKy); setShowDeleteModal(true); }}>
                        🗑️
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showFieldModal && (
        <FieldSelector
          allFieldOptions={allFieldOptions}
          selectedFields={selectedFields}
          setSelectedFields={setSelectedFields}
          onClose={() => setShowFieldModal(false)}
          onConfirm={() => {
            setShowFieldModal(false);
            // fetchApplications(searchTerm)
          }}
        />
      )}
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
