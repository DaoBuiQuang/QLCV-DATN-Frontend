// components/CongBoDon.jsx
import React from 'react';

const ReplyContentRating = ({
    ngayTraLoiKQThamDinhND_DuKien,
    setNgayTraLoiKQThamDinhND_DuKien,
    ngayTraLoiKQThamDinhND,
    setNgayTraLoiKQThamDinhND
}) => {
    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">📌Trả lời kết quả thẩm định nội dung</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-left">Ngày kết quả thẩm định nội dung đơn dự kiến</label>
                    <input
                        type="date"
                        disabled
                        value={ngayTraLoiKQThamDinhND_DuKien}
                        onChange={(e) => setNgayTraLoiKQThamDinhND_DuKien(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg bg-gray-200"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left">Ngày kết quả thẩm định nội dung đơn</label>
                    <input
                        type="date"
                        value={ngayTraLoiKQThamDinhND}
                        onChange={(e) => setNgayTraLoiKQThamDinhND(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default ReplyContentRating;
