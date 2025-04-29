import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const FormalDetermination = ({
    ngayKQThamDinhHinhThuc_DuKien,
    setNgayKQThamDinhHinhThuc_DuKien,
    ngayKQThamDinhHinhThuc,
    setNgayKQThamDinhHinhThuc,
    lichSuTuChoi,
    setLichSuTuChoi,
    isViewOnly
}) => {
    const addNewRefusal = () => {
        setLichSuTuChoi(prev => [
            ...prev,
            {
                ngayTraLoi: '',
                giaHan: false
            }
        ]);
    };

    const updateRefusal = (index, field, value) => {
        const updated = [...lichSuTuChoi];
        updated[index][field] = value;

        // Nếu chỉnh sửa gia hạn thì tự động cộng thêm 2 tháng
        if (field === "giaHan" && updated[index].ngayTraLoi) {
            const baseDate = dayjs(updated[index].ngayTraLoi).subtract(updated[index].giaHan ? 2 : 0, 'month');
            updated[index].ngayTraLoi = baseDate.add(value ? 2 : 0, 'month').format('YYYY-MM-DD');
        }
        setLichSuTuChoi(updated);
    };

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
                        className={`w-full p-2 mt-1 border rounded-lg ${isViewOnly ? 'bg-gray-200' : ''}`}
                        disabled={isViewOnly}
                    />
                </div>
            </div>

            <div className="mt-4">
                <button
                    type="button"
                    onClick={addNewRefusal}
                    disabled={isViewOnly}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    + Thêm lần bị từ chối
                </button>
            </div>

            {lichSuTuChoi.length > 0 && (
                <div className="mt-4 space-y-4">
                    {lichSuTuChoi.map((refusal, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-gray-50">
                            <h4 className="text-md font-semibold text-gray-700 mb-2">
                                🛑 Lần từ chối #{index + 1}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        Ngày trả lời từ chối
                                    </label>
                                    <input
                                        type="date"
                                        value={refusal.ngayTraLoi}
                                        onChange={(e) => updateRefusal(index, 'ngayTraLoi', e.target.value)}
                                        disabled={isViewOnly}
                                        className="w-full p-2 mt-1 border rounded-lg"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox mr-2"
                                        checked={refusal.giaHan}
                                        onChange={(e) => updateRefusal(index, 'giaHan', e.target.checked)}
                                        disabled={isViewOnly}
                                    />
                                    <label className="text-gray-700">Gia hạn thêm 2 tháng</label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FormalDetermination;
