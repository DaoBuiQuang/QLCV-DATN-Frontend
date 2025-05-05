import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';

const ContentReview = ({
    ngayKQThamDinhND_DuKien,
    setNgayKQThamDinhND_DuKien,
    ngayKQThamDinhND,
    setNgayKQThamDinhND,
    lichSuThamDinhND,
    setLichSuThamDinhND,
    isViewOnly
}) => {
    const handleFailure = () => {
        const today = dayjs();
        const hanTraLoi = today.add(2, 'month').format('YYYY-MM-DD');

        setLichSuThamDinhND(prev => [
            ...prev,
            {
                loaiThamDinh: 'NoiDung',
                lanThamDinh: prev.length + 1,
                ngayBiTuChoiTDND: "",
                hanTraLoi: hanTraLoi,
                giaHan: false
            }
        ]);
    };


    const handleSuccess = () => {
        const today = dayjs().format('YYYY-MM-DD');
        setNgayKQThamDinhND(today);
    };

    const updateRefusal = (index, field, value) => {
        const updated = [...lichSuThamDinhND];
        updated[index][field] = value;

        if (field === "giaHan") {
            const refusal = updated[index];
            let hanTraLoi = dayjs(refusal.hanTraLoi);

            if (value) {
                hanTraLoi = hanTraLoi.add(2, 'month');
            } else {
                hanTraLoi = hanTraLoi.subtract(2, 'month');
            }
            updated[index].hanTraLoi = hanTraLoi.format('YYYY-MM-DD');
        }

        setLichSuThamDinhND(updated);
    };

    const deleteRefusal = (index) => {
        const updated = lichSuThamDinhND.filter((_, i) => i !== index);
        setLichSuThamDinhND(updated);
    };

    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">📌 Thẩm định nội dung</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-left text-left">
                        Ngày kết quả thẩm định nội dung đơn dự kiến
                    </label>
                    <input
                        type="date"
                        disabled
                        value={ngayKQThamDinhND_DuKien}
                        onChange={(e) => setNgayKQThamDinhND_DuKien(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg bg-gray-200"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left text-left">
                        Ngày kết quả thẩm định nội dung đơn
                    </label>
                    <input
                        type="date"
                        value={ngayKQThamDinhND}
                        onChange={(e) => setNgayKQThamDinhND(e.target.value)}
                        className={`w-full p-2 mt-1 border rounded-lg ${isViewOnly ? 'bg-gray-200' : ''}`}
                        disabled={isViewOnly}
                    />
                </div>
            </div>
            {lichSuThamDinhND.length === 0 && (
                <div className="mt-4 flex space-x-2">
                    <button
                        type="button"
                        onClick={handleSuccess}
                        disabled={isViewOnly}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                        ✅ Đạt
                    </button>
                    <button
                        type="button"
                        onClick={handleFailure}
                        disabled={isViewOnly}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                        ❌ Không đạt
                    </button>
                </div>
            )}

            {lichSuThamDinhND.length > 0 && (
                <div className="mt-4 border">
                    {lichSuThamDinhND.map((refusal, index) => {
                        const baseHanTraLoi = dayjs(refusal.ngayBiTuChoiTDND).add(3, 'month');
                        const hanTraLoi = refusal.giaHan
                            ? baseHanTraLoi.add(2, 'month').format('YYYY-MM-DD')
                            : baseHanTraLoi.format('YYYY-MM-DD');

                        return (
                            <div key={index} className="p-1  rounded-md bg-gray-50 text-sm">
                                <div className="flex justify-between items-center ">
                                    <span className="font-semibold text-gray-700">Lần từ chối #{index + 1}</span>
                                    {!isViewOnly && (
                                        <button
                                            type="button"
                                            onClick={() => deleteRefusal(index)}
                                            className="text-red-500 hover:text-red-700 text-xs"
                                        >
                                            🗑 Xóa
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                                    <div>
                                        <label className="block text-gray-600">Ngày bị từ chối</label>
                                        <input
                                            type="date"
                                            value={refusal.ngayBiTuChoiTDND}
                                            onChange={(e) => updateRefusal(index, 'ngayBiTuChoiTDND', e.target.value)}
                                            disabled={isViewOnly}
                                            className="w-full p-2 mt-1 border rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-600">Hạn trả lời kết quả</label>
                                        <input
                                            type="date"
                                            value={hanTraLoi}
                                            className="w-full p-2 mt-1 border rounded-md bg-gray-200"
                                            disabled
                                        />
                                    </div>

                                    <div className="mt-5 md:mt-6">
                                        {!isViewOnly && (
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={refusal.giaHan}
                                                    onChange={(e) => updateRefusal(index, 'giaHan', e.target.checked)}
                                                    className="mr-2"
                                                />
                                                Gia hạn
                                            </label>
                                        )}
                                    </div>

                                </div>

                                {!isViewOnly && index === lichSuThamDinhND.length - 1 && (
                                    <div className="flex space-x-2 mt-3">
                                        <button
                                            type="button"
                                            onClick={handleSuccess}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs"
                                        >
                                            ✅ Đạt
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleFailure}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                                        >
                                            ❌ Không đạt
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
};

export default ContentReview;
