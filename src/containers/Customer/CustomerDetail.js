import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import callAPI from "../../utils/api";

function CustomerDetail() {
    const navigate = useNavigate();
    const { maKhachHang } = useParams();
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
    useEffect(() => {
        const fetchCustomerDetail = async () => {
            try {
                const response = await callAPI({
                    method: "post",
                    endpoint: "/customer/detail",
                    data: { maKhachHang }
                });

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

    return (
        <div className="p-1 bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Chi tiết khách hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                    <div>
                        <label className="block text-gray-700">Mã khách hàng</label>
                        <input
                            type="text"
                            value={maKhachHang}
                            readOnly
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 cursor-not-allowed"
                        />
                    </div>


                    <div>
                        <label className="block text-gray-700">Tên khách hàng</label>
                        <input
                            type="text"
                            value={tenKhachHang}
                            readOnly
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 cursor-not-allowed"
                        />
                    </div>


                    <div>
                        <label className="block text-gray-700">Đối tác</label>
                        <select value={maDoiTac} onChange={(e) => setMaDoiTac(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-gray-100" disabled={true}>
                            <option value="">Chọn đối tác</option>
                            {partners.map(partner => (
                                <option key={partner.maDoiTac} value={partner.maDoiTac}>{partner.tenDoiTac}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">Quốc gia</label>
                        <select value={maQuocGia} onChange={(e) => setMaQuocGia(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-gray-100 " disabled={true}>
                            <option value="">Chọn quốc gia</option>
                            {countries.map(country => (
                                <option key={country.maQuocGia} value={country.maQuocGia}>{country.tenQuocGia}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">Ngành nghề</label>
                        <select value={maNganhNghe} onChange={(e) => setMaNganhNghe(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-gray-100" readOnly disabled={true}>
                            <option value="">Chọn ngành nghề</option>
                            {industries.map(industry => (
                                <option key={industry.maNganhNghe} value={industry.maNganhNghe}>{industry.tenNganhNghe}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">Địa chỉ</label>
                        <input type="text" value={diaChi} onChange={(e) => setDiaChi(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-gray-100 " readOnly  />
                    </div>

                    <div>
                        <label className="block text-gray-700">Số điện thoại</label>
                        <input type="text" value={sdt} onChange={(e) => setSdt(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-gray-100" readOnly />
                    </div>

                    <div>
                        <label className="block text-gray-700">Trạng thái</label>
                        <select value={trangThai} onChange={(e) => setTrangThai(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-gray-100" disabled={true}>
                            <option value="Đang hoạt động">Đang hoạt động</option>
                            <option value="Dừng hoạt động">Dừng hoạt động</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">Mô tả</label>
                        <input type="text" value={moTa} onChange={(e) => setMoTa(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-gray-100" readOnly/>
                    </div>

                    <div>
                        <label className="block text-gray-700">Ghi chú</label>
                        <input type="text" value={ghiChu} onChange={(e) => setGhiChu(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-gray-100" readOnly/>
                    </div>
                    <div>
                        <label className="block text-gray-700">Mã khách hàng cũ</label>
                        <input type="text" value={maKhachHangCu} onChange={(e) => setMaKhachHangCu(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-gray-100" readOnly/>
                    </div>
                </div>
                        
                <div className="flex justify-center gap-4 mt-4">
                    <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">Quay lại</button>
                </div>
            </div>
        </div>
    );
}

export default CustomerDetail;
