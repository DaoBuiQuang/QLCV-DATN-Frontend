// components/CongBoDon.jsx
import React from 'react';
import Select from "react-select";
const CompleteDocumentation = ({
    ngayHoanThanhHSTL_DuKien,
    setNgayHoanThanhHSTL_DuKien,
    ngayHoanThanhHSTL,
    setNgayHoanThanhHSTL,
    trangThaiHoanThanhHSTL,
    setTrangThaiHoanThanhHSTL,
    formatOptions
}) => {
    const processStatus = [
        { value: "chua_hoan_thanh", label: "Chưa hoàn thành" },
        { value: "hoan_thanh", label: "Hoàn thành" }
    ];
    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">📌Hoàn thành hồ sơ tài liệu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-left">Ngày hoàn thành hồ sơ tài liệu dự kiến</label>
                    <input
                        type="date"
                        value={ngayHoanThanhHSTL_DuKien}
                        onChange={(e) => setNgayHoanThanhHSTL_DuKien(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg bg-gray-200"
                        disabled
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left">Ngày hoàn thành hồ sơ tài liệu</label>
                    <input
                        type="date"
                        value={ngayHoanThanhHSTL}
                        onChange={(e) => setNgayHoanThanhHSTL(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left">Trạng thái hoàn thành hồ sơ tài liệu</label>
                    <Select
                        options={formatOptions(processStatus, "value", "label")}
                        value={trangThaiHoanThanhHSTL ? processStatus.find(opt => opt.value === trangThaiHoanThanhHSTL) : null}
                        onChange={selectedOption => setTrangThaiHoanThanhHSTL(selectedOption?.value)}
                        placeholder="Chọn trạng thái hoàn thành hồ sơ vụ việc"
                        className="w-full mt-1 rounded-lg"
                        isClearable
                    />
                </div>
            </div>
        </div>
    );
};

export default CompleteDocumentation;
