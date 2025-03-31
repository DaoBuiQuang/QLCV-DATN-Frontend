import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";

function CustomerAdd() {
    const navigate = useNavigate();
    const [maKhachHang, setMaKhachHang] = useState("");
    const [tenKhachHang, setTenKhachHang] = useState("");
    const [maDoiTac, setMaDoiTac] = useState("");
    const [moTa, setMoTa] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [sdt, setSdt] = useState("");
    const [ghiChu, setGhiChu] = useState("");
    const [maQuocGia, setMaQuocGia] = useState("");
    const [maNganhNghe, setMaNganhNghe] = useState("");
    const [trangThai, setTrangThai] = useState("Đang hoạt động");

    const [countries, setCountries] = useState([]);
    const [partners, setPartners] = useState([]);
    const [industries, setIndustries] = useState([]);

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

    // Add customer
    const handleAddCustomer = async () => {
        try {
            await callAPI({
                method: "post",
                endpoint: "/customer/add",
                data: {
                    maKhachHang,
                    tenKhachHang,
                    maDoiTac: maDoiTac === "" ? null : maDoiTac,
                    moTa,
                    diaChi,
                    sdt,
                    ghiChu,
                    maQuocGia,
                    trangThai,
                    maNganhNghe
                },
            });
            alert("Thêm khách hàng thành công!");
            navigate(-1);
        } catch (error) {
            console.error("Lỗi khi thêm khách hàng!", error);
        }
    };
    const handleTenKhachHangChange = async (e) => {
        const value = e.target.value;
        setTenKhachHang(value);

        if (value.trim() !== "") {
            try {
                const response = await callAPI({
                    method: "post",
                    endpoint: "/customer/generate-code",
                    data: { tenKhachHang: value }
                });
                setMaKhachHang(response.maKhachHang);
            } catch (error) {
                console.error("Lỗi khi sinh mã khách hàng:", error);
            }
        } else {
            setMaKhachHang(""); // Nếu xóa tên thì cũng xóa mã
        }
    };

    return (
        <div className="p-6 bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Thêm khách hàng mới</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                    <div>
                        <label className="block text-gray-700">Mã khách hàng</label>
                        <input
                            type="text"
                            value={maKhachHang}
                            readOnly
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100"
                        />
                    </div>


                    <div>
                        <label className="block text-gray-700">Tên khách hàng</label>
                        <input
                            type="text"
                            value={tenKhachHang}
                            onChange={handleTenKhachHangChange}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>


                    <div>
                        <label className="block text-gray-700">Đối tác</label>
                        <select value={maDoiTac} onChange={(e) => setMaDoiTac(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-white">
                            <option value="">Chọn đối tác</option>
                            {partners.map(partner => (
                                <option key={partner.maDoiTac} value={partner.maDoiTac}>{partner.tenDoiTac}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">Quốc gia</label>
                        <select value={maQuocGia} onChange={(e) => setMaQuocGia(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-white">
                            <option value="">Chọn quốc gia</option>
                            {countries.map(country => (
                                <option key={country.maQuocGia} value={country.maQuocGia}>{country.tenQuocGia}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">Ngành nghề</label>
                        <select value={maNganhNghe} onChange={(e) => setMaNganhNghe(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-white">
                            <option value="">Chọn ngành nghề</option>
                            {industries.map(industry => (
                                <option key={industry.maNganhNghe} value={industry.maNganhNghe}>{industry.tenNganhNghe}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">Địa chỉ</label>
                        <input type="text" value={diaChi} onChange={(e) => setDiaChi(e.target.value)} className="w-full p-2 mt-1 border rounded-lg" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Số điện thoại</label>
                        <input type="text" value={sdt} onChange={(e) => setSdt(e.target.value)} className="w-full p-2 mt-1 border rounded-lg" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Trạng thái</label>
                        <select value={trangThai} onChange={(e) => setTrangThai(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-white">
                            <option value="Đang hoạt động">Đang hoạt động</option>
                            <option value="Dừng hoạt động">Dừng hoạt động</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">Mô tả</label>
                        <input type="text" value={moTa} onChange={(e) => setMoTa(e.target.value)} className="w-full p-2 mt-1 border rounded-lg" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Ghi chú</label>
                        <input type="text" value={ghiChu} onChange={(e) => setGhiChu(e.target.value)} className="w-full p-2 mt-1 border rounded-lg" />
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">Quay lại</button>
                    <button onClick={handleAddCustomer} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Thêm khách hàng</button>
                </div>
            </div>
        </div>
    );
}

export default CustomerAdd;
