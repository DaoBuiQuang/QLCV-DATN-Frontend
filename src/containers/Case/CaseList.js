import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import callAPI from "../../utils/api";
import Select from "react-select";
function CaseList() {
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
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Select
                        options={formatOptions(countries, "maQuocGia", "tenQuocGia")}
                        value={selectedCountry ? formatOptions(countries, "maQuocGia", "tenQuocGia").find(opt => opt.value === selectedCountry) : null}
                        onChange={selectedOption => setSelectedCountry(selectedOption?.value)}
                        placeholder="Chọn quốc gia"
                        className="w-full md:w-1/6"
                        isClearable
                    />

                    <Select
                        options={formatOptions(partners, "maDoiTac", "tenDoiTac")}
                        value={selectedPartner ? formatOptions(partners, "maDoiTac", "tenDoiTac").find(opt => opt.value === selectedPartner) : null}
                        onChange={selectedOption => setSelectedPartner(selectedOption?.value)}
                        placeholder="Chọn đối tác"
                        className="w-full md:w-1/6"
                        isClearable
                    />

                    <Select
                        options={formatOptions(customers, "maKhachHang", "tenKhachHang")}
                        value={selectedCustomer ? formatOptions(customers, "maKhachHang", "tenKhachHang").find(opt => opt.value === selectedCustomer) : null}
                        onChange={selectedOption => setSelectedCustomer(selectedOption?.value)}
                        placeholder="Chọn khách hàng"
                        className="w-full md:w-1/6"
                        isClearable
                    />

                    <Select
                        options={formatOptions(casetypes, "maLoaiVuViec", "tenLoaiVuViec")}
                        value={selectedCasetype ? formatOptions(casetypes, "maLoaiVuViec", "tenLoaiVuViec").find(opt => opt.value === selectedCasetype) : null}
                        onChange={selectedOption => setSelectedCasetype(selectedOption?.value)}
                        placeholder="Chọn loại vụ việc"
                        className="w-full md:w-1/6"
                        isClearable
                    />
                    <Select
                        options={formatOptions(applicationTypes, "maLoaiDon", "tenLoaiDon")}
                        value={selectedApplicationTypes ? formatOptions(applicationTypes, "maLoaiDon", "tenLoaiDon").find(opt => opt.value === selectedApplicationTypes) : null}
                        onChange={selectedOption => setSelectedApplicationType(selectedOption?.value)}
                        placeholder="Chọn loại đơn"
                        className="w-full md:w-1/6"
                        isClearable
                    />
                </div>
            </div>

            <div class="overflow-x-auto">
                <table className="w-full border-collapse bg-white text-sm mt-4">
                    <thead>
                        <tr className="bg-[#EAECF0] text-[#667085] text-center font-normal">
                            <th className="p-2">STT</th>
                            <th className="p-2">Mã hồ sơ</th>
                            <th className="p-2">Nội dung vụ việc</th>
                            <th className="p-2">Trạng thái</th>
                            <th className="p-2">Bước xử lý hiện tại</th>
                            <th className="p-2">Ngày tiếp nhận</th>
                            <th className="p-2">Ngày tạo</th>
                            <th className="p-2">Ngày cập nhật</th>
                            <th className="p-2">Tên khách hàng</th>
                            <th className="p-2">Quốc gia</th>
                            <th className="p-2">Loại vụ việc</th>
                            <th className="p-2">Nhân sự xử lý</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases.map((caseItem, index) => (
                            <tr key={caseItem.maHoSoVuViec} className="hover:bg-gray-100 text-center border-b">
                                <td className="p-2">{index + 1}</td>
                                <td
                                    className="p-2 text-blue-500 cursor-pointer hover:underline"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/casedetail/${caseItem.maHoSoVuViec}`);
                                    }}
                                >
                                    {caseItem.maHoSoVuViec}
                                </td>
                                <td className="p-2">{caseItem.noiDungVuViec}</td>
                                <td className="p-2">{caseItem.trangThaiVuViec}</td>
                                <td className="p-2">{caseItem.buocXuLyHienTai}</td>
                                <td className="p-2">{new Date(caseItem.ngayTiepNhan).toLocaleDateString('vi-VN')}</td>
                                <td className="p-2">{new Date(caseItem.ngayTao).toLocaleDateString('vi-VN')}</td>
                                <td className="p-2">{new Date(caseItem.ngayCapNhap).toLocaleDateString('vi-VN')}</td>
                                <td className="p-2">{caseItem.tenKhachHang}</td>
                                <td className="p-2">{caseItem.tenQuocGia}</td>
                                <td className="p-2">{caseItem.tenLoaiVuViec}</td>
                                <td className="p-2">
                                    {caseItem.nhanSuXuLy.map((person, idx) => (
                                        <div key={idx}>
                                            {person.tenNhanSu} ({person.vaiTro})
                                        </div>
                                    ))}
                                </td>
                                <td className="p-2">
                                    <div className="flex gap-2 justify-center">
                                        <button
                                            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                                            onClick={() => navigate(`/caseedit/${caseItem.maHoSoVuViec}`)}
                                        >
                                            📝
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-blue-200 text-blue-600 rounded-md hover:bg-blue-300"
                                            onClick={() => navigate(`/applicationadd/${caseItem.maHoSoVuViec}`)}
                                        >
                                            📄
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
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-80">
                        <h3 className="text-lg font-semibold mb-4 text-center">Xác nhận xóa</h3>
                        <p className="mb-4 text-center">Bạn có chắc chắn muốn xóa hồ sơ vụ việc này không?</p>
                        <div className="flex justify-between">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                onClick={handleDeleteCase}
                            >
                                Xác nhận xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CaseList;
