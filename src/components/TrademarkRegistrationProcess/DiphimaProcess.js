// components/CongBoDon.jsx
import React from 'react';

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
                    <label className="block text-gray-700 text-left text-left">Ngày thông báo cấp bằng</label>
                    <input
                        type="date"
                        value={ngayThongBaoCapBang}
                        onChange={(e) => setNgayThongBaoCapBang(e.target.value)}
                        className={`w-full p-2 mt-1 border rounded-lg text-input ${isViewOnly ? 'bg-gray-200' : ''}`}
                        disabled={isViewOnly}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left text-left">Ngày nộp phí cấp bằng</label>
                    <input
                        type="date"
                        value={ngayNopPhiCapBang}
                        onChange={(e) => setNgayNopPhiCapBang(e.target.value)}
                        className={`w-full p-2 mt-1 border rounded-lg text-input bg-gray-200`}
                        disabled
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left text-left">Ngày nhận bằng</label>
                    <input
                        type="date"
                        value={ngayNhanBang}
                        onChange={(e) => setNgayNhanBang(e.target.value)}
                        className={`w-full p-2 mt-1 border rounded-lg text-input ${isViewOnly ? 'bg-gray-200' : ''}`}
                        disabled={isViewOnly}
                    />
                </div>
            </div>
        </div>
    );
};

export default DiphimaProcess;
