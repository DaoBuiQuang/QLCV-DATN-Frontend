import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';

const FormalDetermination = ({
    ngayKQThamDinhHinhThuc_DuKien,
    setNgayKQThamDinhHinhThuc_DuKien,
    ngayKQThamDinhHinhThuc,
    setNgayKQThamDinhHinhThuc,
    ngayTraLoiKQTuChoiThamDinhHinhThuc,
    setNgayTraLoiKQTuChoiThamDinhHinhThuc,
    giaHanTraLoiKQTuChoiThamDinhHinhThuc,
    setGiaHanTraLoiKQTuChoiThamDinhHinhThuc
}) => {
    const [biTuChoi, setBiTuChoi] = useState(false);
    const originalNgayTraLoiRef = useRef("");
    useEffect(() => {
        if (ngayTraLoiKQTuChoiThamDinhHinhThuc) {
            setBiTuChoi(true);
            originalNgayTraLoiRef.current = dayjs(ngayTraLoiKQTuChoiThamDinhHinhThuc)
                .subtract(giaHanTraLoiKQTuChoiThamDinhHinhThuc ? 2 : 0, 'month')
                .format('YYYY-MM-DD');
        }
    }, [ngayTraLoiKQTuChoiThamDinhHinhThuc]);
    useEffect(() => {
        const goc = originalNgayTraLoiRef.current;
        if (!goc) return;

        const updatedDate = dayjs(goc)
            .add(giaHanTraLoiKQTuChoiThamDinhHinhThuc ? 2 : 0, 'month')
            .format('YYYY-MM-DD');

        setNgayTraLoiKQTuChoiThamDinhHinhThuc(updatedDate);
    }, [giaHanTraLoiKQTuChoiThamDinhHinhThuc]);

    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">📌 Thẩm định hình thức</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-left">
                        Ngày có kết quả trả lời thẩm định hình thức dự kiến
                    </label>
                    <input
                        type="date"
                        value={ngayKQThamDinhHinhThuc_DuKien}
                        onChange={(e) => setNgayKQThamDinhHinhThuc_DuKien(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg bg-gray-200"
                        disabled
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left">
                        Ngày có kết quả trả lời thẩm định hình thức
                    </label>
                    <input
                        type="date"
                        value={ngayKQThamDinhHinhThuc}
                        onChange={(e) => setNgayKQThamDinhHinhThuc(e.target.value)}
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
                    Bị từ chối thẩm định hình thức?
                </label>
            </div>

            {biTuChoi && (
                <>
                    <div className="mt-2">
                        <label className="inline-flex items-center text-gray-700">
                            <input
                                type="checkbox"
                                className="form-checkbox mr-2"
                                checked={giaHanTraLoiKQTuChoiThamDinhHinhThuc}
                                onChange={(e) => setGiaHanTraLoiKQTuChoiThamDinhHinhThuc(e.target.checked)}
                            />
                            Cho phép gia hạn trả lời từ chối thêm 2 tháng?
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-gray-700 text-left">
                                Ngày trả lời từ chối thẩm định hình thức
                            </label>
                            <input
                                type="date"
                                value={ngayTraLoiKQTuChoiThamDinhHinhThuc}
                                onChange={(e) => {
                                    setNgayTraLoiKQTuChoiThamDinhHinhThuc(e.target.value);
                                    originalNgayTraLoiRef.current = e.target.value;
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

export default FormalDetermination;
