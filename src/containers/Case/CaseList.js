import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import callAPI from "../../utils/api";
import Select from "react-select";
import { useSelector } from 'react-redux';
import FieldSelector from "../../components/FieldSelector";
import { Modal } from "antd";
function CaseList() {
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
    const [showFieldModal, setShowFieldModal] = useState(false);
    const [selectedFields, setSelectedFields] = useState([
        "maHoSoVuViec",
        "maDonDangKy",
        "noiDungVuViec",
        "trangThaiVuViec",
        "buocXuLyHienTai",
        "ngayTiepNhan",
        "ngayTao",
        "ngayCapNhap",
        "tenKhachHang",
        "tenQuocGia",
        "tenLoaiVuViec",
        "nhanSuXuLy",
    ]);

    const allFieldOptions = [
        { key: "maHoSoVuViec", label: "Mã hồ sơ" },
        { key: "maDonDangKy", label: "Mã đơn đăng ký" },
        { key: "noiDungVuViec", label: "Nội dung vụ việc" },
        { key: "trangThaiVuViec", label: "Trạng thái" },
        { key: "buocXuLyHienTai", label: "Bước xử lý hiện tại" },
        { key: "ngayTiepNhan", label: "Ngày tiếp nhận" },
        { key: "ngayTao", label: "Ngày tạo" },
        { key: "ngayCapNhap", label: "Ngày cập nhập" },
        { key: "tenKhachHang", label: "Tên khách hàng" },
        { key: "tenQuocGia", label: "Quốc gia" },
        { key: "tenLoaiVuViec", label: "Loại vụ việc" },
        { key: "nhanSuXuLy", label: "Nhân sự xử lý" },
    ];
    const formatOptions = (data, valueKey, labelKey) => {
        return data.map(item => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
    };
    const fetchCases = async (searchValue, partnerId, countryId, customerId, casetypeId) => {
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
                },
            });
            setCases(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu hồ sơ vụ việc:", error);
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
                endpoint: "/partner/list",
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
        // fetchCases("");
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
                            onClick={() => fetchCases(searchTerm, selectedPartner, selectedCountry, selectedCustomer, selectedCasetype)}
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

                    <Select
                        options={formatOptions(customers, "maKhachHang", "tenKhachHang")}
                        value={selectedCustomer ? formatOptions(customers, "maKhachHang", "tenKhachHang").find(opt => opt.value === selectedCustomer) : null}
                        onChange={selectedOption => setSelectedCustomer(selectedOption?.value)}
                        placeholder="Chọn khách hàng"
                        className="w-full md:w-1/6 text-left"
                        isClearable
                    />

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
                </div>
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
                        {cases.map((caseItem, index) => (
                            <tr key={caseItem.maHoSoVuViec} className="group hover:bg-gray-100 text-center border-b relative">
                                <td className="p-2">{index + 1}</td>
                                {columns.map(col => {
                                    let content = caseItem[col.key];
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
                                                className="p-2 text-blue-500 cursor-pointer hover:underline"
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
                                                className={`p-2 ${content ? "text-blue-500 cursor-pointer hover:underline" : "text-gray-500"}`}
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
                                            <td className="p-2" key={col.key}>
                                                {Array.isArray(caseItem.nhanSuXuLy) ? (
                                                    caseItem.nhanSuXuLy.map((person, idx) => (
                                                        <div key={idx}>
                                                            {person.tenNhanSu} ({person.vaiTro})
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span>—</span> // hoặc để trống
                                                )}
                                            </td>
                                        );
                                    }

                                    return <td key={col.key} className="p-2">{content}</td>;
                                })}
                                {/* <td className="p-2">
                                    {caseItem.nhanSuXuLy.map((person, idx) => (
                                        <div key={idx}>
                                            {person.tenNhanSu} ({person.vaiTro})
                                        </div>
                                    ))}
                                </td> */}
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
            </div>
            {showFieldModal && (
                <FieldSelector
                    allFieldOptions={allFieldOptions}
                    selectedFields={selectedFields}
                    setSelectedFields={setSelectedFields}
                    onClose={() => setShowFieldModal(false)}
                    onConfirm={() => {
                        setShowFieldModal(false);
                        fetchCases(searchTerm, selectedPartner, selectedCountry, selectedCustomer, selectedCasetype)
                    }}
                />
            )}
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
