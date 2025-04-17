import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import callAPI from "../../utils/api";

function ProductAndServicesEdit() {
  const navigate = useNavigate();
  const { maSPDV } = useParams();
  const [tenSanPhamDichVu, setTenSanPhamDichVu] = useState("");
  const [moTa, setMoTa] = useState("");

  useEffect(() => {
    const fetchProductService = async () => {
      try {
        const response = await callAPI({
          method: "post",
          endpoint: "/productsandservices/detail",
          data: { maSPDV },
        });
        setTenSanPhamDichVu(response.tenSPDV || "");
        setMoTa(response.moTa || "");
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm & dịch vụ!", error);
      }
    };
    fetchProductService();
  }, [maSPDV]);

  const handleEditProductService = async () => {
    try {
      await callAPI({
        method: "put",
        endpoint: "/productsandservices/edit",
        data: {
            maSPDV,
            tenSPDV: tenSanPhamDichVu,
          moTa,
        },
      });
      alert("Cập nhật sản phẩm & dịch vụ thành công!");
      navigate(-1);
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm & dịch vụ!", error);
    }
  };

  return (
    <div className="p-1 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">✏️ Chỉnh sửa Sản phẩm & Dịch vụ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Mã sản phẩm / dịch vụ</label>
            <input
              type="text"
              value={maSPDV}
              readOnly
              className="w-full p-2 mt-1 border rounded-lg bg-gray-200 text-gray-700 "
            />
          </div>
          <div>
            <label className="block text-gray-700">Tên sản phẩm / dịch vụ</label>
            <input
              type="text"
              value={tenSanPhamDichVu}
              onChange={(e) => setTenSanPhamDichVu(e.target.value)}
              placeholder="Nhập tên sản phẩm hoặc dịch vụ"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Mô tả</label>
            <textarea
              value={moTa}
              onChange={(e) => setMoTa(e.target.value)}
              placeholder="Nhập mô tả chi tiết"
              className="w-full p-2 mt-1 border rounded-lg h-24"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
          <button
            onClick={handleEditProductService}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductAndServicesEdit;
