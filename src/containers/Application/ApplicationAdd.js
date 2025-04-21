import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import callAPI from "../../utils/api";
import Select from "react-select";
import Modal from 'react-modal';
import AddDocumentModal from "../../components/TrademarkRegistrationProcess/AddDocumentModal";
import DocumentSection from "../../components/DocumentSection";
import AnnouncementOfApplication from "../../components/TrademarkRegistrationProcess/AnnouncementOfApplication";
import FormalDetermination from "../../components/TrademarkRegistrationProcess/FormalDetermination";
import ContentReview from "../../components/TrademarkRegistrationProcess/ContentReview";
import DiphimaProcess from "../../components/TrademarkRegistrationProcess/DiphimaProcess";
import DegreeInformation from "../../components/TrademarkRegistrationProcess/DegreeInformation";
function ApplicationAdd() {
    const navigate = useNavigate();
    const [maDonDangKy, setMaDonDangKy] = useState("");
    const [maHoSoVuViec, setMaHoSoVuViec] = useState("");
    const [maLoaiDon, setMaLoaiDon] = useState("")

    const [ngayNopDon, setNgayNopDon] = useState(null);
    const [ngayHoanThanhHSTL, setNgayHoanThanhHSTL] = useState(null);
    const [trangThaiHoanThanhHSTL, setTrangThaiHoanThanhHSTL] = useState("");

    const [ngayKQThamDinhHinhThuc_DuKien, setKQThamDinhHinhThuc_DuKien] = useState(null);
    const [ngayKQThamDinhHinhThuc, setKQThamDinhHinhThuc] = useState(null);

    const [ngayCongBo_DuKien, setNgayCongBo_DuKien] = useState(null);
    const [ngayCongBo, setNgayCongBo] = useState(null);

    const [ngayKQThamDinhND_DuKien, setNgayKQThamDinhND_DuKien] = useState(null);
    const [ngayKQThamDinhND, setNgayKQThamDinhND] = useState(null);

    const [ngayKQTraLoiThamDinhND_DuKien, setNgayKQTraLoihamDinhND_DuKien] = useState(null);
    const [ngayKQTraLoiThamDinhND, setNgayKQTraLoiThamDinhND] = useState(null);

    const [ngayThongBaoCapBang, setNgayThongBaoCapBang] = useState(null);
    const [ngayNopPhiCapBang, setNgayNopPhiCapBang] = useState(null);
    const [ngayNhanBang, setNgayNhanBang] = useState(null);
    const [ngayGuiBangChoKH, setNgayGuiBangChoKH] = useState(null);
    const [soBang, setSoBang] = useState("");
    const [ngayCapBang, setNgayCapBang] = useState(null);
    const [ngayHetHanBang, setNgayHetHanBang] = useState(null);

    const [trangThaiDon, setTrangThaiDon] = useState("");

    const [taiLieuList, setTaiLieuList] = useState([]);

    const processStatus = [
        { value: "chua_hoan_thanh", label: "Chưa hoàn thành" },
        { value: "hoan_thanh", label: "Hoàn thành" }
    ];
    const statusOptions = [
        { value: "dang_xu_ly", label: "Đang xử lý" },
        { value: "hoan_thanh", label: "Hoàn thành" },
        { value: "tam_dung", label: "Tạm dừng" }
    ];
    const [daChonNgayThamDinh, setDaChonNgayThamDinh] = useState(false);
    useEffect(() => {
        if (ngayNopDon) {
            const ngayKQThamDinhHinhThuc = dayjs(ngayNopDon).add(1, 'month');
            setKQThamDinhHinhThuc(ngayKQThamDinhHinhThuc.format('YYYY-MM-DD'));

        } else {
            setKQThamDinhHinhThuc(null);
        }
        // if (ngayKQThamDinhHinhThuc) {
        //     const ngayCongBo = dayjs(ngayKQThamDinhHinhThuc).add(2, 'month');
        //     setNgayCongBo_DuKien(ngayCongBo.format('YYYY-MM-DD'));
        // } else {
        //     setNgayCongBo_DuKien(null);
        // }

        if (ngayCongBo) {
            debugger
            const ngayKQThamDinhND = dayjs(ngayCongBo).add(9, 'month');
            setNgayKQThamDinhND_DuKien(ngayKQThamDinhND.format('YYYY-MM-DD'));
        } else {
            setNgayKQThamDinhND_DuKien(null);
        }

        if (ngayKQThamDinhND) {
            const ngayTraLoiKQThamDinhND = dayjs(ngayKQThamDinhND).add(3, 'month');
            setNgayKQTraLoihamDinhND_DuKien(ngayTraLoiKQThamDinhND.format('YYYY-MM-DD'));
        } else {
            setNgayKQTraLoihamDinhND_DuKien(null);
        }

        if (ngayThongBaoCapBang) {
            const ngayNopPhiCapBang = dayjs(ngayThongBaoCapBang).add(3, 'month');
            setNgayNopPhiCapBang(ngayNopPhiCapBang.format('YYYY-MM-DD'));
        } else {
            setNgayNopPhiCapBang(null);
        }

    }, [ngayNopDon, ngayKQThamDinhND, ngayThongBaoCapBang, ngayCongBo]);

    useEffect(() => {
        if (ngayKQThamDinhHinhThuc) {
            const ngayCongBo = dayjs(ngayKQThamDinhHinhThuc).add(2, 'month');
            setNgayCongBo_DuKien(ngayCongBo.format('YYYY-MM-DD'));
            setDaChonNgayThamDinh(true); // ✅ Cập nhật trạng thái
        } else {
            setNgayCongBo_DuKien(null);
        }
    }, [ngayKQThamDinhHinhThuc]);
    
    const formatOptions = (data, valueKey, labelKey) => {
        return data.map(item => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
    };

    // useEffect(() => {
    //     fetchApplicationTypes();
    // }, []);

    // Add case
    const handleApplication = async () => {
        try {
            await callAPI({
                method: "post",
                endpoint: "/application/add",
                data: {
                    maDonDangKy: maDonDangKy,
                    maHoSoVuViec: maHoSoVuViec,
                    ngayNopDon: ngayNopDon,
                    ngayHoanThanhHoSoTaiLieu: ngayHoanThanhHSTL,
                    trangThaiHoanThienHoSoTaiLieu: trangThaiHoanThanhHSTL,
                    ngayQuyetDinhDonHopLeDuKien: ngayKQThamDinhHinhThuc_DuKien,
                    ngayQuyetDinhDonHopLe: ngayKQThamDinhHinhThuc,
                    ngayCongBoDonDuKien: ngayCongBo_DuKien,
                    ngayCongBoDon: ngayCongBo,
                    ngayThamDinhNoiDungDuKien: ngayKQThamDinhND_DuKien,
                    ngayKetQuaThamDinhNoiDung: ngayKQThamDinhND,
                    ngayTraLoiKetQuaThamDinhNoiDungDuKien: ngayKQTraLoiThamDinhND_DuKien,
                    ngayTraLoiKetQuaThamDinhNoiDung: ngayKQTraLoiThamDinhND,
                    ngayThongBaoCapBang: ngayThongBaoCapBang,
                    ngayNopPhiCapBang: ngayNopPhiCapBang,
                    ngayNhanBang: ngayNhanBang,
                    ngayGuiBangChoKhachHang: ngayGuiBangChoKH,
                    trangThaiDon: trangThaiDon,
                    ngayCapBang: ngayCapBang,
                    ngayHetHanBang: ngayHetHanBang,
                    taiLieus: taiLieuList
                },
            });
            alert("Thêm hồ sơ vụ việc thành công!");
            navigate(-1);
        } catch (error) {
            console.error("Lỗi khi thêm hồ sơ vụ việc!", error);
        }
    };
    /////
    const handleTaiLieuChange = (list) => {
        setTaiLieuList(list);
        console.log("Tài liệu mới:", list); // In ra để kiểm tra
    };

    return (
        <div className="p-1 bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Thêm hồ sơ đơn đăng ký mới</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 text-left">Mã đơn đăng kí</label>
                        <input
                            type="text"
                            value={maDonDangKy}
                            onChange={(e) => setMaDonDangKy(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg h-10"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 text-left">Mã hồ sơ vụ việc</label>
                        <input
                            type="text"
                            value={maHoSoVuViec}
                            onChange={(e) => setMaHoSoVuViec(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg h-10"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày nộp đơn</label>
                        <input
                            type="date"
                            value={ngayNopDon}
                            onChange={(e) => setNgayNopDon(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">Ngày hoàn thành hồ sơ tài liệu</label>
                        <input
                            type="date"
                            value={ngayHoanThanhHSTL}
                            onChange={(e) => setNgayHoanThanhHSTL(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Trạng thái hoàn thành hồ sơ tài liệu</label>
                        <Select
                            options={formatOptions(processStatus, "value", "label")}
                            value={trangThaiHoanThanhHSTL ? processStatus.find(opt => opt.value === trangThaiHoanThanhHSTL) : null}
                            onChange={selectedOption => setTrangThaiHoanThanhHSTL(selectedOption?.value)}
                            placeholder="Chọn trạng thái hoàn thành hồ sơ vụ việc"
                            className="w-full mt-1 rounded-lg"
                            isClearable
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Trạng thái đơn</label>
                        <Select
                            options={formatOptions(statusOptions, "value", "label")}
                            value={trangThaiDon ? statusOptions.find(opt => opt.value === trangThaiDon) : null}
                            onChange={selectedOption => setTrangThaiDon(selectedOption?.value)}
                            placeholder="Chọn trạng thái đơn"
                            className="w-full mt-1 rounded-lg"
                            isClearable
                        />
                    </div>
                    <div className="col-span-2">
                        <FormalDetermination
                            ngayKQThamDinhHinhThuc_DuKien={ngayKQThamDinhHinhThuc_DuKien}
                            setKQTraLoiThamDinhHinhThuc_DuKien={setKQThamDinhHinhThuc_DuKien}
                            ngayKQThamDinhHinhThuc={ngayKQThamDinhHinhThuc}
                            setKQTraLoiThamDinhHinhThuc={setKQThamDinhHinhThuc}
                        />
                    </div>
                    {daChonNgayThamDinh && (
                        <div className="col-span-2">
                            <AnnouncementOfApplication
                                ngayCongBo_DuKien={ngayCongBo_DuKien}
                                setNgayCongBo_DuKien={setNgayCongBo_DuKien}
                                ngayCongBo={ngayCongBo}
                                setNgayCongBo={setNgayCongBo}
                            />
                        </div>
                    )}

                    
                    <div>
                        <label className="block text-gray-700 text-left">Ngày kết quả thẩm định nội dung đơn dự kiến</label>
                        <input
                            type="date"
                            disabled
                            value={ngayKQThamDinhND_DuKien}
                            onChange={(e) => setNgayKQThamDinhND_DuKien(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày kết quả thẩm định nội dung đơn</label>
                        <input
                            type="date"
                            value={ngayKQThamDinhND}
                            onChange={(e) => setNgayKQThamDinhND(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div className="col-span-2">
                        <ContentReview
                            ngayKQTraLoiThamDinhND_DuKien={ngayKQTraLoiThamDinhND_DuKien}
                            setNgayKQTraLoihamDinhND_DuKien={setNgayKQTraLoihamDinhND_DuKien}
                            ngayKQTraLoiThamDinhND={ngayKQTraLoiThamDinhND}
                            setNgayKQTraLoiThamDinhND={setNgayKQTraLoiThamDinhND}
                        />
                    </div>
                    <div className="col-span-2">
                        <DiphimaProcess
                            ngayThongBaoCapBang={ngayThongBaoCapBang}
                            setNgayThongBaoCapBang={setNgayThongBaoCapBang}
                            ngayNopPhiCapBang={ngayNopPhiCapBang}
                            setNgayNopPhiCapBang={setNgayNopPhiCapBang}
                            ngayNhanBang={ngayNhanBang}
                            setNgayNhanBang={setNgayNhanBang}
                        />

                    </div>
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
                </div>
                <DocumentSection onTaiLieuChange={handleTaiLieuChange} />
                <div className="flex justify-center gap-4 mt-4">
                    <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">Quay lại</button>
                    <button onClick={handleApplication} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Thêm đơn đăng ký</button>
                </div>
            </div>
        </div>
    );
}

export default ApplicationAdd;
