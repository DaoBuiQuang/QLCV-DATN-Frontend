import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import callAPI from "../../utils/api";
import Select from "react-select";
import DocumentSection from "../../components/UpdateDocument/DocumentSection";
import AnnouncementOfApplication from "../../components/TrademarkRegistrationProcess/AnnouncementOfApplication";
import FormalDetermination from "../../components/TrademarkRegistrationProcess/FormalDetermination";
import ReplyContentRating from "../../components/TrademarkRegistrationProcess/ReplyContentRating";
import DiphimaProcess from "../../components/TrademarkRegistrationProcess/DiphimaProcess";
import DegreeInformation from "../../components/TrademarkRegistrationProcess/DegreeInformation";
import ContentReview from "../../components/TrademarkRegistrationProcess/ContentReview";
import CompleteDocumentation from "../../components/TrademarkRegistrationProcess/CompleteDocumentation";
import DonProgress from "../../components/commom/DonProgess.js";
import ExportWordButton from "../../components/ExportFile/ExportWordButton.js";
import { DatePicker, Radio } from 'antd';
import 'dayjs/locale/vi';
import { showSuccess, showError } from "../../components/commom/Notification";
import BrandBasicForm from "../../components/BrandBasicForm";
import { Spin } from "antd";
function ApplicationEdit() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { maDonDangKy } = useParams();
    const isEditOnly = true
    const [maHoSoVuViec, setMaHoSoVuViec] = useState("");
    const [soDon, setSoDon] = useState("")
    const [ngayNopDon, setNgayNopDon] = useState(null);
    const [maNhanHieu, setMaNhanHieu] = useState("");
    const [tenNhanHieu, setTenNhanHieu] = useState("");
    const [linkAnh, setLinkAnh] = useState("");
    const nhanHieu = {
        maNhanHieu,
        tenNhanHieu,
        linkAnh,
    };
    const [maSPDVList, setMaSPDVList] = useState([]);

    const [ngayHoanThanhHSTL_DuKien, setNgayHoanThanhHSTL_DuKien] = useState(null);
    const [ngayHoanThanhHSTL, setNgayHoanThanhHSTL] = useState(null);
    const [trangThaiHoanThanhHSTL, setTrangThaiHoanThanhHSTL] = useState("");

    const [ngayKQThamDinhHinhThuc_DuKien, setNgayKQThamDinhHinhThuc_DuKien] = useState(null);
    const [ngayKQThamDinhHinhThuc, setNgayKQThamDinhHinhThuc] = useState(null);
    const [lichSuThamDinhHT, setLichSuThamDinhHT] = useState([])
    const [ngayKQThamDinhHinhThuc_DK_SauKN, setNgayKQThamDinhHinhThuc_DK_SauKN] = useState(null)

    const [ngayCongBo_DuKien, setNgayCongBo_DuKien] = useState(null);
    const [ngayCongBo, setNgayCongBo] = useState(null);

    const [ngayKQThamDinhND_DuKien, setNgayKQThamDinhND_DuKien] = useState(null);
    const [ngayKQThamDinhND, setNgayKQThamDinhND] = useState(null);
    const [lichSuThamDinhND, setLichSuThamDinhND] = useState([]);
    const [ngayKQThamDinhND_DK_SauKN, setNgayKQThamDinhND_DK_SauKN] = useState(null)
    const [trangThaiTraLoiKQThamDinhND, setTrangThaiTraLoiKQThamDinhND] = useState(null)


    const [ngayTraLoiKQThamDinhND_DuKien, setNgayTraLoiKQThamDinhND_DuKien] = useState(null);
    const [ngayTraLoiKQThamDinhND, setNgayTraLoiKQThamDinhND] = useState(null);

    const [ngayThongBaoCapBang, setNgayThongBaoCapBang] = useState(null);
    const [trangThaiCapBang, setTrangThaiCapBang] = useState(null);
    const [ngayNopYKien, setNgayNopYKien] = useState(null);
    const [ngayNhanKQYKien, setNgayNhanKQYKien] = useState(null);
    const [ketQuaYKien, setKetQuaYKien] = useState(null);
    const [ngayPhanHoiKQYKien, setNgayPhanHoiKQYKien] = useState(null);

    const [ngayNopPhiCapBang, setNgayNopPhiCapBang] = useState(null);
    const [ngayNhanBang, setNgayNhanBang] = useState(null);
    const [ngayGuiBangChoKH, setNgayGuiBangChoKH] = useState(null);
    const [soBang, setSoBang] = useState("");
    const [ngayCapBang, setNgayCapBang] = useState(null);
    const [ngayHetHanBang, setNgayHetHanBang] = useState(null);

    const [trangThaiDon, setTrangThaiDon] = useState("");
    const [buocXuLy, setBuocXuLy] = useState("");
    const [taiLieuList, setTaiLieuList] = useState([]);
    const [brands, setBrands] = useState([]);
    const [productAndService, setProductAndService] = useState([]);

    const [errors, setErrors] = useState({});
    const isFormValid = (maHoSoVuViec || "").trim() !== "" && (maNhanHieu || "").trim() !== "" && Array.isArray(maSPDVList) &&
        maSPDVList.length > 0;
    const validateField = (field, value) => {
        let error = "";
        if (field === "maHoSoVuViec" || field === "maNhanHieu") {
            if (!value || typeof value !== "string" || value.trim() === "") {
                if (field === "maHoSoVuViec") error = "Mã hồ sơ vụ việc không được để trống";
                if (field === "maNhanHieu") error = "Nhãn hiệu không được để trống";
            }
        }

        if (field === "maSPDVList") {
            if (!Array.isArray(value) || value.length === 0) {
                error = "Sản phẩm dịch vụ không được để trống";
            }
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }));
    };
    const [daChonNgayNopDon, setDaChonNgayNopDon] = useState(false);
    const [daChonNgayHoanThanhHSTL, setDaChonNgayHoanThanhHSTL] = useState(false);
    const [daChonNgayThamDinhHinhThuc, setDaChonNgayThamDinhHinhThuc] = useState(false);
    const [daChonNgayCongBoDon, setDaChonNgayCongBoDon] = useState(false);
    const [daChonNgayThamDinhNoiDung, setDaChonNgayThamDinhNoiDung] = useState(false);
    const [daChonNgayTraLoiThamDinhNoiDung, setDaChonNgayTraLoiThamDinhNoiDung] = useState(false)
    const [daChonHoanTatThuTucNhapBang, setDaChonHoanTatThuTucNhapBang] = useState(false)

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
    const fetchItems = async (searchValue) => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/productsandservices/list",
                data: { search: searchValue },
            });
            setProductAndService(response);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm/dịch vụ:", error);
        }
    };
    useEffect(() => {
        fetchBrands();
        fetchItems();
        detailApplication();
    }, [])
    useEffect(() => {
        if (ngayNopDon) {
            const ngayHoanThanhHoSoTaiLieu = dayjs(ngayNopDon).add(1, 'month');
            setNgayHoanThanhHSTL_DuKien(ngayHoanThanhHoSoTaiLieu.format('YYYY-MM-DD'));
            setDaChonNgayNopDon(true);
            setTrangThaiDon("Hoàn thành hồ sơ tài liệu")
        } else {
            setNgayHoanThanhHSTL_DuKien(null);
        }
        if (ngayHoanThanhHSTL) {
            const ngayKQThamDinhHinhThuc = dayjs(ngayHoanThanhHSTL).add(1, 'month');
            setNgayKQThamDinhHinhThuc_DuKien(ngayKQThamDinhHinhThuc.format('YYYY-MM-DD'));
            setDaChonNgayHoanThanhHSTL(true)
            setTrangThaiDon("Thẩm định hình thức")
        } else {
            setNgayKQThamDinhHinhThuc_DuKien(null);
        }
        if (ngayKQThamDinhHinhThuc) {
            const ngayCongBo = dayjs(ngayKQThamDinhHinhThuc).add(2, 'month');
            setNgayCongBo_DuKien(ngayCongBo.format('YYYY-MM-DD'));
            setDaChonNgayThamDinhHinhThuc(true);
            setTrangThaiDon("Công bố đơn")
        } else {
            setNgayCongBo_DuKien(null);
        }

        if (ngayCongBo) {
            const ngayKQThamDinhND = dayjs(ngayCongBo).add(9, 'month');
            setNgayKQThamDinhND_DuKien(ngayKQThamDinhND.format('YYYY-MM-DD'));
            setDaChonNgayCongBoDon(true)
            setTrangThaiDon("Thẩm định nội dung")
        } else {
            setNgayKQThamDinhND_DuKien(null);
        }

        if (ngayKQThamDinhND) {
            const ngayTraLoiKQThamDinhND = dayjs(ngayKQThamDinhND).add(3, 'month');
            setNgayTraLoiKQThamDinhND_DuKien(ngayTraLoiKQThamDinhND.format('YYYY-MM-DD'));
            setDaChonNgayThamDinhNoiDung(true);
            // setTrangThaiDon("Trả lời thẩm định nội dung")
        } else {
            setNgayTraLoiKQThamDinhND_DuKien(null);
        }
        if (ngayTraLoiKQThamDinhND) {
            setTrangThaiDon("Hoàn thành nhận bằng")
            setDaChonNgayTraLoiThamDinhNoiDung(true)
        }
        if (daChonNgayTraLoiThamDinhNoiDung || (trangThaiTraLoiKQThamDinhND === false && daChonNgayThamDinhNoiDung)) {
            setTrangThaiDon("Hoàn thành nhận bằng")
        }
        if (ngayThongBaoCapBang) {
            setTrangThaiDon("Gửi bằng cho khách hàng")
            const ngayNopPhiCapBang = dayjs(ngayThongBaoCapBang).add(3, 'month');
            setNgayNopPhiCapBang(ngayNopPhiCapBang.format('YYYY-MM-DD'));
        } else {
            setNgayNopPhiCapBang(null);
        }
        if (ngayNhanBang) {
            setDaChonHoanTatThuTucNhapBang(true);
        }
        if (ngayGuiBangChoKH) {
            setTrangThaiDon("Đơn đăng ký thành công")
        }
    }, [ngayNopDon, ngayHoanThanhHSTL, ngayKQThamDinhND, ngayThongBaoCapBang, ngayCongBo, ngayKQThamDinhHinhThuc, ngayTraLoiKQThamDinhND, ngayNhanBang, daChonNgayTraLoiThamDinhNoiDung, trangThaiTraLoiKQThamDinhND, daChonNgayThamDinhNoiDung, ngayGuiBangChoKH]);

    const formatOptions = (data, valueKey, labelKey) => {
        return data.map(item => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
    };
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString().split("T")[0];
    };
    const detailApplication = async () => {
        setLoading(true);
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "application/detail",
                data: { maDonDangKy }
            });

            if (response) {
                setMaHoSoVuViec(response.maHoSoVuViec);
                setSoDon(response.soDon)
                setMaNhanHieu(response.nhanHieu.maNhanHieu);
                setTenNhanHieu(response.nhanHieu.tenNhanHieu);
                setLinkAnh(response.nhanHieu.linkAnh);
                setTrangThaiDon(response.trangThaiDon);
                setBuocXuLy(response.buocXuLy);
                setMaSPDVList(response.maSPDVList)
                setNgayNopDon(formatDate(response.ngayNopDon));
                setNgayHoanThanhHSTL_DuKien(formatDate(response.ngayHoanThanhHoSoTaiLieu_DuKien));
                setNgayHoanThanhHSTL(formatDate(response.ngayHoanThanhHoSoTaiLieu));
                setTrangThaiHoanThanhHSTL(response.trangThaiHoanThienHoSoTaiLieu);
                setNgayKQThamDinhHinhThuc_DuKien(formatDate(response.ngayKQThamDinhHinhThuc_DuKien));
                setLichSuThamDinhHT(response.lichSuThamDinhHT)
                setNgayKQThamDinhHinhThuc_DK_SauKN(response.ngayKQThamDinhHinhThuc_DK_SauKN)

                setNgayKQThamDinhHinhThuc(formatDate(response.ngayKQThamDinhHinhThuc));
                setNgayCongBo_DuKien(formatDate(response.ngayCongBoDonDuKien));
                setNgayCongBo(formatDate(response.ngayCongBoDon));
                setNgayKQThamDinhND_DuKien(formatDate(response.ngayKQThamDinhND_DuKien));
                setNgayKQThamDinhND(formatDate(response.ngayKQThamDinhND));
                setNgayTraLoiKQThamDinhND_DuKien(formatDate(response.ngayTraLoiKQThamDinhND_DuKien));
                setNgayTraLoiKQThamDinhND(formatDate(response.ngayTraLoiKQThamDinhND));
                setLichSuThamDinhND(response.lichSuThamDinhND)
                setNgayKQThamDinhND_DK_SauKN(response.ngayKQThamDinhND_DK_SauKN);
                setTrangThaiTraLoiKQThamDinhND(response.trangThaiTraLoiKQThamDinhND);

                setNgayThongBaoCapBang(formatDate(response.ngayThongBaoCapBang));
                setTrangThaiCapBang(response.trangThaiDYTBCapBang);
                setNgayNopYKien(formatDate(response.ngayNopYKien));
                setNgayNhanKQYKien(formatDate(response.ngayNhanKQYKien));
                setKetQuaYKien(response.ketQuaYKien);
                setNgayPhanHoiKQYKien(formatDate(response.ngayPhanHoiKQYKien));

                setNgayNopPhiCapBang(formatDate(response.ngayNopPhiCapBang));
                setNgayNhanBang(formatDate(response.ngayNhanBang));
                setNgayGuiBangChoKH(formatDate(response.ngayGuiBangChoKhachHang));
                setSoBang(response.soBang);
                setNgayCapBang(formatDate(response.ngayCapBang));
                setNgayHetHanBang(formatDate(response.ngayHetHanBang));
                setTrangThaiDon(response.trangThaiDon);
                setTaiLieuList(response.taiLieu)
            }
        } catch (error) {
            console.error("Lỗi khi gọi API chi tiết đơn:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApplication = async () => {
        try {
            await callAPI({
                method: "put",

                endpoint: "/application/edit",
                data: {
                    maDonDangKy: maDonDangKy,
                    maHoSoVuViec: maHoSoVuViec,
                    soDon: soDon,
                    maNhanHieu: maNhanHieu,
                    maSPDVList: maSPDVList,
                    trangThaiDon: trangThaiDon,
                    buocXuLy: buocXuLy,

                    ngayNopDon: ngayNopDon || null,
                    ngayHoanThanhHoSoTaiLieu_DuKien: ngayHoanThanhHSTL_DuKien || null,
                    ngayHoanThanhHoSoTaiLieu: ngayHoanThanhHSTL || null,
                    trangThaiHoanThienHoSoTaiLieu: trangThaiHoanThanhHSTL,
                    ngayKQThamDinhHinhThuc_DuKien: ngayKQThamDinhHinhThuc_DuKien || null,
                    ngayKQThamDinhHinhThuc: ngayKQThamDinhHinhThuc || null,
                    lichSuThamDinhHT: lichSuThamDinhHT,
                    ngayKQThamDinhHinhThuc_DK_SauKN: ngayKQThamDinhHinhThuc_DK_SauKN,
                    ngayCongBoDonDuKien: ngayCongBo_DuKien || null,
                    ngayCongBoDon: ngayCongBo || null,
                    ngayKQThamDinhND_DuKien: ngayKQThamDinhND_DuKien || null,
                    ngayKQThamDinhND: ngayKQThamDinhND || null,
                    lichSuThamDinhND: lichSuThamDinhND,
                    ngayKQThamDinhND_DK_SauKN: ngayKQThamDinhND_DK_SauKN,
                    trangThaiTraLoiKQThamDinhND: trangThaiTraLoiKQThamDinhND,
                    ngayTraLoiKQThamDinhND_DuKien: ngayTraLoiKQThamDinhND_DuKien || null,
                    ngayTraLoiKQThamDinhND: ngayTraLoiKQThamDinhND || null,
                    ngayThongBaoCapBang: ngayThongBaoCapBang || null,
                    trangThaiDYTBCapBang: trangThaiCapBang || null,

                    ngayNopYKien: ngayNopYKien || null,
                    ngayNhanKQYKien: ngayNhanKQYKien || null,
                    ketQuaYKien: ketQuaYKien || null,
                    ngayPhanHoiKQYKien: ngayPhanHoiKQYKien || null,

                    ngayNopPhiCapBang: ngayNopPhiCapBang || null,
                    ngayNhanBang: ngayNhanBang || null,
                    ngayGuiBangChoKhachHang: ngayGuiBangChoKH || null,
                    ngayCapBang: ngayCapBang || null,
                    ngayHetHanBang: ngayHetHanBang || null,
                    soBang: soBang,
                    taiLieus: taiLieuList,
                    nhanHieu
                },
            });
            await showSuccess("Thành công!", "Cập nhật đơn đăng ký nhãn hiệu thành công!");
            navigate(-1);
        } catch (error) {
            showError("Thất bại!", "Đã xảy ra lỗi.", error);
            console.error("Lỗi khi thêm hồ sơ vụ việc!", error);
        }
    };
    const handleSubmit = () => {

        handleApplication();

    };
    const handleTaiLieuChange = (list) => {
        setTaiLieuList(list);
    };

    return (
        <div className="p-1 bg-gray-100 flex items-center justify-center space-y-4">
            <DonProgress trangThaiDon={trangThaiDon} />
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Sửa đơn đăng ký nhãn hiệu</h2>
                <Spin spinning={loading} tip="Loading..." size="large">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div >
                                <label className="block text-gray-700 text-left text-left">Mã hồ sơ vụ việc</label>
                                <input
                                    type="text"
                                    value={maHoSoVuViec}
                                    onChange={(e) => setMaHoSoVuViec(e.target.value)}
                                    className="w-full p-2 mt-1 border rounded-lg text-input h-10 bg-gray-200"
                                    disabled
                                />
                            </div>
                            <div >
                                <label className="block text-gray-700 text-left text-left">Số đơn</label>
                                <input
                                    type="text"
                                    value={soDon}
                                    placeholder="Nhập số đơn"
                                    onChange={(e) => setSoDon(e.target.value)}
                                    className="w-full p-2 mt-1 border rounded-lg text-input h-10"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-left text-left">Trạng thái đơn</label>
                                <input
                                    type="text"
                                    value={trangThaiDon}
                                    disabled
                                    onChange={(e) => setTrangThaiDon(e.target.value)}
                                    className="w-full p-2 mt-1 border rounded-lg text-input h-10 bg-gray-200"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-left">Bước xử lý</label>
                                <input
                                    type="text"
                                    value={buocXuLy}
                                    disabled
                                    onChange={(e) => setBuocXuLy(e.target.value)}
                                    className="w-full p-2 mt-1 border rounded-lg text-input h-10 bg-gray-200"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-left text-left">Ngày nộp đơn</label>
                                <DatePicker
                                    value={ngayNopDon ? dayjs(ngayNopDon) : null}
                                    onChange={(date) => {
                                        if (dayjs.isDayjs(date) && date.isValid()) {
                                            setNgayNopDon(date.format("YYYY-MM-DD"));
                                        } else {
                                            setNgayNopDon(null);
                                        }
                                    }}
                                    format="DD/MM/YYYY"
                                    placeholder="Chọn ngày nộp đơn"
                                    className="mt-1 w-full"
                                />
                            </div>
                            <div className="col-span-2">
                                <BrandBasicForm
                                    maNhanHieu={maNhanHieu}
                                    setMaNhanHieu={setMaNhanHieu}
                                    tenNhanHieu={tenNhanHieu}
                                    setTenNhanHieu={setTenNhanHieu}
                                    linkAnh={linkAnh}
                                    setLinkAnh={setLinkAnh}
                                    errors={errors}
                                    validateField={validateField}
                                    isEditOnly
                                />
                            </div>
                            <div >
                                <label className="block text-gray-700 text-left">Danh sách sản phẩm dịch vụ <span className="text-red-500">*</span></label>
                                <Select
                                    options={formatOptions(productAndService, "maSPDV", "tenSPDV")}
                                    value={
                                        maSPDVList && maSPDVList.length > 0
                                            ? formatOptions(productAndService, "maSPDV", "tenSPDV").filter(opt => maSPDVList.includes(opt.value))
                                            : []
                                    }
                                    onChange={(selectedOptions) => {
                                        const selectedValues = selectedOptions ? selectedOptions.map(opt => opt.value) : [];
                                        setMaSPDVList(selectedValues);
                                        validateField("maSPDVList", selectedValues);
                                    }}
                                    placeholder="Chọn mã nhãn hiệu"
                                    className="w-full mt-1 rounded-lg h-10 text-left"
                                    isClearable
                                    isMulti
                                />
                                {errors.maSPDVList && (
                                    <p className="text-red-500 text-xs mt-1 text-left">{errors.maSPDVList}</p>
                                )}

                            </div>
                        </div>
                        {daChonNgayNopDon && (
                            <div className="col-span-2">
                                <CompleteDocumentation
                                    ngayHoanThanhHSTL_DuKien={ngayHoanThanhHSTL_DuKien}
                                    setNgayHoanThanhHSTL_DuKien={setNgayHoanThanhHSTL_DuKien}
                                    ngayHoanThanhHSTL={ngayHoanThanhHSTL}
                                    setNgayHoanThanhHSTL={setNgayHoanThanhHSTL}
                                    trangThaiHoanThanhHSTL={trangThaiHoanThanhHSTL}
                                    setTrangThaiHoanThanhHSTL={setTrangThaiHoanThanhHSTL}
                                    formatOptions={formatOptions}
                                />
                            </div>
                        )}
                        {daChonNgayNopDon && (
                            <div className="col-span-2">
                                <DocumentSection onTaiLieuChange={handleTaiLieuChange} initialTaiLieus={taiLieuList} />
                            </div>
                        )}

                        {daChonNgayHoanThanhHSTL && (
                            <div className="col-span-2">
                                <FormalDetermination
                                    ngayKQThamDinhHinhThuc_DuKien={ngayKQThamDinhHinhThuc_DuKien}
                                    setNgayKQThamDinhHinhThuc_DuKien={setNgayKQThamDinhHinhThuc_DuKien}
                                    ngayKQThamDinhHinhThuc={ngayKQThamDinhHinhThuc}
                                    setNgayKQThamDinhHinhThuc={setNgayKQThamDinhHinhThuc}
                                    lichSuThamDinhHT={lichSuThamDinhHT}
                                    setLichSuThamDinhHT={setLichSuThamDinhHT}
                                    ngayKQThamDinhHinhThuc_DK_SauKN={ngayKQThamDinhHinhThuc_DK_SauKN}
                                    setNgayKQThamDinhHinhThuc_DK_SauKN={setNgayKQThamDinhHinhThuc_DK_SauKN}
                                    buocXuLy={buocXuLy}
                                    setBuocXuLy={setBuocXuLy}
                                />
                            </div>
                        )}
                        {daChonNgayThamDinhHinhThuc && (
                            <div className="col-span-2">
                                <AnnouncementOfApplication
                                    ngayCongBo_DuKien={ngayCongBo_DuKien}
                                    setNgayCongBo_DuKien={setNgayCongBo_DuKien}
                                    ngayCongBo={ngayCongBo}
                                    setNgayCongBo={setNgayCongBo}
                                />
                            </div>
                        )}
                        {daChonNgayCongBoDon && (
                            <div className="col-span-2">
                                <ContentReview
                                    ngayKQThamDinhND_DuKien={ngayKQThamDinhND_DuKien}
                                    setNgayKQThamDinhND_DuKien={setNgayKQThamDinhND_DuKien}
                                    ngayKQThamDinhND={ngayKQThamDinhND}
                                    setNgayKQThamDinhND={setNgayKQThamDinhND}
                                    lichSuThamDinhND={lichSuThamDinhND}
                                    setLichSuThamDinhND={setLichSuThamDinhND}
                                    ngayKQThamDinhND_DK_SauKN={ngayKQThamDinhND_DK_SauKN}
                                    setNgayKQThamDinhND_DK_SauKN={setNgayKQThamDinhND_DK_SauKN}
                                    buocXuLy={buocXuLy}
                                    setBuocXuLy={setBuocXuLy}
                                />
                            </div>
                        )}
                        {daChonNgayThamDinhNoiDung && (
                            <div>
                                {/* <label className="block text-gray-700 text-left">Trạng thái phản hồi kết quả thẩm định nội dung</label> */}
                                <Radio.Group
                                    onChange={(e) => setTrangThaiTraLoiKQThamDinhND(e.target.value)}
                                    value={trangThaiTraLoiKQThamDinhND}
                                    className="mt-2"
                                >
                                    <Radio value={true}>Phản hồi</Radio>
                                    <Radio value={false}>Chờ nhận đơn</Radio>
                                </Radio.Group>
                            </div>
                        )}
                        {daChonNgayThamDinhNoiDung && trangThaiTraLoiKQThamDinhND === true && (
                            <div className="col-span-2">
                                <ReplyContentRating
                                    ngayTraLoiKQThamDinhND_DuKien={ngayTraLoiKQThamDinhND_DuKien}
                                    setNgayTraLoiKQThamDinhND_DuKien={setNgayTraLoiKQThamDinhND_DuKien}
                                    ngayTraLoiKQThamDinhND={ngayTraLoiKQThamDinhND}
                                    setNgayTraLoiKQThamDinhND={setNgayTraLoiKQThamDinhND}
                                />
                            </div>
                        )}
                        {(daChonNgayTraLoiThamDinhNoiDung || (!trangThaiTraLoiKQThamDinhND && daChonNgayThamDinhNoiDung)) && (
                            <div className="col-span-2">
                                <DiphimaProcess
                                    ngayThongBaoCapBang={ngayThongBaoCapBang}
                                    setNgayThongBaoCapBang={setNgayThongBaoCapBang}
                                    ngayNopPhiCapBang={ngayNopPhiCapBang}
                                    setNgayNopPhiCapBang={setNgayNopPhiCapBang}
                                    ngayNhanBang={ngayNhanBang}
                                    setNgayNhanBang={setNgayNhanBang}
                                    trangThaiCapBang={trangThaiCapBang}
                                    setTrangThaiCapBang={setTrangThaiCapBang}
                                    ngayNopYKien={ngayNopYKien}
                                    setNgayNopYKien={setNgayNopYKien}
                                    ngayNhanKQYKien={ngayNhanKQYKien}
                                    setNgayNhanKQYKien={setNgayNhanKQYKien}
                                    ketQuaYKien={ketQuaYKien}
                                    setKetQuaYKien={setKetQuaYKien}
                                    ngayPhanHoiKQYKien={ngayPhanHoiKQYKien}
                                    setNgayPhanHoiKQYKien={setNgayPhanHoiKQYKien}
                                />
                            </div>
                        )}
                        {daChonHoanTatThuTucNhapBang && (
                            <div className="col-span-2">
                                <DegreeInformation
                                    soBang={soBang}
                                    setSoBang={setSoBang}
                                    ngayCapBang={ngayCapBang}
                                    setNgayCapBang={setNgayCapBang}
                                    ngayHetHanBang={ngayHetHanBang}
                                    setNgayHetHanBang={setNgayHetHanBang}
                                    ngayGuiBangChoKH={ngayGuiBangChoKH}
                                    setNgayGuiBangChoKH={setNgayGuiBangChoKH}
                                />
                            </div>
                        )}
                    </div>
                </Spin>
                <div className="flex justify-center gap-4 mt-4">
                    <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">Quay lại</button>
                    <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Sửa đơn đăng ký</button>
                </div>
                <div className="mt-4">
                    <ExportWordButton
                        data={{
                            maHoSoVuViec: maHoSoVuViec,
                            soDon: soDon,
                            trangThaiDon: trangThaiDon,
                            ngayNopDon: ngayNopDon,
                            maNhanHieu: maNhanHieu,
                            ngayHoanThanhHSTL_DuKien: ngayHoanThanhHSTL_DuKien,
                            ngayHoanThanhHSTL: ngayHoanThanhHSTL,
                            ngayKQThamDinhHinhThuc_DuKien: ngayKQThamDinhHinhThuc_DuKien,
                            ngayKQThamDinhHinhThuc: ngayKQThamDinhHinhThuc,

                            ngayCongBo_DuKien: ngayCongBo_DuKien,
                            ngayCongBo: ngayCongBo,

                        }}
                        fileName={`ThongDonDangKy_${maDonDangKy}`}
                    />
                </div>

            </div>
        </div>
    );
}

export default ApplicationEdit;
