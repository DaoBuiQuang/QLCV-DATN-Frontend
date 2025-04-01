import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";

function StaffAdd() {
  const navigate = useNavigate();
  const [maNhanSu, setMaNhanSu] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [chucVu, setChucVu] = useState("");
  const [phongBan, setPhongBan] = useState("");
  const [sdt, setSdt] = useState("");
  const [email, setEmail] = useState("");
  const [ngayThangNamSinh, setNgayThangNamSinh] = useState("");
  const [cccd, setCccd] = useState("");
  const [bangCap, setBangCap] = useState("");

  const handleAddStaff = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/staff/add",
        data: {
          maNhanSu,
          hoTen,
          chucVu,
          phongBan,
          sdt,
          email,
          ngayThangNamSinh,
          cccd,
          bangCap,
        },
      });
      alert("Thêm nhân sự thành công!");
      setMaNhanSu("");
      setHoTen("");
      setChucVu("");
      setPhongBan("");
      setSdt("");
      setEmail("");
      setNgayThangNamSinh("");
      setCccd("");
      setBangCap("");
    } catch (error) {
      console.error("Lỗi khi thêm nhân sự!", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Thêm nhân sự mới</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Mã nhân sự</label>
            <input
              type="text"
              value={maNhanSu}
              onChange={(e) => setMaNhanSu(e.target.value)}
              placeholder="Nhập mã nhân sự"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Họ tên</label>
            <input
              type="text"
              value={hoTen}
              onChange={(e) => setHoTen(e.target.value)}
              placeholder="Nhập họ tên"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Chức vụ</label>
            <input
              type="text"
              value={chucVu}
              onChange={(e) => setChucVu(e.target.value)}
              placeholder="Nhập chức vụ"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phòng ban</label>
            <input
              type="text"
              value={phongBan}
              onChange={(e) => setPhongBan(e.target.value)}
              placeholder="Nhập phòng ban"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Số điện thoại</label>
            <input
              type="text"
              value={sdt}
              onChange={(e) => setSdt(e.target.value)}
              placeholder="Nhập số điện thoại"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Ngày sinh</label>
            <input
              type="date"
              value={ngayThangNamSinh}
              onChange={(e) => setNgayThangNamSinh(e.target.value)}
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">CCCD</label>
            <input
              type="text"
              value={cccd}
              onChange={(e) => setCccd(e.target.value)}
              placeholder="Nhập CCCD"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Bằng cấp</label>
            <input
              type="text"
              value={bangCap}
              onChange={(e) => setBangCap(e.target.value)}
              placeholder="Nhập bằng cấp"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg" onClick={() => navigate(-1)}>
            Quay lại
          </button>
          <button
            onClick={handleAddStaff}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Thêm nhân sự
          </button>
        </div>
      </div>
    </div>
  );
}

export default StaffAdd;
