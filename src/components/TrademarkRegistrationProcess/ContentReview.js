import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';

const ContentReview = ({
    ngayKQThamDinhND_DuKien,
    setNgayKQThamDinhND_DuKien,
    ngayKQThamDinhND,
    setNgayKQThamDinhND,
    ngayTraLoiKQTuChoiThamDinhND,
    setNgayTraLoiKQTuChoiThamDinhND,
    giaHanTraLoiKQTuChoiThamDinhNoiDung,
    setGiaHanTraLoiKQTuChoiThamDinhNoiDung
}) => {
    const [biTuChoi, setBiTuChoi] = useState(false);
    const originalNgayTraLoiRef = useRef("");
    useEffect(() => {
        if (giaHanTraLoiKQTuChoiThamDinhNoiDung) {
            if (ngayTraLoiKQTuChoiThamDinhND && !originalNgayTraLoiRef.current) {
                originalNgayTraLoiRef.current = ngayTraLoiKQTuChoiThamDinhND;
                const newDate = dayjs(ngayTraLoiKQTuChoiThamDinhND).add(2, 'month').format('YYYY-MM-DD');
                setNgayTraLoiKQTuChoiThamDinhND(newDate);
            }
        } else {
            if (originalNgayTraLoiRef.current) {
                setNgayTraLoiKQTuChoiThamDinhND(originalNgayTraLoiRef.current);
                originalNgayTraLoiRef.current = "";
            }
        }
    }, [giaHanTraLoiKQTuChoiThamDinhNoiDung]);
    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">📌Thẩm định nội dung</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-left">Ngày kết quả thẩm định nội dung đơn dự kiến</label>
                    <input
                        type="date"
                        disabled
                        value={ngayKQThamDinhND_DuKien}
                        onChange={(e) => setNgayKQThamDinhND_DuKien(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg bg-gray-200"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left">Ngày kết quả thẩm định nội dung đơn</label>
                    <input
                        type="date"
                        value={ngayKQThamDinhND}
                        onChange={(e) => setNgayKQThamDinhND(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg"
                    />
                </div>
            </div>
            <div className="mt-4">
                <label className="inline-flex items-center text-gray-700">
                    <input
                        type="checkbox"
                        className="form-checkbox mr-2"
                        checked={biTuChoi}
                        onChange={(e) => setBiTuChoi(e.target.checked)}
                    />
                    Bị từ chối thẩm định nội dung?
                </label>
            </div>
            {biTuChoi && (
                <>
                    <div className="mt-2">
                        <label className="inline-flex items-center text-gray-700">
                            <input
                                type="checkbox"
                                className="form-checkbox mr-2"
                                checked={giaHanTraLoiKQTuChoiThamDinhNoiDung}
                                onChange={(e) => setGiaHanTraLoiKQTuChoiThamDinhNoiDung(e.target.checked)}
                            />
                            Cho phép gia hạn trả lời từ chối thêm 2 tháng?
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-gray-700 text-left">Ngày trả lời từ chối thẩm định hình thức</label>
                            <input
                                type="date"
                                value={ngayTraLoiKQTuChoiThamDinhND}
                                onChange={(e) => {
                                    setNgayTraLoiKQTuChoiThamDinhND(e.target.value);
                                    originalNgayTraLoiRef.current = "";
                                }}
                                className="w-full p-2 mt-1 border rounded-lg"
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ContentReview;
