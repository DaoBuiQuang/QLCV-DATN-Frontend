// components/CongBoDon.jsx
import React from 'react';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import 'dayjs/locale/vi';
const AnnouncementOfApplication = ({
    ngayCongBo_DuKien,
    setNgayCongBo_DuKien,
    ngayCongBo,
    setNgayCongBo,
    isViewOnly,
}) => {
    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">📌 Công bố đơn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-left text-left">Ngày công bố đơn dự kiến</label>
                    <input
                        type="date"
                        value={ngayCongBo_DuKien}
                        onChange={(e) => setNgayCongBo_DuKien(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200"
                        disabled
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left text-left">Ngày công bố đơn</label>
                    <DatePicker
                        value={ngayCongBo ? dayjs(ngayCongBo) : null}
                        onChange={(date) => {
                            if (dayjs.isDayjs(date) && date.isValid()) {
                                setNgayCongBo(date.format("YYYY-MM-DD"));
                            } else {
                                setNgayCongBo(null);
                            }
                        }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày công bố đơn"
                        className="mt-1 w-full"
                        disabled={isViewOnly}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnnouncementOfApplication;
