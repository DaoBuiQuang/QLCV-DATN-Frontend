// components/CongBoDon.jsx
import React from 'react';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import 'dayjs/locale/vi'
const DegreeInformation = ({
    soBang,
    setSoBang,
    ngayCapBang,
    setNgayCapBang,
    ngayHetHanBang,
    setNgayHetHanBang,
    ngayGuiBangChoKH,
    setNgayGuiBangChoKH,
    isViewOnly
}) => {
    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">📌 Thông tin bằng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex-1">
                    <label className="block text-gray-700 text-left">Số bằng</label>
                    <input
                        type="text"
                        value={soBang}
                        onChange={(e) => setSoBang(e.target.value)}
                        className={`w-full p-2 mt-1 border rounded-lg text-input ${isViewOnly ? 'bg-gray-200' : ''}`}
                        disabled={isViewOnly}
                        placeholder='Nhập số bằng'
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left">Ngày cấp bằng</label>
                    <DatePicker
                        value={ngayCapBang ? dayjs(ngayCapBang) : null}
                        onChange={(date) => {
                            if (dayjs.isDayjs(date) && date.isValid()) {
                                setNgayCapBang(date.format("YYYY-MM-DD"));
                            } else {
                                setNgayCapBang(null);
                            }
                        }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày cấp bằng"
                        disabled={isViewOnly}
                        className="mt-1 w-full"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left">Ngày hết hạn bằng</label>
                    <DatePicker
                        value={ngayHetHanBang ? dayjs(ngayHetHanBang) : null}
                        onChange={(date) => {
                            if (dayjs.isDayjs(date) && date.isValid()) {
                                setNgayHetHanBang(date.format("YYYY-MM-DD"));
                            } else {
                                setNgayHetHanBang(null);
                            }
                        }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày hết hạn bằng"
                        disabled={isViewOnly}
                        className="mt-1 w-full"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left ">Ngày gửi bằng cho khách hàng</label>
                    <DatePicker
                        value={ngayGuiBangChoKH ? dayjs(ngayGuiBangChoKH) : null}
                        onChange={(date) => {
                            if (dayjs.isDayjs(date) && date.isValid()) {
                                setNgayGuiBangChoKH(date.format("YYYY-MM-DD"));
                            } else {
                                setNgayGuiBangChoKH(null);
                            }
                        }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày gửi bằng cho khách hàng"
                        disabled={isViewOnly}
                        className="mt-1 w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default DegreeInformation;
