import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";
import Select from "react-select";
function ApplicationAdd() {
    const navigate = useNavigate();
    const [maHoSoVuViec, setMaHoSoVuViec] = useState("");
    const [ngayNopDon, setNgayNopDon] = useState("");
    const [ngayHoanThanhHoSo, setNgayHoanThanhHoSo] = useState("");
    const [ngayQDHopLeDuKien, setNgayQDHopLeDuKien] = useState("");
    const [ngayQDHopLe, setNgayQDHopLe] = useState("");
    const [ngayCongBoDuKien, setNgayCongBoDuKien] = useState("");
    const [ngayCongBo, setNgayCongBo] = useState("");
    const [ngayThamDinhND_DuKien, setNgayThamDinhND_DuKien] = useState("");
    const [ngayThamDinhND, setNgayThamDinhND] = useState("");
    const [ngayTraLoiKQThamDinhND, setNgayTraLoiKQThamDinhND] = useState("");


    const [casetypes, setCasetypes] = useState([]);
    const [countries, setCountries] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [partners, setPartners] = useState([]);
    const [staffs, setStaffs] = useState([]);
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

    const handleSelectChange = (selectedOption, vaiTro) => {
        setNhanSuVuViec(prevState => {
            const updatedList = prevState.filter(nhanSu => nhanSu.vaiTro !== vaiTro);
            if (selectedOption) {
                updatedList.push({ maNhanSu: selectedOption.value, vaiTro });
            }
            return updatedList;
        });
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

    const fetchCustomers = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/customers/by-name",
                data: {},
            });
            setCustomers(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu khách hàng", error);
        }
    };
    const fetchCaseTypes = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/casetype/list",
                data: {},
            });
            setCasetypes(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu loại nghề nghiệp:", error);
        }
    };
    const fetchStaffs = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/staff/basiclist",
                data: {},
            });
            setStaffs(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu nhân sự:", error);
        }
    };
    useEffect(() => {
        fetchCountries();
        fetchPartners();
        fetchCustomers();
        fetchCaseTypes();
        fetchStaffs();
    }, []);

    // Add case
    const handleAddCase = async () => {
        try {
            await callAPI({
                method: "post",
                endpoint: "/case/add",
                data: {
                    maHoSoVuViec,
                    maKhachHang,
                    noiDungVuViec,
                    ngayTiepNhan,
                    ngayXuLy,
                    maLoaiVuViec,
                    maQuocGia,
                    trangThaiVuViec,
                    // ngayTao,
                    // ngayCapNhap,
                    buocXuLyHienTai,
                    nhanSuVuViec
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
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Thêm hồ sơ vụ việc mới</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 text-left">Mã đơn đăng kí</label>
                        <input
                            type="text"
                            value={maHoSoVuViec}
                            onChange={(e) => setMaHoSoVuViec(e.target.value)}
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
                        <label className="block text-gray-700 text-left">Ngày thông báo cấp bằng</label>
                        <input
                            type="date"
                            value={ngayXuLy}
                            onChange={(e) => setNgayXuLy(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày nộp phí cấp bằng</label>
                        <input
                            type="date"
                            value={ngayXuLy}
                            onChange={(e) => setNgayXuLy(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày nhận bằng</label>
                        <input
                            type="date"
                            value={ngayXuLy}
                            onChange={(e) => setNgayXuLy(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày gửi bằng cho khách hàng</label>
                        <input
                            type="date"
                            value={ngayXuLy}
                            onChange={(e) => setNgayXuLy(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 text-left">Số bằng</label>
                        <input
                            type="text"
                            value={maHoSoVuViec}
                            onChange={(e) => setMaHoSoVuViec(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg h-10"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày cấp bằng</label>
                        <input
                            type="date"
                            value={ngayXuLy}
                            onChange={(e) => setNgayXuLy(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày hết hạn bằng</label>
                        <input
                            type="date"
                            value={ngayXuLy}
                            onChange={(e) => setNgayXuLy(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Trạng thái đơn</label>
                        <Select
                            options={formatOptions(processSteps, "value", "label")}
                            value={buocXuLyHienTai ? processSteps.find(opt => opt.value === buocXuLyHienTai) : null}
                            onChange={selectedOption => setBuocXuLyHienTai(selectedOption?.value)}
                            placeholder="Chọn bước xử lý"
                            className="w-full mt-1 rounded-lg"
                            isClearable
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">Quay lại</button>
                    <button onClick={handleAddCase} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Thêm hồ sơ vụ việc</button>
                </div>
            </div>
        </div>
    );
}

export default ApplicationAdd;
