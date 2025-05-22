import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import callAPI from "../../utils/api";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { Modal, Input, message } from 'antd';
import { showSuccess, showError } from "../../components/commom/Notification";
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");

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
    const handleResetPassword = async () => {
        if (!newPassword) {
            message.warning("Vui lòng nhập mật khẩu mới.");
            return;
        }

        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/reset-password",
                data: {
                    username: taiKhoan,
                    newPassword: newPassword
                }
            });

            message.success(response.message || "Mật khẩu đã được đặt lại.");
            await showSuccess("Thành công!", "Lấy lại mật khẩu thành công!");
            setIsModalOpen(false);
            setNewPassword("");
        } catch (error) {
            showError("Thất bại!", "Đã xảy ra lỗi.", error);
            console.error("Reset password error:", error);
            message.error(error?.response?.data?.message || "Lỗi khi đặt lại mật khẩu.");
        }
    };

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
                        <input type="text" value={hoTen} onChange={(e) => setHoTen(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200" disabled readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Chức vụ</label>
                        <input type="text" value={chucVu} onChange={(e) => setChucVu(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200" disabled readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Phòng ban</label>
                        <input type="text" value={phongBan} onChange={(e) => setPhongBan(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200" disabled readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Số điện thoại</label>
                        <input type="text" value={sdt} onChange={(e) => setSdt(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200" disabled readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200" disabled readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Ngày sinh</label>
                        <DatePicker
                            value={ngayThangNamSinh ? dayjs(ngayThangNamSinh) : null}
                            onChange={(date) => {
                                if (dayjs.isDayjs(date) && date.isValid()) {
                                    setNgayThangNamSinh(date.format("YYYY-MM-DD"));
                                } else {
                                    setNgayThangNamSinh(null);
                                }
                            }}
                            format="DD/MM/YYYY"
                            placeholder="Chọn ngày sinh"
                            className="mt-1 w-full"
                            disabled
                            style={{ height: "38px" }}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">CCCD</label>
                        <input type="text" value={cccd} onChange={(e) => setCccd(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-gray-200" disabled readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Bằng cấp</label>
                        <input type="text" value={bangCap} onChange={(e) => setBangCap(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200" disabled readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Tên tài khoản</label>
                        <input type="text" value={taiKhoan} onChange={(e) => setTaiKhoan(e.target.value)} className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200" disabled readOnly />
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
                    {taiKhoan && (
                        <button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Lấy lại mật khẩu
                        </button>
                    )}
                </div>
            </div>
            <Modal
                title={`Đặt lại mật khẩu cho tài khoản ${taiKhoan}`}
                open={isModalOpen}
                onOk={handleResetPassword}
                onCancel={() => setIsModalOpen(false)}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <label className="block text-left mb-2 text-gray-700">Mật khẩu mới</label>
                <Input.Password
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </Modal>

        </div>
    );
}

export default StaffDetail;
