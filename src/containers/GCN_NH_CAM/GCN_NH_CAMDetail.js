import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, message } from "antd";
import callAPI from "../../utils/api";

import FormAffidavit from "../../components/commom/FormAffidavit";
import GCN_NH_Info from "../../components/commom/GCN_NH_Info";
import { showSuccess, showError, showWarning } from "../../components/commom/Notification";
import DocumentSection_KH from "../../components/TrademarkRegistrationProcess/KH/DocumentSection_KH";

function GCN_NH_CAMDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);

  const [showAffidavitForm, setShowAffidavitForm] = useState(false);
  const [soAffidavit, setSoAffidavit] = useState(null);
  const [idGCN_NH, setIdGCN_NH] = useState(null);
  const [lanNop, setLanNop] = useState(1);
  const [ngayNop, setNgayNop] = useState(null);
  const [ngayGhiNhan, setNgayGhiNhan] = useState(null);
  const [ghiChu, setGhiChu] = useState("");
  const [isAutoImport, setIsAutoImport] = useState(false);
  const [taiLieuList, setTaiLieuList] = useState([]);
  const fetchDetail = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: `/gcn_nh_kh/detail`,
        data: { id },
      });
      setData(response);
      setIdGCN_NH(response?.id);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết GCN_NH:", error);
    }
  };

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  if (!data) return <div className="p-4">Đang tải dữ liệu...</div>;

  const handleSubmitAffidavit = async () => {
    const payload = { taiLieuList ,soAffidavit, idGCN_NH, lanNop, ngayNop, ngayGhiNhan, ghiChu, isAutoImport };
    try {
      const res = await callAPI({
        method: "post",
        endpoint: "/affidavit/add",
        data: payload,
      });
      await showSuccess("Thành công!", "Thêm affidavit thành công!");
      setShowAffidavitForm(false);
    } catch (error) {
      showError("Thất bại!", "Đã xảy ra lỗi.", error);
      console.error("Lỗi khi thêm affidavit:", error);
      message.error("Không thể thêm affidavit!");
    }
  };
  const handleTaiLieuChange = (list) => {
    setTaiLieuList(list);
  };
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
          Thông tin GCN Nhãn hiệu CAMPUCHIA
        </h2>

        <GCN_NH_Info data={data} />

        {/* Các nút hành động */}
        <div className="flex justify-center mt-8 gap-4 flex-wrap">
          <button
            className="bg-gray-500 text-white font-medium hover:bg-gray-600 px-6 py-3 rounded-lg shadow transition"
            onClick={() => navigate(-1)}
          >
            ← Quay lại
          </button>

          <button
            onClick={() => navigate(`/gcn_nh_camedit/${id}`)}
            className="bg-[#009999] hover:bg-[#007a7a] text-white font-medium px-6 py-3 rounded-lg shadow transition"
          >
            Sửa thông tin
          </button>

          <button
            onClick={() => {
              const today = new Date();
              const deadline = new Date(data?.hanNopTuyenThe);
              const isPastDeadline = deadline < new Date(today.toDateString());

              if (!isPastDeadline) {
                showWarning("Cảnh báo!", `Chưa đến hạn nộp Affidavit (hạn là ${deadline.toLocaleDateString("vi-VN")})`);
                return;
              }

              setShowAffidavitForm(!showAffidavitForm);
            }}
            className="bg-[#009999] hover:bg-[#007a7a] text-white font-medium px-6 py-3 rounded-lg shadow transition"
          >
            {showAffidavitForm ? "Ẩn form Affidavit" : "Thêm mới Affidavit"}
          </button>


          <button
            onClick={() => {
              const today = new Date();
              const hanGiaHan = new Date(data?.hanGiaHan);

              const isPastDeadline = hanGiaHan < new Date(today.toDateString());

              if (!isPastDeadline) {
                showWarning("Cảnh báo!", `Chưa đến hạn nộp đơn gia hạn (hạn là ${hanGiaHan.toLocaleDateString("vi-VN")})`);
                return;
              }

              navigate("/applicationadd");
            }}
            className="bg-[#009999] hover:bg-[#007a7a] text-white font-medium px-6 py-3 rounded-lg shadow transition"
          >
            Thêm mới đơn gia hạn
          </button>


          <button
            onClick={() => navigate("/applicationadd")}
            className="bg-[#009999] hover:bg-[#007a7a] text-white font-medium px-6 py-3 rounded-lg shadow transition"
          >
            Thêm mới đơn sửa đổi
          </button>
        </div>

        {/* Form Affidavit */}
        {showAffidavitForm && (
          <div className="mt-10 border-t pt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Thêm mới Affidavit</h3>
            <div className="col-span-2">
              <DocumentSection_KH onTaiLieuChange={handleTaiLieuChange} initialTaiLieus={taiLieuList}
              />
            </div>
            <FormAffidavit
              soAffidavit={soAffidavit}
              setSoAffidavit={setSoAffidavit}
              idGCN_NH={idGCN_NH}
              setIdGCN_NH={setIdGCN_NH}
              lanNop={lanNop}
              setLanNop={setLanNop}
              ngayNop={ngayNop}
              setNgayNop={setNgayNop}
              ngayGhiNhan={ngayGhiNhan}
              setNgayGhiNhan={setNgayGhiNhan}
              ghiChu={ghiChu}
              setGhiChu={setGhiChu}
              isAutoImport={isAutoImport}
              setIsAutoImport={setIsAutoImport}
            />

            <div className="flex justify-end mt-6">
              <Button type="primary" className="bg-[#009999]" onClick={handleSubmitAffidavit}>
                Lưu Thông Tin
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GCN_NH_CAMDetail;
