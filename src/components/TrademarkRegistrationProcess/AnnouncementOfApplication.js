// components/CongBoDon.jsx
import React from 'react';

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
                        className="w-full p-2 mt-1 border rounded-lg bg-gray-200"
                        disabled
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left text-left">Ngày công bố đơn</label>
                    <input
                        type="date"
                        value={ngayCongBo}
                        onChange={(e) => setNgayCongBo(e.target.value)}
                        className={`w-full p-2 mt-1 border rounded-lg ${isViewOnly ? 'bg-gray-200' : ''}`}
                        disabled={isViewOnly}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnnouncementOfApplication;
