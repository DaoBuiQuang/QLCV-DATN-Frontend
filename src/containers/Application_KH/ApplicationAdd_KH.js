import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import callAPI from "../../utils/api.js";
import Select from "react-select";
import DocumentSection from "../../components/UpdateDocument/DocumentSection.js";
import ContentReview_KH from "../../components/TrademarkRegistrationProcess/KH/ContentReview_KH.js";
import DegreeInformation from "../../components/TrademarkRegistrationProcess/DegreeInformation.js";
import CompleteDocumentation from "../../components/TrademarkRegistrationProcess/CompleteDocumentation.js";
import DonProgress from "../../components/commom/DonProgess.js";
import { DatePicker, Radio } from 'antd';
import 'dayjs/locale/vi';
import { showSuccess, showError } from "../../components/commom/Notification.js";
import BrandBasicForm from "../../components/BrandBasicForm.js";
function ApplicationAdd_KH() {
    const navigate = useNavigate();
    const { maHoSoVuViec } = useParams();
    const isAddOnly = true
    const [soDon, setSoDon] = useState("")
    const [ngayNopDon, setNgayNopDon] = useState(null);
    const [maNhanHieuOld, setMaNhanHieuOld] = useState("");
    // const [maNhanHieu, setMaNhanHieu] = useState("");
    const [tenNhanHieu, setTenNhanHieu] = useState("");
    const [linkAnh, setLinkAnh] = useState("");
    const nhanHieu = {
        // maNhanHieu,
        tenNhanHieu,
        linkAnh,
    };
    const [maSPDVList, setMaSPDVList] = useState([]);
    const [ghiChu, setGhiChu] = useState("");
    const [ngayHoanThanhHSTL_DuKien, setNgayHoanThanhHSTL_DuKien] = useState(null);
    const [ngayHoanThanhHSTL, setNgayHoanThanhHSTL] = useState(null);
    const [trangThaiHoanThanhHSTL, setTrangThaiHoanThanhHSTL] = useState("");

    const [ngayKQThamDinhND_DuKien, setNgayKQThamDinhND_DuKien] = useState(null);
    const [ngayKQThamDinhND, setNgayKQThamDinhND] = useState(null);
    const [lichSuThamDinhND, setLichSuThamDinhND] = useState([])
    const [ngayKQThamDinhND_DK_SauKN, setNgayKQThamDinhND_DK_SauKN] = useState(null)
    const [trangThaiTraLoiKQThamDinhND, setTrangThaiTraLoiKQThamDinhND] = useState(null)

    const [ngayNopPhiCapBang, setNgayNopPhiCapBang] = useState(null);
    const [ngayNhanBang, setNgayNhanBang] = useState(null);
    const [ngayGuiBangChoKH, setNgayGuiBangChoKH] = useState(null);
    const [soBang, setSoBang] = useState("");
    const [quyetDinhSo, setQuyetDinhSo] = useState("");
    const [ngayCapBang, setNgayCapBang] = useState(null);
    const [ngayHetHanBang, setNgayHetHanBang] = useState(null);

    const [trangThaiDon, setTrangThaiDon] = useState("Nộp đơn");
    const [buocXuLy, setBuocXuLy] = useState("");

    const [taiLieuList, setTaiLieuList] = useState([]);
    const [giayUyQuyenGoc, setGiayUyQuyenGoc] = useState(true);
    const [maUyQuyen, setMaUyQuyen] = useState(null);
    const [brands, setBrands] = useState([]);
    const [productAndService, setProductAndService] = useState([]);

    const [errors, setErrors] = useState({});
    const isFormValid =
        (maHoSoVuViec || "").trim() !== "" &&
        ((tenNhanHieu || "").trim() !== "" || (String(maNhanHieuOld || "").trim() !== "")) &&
        Array.isArray(maSPDVList) &&
        maSPDVList.length > 0;

    const validateField = (field, value) => {
        let error = "";
        if (field === "maHoSoVuViec" || field === "maNhanHieu") {
            if (!value || typeof value !== "string" || value.trim() === "") {
                if (field === "maHoSoVuViec") error = "Mã hồ sơ vụ việc không được để trống";
                if (field === "tenNhanHieu") error = "Tên nhãn hiệu không được để trống";
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
    const [daChonNgayThamDinhNoiDung, setDaChonNgayThamDinhNoiDung] = useState(false);
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
    }, [])
    const trangThaiDonRef = useRef();

    const updateTrangThaiDon = (trangThaiMoi) => {
        if (trangThaiDonRef.current !== trangThaiMoi) {
            setTrangThaiDon(trangThaiMoi);
            trangThaiDonRef.current = trangThaiMoi;
        }
    };

    useEffect(() => {
        if (soBang) {
            setTrangThaiDon("Đơn đăng ký hoàn tất");
            setDaChonNgayNopDon(true);
            setDaChonNgayHoanThanhHSTL(true);
            setDaChonNgayThamDinhNoiDung(true);
            setDaChonHoanTatThuTucNhapBang(true);
        }
        if (ngayNopDon) {
            const duKien = dayjs(ngayNopDon).add(2, 'month').format('YYYY-MM-DD');
            setNgayHoanThanhHSTL_DuKien(duKien);
            // 👉 Chỉ set ngày hết hạn nếu chưa có
            if (!ngayHetHanBang) {
                const hetHanBang = dayjs(ngayNopDon).add(10, 'year').format('YYYY-MM-DD');
                setNgayHetHanBang(hetHanBang);
            }

            setDaChonNgayNopDon(true);
            updateTrangThaiDon("Hoàn thành hồ sơ tài liệu");
        } else {
            setNgayHoanThanhHSTL_DuKien(null);
            setNgayHetHanBang(null);
        }
        if (ngayHoanThanhHSTL) {
            // if (!ngayKQThamDinhND_DuKien) {
            const duKien1 = dayjs(ngayHoanThanhHSTL).add(2, 'month').format('YYYY-MM-DD');
            const duKien = dayjs(ngayHoanThanhHSTL).add(6, 'month').format('YYYY-MM-DD');
            setNgayHoanThanhHSTL_DuKien(duKien1);
            setNgayKQThamDinhND_DuKien(duKien);
            // }
            // setDaChonNgayCongBoDon(true);
            updateTrangThaiDon("Thẩm định");
        } else {
            setNgayKQThamDinhND_DuKien(null);
        }

        // const baseNgay = ngayNhanKQYKien || ngayThongBaoCapBang;
        // if (ngayKQThamDinhND) {
        //     debugger
        //     setDaChonNgayThamDinhNoiDung(true);
        //     updateTrangThaiDon("Gửi bằng cho khách hàng");
        // }

        if (ngayKQThamDinhND) {
            updateTrangThaiDon("Đơn đăng ký hoàn tất");
        }

    }, [
        ngayNopDon,
        ngayHoanThanhHSTL,
        ngayKQThamDinhND,
        trangThaiTraLoiKQThamDinhND,
        ngayNhanBang,
        ngayGuiBangChoKH,
        ngayHoanThanhHSTL_DuKien,
        ngayKQThamDinhND_DuKien,
        daChonNgayThamDinhNoiDung,
    ]);

    const formatOptions = (data, valueKey, labelKey) => {
        return data.map(item => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
    };

    const handleApplication = async () => {
        try {
            await callAPI({
                method: "post",
                endpoint: "/application_kh/add",
                data: {
                    maHoSoVuViec: maHoSoVuViec,
                    soDon: soDon,
                    maNhanHieu: maNhanHieuOld,
                    maSPDVList: maSPDVList,
                    trangThaiDon: trangThaiDon,
                    buocXuLy: buocXuLy,
                    ghiChu: ghiChu,
                    ngayNopDon: ngayNopDon,
                    ngayHoanThanhHoSoTaiLieu_DuKien: ngayHoanThanhHSTL_DuKien,
                    ngayHoanThanhHoSoTaiLieu: ngayHoanThanhHSTL,
                    trangThaiHoanThienHoSoTaiLieu: trangThaiHoanThanhHSTL,
                    ngayKQThamDinh_DuKien: ngayKQThamDinhND_DuKien,
                    ngayKQThamDinh: ngayKQThamDinhND,
                    lichSuThamDinh: lichSuThamDinhND,
                    ngayKQThamDinh_DK_SauKN: ngayKQThamDinhND_DK_SauKN,

                    ngayNhanBang: ngayNhanBang,
                    ngayGuiBangChoKhachHang: ngayGuiBangChoKH,
                    ngayCapBang: ngayCapBang,
                    ngayHetHanBang: ngayHetHanBang,
                    soBang: soBang,
                    quyetDinhSo: quyetDinhSo,
                    taiLieus: taiLieuList,
                    giayUyQuyenGoc: giayUyQuyenGoc || true,
                    maUyQuyen: maUyQuyen || null,
                    nhanHieu
                },
            });
            await showSuccess("Thành công!", "Thêm đơn đăng ký nhãn hiệu thành công!");
            navigate(-1);
        } catch (error) {
            showError("Thất bại!", "Đã xảy ra lỗi.", error);
            console.error("Lỗi khi thêm đơn đăng ký!", error);
        }
    };
    const handleSubmit = () => {
        handleApplication();
    };

    const handleTaiLieuChange = (list) => {
        setTaiLieuList(list);
    };

    return (
        <div className="p-1 bg-gray-100 flex  items-center justify-center space-y-4">
            {/* <DonProgress trangThaiDon={trangThaiDon} /> */}
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        📌 Thêm đơn đăng ký nhãn hiệu mới
                    </h2>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg"
                        alt="Cờ Campuchia"
                        className="w-20 h-15"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div >
                            <label className="block text-gray-700 text-left">Mã hồ sơ vụ việc <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={maHoSoVuViec}

                                className="w-full p-2 mt-1 border rounded-lg text-input h-10 bg-gray-200"
                                disabled
                            />
                        </div>
                        <div >
                            <label className="block text-gray-700 text-left ">Số đơn</label>
                            <input
                                type="text"
                                value={soDon}
                                placeholder="Nhập số đơn"
                                onChange={(e) => setSoDon(e.target.value)}
                                className="w-full p-2 mt-1 border rounded-lg text-input h-10"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-left">Trạng thái đơn</label>
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
                        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Cột trái: Ngày nộp đơn + Danh sách sản phẩm dịch vụ */}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-gray-700 text-left">Ngày nộp đơn</label>
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
                                        disabledDate={(current) => {
                                            return current && current > dayjs().endOf("day");
                                        }}
                                    />
                                </div>

                                <div>
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
                                        className="w-full mt-1 rounded-lg text-left"
                                        isClearable
                                        isMulti
                                    />
                                    {errors.maSPDVList && (
                                        <p className="text-red-500 text-xs mt-1 text-left">{errors.maSPDVList}</p>
                                    )}
                                </div>
                            </div>

                            {/* Cột phải: Ghi chú */}
                            <div>
                                <label className="block  text-left">Ghi chú</label>
                                <textarea
                                    value={ghiChu}
                                    placeholder="Nhập ghi chú"
                                    onChange={(e) => setGhiChu(e.target.value)}
                                    className="w-full p-2 mt-1 border rounded-lg  min-h-[120px] resize-none"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <BrandBasicForm
                                maNhanHieuOld={maNhanHieuOld}
                                setMaNhanHieuOld={setMaNhanHieuOld}
                                tenNhanHieu={tenNhanHieu}
                                setTenNhanHieu={setTenNhanHieu}
                                linkAnh={linkAnh}
                                setLinkAnh={setLinkAnh}
                                errors={errors}
                                setErrors={setErrors}
                                validateField={validateField}
                                brands={brands}
                            />
                        </div>
                    </div>

                    {/* {daChonNgayNopDon && ( */}
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
                    {/* )} */}
                    {/* {daChonNgayNopDon && ( */}
                        <div className="col-span-2">
                            <DocumentSection onTaiLieuChange={handleTaiLieuChange} isAddOnly={isAddOnly}
                                maHoSoVuViec={maHoSoVuViec}
                                giayUyQuyenGoc={giayUyQuyenGoc}
                                setGiayUyQuyenGoc={setGiayUyQuyenGoc}
                                maUyQuyen={maUyQuyen}
                                setMaUyQuyen={setMaUyQuyen}
                            />
                        </div>
                    {/* )} */}
                    {/* {daChonNgayHoanThanhHSTL && ( */}
                        <div className="col-span-2">
                            <ContentReview_KH
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
                    {/* )} */}
                   
                    {/* {(daChonNgayThamDinhNoiDung || (!trangThaiTraLoiKQThamDinhND && daChonNgayThamDinhNoiDung)) && ( */}
                        <div className="col-span-2">
                            <DegreeInformation
                                soBang={soBang}
                                setSoBang={setSoBang}
                                quyetDinhSo={quyetDinhSo}
                                setQuyetDinhSo={setQuyetDinhSo}
                                ngayCapBang={ngayCapBang}
                                setNgayCapBang={setNgayCapBang}
                                ngayHetHanBang={ngayHetHanBang}
                                setNgayHetHanBang={setNgayHetHanBang}
                                ngayGuiBangChoKH={ngayGuiBangChoKH}
                                setNgayGuiBangChoKH={setNgayGuiBangChoKH}
                            />
                        </div>
                    {/* )} */}
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">Quay lại</button>
                    <button onClick={handleSubmit} disabled={!isFormValid}
                        className={`px-4 py-2 rounded-lg text-white ${isFormValid
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-blue-300 cursor-not-allowed"
                            }`}>Thêm đơn đăng ký</button>
                </div>
            </div>
        </div>
    );
}

export default ApplicationAdd_KH;
