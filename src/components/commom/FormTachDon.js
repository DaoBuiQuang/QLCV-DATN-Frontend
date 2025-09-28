// components/FormSuaDoi.jsx
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { DatePicker, Radio, Input } from "antd";
import Select from "react-select";
import callAPI from "../../utils/api";

const { TextArea } = Input;

const FormTachDon = ({
  ngayYeuCau,
  setNgayYeuCau,
  lanSuaDoi,
  setLanSuaDoi,
  // các flag sửa đổi
  suaDoiDaiDien,
  setSuaDoiDaiDien,
  suaDoiTenChuDon,
  setSuaDoiTenChuDon,
  suaDoiDiaChi,
  setSuaDoiDiaChi,
  suaNhan,
  setSuaNhan,
  suaNhomSPDV,
  setSuaNhomSPDV,
  suaDoiNoiDungKhac,
  setSuaDoiNoiDungKhac,
  // mô tả dùng chung
  moTaSuaDoi,
  setMoTaSuaDoi,
  ngayGhiNhanSuaDoi,
  setNgayGhiNhanSuaDoi,
  duocGhiNhanSuaDoi,
  setDuocGhiNhanSuaDoi,
  soDon,
  setSoDon,
  validateField,
}) => {
  const [maSPDVList, setMaSPDVList] = useState([]);
  const [productAndService, setProductAndService] = useState([]);

  const fetchItems = async (searchValue) => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/productsandservices/list",
        data: { search: searchValue },
      });
      setProductAndService(response);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm/dịch vụ:", error);
    }
  };

  const formatOptions = (data, valueKey, labelKey) => {
    return data.map((item) => ({
      value: item[valueKey],
      label: item[labelKey],
    }));
  };

  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-blue-700 mb-2 uppercase">📌Thông tin đơn tách </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ngày yêu cầu sửa đổi */}
        <div >
          <label className="block text-gray-700 text-left ">Số đơn tách</label>
          <input
            type="text"
            value={soDon}
            placeholder="Nhập số đơn"
            onChange={(e) => setSoDon(e.target.value)}
            className="w-full p-2 mt-1 border rounded-lg text-input h-10"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-left">Ngày nộp đơn tách</label>
          <DatePicker
            value={ngayYeuCau ? dayjs(ngayYeuCau) : null}
            onChange={(date) =>
              setNgayYeuCau(date && date.isValid() ? date.format("YYYY-MM-DD") : null)
            }
            format="DD/MM/YYYY"
            placeholder="Chọn ngày yêu cầu"
            className="mt-1 w-full"
          />
        </div>

        {/* Lần sửa đổi */}
        <div>
          <label className="block text-gray-700 text-left">Lần tách</label>
          <Input
            type="number"
            value={lanSuaDoi || ""}
            onChange={(e) => setLanSuaDoi(e.target.value)}
            placeholder="Nhập số lần sửa đổi"
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-left">Danh sách sản phẩm dịch vụ <span className="text-red-500">*</span></label>
          <Select
            options={formatOptions(productAndService, "maSPDV", "tenSPDV")}
            value={
              maSPDVList && maSPDVList.length > 0
                ? formatOptions(productAndService, "maSPDV", "tenSPDV").filter(opt => maSPDVList.includes(opt.value))
                : []
            }
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions ? selectedOptions.map(opt => opt.value) : [];
              setMaSPDVList(selectedValues);
            }}
            placeholder="Chọn mã nhãn hiệu"
            className="w-full mt-1 rounded-lg text-left"
            isClearable
            isMulti
          />

        </div>
        {/* Các loại sửa đổi */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="grid grid-cols-2 gap-6">
            {/* Cột trái: Radio chọn */}
            <div className="space-y-4">



            </div>


          </div>

        </div>

        {/* Ngày ghi nhận sửa đổi */}
        
        <div className="col-span-2">
          <label className="block text-gray-700 text-left">Ghi chú về đơn tách</label>
          <TextArea
            rows={4}
            value={moTaSuaDoi}
            onChange={(e) => setMoTaSuaDoi(e.target.value)}
            placeholder="Nhập ghi chú"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default FormTachDon;
