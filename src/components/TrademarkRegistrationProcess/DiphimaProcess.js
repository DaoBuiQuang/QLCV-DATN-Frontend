// components/CongBoDon.jsx
import React from 'react';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import 'dayjs/locale/vi';
const DiphimaProcess = ({
    ngayThongBaoCapBang,
    setNgayThongBaoCapBang,
    ngayNopPhiCapBang,
    setNgayNopPhiCapBang,
    ngayNhanBang,
    setNgayNhanBang,
    isViewOnly
}) => {
    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">📌 Hoàn tất nhận bằng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-left">Ngày thông báo cấp bằng</label>
                    <DatePicker
                        value={ngayThongBaoCapBang ? dayjs(ngayThongBaoCapBang) : null}
                        onChange={(date) => {
                            if (dayjs.isDayjs(date) && date.isValid()) {
                                setNgayThongBaoCapBang(date.format("YYYY-MM-DD"));
                            } else {
                                setNgayThongBaoCapBang(null);
                            }
                        }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày thông báo cấp bằng"
                        disabled={isViewOnly}
                        className="mt-1 w-full"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left">Ngày nộp phí cấp bằng</label>
                    <input
                        type="date"
                        value={ngayNopPhiCapBang}
                        onChange={(e) => setNgayNopPhiCapBang(e.target.value)}
                        className={`w-full p-2 mt-1 border rounded-lg text-input bg-gray-200`}
                        disabled
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left">Ngày nhận bằng</label>
                    <DatePicker
                        value={ngayNhanBang ? dayjs(ngayNhanBang) : null}
                        onChange={(date) => {
                            if (dayjs.isDayjs(date) && date.isValid()) {
                                setNgayNhanBang(date.format("YYYY-MM-DD"));
                            } else {
                                setNgayNhanBang(null);
                            }
                        }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày nhận bằng"
                        disabled={isViewOnly}
                        className="mt-1 w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default DiphimaProcess;
