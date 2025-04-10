import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";
import Select from "react-select";
function ApplicationAdd() {
    const navigate = useNavigate();
    const [maDonDangKy, setMaDonDangKy] = useState("");
    const [maHoSoVuViec, setMaHoSoVuViec] = useState("");
    const [maLoaiDon, setMaLoaiDon] = useState("")

    const [ngayNopDon, setNgayNopDon] = useState(null);
    const [ngayHoanThanhHSTL, setNgayHoanThanhHSTL] = useState(null);
    const [trangThaiHoanThanhHSTL, setTrangThaiHoanThanhHSTL] = useState("");

    const [ngayQDHopLe_DuKien, setNgayQDHopLe_DuKien] = useState(null);
    const [ngayQDHopLe, setNgayQDHopLe] = useState(null);

    const [ngayCongBo_DuKien, setNgayCongBo_DuKien] = useState(null);
    const [ngayCongBo, setNgayCongBo] = useState(null);

    const [ngayThamDinhND_DuKien, setNgayThamDinhND_DuKien] = useState(null);
    const [ngayThamDinhND, setNgayThamDinhND] = useState(null);
    const [ngayTraLoiKQThamDinhND, setNgayTraLoiKQThamDinhND] = useState(null);

    const [ngayThongBaoCapBang, setNgayThongBaoCapBang] = useState(null);
    const [ngayNopPhiCapBang, setNgayNopPhiCapBang] = useState(null);
    const [ngayNhanBang, setNgayNhanBang] = useState(null);
    const [ngayGuiBangChoKH, setNgayGuiBangChoKH] = useState(null);
    const [soBang, setSoBang] = useState("");
    const [ngayCapBang, setNgayCapBang] = useState(null);
    const [ngayHetHanBang, setNgayHetHanBang] = useState(null);

    const [trangThaiDon, setTrangThaiDon] = useState("");

    const [applicationtypes, setApplicationTypes] = useState([]);
    const processSteps = [
        { value: "buoc_1", label: "Bước 1: Tiếp nhận" },
        { value: "buoc_2", label: "Bước 2: Xử lý" },
        { value: "buoc_3", label: "Bước 3: Hoàn tất" }
    ];
    const statusOptions = [
        { value: "dang_xu_ly", label: "Đang xử lý" },
        { value: "hoan_thanh", label: "Hoàn thành" },
        { value: "tam_dung", label: "Tạm dừng" }
    ];


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
    }, []);

    // Add case
    const handleAddCase = async () => {
        try {
            await callAPI({
                method: "post",
                endpoint: "/case/add",
                data: {
                   
                },
            });
            alert("Thêm hồ sơ vụ việc thành công!");
            navigate(-1);
        } catch (error) {
            console.error("Lỗi khi thêm hồ sơ vụ việc!", error);
        }
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
                            options={formatOptions(processSteps, "value", "label")}
                            value={trangThaiHoanThanhHSTL ? processSteps.find(opt => opt.value === trangThaiHoanThanhHSTL) : null}
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
                            options={formatOptions(processSteps, "value", "label")}
                            value={trangThaiDon ? processSteps.find(opt => opt.value === trangThaiDon) : null}
                            onChange={selectedOption => setTrangThaiDon(selectedOption?.value)}
                            placeholder="Chọn trạng thái đơn"
                            className="w-full mt-1 rounded-lg"
                            isClearable
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">Quay lại</button>
                    <button onClick={handleAddCase} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Thêm đơn đăng ký</button>
                </div>
            </div>
        </div>
    );
}

export default ApplicationAdd;
