// src/pages/PowerOfAttorney/PowerOfAttorneyAdd.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import callAPI from "../../utils/api";
import Select from "react-select";
import { showSuccess, showError } from "../../components/commom/Notification";
import { Upload, Button, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

function PowerOfAttorneyAdd() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [soGUQ, setSoGUQ] = useState("");
    const [idKhachHang, setIdKhachHang] = useState(null);
    const [idDoiTac, setIdDoiTac] = useState(null);
    const [maQuocGia, setMaQuocGia] = useState("");
    const [soDonGoc, setSoDonGoc] = useState("");
    const [ngayUyQuyen, setNgayUyQuyen] = useState("");
    const [ngayHetHan, setNgayHetHan] = useState("");
    const [linkAnh, setLinkAnh] = useState("");   // sẽ lưu base64
    const [ghiChu, setGhiChu] = useState("");
    const [loaiGUQ, setLoaiGUQ] = useState(null);
    const [nguoiKy, setNguoiKy] = useState("");
    const [chucDanh, setChucDanh] = useState("");
    const [countries, setCountries] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [partners, setPartners] = useState([]);

    // =============================
    // Lấy danh sách KH + đối tác + quốc gia
    // =============================
    const fetchCustomers = async () => {
        try {
            const res = await callAPI({
                method: "post",
                endpoint: "/customers/by-name",
                data: {},
            });
            setCustomers(res || []);
        } catch (err) {
            console.error("Lỗi lấy khách hàng:", err);
        }
    };

    const fetchPartners = async () => {
        try {
            const res = await callAPI({
                method: "post",
                endpoint: "/partner/all",
                data: {},
            });
            setPartners(res || []);
        } catch (err) {
            console.error("Lỗi lấy đối tác:", err);
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/country/list",
                data: {},
            });
            setCountries(response || []);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu quốc gia:", error);
        }
    };

    useEffect(() => {
        fetchCountries();
        fetchCustomers();
        fetchPartners();
    }, []);

    const formatOptions = (data, valueKey, labelKey) =>
        (data || []).map((item) => ({
            value: item[valueKey],
            label: item[labelKey],
        }));

    // =============================
    // Convert file → base64
    // =============================
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // "data:image/png;base64,AAAA..."
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const uploadProps = {
        beforeUpload: async (file) => {
            try {
                const base64 = await getBase64(file);
                // Nếu backend chỉ muốn phần sau ",", dùng:
                // const [meta, pureBase64] = base64.split(",");
                // setLinkAnh(pureBase64);
                setLinkAnh(base64);
            } catch (err) {
                console.error("Lỗi convert file sang base64:", err);
                showError("Lỗi", "Không thể đọc file, vui lòng thử lại");
            }
            // chặn antd upload mặc định
            return false;
        },
        multiple: false,
        maxCount: 1,
    };

    const handleAdd = async () => {
        try {
            await callAPI({
                method: "post",
                endpoint: "/power-of-attorney/add",
                data: {
                    idKhachHang,
                    idDoiTac,
                    maQuocGia,
                    soDonGoc,
                    ngayUyQuyen,
                    ngayHetHan,
                    linkAnh,      // base64
                    ghiChu,
                    soGUQ,
                    loaiGUQ,
                    nguoiKy,
                    chucDanh,
                },
            });

            showSuccess("Thành công", "Tạo giấy ủy quyền thành công!");
            navigate(-1);
        } catch (e) {
            console.error(e);
            showError("Thất bại", "Có lỗi xảy ra!");
        }
    };

    const loaiGUQOptions = [
        { value: 1, label: "Ủy quyền chung" },
        { value: 2, label: "Ủy quyền theo vụ việc" },
    ];

    return (
        <div className="p-1 bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-3xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                    📄 Thêm giấy ủy quyền mới
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* SỐ GIẤY ỦY QUYỀN */}
                    <div>
                        <label className="block text-gray-700 text-left">
                            Số giấy ủy quyền
                        </label>
                        <input
                            type="text"
                            value={soGUQ}
                            onChange={(e) => setSoGUQ(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg text-input"
                            placeholder="Nhập số giấy ủy quyền"
                        />
                    </div>

                    {/* KHÁCH HÀNG */}
                    <div>
                        <label className="block text-gray-700 text-left">
                            Khách hàng <span className="text-red-500">*</span>
                        </label>
                        <Select
                            options={formatOptions(customers, "id", "tenKhachHang")}
                            value={
                                idKhachHang
                                    ? formatOptions(customers, "id", "tenKhachHang").find(
                                          (x) => x.value === idKhachHang
                                      )
                                    : null
                            }
                            onChange={(v) => setIdKhachHang(v?.value || null)}
                            className="w-full mt-1 rounded-lg text-left"
                            placeholder="Chọn khách hàng"
                        />
                    </div>

                    {/* ĐỐI TÁC */}
                    <div>
                        <label className="block text-gray-700 text-left">
                            Đối tác
                        </label>
                        <Select
                            options={formatOptions(partners, "id", "tenDoiTac")}
                            value={
                                idDoiTac
                                    ? formatOptions(partners, "id", "tenDoiTac").find(
                                          (x) => x.value === idDoiTac
                                      )
                                    : null
                            }
                            onChange={(v) => setIdDoiTac(v?.value || null)}
                            className="w-full mt-1 rounded-lg text-left"
                            placeholder="Chọn đối tác"
                        />
                    </div>

                    {/* MÃ QUỐC GIA */}
                    <div>
                        <label className="block text-gray-700 text-left">
                            {t("tenQuocGia")}
                        </label>
                        <Select
                            options={formatOptions(countries, "maQuocGia", "tenQuocGia")}
                            value={
                                maQuocGia
                                    ? formatOptions(
                                          countries,
                                          "maQuocGia",
                                          "tenQuocGia"
                                      ).find((opt) => opt.value === maQuocGia)
                                    : null
                            }
                            onChange={(selectedOption) =>
                                setMaQuocGia(selectedOption?.value || "")
                            }
                            placeholder={t("chonQuocGia")}
                            className="w-full mt-1 rounded-lg text-left"
                            isClearable
                        />
                    </div>

                    {/* SỐ ĐƠN GỐC */}
                  

                    {/* NGÀY ỦY QUYỀN */}
                    <div>
                        <label className="block text-gray-700 text-left">
                            Ngày ủy quyền{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <DatePicker
                            value={ngayUyQuyen ? dayjs(ngayUyQuyen) : null}
                            onChange={(d) =>
                                setNgayUyQuyen(d ? d.format("YYYY-MM-DD") : "")
                            }
                            format="DD/MM/YYYY"
                            className="w-full"
                            placeholder="Nhập ngày ủy quyền"
                        />
                    </div>

                    {/* NGÀY HẾT HẠN */}
                    <div>
                        <label className="block text-gray-700 text-left">
                            Ngày hết hạn
                        </label>
                        <DatePicker
                            value={ngayHetHan ? dayjs(ngayHetHan) : null}
                            onChange={(d) =>
                                setNgayHetHan(d ? d.format("YYYY-MM-DD") : "")
                            }
                            format="DD/MM/YYYY"
                            className="w-full"
                            placeholder="Nhập ngày hết hạn"
                        />
                    </div>

                    {/* LOẠI GIẤY ỦY QUYỀN */}
                    <div>
                        <label className="block text-gray-700 text-left">
                            Loại giấy ủy quyền{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <Select
                            options={loaiGUQOptions}
                            value={
                                loaiGUQ
                                    ? loaiGUQOptions.find(
                                          (opt) => opt.value === loaiGUQ
                                      )
                                    : null
                            }
                            onChange={(selectedOption) =>
                                setLoaiGUQ(selectedOption?.value || null)
                            }
                            placeholder="Chọn loại giấy ủy quyền"
                            className="w-full mt-1 rounded-lg text-left"
                            isClearable
                        />
                    </div>

                    {/* NGƯỜI KÝ */}
                    <div>
                        <label className="block text-gray-700 text-left">
                            Người ký <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={nguoiKy}
                            onChange={(e) => setNguoiKy(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg text-input"
                            placeholder="Nhập người ký"
                        />
                    </div>

                    {/* CHỨC DANH */}
                    <div>
                        <label className="block text-gray-700 text-left">
                            Chức danh
                        </label>
                        <input
                            type="text"
                            value={chucDanh}
                            onChange={(e) => setChucDanh(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg text-input"
                            placeholder="Nhập chức danh"
                        />
                    </div>

                    {/* UPLOAD FILE */}
                    <div className="col-span-2">
                        <label className="block text-gray-700 text-left">
                            Ảnh / File
                        </label>
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>
                                Chọn file
                            </Button>
                        </Upload>

                        {linkAnh && (
                            <>
                                <a
                                    href={linkAnh}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-500 underline block mt-2"
                                >
                                    Xem file đã chọn
                                </a>
                                {/* Nếu chắc chắn là ảnh, có thể thêm preview */}
                                {/* <img
                                    src={linkAnh}
                                    alt="preview"
                                    className="mt-2 max-h-64 object-contain"
                                /> */}
                            </>
                        )}
                    </div>

                    <div className="col-span-2">
                        <label className="block text-gray-900">
                            Danh sách đơn đã chỉ định
                        </label>
                        {/* phần này tuỳ bạn render thêm, hiện đang chỉ có label */}
                    </div>

                    {/* GHI CHÚ */}
                    <div className="col-span-2">
                        <label className="block text-gray-700 text-left">
                            Nội dung Giấy ủy quyền
                        </label>
                        <textarea
                            value={ghiChu}
                            onChange={(e) => setGhiChu(e.target.value)}
                            className="w-full p-2 border rounded-lg h-20 mt-1"
                        ></textarea>
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                        onClick={() => navigate(-1)}
                    >
                        Quay lại
                    </button>

                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Lưu lại
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PowerOfAttorneyAdd;
