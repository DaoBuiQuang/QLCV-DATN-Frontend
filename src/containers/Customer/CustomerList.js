import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import callAPI from "../../utils/api";
import { useSelector } from 'react-redux';
import Select from "react-select";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { exportToExcel } from "../../components/ExportFile/ExportExcel";

function CustomerList() {
    const role = useSelector((state) => state.auth.role);
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [partners, setPartners] = useState([]);
    const [selectedPartner, setSelectedPartner] = useState("");
    const [industries, setIndustries] = useState([]);
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const navigate = useNavigate();

    const fetchCustomers = async (searchValue, partnerId, countryId, industryId) => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/customer/list",
                data: {
                    tenKhachHang: searchValue,
                    maDoiTac: partnerId,
                    maQuocGia: countryId,
                    maNganhNghe: industryId,
                },
            });
            setCustomers(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
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
    const fetchIndustries = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/industry/list",
                data: {},
            });
            setIndustries(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu quốc gia:", error);
        }
    };
    useEffect(() => {
        fetchCustomers("");
        fetchCountries();
        fetchPartners();
        fetchIndustries();
    }, []);

    const handleDeleteCustomer = async () => {
        try {
            await callAPI({
                method: "post",
                endpoint: "/customer/delete",
                data: { maKhachHang: customerToDelete },
            });
            setShowDeleteModal(false);
            setCustomerToDelete(null);
            fetchCustomers(searchTerm);
        } catch (error) {
            console.error("Lỗi khi xóa khách hàng:", error);
        }
    };
    const formatOptions = (data, valueKey, labelKey) => {
        return data.map(item => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
    };
    const columns = [
        { label: "Mã KH", key: "maKhachHang" },
        { label: "Tên KH", key: "tenKhachHang" },
        { label: "Địa chỉ", key: "diaChi" },
        { label: "SĐT", key: "sdt" },
        { label: "Đối tác", key: "tenDoiTac" },
        { label: "Quốc gia", key: "tenQuocGia" },
        { label: "Ngành nghề", key: "tenNganhNghe" },
    ];

    return (
        <div className="p-1 bg-gray-100 min-h-screen">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Danh sách khách hàng</h2>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="🔍 Nhập tên khách hàng"
                        className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="flex gap-3">
                        <button
                            onClick={() => fetchCustomers(searchTerm, selectedPartner, selectedCountry, selectedIndustry)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition"
                        >
                            🔎 Tìm kiếm
                        </button>

                        <button
                            onClick={() => navigate("/customeradd")}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-md transition"
                        >
                            ➕ Thêm mới
                        </button>
                        <button
                            onClick={() => exportToExcel(customers, columns, "DanhSachKhachHang")}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-lg shadow-md transition"
                        >
                            📁 Xuất Excel
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

                    {/* Select ngành nghề */}
                    <Select
                        options={formatOptions(industries, "maNganhNghe", "tenNganhNghe")}
                        value={selectedIndustry ? formatOptions(industries, "maNganhNghe", "tenNganhNghe").find(opt => opt.value === selectedIndustry) : null}
                        onChange={selectedOption => setSelectedIndustry(selectedOption?.value)}
                        placeholder="Chọn ngành nghề"
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
                            <th className="p-2">Mã KH</th>
                            <th className="p-2">Tên KH</th>
                            <th className="p-2">Địa chỉ</th>
                            <th className="p-2">SĐT</th>
                            <th className="p-2">Đối tác</th>
                            <th className="p-2">Quốc gia</th>
                            <th className="p-2">Ngành nghề</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={customer.maKhachHang} className="hover:bg-gray-100 text-center border-b">
                                <td className="p-2">{index + 1}</td>
                                <td
                                    className="p-2 text-blue-500 cursor-pointer hover:underline"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/customerdetail/${customer.maKhachHang}`);
                                    }}
                                >
                                    {customer.maKhachHang}
                                </td>
                                <td className="p-2">{customer.tenKhachHang}</td>
                                <td className="p-2">{customer.diaChi}</td>
                                <td className="p-2">{customer.sdt}</td>
                                <td className="p-2">{customer.tenDoiTac}</td>
                                <td className="p-2">{customer.tenQuocGia}</td>
                                <td className="p-2">{customer.tenNganhNghe}</td>
                                <td className="p-2">
                                    <div className="flex gap-2 justify-center">
                                        <button
                                            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                                            onClick={() => navigate(`/customeredit/${customer.maKhachHang}`)}
                                        >
                                            📝
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-red-200 text-red-600 rounded-md hover:bg-red-300"
                                            onClick={() => {
                                                setCustomerToDelete(customer.maKhachHang);
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
                        <p className="mb-4 text-center">Bạn có chắc chắn muốn xóa khách hàng này không?</p>
                        <div className="flex justify-between">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                onClick={handleDeleteCustomer}
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

export default CustomerList;
