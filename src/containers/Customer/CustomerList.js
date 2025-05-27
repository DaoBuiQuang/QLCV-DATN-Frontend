import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import callAPI from "../../utils/api";
import { useSelector } from 'react-redux';
import Select from "react-select";
import { exportToExcel } from "../../components/ExportFile/ExportExcel";
import FieldSelector from "../../components/FieldSelector";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
function CustomerList() {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
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
    const [showFieldModal, setShowFieldModal] = useState(false);
    const [selectedFields, setSelectedFields] = useState([
        "maKhachHang",
        "tenKhachHang",
        "diaChi",
        "sdt",
        "tenDoiTac",
        "tenQuocGia",
        "tenNganhNghe",
    ]);

    const allFieldOptions = [
        { key: "maKhachHang", label: t("maKhachHang") },
        { key: "tenKhachHang", label: t("tenKhachHang") },
        { key: "diaChi", label: t("diaChi") },
        { key: "sdt", label: t("sdt") },
        { key: "tenDoiTac", label: t("tenDoiTac") },
        { key: "tenQuocGia", label: t("tenQuocGia") },
        { key: "tenNganhNghe", label: t("tenNganhNghe") },
    ];


    const navigate = useNavigate();

    const fetchCustomers = async (searchValue, partnerId, countryId, industryId) => {
        setLoading(true);
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/customer/list",
                data: {
                    tenKhachHang: searchValue,
                    maDoiTac: partnerId,
                    maQuocGia: countryId,
                    maNganhNghe: industryId,
                    fields: selectedFields,
                },
            });
            setCustomers(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCountries = async () => {
        const res = await callAPI({ method: "post", endpoint: "/country/list", data: {} });
        setCountries(res);
    };

    const fetchPartners = async () => {
        const res = await callAPI({ method: "post", endpoint: "/partner/list", data: {} });
        setPartners(res);
    };

    const fetchIndustries = async () => {
        const res = await callAPI({ method: "post", endpoint: "/industry/list", data: {} });
        setIndustries(res);
    };

    useEffect(() => {
        fetchCustomers("");
        fetchCountries();
        fetchPartners();
        fetchIndustries();
    }, []);

    const handleDeleteCustomer = async () => {
        await callAPI({ method: "post", endpoint: "/customer/delete", data: { maKhachHang: customerToDelete } });
        setShowDeleteModal(false);
        setCustomerToDelete(null);
        fetchCustomers(searchTerm);
    };

    const formatOptions = (data, valueKey, labelKey) => data.map(item => ({ value: item[valueKey], label: item[labelKey] }));

    const columns = allFieldOptions
        .filter(field => selectedFields.includes(field.key))
        .map(field => ({ label: field.label, key: field.key }));

    return (
        <div className="p-1 bg-gray-100 min-h-screen">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{t("danhSachKhachHang")}</h2>
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
                            {t("timKiem")}
                        </button>
                        <button
                            onClick={() => navigate("/customeradd")}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-md transition"
                        >
                            {t("themMoi")}
                        </button>
                        <button
                            onClick={() => exportToExcel(customers, columns, "DanhSachKhachHang")}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-lg shadow-md transition"
                        >
                            {t("xuatExcel")}
                        </button>
                        <button
                            onClick={() => setShowFieldModal(true)}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-3 rounded-lg shadow-md transition"
                        >
                            {t("chonCotHienThi")}
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Select options={formatOptions(countries, "maQuocGia", "tenQuocGia")} onChange={opt => setSelectedCountry(opt?.value)} placeholder={t("chonQuocGia")} isClearable className="w-full md:w-1/6" />
                    <Select options={formatOptions(partners, "maDoiTac", "tenDoiTac")} onChange={opt => setSelectedPartner(opt?.value)} placeholder={t("chonDoiTac")} isClearable className="w-full md:w-1/6" />
                    <Select options={formatOptions(industries, "maNganhNghe", "tenNganhNghe")} onChange={opt => setSelectedIndustry(opt?.value)} placeholder={t("chonNganhNghe")} isClearable className="w-full md:w-1/6" />
                </div>
            </div>

            <div className="overflow-x-auto mt-4">
                <Spin spinning={loading} tip="Loading..." size="large">
                    <table className="w-full border-collapse bg-white text-sm">
                        <thead>
                            <tr className="bg-[#EAECF0] text-[#667085] text-center font-normal">
                                <th className="p-2">{t("stt")}</th>
                                {columns.map(col => (
                                    <th key={col.key} className="p-2">{col.label}</th>
                                ))}
                                <th className="p-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((cus, idx) => (
                                <tr key={cus.maKhachHang} className="group hover:bg-gray-100 text-center border-b relative">
                                    <td className="p-2">{idx + 1}</td>
                                    {columns.map(col => {
                                        let content = cus[col.key];
                                        if (col.key === "maKhachHang") {
                                            return (
                                                <td
                                                    key={col.key}
                                                    className="p-2 text-blue-500 cursor-pointer hover:underline"
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        navigate(`/customerdetail/${cus.maKhachHang}`);
                                                    }}
                                                >
                                                    {content}
                                                </td>
                                            );
                                        }
                                        return <td key={col.key} className="p-2">{cus[col.key]}</td>
                                    })}
                                    <td className="p-2 relative">
                                        {(role === 'admin' || role === 'staff') && (
                                            <div className="hidden group-hover:flex gap-2 absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded shadow-md z-10">
                                                <button className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300" onClick={() => navigate(`/customeredit/${cus.maKhachHang}`)}>📝</button>
                                                <button className="px-3 py-1 bg-red-200 text-red-600 rounded-md hover:bg-red-300" onClick={() => { setCustomerToDelete(cus.maKhachHang); setShowDeleteModal(true); }}>🗑️</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Spin>
            </div>
            <FieldSelector
                visible={showFieldModal}
                allFieldOptions={allFieldOptions}
                selectedFields={selectedFields}
                setSelectedFields={setSelectedFields}
                onClose={() => setShowFieldModal(false)}
                onConfirm={() => setShowFieldModal(false)}
            />
            {/* {showFieldModal && (
                <FieldSelector
                    allFieldOptions={allFieldOptions}
                    selectedFields={selectedFields}
                    setSelectedFields={setSelectedFields}
                    onClose={() => setShowFieldModal(false)}
                    onConfirm={() => {
                        setShowFieldModal(false);
                        fetchCustomers(searchTerm, selectedPartner, selectedCountry, selectedIndustry);
                    }}
                />
            )} */}
            <Modal
                title={t("xacNhanXoa")}
                open={showDeleteModal}
                onOk={handleDeleteCustomer}
                onCancel={() => setShowDeleteModal(false)}
                okText={t("xacNhan")}
                cancelText={t("huy")}
                okButtonProps={{
                    className: "bg-red-500 hover:bg-red-600 text-white",
                }}
            >
                <p>{t("cauHoiXacNhanXoa")}</p>
            </Modal>
        </div>
    );
}

export default CustomerList;