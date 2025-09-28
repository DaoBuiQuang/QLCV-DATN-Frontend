// components/FormSuaDoi.jsx
import React, {useState} from "react";
import dayjs from "dayjs";
import { DatePicker, Input, Checkbox } from "antd";
import "dayjs/locale/vi";

const { TextArea } = Input;

const FormSuaDoi = ({
  ngayYeuCau,
  setNgayYeuCau,
  lanSuaDoi,
  setLanSuaDoi,
  // suaDoiDaiDien,
  // setSuaDoiDaiDien,
  // suaDoiTenChuDon,
  // setSuaDoiTenChuDon,
  // suaDoiDiaChi,
  // setSuaDoiDiaChi,
  // suaNhan,
  // setSuaNhan,
  // suaNhomSPDV,
  // setSuaNhomSPDV,
  moTaSuaDoi,
  setMoTaSuaDoi,
  ngayGhiNhanSuaDoi,
  setNgayGhiNhanSuaDoi,
  duocGhiNhanSuaDoi,
  setDuocGhiNhanSuaDoi,
  soDon,
  setSoDon,
}) => {
  // ví dụ trong cha
  const [suaDoiDaiDien, setSuaDoiDaiDien] = useState({ flag: false, noiDung: "" });
  const [suaDoiTenChuDon, setSuaDoiTenChuDon] = useState({ flag: false, noiDung: "" });
  const [suaDoiDiaChi, setSuaDoiDiaChi] = useState({ flag: false, noiDung: "" });
  const [suaNhan, setSuaNhan] = useState({ flag: false, noiDung: "" });
  const [suaNhomSPDV, setSuaNhomSPDV] = useState({ flag: false, noiDung: "" });

  // helper: render một item có checkbox + ô nhập
  const renderSuaDoiItem = (label, value, setValue) => (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={value?.flag || false}
        onChange={(e) => setValue({ ...value, flag: e.target.checked })}
      >
        {label}
      </Checkbox>
      <Input
        placeholder={`Nhập ${label.toLowerCase()} mới`}
        value={value?.noiDung || ""}
        onChange={(e) => setValue({ ...value, noiDung: e.target.value })}
        disabled={!value?.flag}
        className="flex-1"
      />
    </div>
  );

  return (
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-blue-700 mb-2 uppercase">
        📌Thông tin đơn sửa đổi
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Số đơn */}
        <div>
          <label className="block text-gray-700 text-left">Số đơn sửa đổi</label>
          <Input
            type="text"
            value={soDon}
            placeholder="Nhập số đơn"
            onChange={(e) => setSoDon(e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Ngày nộp */}
        <div>
          <label className="block text-gray-700 text-left">Ngày nộp sửa đổi</label>
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
          <label className="block text-gray-700 text-left">Lần sửa đổi</label>
          <Input
            type="number"
            value={lanSuaDoi || ""}
            onChange={(e) => setLanSuaDoi(e.target.value)}
            placeholder="Nhập số lần sửa đổi"
            className="mt-1"
          />
        </div>

        {/* Các loại sửa đổi */}
        <div className="col-span-2 space-y-3">
          {renderSuaDoiItem("Đại diện", suaDoiDaiDien, setSuaDoiDaiDien)}
          {renderSuaDoiItem("Tên chủ đơn", suaDoiTenChuDon, setSuaDoiTenChuDon)}
          {renderSuaDoiItem("Địa chỉ", suaDoiDiaChi, setSuaDoiDiaChi)}
          {renderSuaDoiItem("Nhãn", suaNhan, setSuaNhan)}
          {renderSuaDoiItem("Nhóm SP/DV", suaNhomSPDV, setSuaNhomSPDV)}
        </div>

        {/* Ngày ghi nhận */}
        <div>
          <label className="block text-gray-700 text-left">Ngày ghi nhận sửa đổi</label>
          <DatePicker
            value={ngayGhiNhanSuaDoi ? dayjs(ngayGhiNhanSuaDoi) : null}
            onChange={(date) =>
              setNgayGhiNhanSuaDoi(date && date.isValid() ? date.format("YYYY-MM-DD") : null)
            }
            format="DD/MM/YYYY"
            placeholder="Chọn ngày ghi nhận"
            className="mt-1 w-full"
          />
        </div>

        {/* Có được ghi nhận hay không */}
        <div>
          <label className="block text-gray-700 text-left">Được ghi nhận sửa đổi</label>
          <Checkbox
            checked={duocGhiNhanSuaDoi || false}
            onChange={(e) => setDuocGhiNhanSuaDoi(e.target.checked)}
          >
            Có
          </Checkbox>
        </div>

        {/* Ghi chú chung */}
        <div className="col-span-2">
          <label className="block text-gray-700 text-left">Ghi chú về đơn sửa đổi</label>
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

export default FormSuaDoi;
