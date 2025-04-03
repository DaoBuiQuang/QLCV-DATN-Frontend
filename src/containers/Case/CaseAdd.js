import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";
import Select from "react-select";
function CaseAdd() {
    const navigate = useNavigate();
    const [maHoSoVuViec, setMaHoSoVuViec] = useState("");
    const [maKhachHang, setMaKhachHang] = useState("");
    const [noiDungVuViec, setNoiDungVuViec] = useState("");
    const [ngayTiepNhan, setNgayTiepNhan] = useState("");
    const [ngayXuLy, setNgayXuLy] = useState(null);
    const [maLoaiVuViec, setMaLoaiVuViec] = useState("");
    const [maQuocGia, setMaQuocGia] = useState("");
    const [trangThaiVuViec, setTrangThaiVuViec] = useState("");
    const [ngayTao, setNgayTao] = useState("");
    const [ngayCapNhap, setNgayCapNhap] = useState("");
    const [buocXuLyHienTai, setBuocXuLyHienTai] = useState("");
    const [nhanSuVuViec, setNhanSuVuViec] = useState([]);
    const [countries, setCountries] = useState([]);
    const [partners, setPartners] = useState([]);
    const [industries, setIndustries] = useState([]);

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
                    ngayTao,
                    ngayCapNhap,
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
                    <div>
                        <label className="block text-gray-700">Mã hồ sơ vụ việc</label>
                        <input
                            type="text"
                            value={maHoSoVuViec}
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Tên khách hàng </label>
                        <input
                            type="text"
                            value={maKhachHang}
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Nội dung vụ việc</label>
                        <input
                            type="text"
                            value={noiDungVuViec}
                            onChange={(e) => setNoiDungVuViec(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Ngày tiếp nhận</label>
                        <input
                            type="date"
                            value={ngayTiepNhan}
                            onChange={(e) => setNgayTiepNhan(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Ngày xử lý</label>
                        <input
                            type="date"
                            value={ngayXuLy}
                            onChange={(e) => setNgayXuLy(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Loại vụ việc</label>
                        <input
                            type="text"
                            value={maLoaiVuViec}
                            onChange={(e) => setMaLoaiVuViec(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Quốc gia vụ việc</label>
                        <Select
                            options={formatOptions(countries, "maQuocGia", "tenQuocGia")}
                            value={maQuocGia ? formatOptions(countries, "maQuocGia", "tenQuocGia").find(opt => opt.value === maQuocGia) : null}
                            onChange={selectedOption => setMaQuocGia(selectedOption?.value)}
                            placeholder="🌍 Chọn quốc gia"
                            className="w-full  mt-1  rounded-lg"
                            isClearable
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Trạng thái vụ việc</label>
                        <input
                            type="text"
                            value={trangThaiVuViec}
                            onChange={(e) => setTrangThaiVuViec(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Ngày tạo</label>
                        <input
                            type="date"
                            value={ngayTao}
                            onChange={(e) => setNgayTao(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Ngày cập nhật</label>
                        <input
                            type="date"
                            value={ngayCapNhap}
                            onChange={(e) => setNgayCapNhap(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Bước xử lý hiện tại</label>
                        <input
                            type="text"
                            value={buocXuLyHienTai}
                            onChange={(e) => setBuocXuLyHienTai(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Nhân sự vụ việc</label>
                        <input
                            type="text"
                            value={nhanSuVuViec.map((item) => item.maNhanSu).join(", ")}
                            onChange={(e) => setNhanSuVuViec(e.target.value.split(", ").map((value) => ({ maNhanSu: value, vaiTro: "Chính" })))}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Đối tác</label>
                        <input
                            type="text"
                            value={nhanSuVuViec.map((item) => item.maNhanSu).join(", ")}
                            onChange={(e) => setNhanSuVuViec(e.target.value.split(", ").map((value) => ({ maNhanSu: value, vaiTro: "Chính" })))}
                            className="w-full p-2 mt-1 border rounded-lg"
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

export default CaseAdd;
