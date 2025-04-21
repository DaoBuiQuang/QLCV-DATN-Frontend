// components/CongBoDon.jsx
import React from 'react';

const FormalDetermination = ({
    ngayKQThamDinhHinhThuc_DuKien,
    setNgayKQThamDinhHinhThuc_DuKien,
    ngayKQThamDinhHinhThuc,
    setNgayKQThamDinhHinhThuc
}) => {
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
        </div>
    );
};

export default FormalDetermination;
