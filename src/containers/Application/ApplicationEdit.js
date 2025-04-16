import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import callAPI from "../../utils/api";
import Select from "react-select";
import DocumentSection from "../../components/DocumentSection";
function ApplicationEdit() {
    const navigate = useNavigate();
    const { maDonDangKy } = useParams();
    const [maHoSoVuViec, setMaHoSoVuViec] = useState("");
    const [maLoaiDon, setMaLoaiDon] = useState("");

    const [ngayNopDon, setNgayNopDon] = useState(null);
    const [ngayHoanThanhHSTL, setNgayHoanThanhHSTL] = useState(null);
    const [trangThaiHoanThanhHSTL, setTrangThaiHoanThanhHSTL] = useState("");

    const [ngayQDHopLe_DuKien, setNgayQDHopLe_DuKien] = useState(null);
    const [ngayQDHopLe, setNgayQDHopLe] = useState(null);

    const [ngayCongBo_DuKien, setNgayCongBo_DuKien] = useState(null);
    const [ngayCongBo, setNgayCongBo] = useState(null);

    const [ngayThamDinhND_DuKien, setNgayThamDinhND_DuKien] = useState(null);
    const [ngayThamDinhND, setNgayThamDinhND] = useState(null);

    const [ngayTraLoiKQThamDinhND_DuKien, setNgayTraLoiKQThamDinhND_DuKien] = useState(null);
    const [ngayTraLoiKQThamDinhND, setNgayTraLoiKQThamDinhND] = useState(null);

    const [ngayThongBaoCapBang, setNgayThongBaoCapBang] = useState(null);
    const [ngayNopPhiCapBang, setNgayNopPhiCapBang] = useState(null);
    const [ngayNhanBang, setNgayNhanBang] = useState(null);
    const [ngayGuiBangChoKH, setNgayGuiBangChoKH] = useState(null);
    const [soBang, setSoBang] = useState("");
    const [ngayCapBang, setNgayCapBang] = useState(null);
    const [ngayHetHanBang, setNgayHetHanBang] = useState(null);

    const [trangThaiDon, setTrangThaiDon] = useState("");
     const [taiLieuList, setTaiLieuList] = useState([]);
    const [applicationtypes, setApplicationTypes] = useState([]);
    const processStatus = [
        { value: "chua_hoan_thanh", label: "Chưa hoàn thành" },
        { value: "hoan_thanh", label: "Hoàn thành" }
    ];
    const statusOptions = [
        { value: "dang_xu_ly", label: "Đang xử lý" },
        { value: "hoan_thanh", label: "Hoàn thành" },
        { value: "tam_dung", label: "Tạm dừng" }
    ];

    useEffect(() => {
        if (ngayNopDon) {
            const ngayQDHopLe = dayjs(ngayNopDon).add(1, 'month');
            setNgayQDHopLe_DuKien(ngayQDHopLe.format('YYYY-MM-DD'));

        } else {
            setNgayQDHopLe_DuKien(null);

        }
        if (ngayQDHopLe) {
            const ngayCongBo = dayjs(ngayQDHopLe).add(2, 'month');
            setNgayCongBo_DuKien(ngayCongBo.format('YYYY-MM-DD'));
        } else {
            setNgayCongBo_DuKien(null);
        }

        if (ngayCongBo) {
            const ngayThamDinhND = dayjs(ngayCongBo).add(9, 'month');
            setNgayThamDinhND_DuKien(ngayThamDinhND.format('YYYY-MM-DD'));
        } else {
            setNgayThamDinhND_DuKien(null);
        }

        if (ngayThamDinhND) {
            const ngayTraLoiKQThamDinhND = dayjs(ngayThamDinhND).add(3, 'month');
            setNgayTraLoiKQThamDinhND_DuKien(ngayTraLoiKQThamDinhND.format('YYYY-MM-DD'));
        } else {
            setNgayTraLoiKQThamDinhND_DuKien(null);
        }

        if (ngayThongBaoCapBang) {
            const ngayNopPhiCapBang = dayjs(ngayThongBaoCapBang).add(3, 'month');
            setNgayNopPhiCapBang(ngayNopPhiCapBang.format('YYYY-MM-DD'));
        } else {
            setNgayNopPhiCapBang(null);
        }

    }, [ngayNopDon, ngayThamDinhND, ngayThongBaoCapBang, ngayCongBo, ngayQDHopLe]);
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString().split("T")[0];
    };

    const formatOptions = (data, valueKey, labelKey) => {
        return data.map(item => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
    };

    const fetchApplicationTypes = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/applicationtype/all",
                data: {},
            });
            setApplicationTypes(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu loại đơn", error);
        }
    };
    useEffect(() => {
        fetchApplicationTypes();
        detailApplication();
    }, []);
    const detailApplication = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "application/detail",
                data: { maDonDangKy }
            });

            if (response) {
                setMaHoSoVuViec(response.maHoSoVuViec);
                setMaLoaiDon(response.maLoaiDon);
                setNgayNopDon(formatDate(response.ngayNopDon));
                setNgayHoanThanhHSTL(formatDate(response.ngayHoanThanhHoSoTaiLieu));
                setTrangThaiHoanThanhHSTL(response.trangThaiHoanThienHoSoTaiLieu);
                setNgayQDHopLe_DuKien(formatDate(response.ngayQuyetDinhDonHopLeDuKien));
                setNgayQDHopLe(formatDate(response.ngayQuyetDinhDonHopLe));
                setNgayCongBo_DuKien(formatDate(response.ngayCongBoDonDuKien));
                setNgayCongBo(formatDate(response.ngayCongBoDon));
                setNgayThamDinhND_DuKien(formatDate(response.ngayThamDinhNoiDungDuKien));
                setNgayThamDinhND(formatDate(response.ngayKetQuaThamDinhNoiDung));
                setNgayTraLoiKQThamDinhND_DuKien(formatDate(response.ngayTraLoiKetQuaThamDinhNoiDungDuKien));
                setNgayTraLoiKQThamDinhND(formatDate(response.ngayTraLoiKetQuaThamDinhNoiDung));
                setNgayThongBaoCapBang(formatDate(response.ngayThongBaoCapBang));
                setNgayNopPhiCapBang(formatDate(response.ngayNopPhiCapBang));
                setNgayNhanBang(formatDate(response.ngayNhanBang));
                setNgayGuiBangChoKH(formatDate(response.ngayGuiBangChoKhachHang));
                setSoBang(response.soBang);
                setNgayCapBang(formatDate(response.ngayCapBang));
                setNgayHetHanBang(formatDate(response.ngayHetHanBang));
                setTrangThaiDon(response.trangThaiDon);
                setTaiLieuList(response.taiLieus)
            }
        } catch (error) {
            console.error("Lỗi khi gọi API chi tiết đơn:", error);
        }
    };

    // Add case
    const handleApplication = async () => {
        try {
            await callAPI({
                method: "put",
                endpoint: "/application/edit",
                data: {
                    maDonDangKy: maDonDangKy,
                    maHoSoVuViec: maHoSoVuViec,
                    maLoaiDon: maLoaiDon,
                    ngayNopDon: ngayNopDon || null,
                    ngayHoanThanhHoSoTaiLieu: ngayHoanThanhHSTL || null,
                    trangThaiHoanThienHoSoTaiLieu: trangThaiHoanThanhHSTL || null,
                    ngayQuyetDinhDonHopLeDuKien: ngayQDHopLe_DuKien || null,
                    ngayQuyetDinhDonHopLe: ngayQDHopLe || null,
                    ngayCongBoDonDuKien: ngayCongBo_DuKien || null,
                    ngayCongBoDon: ngayCongBo || null,
                    ngayThamDinhNoiDungDuKien: ngayThamDinhND_DuKien || null,
                    ngayKetQuaThamDinhNoiDung: ngayThamDinhND || null,
                    ngayTraLoiKetQuaThamDinhNoiDungDuKien: ngayTraLoiKQThamDinhND_DuKien || null,
                    ngayTraLoiKetQuaThamDinhNoiDung: ngayTraLoiKQThamDinhND || null,
                    ngayThongBaoCapBang: ngayThongBaoCapBang || null,
                    ngayNopPhiCapBang: ngayNopPhiCapBang || null,
                    ngayNhanBang: ngayNhanBang || null,
                    ngayGuiBangChoKhachHang: ngayGuiBangChoKH || null,
                    trangThaiDon: trangThaiDon || null,
                    ngayCapBang: ngayCapBang || null,
                    ngayHetHanBang: ngayHetHanBang || null,
                    taiLieus: taiLieuList
                },
            });
            alert("Sửa hồ sơ vụ việc thành công!");
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
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Sửa hồ sơ đơn đăng ký mới</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 text-left">Mã đơn đăng kí</label>
                        <input
                            type="text"
                            value={maDonDangKy}
                            disabled
                            // onChange={(e) => setMaDonDangKy(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg h-10 bg-gray-200"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 text-left">Mã hồ sơ vụ việc</label>
                        <input
                            type="text"
                            value={maHoSoVuViec}
                            onChange={(e) => setMaHoSoVuViec(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg h-10 bg-gray-200"
                            disabled
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block text-gray-700 text-left">Loại đơn đăng kí</label>
                        <Select
                            options={formatOptions(applicationtypes, "maLoaiDon", "tenLoaiDon")}
                            value={maLoaiDon ? formatOptions(applicationtypes, "maLoaiDon", "tenLoaiDon").find(opt => opt.value === maLoaiDon) : null}
                            onChange={selectedOption => setMaLoaiDon(selectedOption?.value)}
                            placeholder="Chọn loại đơn đăng kí"
                            className="w-full mt-1 rounded-lg h-10"
                            isClearable
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
                        <label className="block text-gray-700 text-left">Ngày quyết định đơn hợp lệ dự kiến</label>
                        <input
                            type="date"
                            value={ngayQDHopLe_DuKien}
                            onChange={(e) => setNgayQDHopLe_DuKien(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày quyết định đơn hợp lệ</label>
                        <input
                            type="date"
                            value={ngayQDHopLe}
                            onChange={(e) => setNgayQDHopLe(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày công bố đơn dự kiến</label>
                        <input
                            type="date"
                            value={ngayCongBo_DuKien}
                            onChange={(e) => setNgayCongBo_DuKien(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày công bố đơn</label>
                        <input
                            type="date"
                            value={ngayCongBo}
                            onChange={(e) => setNgayCongBo(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày kết quả thẩm định nội dung đơn dự kiến</label>
                        <input
                            type="date"
                            disabled
                            value={ngayThamDinhND_DuKien}
                            onChange={(e) => setNgayThamDinhND_DuKien(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày kết quả thẩm định nội dung đơn</label>
                        <input
                            type="date"
                            value={ngayThamDinhND}
                            onChange={(e) => setNgayThamDinhND(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày trả lời kết quả thẩm định nội dung dự kiến</label>
                        <input
                            type="date"
                            value={ngayTraLoiKQThamDinhND_DuKien}
                            disabled
                            onChange={(e) => setNgayTraLoiKQThamDinhND_DuKien(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày trả lời kết quả thẩm định nội dung</label>
                        <input
                            type="date"
                            value={ngayTraLoiKQThamDinhND}
                            onChange={(e) => setNgayTraLoiKQThamDinhND(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày thông báo cấp bằng</label>
                        <input
                            type="date"
                            value={ngayThongBaoCapBang}
                            onChange={(e) => setNgayThongBaoCapBang(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày nộp phí cấp bằng</label>
                        <input
                            type="date"
                            value={ngayNopPhiCapBang}
                            disabled
                            onChange={(e) => setNgayNopPhiCapBang(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày nhận bằng</label>
                        <input
                            type="date"
                            value={ngayNhanBang}
                            onChange={(e) => setNgayNhanBang(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày gửi bằng cho khách hàng</label>
                        <input
                            type="date"
                            value={ngayGuiBangChoKH}
                            onChange={(e) => setNgayGuiBangChoKH(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 text-left">Số bằng</label>
                        <input
                            type="text"
                            value={soBang}
                            onChange={(e) => setSoBang(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg h-10"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày cấp bằng</label>
                        <input
                            type="date"
                            value={ngayCapBang}
                            onChange={(e) => setNgayCapBang(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày hết hạn bằng</label>
                        <input
                            type="date"
                            value={ngayHetHanBang}
                            onChange={(e) => setNgayHetHanBang(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
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
                </div>
                <DocumentSection onTaiLieuChange={handleTaiLieuChange}  initialTaiLieus={taiLieuList}></DocumentSection>
                <div className="flex justify-center gap-4 mt-4">
                    <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">Quay lại</button>
                    <button onClick={handleApplication} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Sửa đơn đăng ký</button>
                </div>
            </div>
        </div>
    );
}

export default ApplicationEdit;
