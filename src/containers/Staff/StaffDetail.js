import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import callAPI from "../../utils/api";

function StaffDetail() {
    const navigate = useNavigate();
    const { maNhanSu } = useParams();

    const [hoTen, setHoTen] = useState("");
    const [chucVu, setChucVu] = useState("");
    const [phongBan, setPhongBan] = useState("");
    const [sdt, setSdt] = useState("");
    const [email, setEmail] = useState("");
    const [ngayThangNamSinh, setNgayThangNamSinh] = useState("");
    const [cccd, setCccd] = useState("");
    const [bangCap, setBangCap] = useState("");
    const [taiKhoan, setTaiKhoan] = useState(null)
    useEffect(() => {
        const fetchStaffDetails = async () => {
            try {
                const response = await callAPI({
                    method: "post",
                    endpoint: `/staff/detail`,
                    data: {
                        maNhanSu
                    }
                });
                setHoTen(response.hoTen);
                setChucVu(response.chucVu);
                setPhongBan(response.phongBan);
                setSdt(response.sdt);
                setEmail(response.email);
                setNgayThangNamSinh(response.ngayThangNamSinh);
                setCccd(response.cccd);
                setBangCap(response.bangCap);
                setTaiKhoan(response.tenTaiKhoan)
            } catch (error) {
                console.error("Lỗi khi lấy thông tin nhân sự!", error);
            }
        };
        fetchStaffDetails();
    }, [maNhanSu]);

    return (
        <div className="p-1 bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">✏️ Chỉnh sửa nhân sự</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                    <label className="block text-gray-700 text-left">Mã nhân sự <span className="text-red-500">*</span></label>
                        <input type="text" value={maNhanSu} disabled className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200" readOnly />
                    </div>
                    <div>
                    <label className="block text-gray-700 text-left">Họ tên <span className="text-red-500">*</span></label>
                        <input type="text" value={hoTen} onChange={(e) => setHoTen(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-100" disabled readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Chức vụ</label>
                        <input type="text" value={chucVu} onChange={(e) => setChucVu(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-100" disabled readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Phòng ban</label>
                        <input type="text" value={phongBan} onChange={(e) => setPhongBan(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-100" disabled readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Số điện thoại</label>
                        <input type="text" value={sdt} onChange={(e) => setSdt(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-100" disabled readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-100" disabled readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày sinh</label>
                        <input type="date" value={ngayThangNamSinh} onChange={(e) => setNgayThangNamSinh(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-100" disabled readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">CCCD</label>
                        <input type="text" value={cccd} onChange={(e) => setCccd(e.target.value)} className="w-full p-2 mt-1 border rounded-l bg-gray-100" disabled readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Bằng cấp</label>
                        <input type="text" value={bangCap} onChange={(e) => setBangCap(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-100" disabled readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Tên tài khoản</label>
                        <input type="text" value={taiKhoan} onChange={(e) => setTaiKhoan(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-100" disabled readOnly />
                    </div>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg" onClick={() => navigate(-1)}>
                        Quay lại
                    </button>
                    {(!taiKhoan || taiKhoan.trim() === "") && (
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            onClick={() => navigate(`/registerstaff/${maNhanSu}`)}
                        >
                            Tạo tài khoản
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}

export default StaffDetail;
