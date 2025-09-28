import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import callAPI from "../../utils/api";

function GCN_NH_VNDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);

  const fetchDetail = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: `/gcn_nh/detail`,
        data: { id },
      });
      setData(response);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết GCN_NH:", error);
    }
  };

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  if (!data) return <div className="p-4">Đang tải dữ liệu...</div>;

  // helper render
  const renderRow = (label, value) => (
    <div className="flex mb-3">
      <span className="w-56 font-semibold text-gray-700 text-left">{label}:</span>
      <span className="text-gray-900">{value || "—"}</span>
    </div>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
        {/* Tiêu đề */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
          Thông tin GCN Nhãn hiệu
        </h2>

        {/* Ảnh thương hiệu */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {data.linkAnh && (
            <div className="text-center">
              <p className="font-semibold text-gray-700 mb-2">Mẫu nhãn</p>
              <img
                src={data.linkAnh}
                alt="Logo nhãn hiệu"
                className="max-h-64 rounded-lg border shadow-md"
              />
            </div>
          )}

          {data.anhBang && (
            <div className="text-center">
              <p className="font-semibold text-gray-700 mb-2">Ảnh bằng</p>
              <img
                src={data.anhBang}
                alt="Ảnh bằng GCN"
                className="max-h-64 rounded-lg border shadow-md"
              />
            </div>
          )}
        </div>

        {/* Thông tin chi tiết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {renderRow("Số bằng", data.soBang)}
          {renderRow("Số đơn", data.soDon)}
          {renderRow("Mã hồ sơ", data.maHoSo)}
          {renderRow("Chủ đơn / Chủ bằng", data.tenKhachHang)}
          {renderRow("Địa chỉ", data.diaChiKhachHang)}
          {renderRow("Đại diện SHCN", data.tenDoiTac)}
          {renderRow("Tên nhãn hiệu", data.tenNhanHieu)}
          {renderRow("Danh sách nhóm SPDV", data.dsNhomSPDV)}
          {renderRow("Chi tiết nhóm SPDV", data.chiTietNhomSPDV)}
          {renderRow("Màu sắc nhãn hiệu", data.mauSacNH)}
          {renderRow("Ngày nộp đơn", data.ngayNopDon)}
          {renderRow("Ngày cấp bằng", data.ngayCapBang)}
          {renderRow("Ghi chú", data.ghiChu)}
        </div>

        {/* Nút quay lại */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-600 text-white font-semibold hover:bg-blue-700 px-8 py-3 rounded-lg shadow-md transition"
            onClick={() => navigate(-1)}
          >
            ← Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}

export default GCN_NH_VNDetail;
