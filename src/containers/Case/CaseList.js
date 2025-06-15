import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import callAPI from "../../utils/api";
import Select from "react-select";
import { useSelector } from 'react-redux';
import FieldSelector from "../../components/FieldSelector";
import { Modal } from "antd";
import { Spin, Pagination } from "antd";
import { useTranslation } from "react-i18next";
function CaseList() {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const role = useSelector((state) => state.auth.role);
    const [cases, setCases] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [caseToDelete, setCaseToDelete] = useState(null);
    const [applicationTypes, setApplicationTypes] = useState([]);
    const [selectedApplicationTypes, setSelectedApplicationType] = useState("");
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [partners, setPartners] = useState([]);
    const [selectedPartner, setSelectedPartner] = useState("");
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [casetypes, setCasetypes] = useState([]);
    const [selectedCasetype, setSelectedCasetype] = useState("");
    const navigate = useNavigate();
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [showFieldModal, setShowFieldModal] = useState(false);
    const [selectedFields, setSelectedFields] = useState([
        "maHoSoVuViec",
        "maDonDangKy",
        "noiDungVuViec",
        "trangThaiVuViec",
        // "buocXuLyHienTai",
        "ngayTiepNhan",
        "ngayTao",
        "ngayCapNhap",
        "tenKhachHang",
        "tenQuocGia",
        "tenLoaiVuViec",
        "tenLoaiDon",
        "nhanSuXuLy",
    ]);

    const allFieldOptions = [
        { key: "maHoSoVuViec", label: "Mã hồ sơ" },
        { key: "maDonDangKy", label: "Mã đơn đăng ký" },
        { key: "noiDungVuViec", label: "Nội dung vụ việc" },
        { key: "trangThaiVuViec", label: "Trạng thái" },
        // { key: "buocXuLyHienTai", label: "Bước xử lý hiện tại" },
        { key: "ngayTiepNhan", label: "Ngày tiếp nhận" },
        { key: "ngayTao", label: "Ngày tạo" },
        { key: "ngayCapNhap", label: "Ngày cập nhập" },
        { key: "tenKhachHang", label: "Tên khách hàng" },
        { key: "tenQuocGia", label: "Quốc gia" },
        { key: "tenLoaiVuViec", label: "Loại vụ việc" },
        { key: "tenLoaiDon", label: "Loại đơn" },
        { key: "nhanSuXuLy", label: "Nhân sự xử lý" },
    ];
    const formatOptions = (data, valueKey, labelKey) => {
        return data.map(item => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
    };
    const fetchCases = async (searchValue, partnerId, countryId, customerId, casetypeId, page = 1, size = 10) => {
        setLoading(true);
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/case/list",
                data: {
                    searchText: searchValue,
                    maDoiTac: partnerId,
                    maQuocGia: countryId,
                    maKhachHang: customerId,
                    maLoaiVuViec: casetypeId,
                    fields: selectedFields,
                    pageIndex: page,
                    pageSize: size,
                },
            });
            setCases(response.data || []);
            setTotalItems(response.pagination?.totalItems || 0);
            setPageIndex(response.pagination?.pageIndex || 1);
            setPageSize(response.pagination?.pageSize || 10);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu hồ sơ vụ việc:", error);
        } finally {
            setLoading(false);
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

    const fetchPartners = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/partner/all",
                data: {},
            });
            setPartners(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu quốc gia:", error);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/customers/by-name",
                data: {},
            });
            setCustomers(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu khách hàng", error);
        }
    };
    const fetchCaseTypes = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/casetype/list",
                data: {},
            });
            setCasetypes(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu loại nghề nghiệp:", error);
        }
    };
    const fetchApplicationTypes = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/applicationtype/all",
                data: {}
            })
            setApplicationTypes(response)
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu loại đơn: ", error)
        }
    }
    useEffect(() => {
        fetchCases("");
        fetchCountries();
        fetchPartners();
        fetchCustomers();
        fetchCaseTypes();
        fetchApplicationTypes();
    }, []);

    const handleDeleteCase = async () => {
        try {
            await callAPI({
                method: "post",
                endpoint: "/case/delete",
                data: { maHoSoVuViec: caseToDelete },
            });
            setShowDeleteModal(false);
            setCaseToDelete(null);
            fetchCases(searchTerm);
        } catch (error) {
            console.error("Lỗi khi xóa hồ sơ vụ việc:", error);
        }
    };
    const columns = allFieldOptions
        .filter(field => selectedFields.includes(field.key))
        .map(field => ({ label: field.label, key: field.key }));
    return (
        <div className="p-1 bg-gray-100 ">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Danh sách hồ sơ vụ việc</h2>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="🔍 Nhập nội dung vụ việc"
                        className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="flex gap-3">
                        <button
                            onClick={() => fetchCases(searchTerm, selectedPartner, selectedCountry, selectedCustomer, selectedCasetype, 1, pageSize)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition"
                        >
                            🔎 Tìm kiếm
                        </button>

                        <button
                            onClick={() => navigate("/caseadd")}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-md transition"
                        >
                            ➕ Thêm mới
                        </button>
                        <button
                            onClick={() => setShowFieldModal(true)}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-3 rounded-lg shadow-md transition"
                        >
                            Chọn cột hiển thị
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Select
                        options={formatOptions(casetypes, "maLoaiVuViec", "tenLoaiVuViec")}
                        value={selectedCasetype ? formatOptions(casetypes, "maLoaiVuViec", "tenLoaiVuViec").find(opt => opt.value === selectedCasetype) : null}
                        onChange={selectedOption => setSelectedCasetype(selectedOption?.value)}
                        placeholder="Chọn loại vụ việc"
                        className="w-full md:w-1/6 text-left"
                        isClearable
                    />
                    <Select
                        options={formatOptions(applicationTypes, "maLoaiDon", "tenLoaiDon")}
                        value={selectedApplicationTypes ? formatOptions(applicationTypes, "maLoaiDon", "tenLoaiDon").find(opt => opt.value === selectedApplicationTypes) : null}
                        onChange={selectedOption => setSelectedApplicationType(selectedOption?.value)}
                        placeholder="Chọn loại đơn"
                        className="w-full md:w-1/6 text-left"
                        isClearable
                    />
                    <Select
                        options={formatOptions(customers, "maKhachHang", "tenKhachHang")}
                        value={selectedCustomer ? formatOptions(customers, "maKhachHang", "tenKhachHang").find(opt => opt.value === selectedCustomer) : null}
                        onChange={selectedOption => setSelectedCustomer(selectedOption?.value)}
                        placeholder="Chọn khách hàng"
                        className="w-full md:w-1/6 text-left"
                        isClearable
                    />
                    <Select
                        options={formatOptions(countries, "maQuocGia", "tenQuocGia")}
                        value={selectedCountry ? formatOptions(countries, "maQuocGia", "tenQuocGia").find(opt => opt.value === selectedCountry) : null}
                        onChange={selectedOption => setSelectedCountry(selectedOption?.value)}
                        placeholder="Chọn quốc gia"
                        className="w-full md:w-1/6 text-left"
                        isClearable
                    />

                    <Select
                        options={formatOptions(partners, "maDoiTac", "tenDoiTac")}
                        value={selectedPartner ? formatOptions(partners, "maDoiTac", "tenDoiTac").find(opt => opt.value === selectedPartner) : null}
                        onChange={selectedOption => setSelectedPartner(selectedOption?.value)}
                        placeholder="Chọn đối tác"
                        className="w-full md:w-1/6 text-left"
                        isClearable
                    />
                </div>
            </div>

            <div class="overflow-x-auto">
                <Spin spinning={loading} tip="Loading..." size="large">
                    <table className="w-full border-collapse bg-white text-sm mt-4">
                        <thead>
                            <tr className="bg-[#EAECF0] text-[#667085] text-center font-normal">
                                <th className="p-2 text-table border-r">STT</th>
                                {columns.map((col, index) => (
                                    <th key={col.key} className={`p-2 text-table ${index < columns.length - 1 ? 'border-r' : ''}`}>
                                        {col.label}
                                    </th>
                                ))}
                                <th className="p-2 text-table"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cases.map((caseItem, index) => (
                                <tr key={caseItem.maHoSoVuViec} className="group hover:bg-gray-100 text-center border-b relative">
                                    <td className="p-2 text-table border-r">{index + 1}</td>
                                    {columns.map((col, colIndex) => {
                                        let content = caseItem[col.key];
                                        const commonClass = `p-2 text-table ${colIndex < columns.length - 1 ? 'border-r' : ''}`;

                                        if (
                                            col.key === "ngayTiepNhan" ||
                                            col.key === "ngayTao" ||
                                            col.key === "ngayCapNhap"
                                        ) {
                                            content = content ? new Date(content).toLocaleDateString("vi-VN") : "";
                                        }

                                        if (col.key === "maHoSoVuViec") {
                                            return (
                                                <td
                                                    key={col.key}
                                                    className={`${commonClass} text-blue-500 cursor-pointer hover:underline`}
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        navigate(`/casedetail/${caseItem.maHoSoVuViec}`);
                                                    }}
                                                >
                                                    {content}
                                                </td>
                                            );
                                        }

                                        if (col.key === "maDonDangKy") {
                                            return (
                                                <td
                                                    key={col.key}
                                                    className={`${commonClass} ${content ? "text-blue-500 cursor-pointer hover:underline" : "text-gray-500"}`}
                                                    onClick={e => {
                                                        if (content) {
                                                            e.stopPropagation();
                                                            navigate(`/applicationdetail/${content}`);
                                                        }
                                                    }}
                                                >
                                                    {content ? content : "Không có đơn đăng ký"}
                                                </td>
                                            );
                                        }

                                        if (col.key === "nhanSuXuLy") {
                                            return (
                                                <td key={col.key} className={commonClass}>
                                                    {Array.isArray(caseItem.nhanSuXuLy) ? (
                                                        caseItem.nhanSuXuLy.map((person, idx) => (
                                                            <div key={idx}>
                                                                {person.tenNhanSu} ({person.vaiTro})
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <span>—</span>
                                                    )}
                                                </td>
                                            );
                                        }

                                        if (col.key === "trangThaiVuViec") {
                                            const statusMap = {
                                                dang_xu_ly: "Đang xử lý",
                                                hoan_thanh: "Hoàn thành",
                                                tam_dung: "Tạm dừng"
                                            };
                                            return (
                                                <td key={col.key} className={commonClass}>
                                                    {statusMap[content] || "Không xác định"}
                                                </td>
                                            );
                                        }

                                        return <td key={col.key} className={commonClass}>{content}</td>;
                                    })}

                                    <td className="p-2 relative">
                                        {(role === 'admin' || role === 'staff') && (
                                            <div className="hidden group-hover:flex gap-2 absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded shadow-md z-10">
                                                <button
                                                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                                                    onClick={() => navigate(`/caseedit/${caseItem.maHoSoVuViec}`)}
                                                >
                                                    📝
                                                </button>
                                                <button
                                                    className="px-3 py-1 bg-red-200 text-red-600 rounded-md hover:bg-red-300"
                                                    onClick={() => {
                                                        setCaseToDelete(caseItem.maHoSoVuViec);
                                                        setShowDeleteModal(true);
                                                    }}
                                                >
                                                    🗑️
                                                </button>
                                                <button
                                                    className="px-3 py-1 bg-blue-200 text-blue-600 rounded-md hover:bg-blue-300"
                                                    onClick={() =>
                                                        caseItem.maDonDangKy
                                                            ? navigate(`/applicationedit/${caseItem.maDonDangKy}`)
                                                            : navigate(`/applicationadd/${caseItem.maHoSoVuViec}`)
                                                    }
                                                >
                                                    📄
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
                        setPageSize(size)
                        fetchCases(searchTerm, selectedPartner, selectedCountry, selectedCustomer, selectedCasetype, page, size)
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
                onOk={handleDeleteCase}
                onCancel={() => setShowDeleteModal(false)}
                okText="Xác nhận xóa"
                cancelText="Hủy"
                okButtonProps={{
                    className: "bg-red-500 hover:bg-red-600 text-white",
                }}
            >
                <p>Bạn có chắc chắn muốn xóa hồ sơ vụ việc này không?</p>
            </Modal>
        </div>
    );
}

export default CaseList;
