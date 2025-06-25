import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";
import Select from "react-select";
import { showSuccess, showError } from "../../components/commom/Notification";
import { useTranslation } from "react-i18next";
function CustomerAdd() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [maKhachHang, setMaKhachHang] = useState("");
    const [tenVietTatKH, setTenVietTatKH] = useState("");
    const [tenKhachHang, setTenKhachHang] = useState("");
    const [maDoiTac, setMaDoiTac] = useState("");
    const [nguoiLienHe, setNguoiLienHe] = useState("");
    const [moTa, setMoTa] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [sdt, setSdt] = useState("");
    const [ghiChu, setGhiChu] = useState("");
    const [maQuocGia, setMaQuocGia] = useState("VN");
    const [maNganhNghe, setMaNganhNghe] = useState("");
    const [trangThai, setTrangThai] = useState("Đang hoạt động");
    const [maKhachHangCu, setMaKhachHangCu] = useState("");
    const [countries, setCountries] = useState([]);
    const [partners, setPartners] = useState([]);
    const [industries, setIndustries] = useState([]);

    const [errors, setErrors] = useState({});
    const isFormValid = maKhachHang.trim() !== "" && tenVietTatKH.trim() !== "" && tenKhachHang.trim() !== "";
    const validateField = (field, value) => {
        let error = "";
        if (!value.trim()) {
            if (field === "maKhachHang") error = t("maKhachHangRequired");
            if (field === "tenVietTatKH") error = t("tenVietTatKHRequired");
            if (field === "tenKhachHang") error = t("tenKhachHangRequired");
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }));
    };
    const formatOptions = (data, valueKey, labelKey) => {
        return data.map(item => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
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
            console.error("Lỗi khi lấy dữ liệu đối tác:", error);
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
            console.error("Lỗi khi lấy dữ liệu ngành nghề:", error);
        }
    };

    useEffect(() => {
        fetchCountries();
        fetchPartners();
        fetchIndustries();
    }, []);

    const handleAddCustomer = async () => {
        try {
            await callAPI({
                method: "post",
                endpoint: "/customer/add",
                data: {
                    maKhachHang,
                    tenVietTatKH,
                    tenKhachHang,
                    maDoiTac: maDoiTac === "" ? null : maDoiTac,
                    nguoiLienHe,
                    moTa,
                    diaChi,
                    sdt,
                    ghiChu,
                    maQuocGia: maQuocGia === "" ? null : maQuocGia,
                    trangThai,
                    maNganhNghe: maNganhNghe === "" ? null : maNganhNghe,
                    maKhachHangCu
                },
            });
            await showSuccess(t("successTitle"), t("themKhachHangThanhCong"));
            navigate(-1);
        } catch (error) {
            showError(t("errorTitle"), t("genericError"), error);
            console.error(t("addStaffError"), error);
        }
    };
    const handleTenVietTatKhachHangChange = async (e) => {
        const value = e.target.value;
        setTenVietTatKH(value);
        validateField("tenVietTatKH", value);
        if (value.trim() !== "") {
            try {
                const response = await callAPI({
                    method: "post",
                    endpoint: "/customer/generate-code-customer",
                    data: { tenVietTatKH: value }
                });
                setMaKhachHang(response.maKhachHang);
            } catch (error) {
                console.error("Lỗi khi sinh mã khách hàng:", error);
            }
        } else {
            setMaKhachHang("");
        }
    };
    const trangThaiOptions = [
        { value: "Đang hoạt động", label: "Đang hoạt động" },
        { value: "Dừng hoạt động", label: "Dừng hoạt động" }
    ];
    return (
        <div className="p-1 bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Thêm khách hàng mới</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-left">{t("maKhachHang")}<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={maKhachHang}
                            onChange={(e) => {
                                setMaKhachHang(e.target.value)
                                validateField("maKhachHang", e.target.value);
                            }}
                            placeholder="Nhập tên viết tắt để tự hiện mã khách hàng"
                            className="w-full p-2 mt-1 border rounded-lg text-input "
                        />
                        {errors.maKhachHang && (
                            <p className="text-red-500 text-xs mt-1 text-left">{errors.maKhachHang}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">{t("tenVietTatKH")} <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={tenVietTatKH}
                            onChange={handleTenVietTatKhachHangChange}
                            className="w-full p-2 mt-1 border rounded-lg text-input"
                            placeholder="Nhập tên viết tắt khách hàng"
                        />
                        {errors.tenVietTatKH && (
                            <p className="text-red-500 text-xs mt-1 text-left">{errors.tenVietTatKH}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">{t("tenKhachHang")} <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={tenKhachHang}
                            onChange={(e) => {
                                setTenKhachHang(e.target.value)
                                validateField("tenKhachHang", e.target.value);
                            }}
                            placeholder="Nhập tên khách hàng"
                            className="w-full p-2 mt-1 border rounded-lg text-input"
                        />
                        {errors.tenKhachHang && (
                            <p className="text-red-500 text-xs mt-1 text-left">{errors.tenKhachHang}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">{t("tenDoiTac")}</label>
                        <Select
                            options={formatOptions(partners, "maDoiTac", "tenDoiTac")}
                            value={maDoiTac ? formatOptions(partners, "maDoiTac", "tenDoiTac").find(opt => opt.value === maDoiTac) : null}
                            onChange={selectedOption => setMaDoiTac(selectedOption?.value)}
                            placeholder={t("chonDoiTac")}
                            className="w-full mt-1 rounded-lg text-left"
                            isClearable
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">{t("tenQuocGia")}</label>
                        <Select
                            options={formatOptions(countries, "maQuocGia", "tenQuocGia")}
                            value={maQuocGia ? formatOptions(countries, "maQuocGia", "tenQuocGia").find(opt => opt.value === maQuocGia) : null}
                            onChange={selectedOption => setMaQuocGia(selectedOption?.value)}
                            placeholder={t("chonQuocGia")}
                            className="w-full mt-1 rounded-lg text-left"
                            isClearable
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">{t("tenNganhNghe")}</label>
                        <Select
                            options={formatOptions(industries, "maNganhNghe", "tenNganhNghe")}
                            value={maNganhNghe ? formatOptions(industries, "maNganhNghe", "tenNganhNghe").find(opt => opt.value === maNganhNghe) : null}
                            onChange={selectedOption => setMaNganhNghe(selectedOption?.value)}
                            placeholder={t("chonNganhNghe")}
                            className="w-full mt-1 rounded-lg text-left"
                            isClearable
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">{t("nguoilienhe")}</label>
                        <input type="text" value={nguoiLienHe} onChange={(e) => setNguoiLienHe(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input" placeholder="Nhập người liên hệ" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">{t("diaChi")}</label>
                        <input type="text" value={diaChi} onChange={(e) => setDiaChi(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input" placeholder="Nhập địa chỉ" />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">{t("sdt")}</label>
                        <input type="text" value={sdt} onChange={(e) => setSdt(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input" placeholder="Nhập số điện thoại" />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">{t("trangThai")}</label>
                        <Select
                            options={trangThaiOptions}
                            value={trangThaiOptions.find(option => option.value === trangThai)}
                            onChange={(selectedOption) => setTrangThai(selectedOption?.value)}
                            placeholder={t("chonTrangThai")}
                            className="w-full mt-1 rounded-lg text-left"
                            isClearable
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">{t("moTa")}</label>
                        <input type="text" value={moTa} onChange={(e) => setMoTa(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input" placeholder="Nhập mô tả" />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">{t("ghiChu")}</label>
                        <input type="text" value={ghiChu} onChange={(e) => setGhiChu(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input" placeholder="Nhập ghi chú" />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">{t("maKhachHangCu")}</label>
                        <input type="text" value={maKhachHangCu} onChange={(e) => setMaKhachHangCu(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input" placeholder="Nhập mã khách hàng cũ" />
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">{t("back")}</button>
                    <button onClick={handleAddCustomer} disabled={!isFormValid}
                        className={`px-4 py-2 rounded-lg text-white ${isFormValid
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-blue-300 cursor-not-allowed"
                            }`}>{t("themKhachHang")}</button>
                </div>
            </div>
        </div>
    );
}

export default CustomerAdd;
