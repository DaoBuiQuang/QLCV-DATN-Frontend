import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import callAPI from "../../utils/api";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
function CustomerDetail() {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { maKhachHang } = useParams();
    const [tenVietTatKH, setTenVietTatKH] = useState("");
    const [tenKhachHang, setTenKhachHang] = useState("");
    const [maDoiTac, setMaDoiTac] = useState("");
    const [moTa, setMoTa] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [sdt, setSdt] = useState("");
    const [ghiChu, setGhiChu] = useState("");
    const [maQuocGia, setMaQuocGia] = useState("");
    const [maNganhNghe, setMaNganhNghe] = useState("");
    const [trangThai, setTrangThai] = useState("Đang hoạt động");
    const [maKhachHangCu, setMaKhachHangCu] = useState("");
    const [countries, setCountries] = useState([]);
    const [partners, setPartners] = useState([]);
    const [industries, setIndustries] = useState([]);
    const formatOptions = (data, valueKey, labelKey) => {
        return data.map(item => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
    };
    useEffect(() => {
        const fetchCustomerDetail = async () => {
            setLoading(true);
            try {
                const response = await callAPI({
                    method: "post",
                    endpoint: "/customer/detail",
                    data: { maKhachHang }
                });
                setTenVietTatKH(response.tenVietTatKH || "");
                setTenKhachHang(response.tenKhachHang || "");
                setMaDoiTac(response.maDoiTac || "");
                setMoTa(response.moTa || "");
                setDiaChi(response.diaChi || "");
                setSdt(response.sdt || "");
                setGhiChu(response.ghiChu || "");
                setMaQuocGia(response.maQuocGia || "");
                setMaNganhNghe(response.maNganhNghe || "");
                setTrangThai(response.trangThai || "Đang hoạt động");
                setMaKhachHangCu(response.maKhachHangCu || "");
            } catch (error) {
                console.error("Lỗi khi lấy thông tin khách hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        if (maKhachHang) {
            fetchCustomerDetail();
        }
    }, [maKhachHang]);
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
    const trangThaiOptions = [
        { value: "Đang hoạt động", label: "Đang hoạt động" },
        { value: "Dừng hoạt động", label: "Dừng hoạt động" }
    ];
    return (
        <div className="p-1 bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 {t("chiTietKhachHang")}</h2>
                <Spin spinning={loading} tip="Loading..." size="large">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                        <div>
                            <label className="block text-gray-700 text-left">{t("maKhachHang")}<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={maKhachHang}
                                readOnly
                                className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-left">{t("tenVietTatKH")} <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={tenVietTatKH}

                                className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-left">{t("tenKhachHang")} <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={tenKhachHang}
                                readOnly
                                className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200 cursor-not-allowed"
                            />
                        </div>


                        <div>
                            <label className="block text-gray-700 text-left">{t("tenDoiTac")}</label>
                            <Select
                                options={formatOptions(partners, "maDoiTac", "tenDoiTac")}
                                value={maDoiTac ? formatOptions(partners, "maDoiTac", "tenDoiTac").find(opt => opt.value === maDoiTac) : null}
                                onChange={selectedOption => setMaDoiTac(selectedOption?.value)}
                                placeholder="Chọn đối tác"
                                className="w-full  mt-1  rounded-lg text-left"
                                isClearable
                                isDisabled
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-left">{t("tenQuocGia")}</label>
                            <Select
                                options={formatOptions(countries, "maQuocGia", "tenQuocGia")}
                                value={maQuocGia ? formatOptions(countries, "maQuocGia", "tenQuocGia").find(opt => opt.value === maQuocGia) : null}
                                onChange={selectedOption => setMaQuocGia(selectedOption?.value)}
                                placeholder="Chọn quốc gia"
                                className="w-full  mt-1  rounded-lg text-left"
                                isClearable
                                isDisabled
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-left">{t("tenNganhNghe")}</label>
                            <Select
                                options={formatOptions(industries, "maNganhNghe", "tenNganhNghe")}
                                value={maNganhNghe ? formatOptions(industries, "maNganhNghe", "tenNganhNghe").find(opt => opt.value === maQuocGia) : null}
                                onChange={selectedOption => setMaNganhNghe(selectedOption?.value)}
                                placeholder="Chọn ngành nghề"
                                className="w-full  mt-1  rounded-lg text-left"
                                isClearable
                                isDisabled
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-left">{t("diaChi")}</label>
                            <input type="text" value={diaChi} onChange={(e) => setDiaChi(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200 " readOnly />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-left">{t("sdt")}</label>
                            <input type="text" value={sdt} onChange={(e) => setSdt(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200" readOnly />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-left">{t("trangThai")}</label>
                            <Select
                                options={trangThaiOptions}
                                value={trangThaiOptions.find(option => option.value === trangThai)}
                                onChange={(selectedOption) => setTrangThai(selectedOption?.value)}
                                placeholder="Chọn trạng thái"
                                className="w-full mt-1 rounded-lg text-left"
                                isClearable
                                isDisabled
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-left">{t("moTa")}</label>
                            <input type="text" value={moTa} onChange={(e) => setMoTa(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200" readOnly />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-left">{t("ghiChu")}</label>
                            <input type="text" value={ghiChu} onChange={(e) => setGhiChu(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200" readOnly />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-left">{t("maKhachHangCu")}</label>
                            <input type="text" value={maKhachHangCu} onChange={(e) => setMaKhachHangCu(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200" readOnly />
                        </div>
                    </div>
                </Spin>

                <div className="flex justify-center gap-4 mt-4">
                    <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">Quay lại</button>
                </div>
            </div>
        </div>
    );
}

export default CustomerDetail;
