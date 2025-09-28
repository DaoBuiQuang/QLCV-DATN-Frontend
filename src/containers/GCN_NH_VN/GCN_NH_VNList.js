import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import callAPI from "../../utils/api";
import Select from "react-select";
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { Modal, Pagination } from "antd";
function GCN_NH_VNList() {
  const { t } = useTranslation();
  const role = useSelector((state) => state.auth.role);
  const [gcn_nhs, setGCN_NHS] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  const fetchPartners = async (searchValue, countryCode, page = 1, size = 10) => {
    try {
      localStorage.setItem("partnerListPage", page);
      const response = await callAPI({
        method: "post",
        endpoint: "/gcn_nh/list",
        data: {
          soBang: searchValue,
          pageSize: size,
        },
      });
      setGCN_NHS(response.data);
      setTotalItems(response.pagination?.totalItems || 0);
      setPageIndex(response.pagination?.pageIndex || 1);
      setPageSize(response.pagination?.pageSize || 10);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu đối tác:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/country/list",
        data: {},
      });
      setCountries(response);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu quốc gia:", error);
    }
  };

  useEffect(() => {
    const savedPage = parseInt(localStorage.getItem("partnerListPage") || "1", 10);
    fetchCountries();

    fetchPartners("", "", savedPage, pageSize);
    localStorage.setItem("partnerListPage", "1");
  }, []);

  // Hàm xử lý xóa đối tác
  const handleDeletePartner = async () => {
    try {
      await callAPI({
        method: "post",
        endpoint: "/partner/delete",
        data: { id: partnerToDelete },
      });
      setShowDeleteModal(false);
      setPartnerToDelete(null);
      fetchPartners(searchTerm, selectedCountry);
    } catch (error) {
      console.error("Lỗi khi xóa đối tác:", error);
    }
  };
  const formatOptions = (data, valueKey, labelKey) => {
    return data.map(item => ({
      value: item[valueKey],
      label: item[labelKey]
    }));
  };
  return (
    <div className="p-1 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Danh sách giấy chứng nhận</h2>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchPartners(searchTerm, selectedCountry, 1, pageSize);
              }
            }}
            placeholder="🔍 Nhập số bằng"
            className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 search-input"
          />

          <div className="flex gap-3">
            <button
              onClick={() => fetchPartners(searchTerm, selectedCountry, 1, pageSize)}
              className="bg-[#009999] hover:bg-[#007a7a] text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              Tìm kiếm
            </button>
            <button
              onClick={() => navigate("/partneradd")}
              className="bg-[#009999] hover:bg-[#007a7a] text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              Thêm mới
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* <div className="w-full md:w-1/6">
            <label className="block text-sm font-medium text-gray-700 mb-1  text-left">Quốc gia</label>
            <Select
              options={formatOptions(countries, "maQuocGia", "tenQuocGia")}
              value={selectedCountry ? formatOptions(countries, "maQuocGia", "tenQuocGia").find(opt => opt.value === selectedCountry) : null}
              onChange={selectedOption => setSelectedCountry(selectedOption?.value)}
              placeholder="Chọn quốc gia"
              className="text-left"
              isClearable
            />
          </div> */}
          {/* <Select
            options={formatOptions(countries, "maQuocGia", "tenQuocGia")}
            value={selectedCountry ? formatOptions(countries, "maQuocGia", "tenQuocGia").find(opt => opt.value === selectedCountry) : null}
            onChange={selectedOption => setSelectedCountry(selectedOption?.value)}
            placeholder="Chọn quốc gia"
            className="w-full md:w-1/6 text-left"
            isClearable
          /> */}
        </div>
      </div>

      <table className="w-full border-collapse bg-white text-sm mt-4 overflow-hidden rounded-lg border shadow">
        <thead>
          <tr className=" text-[#667085] text-center font-normal">
            <th className="p-2 text-table">STT</th>
            <th className="p-2 text-table">Số bằng</th>
            <th className="p-2 text-table">Số đơn</th>
            <th className="p-2 text-table">Mã hồ sơ</th>
            <th className="p-2 text-table">Tên chủ bằng</th>
            <th className="p-2 text-table">Đại diện SHCN</th>
            <th className="p-2 text-table">Tên nhãn hiệu</th>
    
            <th className="p-2 text-table">Nhóm SPDV</th>
    
            <th className="p-2 text-table">Ngày nộp đơn</th>
            <th className="p-2 text-table">Ngày cấp bằng</th>
            <th className="p-2 text-table">Ghi chú</th>
            <th className="p-2 text-center text-table"></th>
          </tr>
        </thead>
        <tbody>
          {gcn_nhs.map((gcn_nh, index) => (
            <tr className="group hover:bg-gray-100 text-center border-b relative">
              <td className="p-2 text-table">{index + 1}</td>
              <td
                className="p-2 text-table text-blue-500 cursor-pointer hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/gcn_nhdetail/${gcn_nh.id}`);
                }}
              >
                {gcn_nh.soBang}
              </td>
              {/* <td className="p-2 text-table">{gcn_nh.soBang}</td> */}
              <td className="p-2 text-table">{gcn_nh.soDon}</td>
              <td className="p-2 text-table">{gcn_nh.maHoSo}</td>
              <td className="p-2 text-table">{gcn_nh.tenKhachHang}</td>
              <td className="p-2 text-table">{gcn_nh.tenDoiTac}</td>
              <td className="p-2 text-table">{gcn_nh.tenNhanHieu}</td>
              {/* <td className="p-2 text-table">Màu</td> */}
              <td className="p-2 text-table">{gcn_nh.dsNhomSPDV}</td>
              <td className="p-2 text-table">{gcn_nh.ngayNopDon}</td>
              <td className="p-2 text-table">{gcn_nh.ngayCapBang}</td>
              <td className="p-2 text-table">{gcn_nh.ghiChu}</td>

              <td className="p-2 relative">
                {(role === "admin" || role === "staff") && (
                  <div className="hidden group-hover:flex gap-2 absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded shadow-md z-10">
                    {/* <button
                      className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                      onClick={() => navigate(`/partneredit/${gcn_nh.id}`)}
                    >
                      📝
                    </button>
                    <button
                      className="px-3 py-1 bg-red-200 text-red-600 rounded-md hover:bg-red-300"
                      onClick={() => {
                        setPartnerToDelete(gcn_nh.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      🗑️
                    </button> */}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
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
            fetchPartners(searchTerm, selectedCountry, page, size)
          }}
          showSizeChanger
          pageSizeOptions={['5', '10', '20', '50']}
          locale={{ items_per_page: t("bản ghi") }}
        />
      </div>
      <Modal
        title="Xác nhận xóa"
        open={showDeleteModal}
        onOk={handleDeletePartner}
        onCancel={() => setShowDeleteModal(false)}
        okText="Xác nhận xóa"
        cancelText="Hủy"
        okButtonProps={{
          className: "bg-red-500 hover:bg-red-600 text-white",
        }}
      >
        <p>Bạn có chắc chắn muốn xóa đối tác này không?</p>
      </Modal>
    </div>
  );
}

export default GCN_NH_VNList;
