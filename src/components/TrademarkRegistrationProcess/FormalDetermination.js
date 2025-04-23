// components/CongBoDon.jsx
import React, { useState } from 'react';
import dayjs from 'dayjs';

const FormalDetermination = ({
    ngayKQThamDinhHinhThuc_DuKien,
    setNgayKQThamDinhHinhThuc_DuKien,
    ngayKQThamDinhHinhThuc,
    setNgayKQThamDinhHinhThuc
}) => {
    const [biTuChoi, setBiTuChoi] = useState(false);
    const [ngayTraLoiTuChoi, setNgayTraLoiTuChoi] = useState("");

    const handleGiaHan = () => {
        if (ngayTraLoiTuChoi) {
            const newDate = dayjs(ngayTraLoiTuChoi).add(2, 'month').format('YYYY-MM-DD');
            setNgayTraLoiTuChoi(newDate);
        }
    };

    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">📌 Thẩm định hình thức</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-left">Ngày có kết quả trả lời thẩm định hình thức dự kiến</label>
                    <input
                        type="date"
                        value={ngayKQThamDinhHinhThuc_DuKien}
                        onChange={(e) => setNgayKQThamDinhHinhThuc_DuKien(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg bg-gray-200"
                        disabled
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left">Ngày có kết quả trả lời thẩm định hình thức</label>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block text-gray-700 text-left">Ngày trả lời bị từ chối</label>
                        <input
                            type="date"
                            value={ngayTraLoiTuChoi}
                            onChange={(e) => setNgayTraLoiTuChoi(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            type="button"
                            onClick={handleGiaHan}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Gia hạn thêm 2 tháng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormalDetermination;
