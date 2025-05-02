// components/CongBoDon.jsx
import React from 'react';

const DegreeInformation = ({
    soBang,
    setSoBang,
    ngayCapBang,
    setNgayCapBang,
    ngayHetHanBang,
    setNgayHetHanBang,
    ngayGuiBangChoKH,
    setNgayGuiBangChoKH,
    isViewOnly
}) => {
    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">📌 Thông tin bằng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex-1">
                    <label className="block text-gray-700 text-left text-left">Số bằng</label>
                    <input
                        type="text"
                        value={soBang}
                        onChange={(e) => setSoBang(e.target.value)}
                        className={`w-full p-2 mt-1 border rounded-lg ${isViewOnly ? 'bg-gray-200' : ''}`}
                        disabled={isViewOnly}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left text-left">Ngày cấp bằng</label>
                    <input
                        type="date"
                        value={ngayCapBang}
                        onChange={(e) => setNgayCapBang(e.target.value)}
                        className={`w-full p-2 mt-1 border rounded-lg ${isViewOnly ? 'bg-gray-200' : ''}`}
                        disabled={isViewOnly}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left text-left">Ngày hết hạn bằng</label>
                    <input
                        type="date"
                        value={ngayHetHanBang}
                        onChange={(e) => setNgayHetHanBang(e.target.value)}
                        className={`w-full p-2 mt-1 border rounded-lg ${isViewOnly ? 'bg-gray-200' : ''}`}
                        disabled={isViewOnly}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left text-left">Ngày gửi bằng cho khách hàng</label>
                    <input
                        type="date"
                        value={ngayGuiBangChoKH}
                        onChange={(e) => setNgayGuiBangChoKH(e.target.value)}
                        className={`w-full p-2 mt-1 border rounded-lg ${isViewOnly ? 'bg-gray-200' : ''}`}
                        disabled={isViewOnly}
                    />
                </div>
            </div>
        </div>
    );
};

export default DegreeInformation;
