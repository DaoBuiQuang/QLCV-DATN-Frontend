// components/CongBoDon.jsx
import React from 'react';
import Select from "react-select";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
const CompleteDocumentation = ({
    ngayHoanThanhHSTL_DuKien,
    setNgayHoanThanhHSTL_DuKien,
    ngayHoanThanhHSTL,
    setNgayHoanThanhHSTL,
    trangThaiHoanThanhHSTL,
    setTrangThaiHoanThanhHSTL,
    formatOptions,
    isViewOnly,
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
                    {/* <input
                        type="date"
                        value={ngayHoanThanhHSTL_DuKien}
                        onChange={(e) => setNgayHoanThanhHSTL_DuKien(e.target.value)}
                        className={`w-full p-2 mt-1 border rounded-lg text-input bg-gray-200`}
                        disabled
                    /> */}
                    <DatePicker
                        value={ngayHoanThanhHSTL_DuKien ? dayjs(ngayHoanThanhHSTL_DuKien) : null}
                        onChange={(date) => {
                            if (dayjs.isDayjs(date) && date.isValid()) {
                                setNgayHoanThanhHSTL_DuKien(date.format("YYYY-MM-DD"));
                            } else {
                                setNgayHoanThanhHSTL_DuKien(null);
                            }
                        }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày hoàn thành hồ sơ tài liệu dự kiến"
                        className="mt-1 w-full"
                        disabled
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left text-left">Ngày hoàn thành hồ sơ tài liệu</label>
                    {/* <input
                        type="date"
                        value={ngayHoanThanhHSTL}
                        onChange={(e) => setNgayHoanThanhHSTL(e.target.value)}
                        className={`w-full p-2 mt-1 border rounded-lg text-input ${isViewOnly ? 'bg-gray-200' : ''}`}
                        disabled={isViewOnly}
                    /> */}
                    <DatePicker
                        value={ngayHoanThanhHSTL ? dayjs(ngayHoanThanhHSTL) : null}
                        onChange={(date) => {
                            if (dayjs.isDayjs(date) && date.isValid()) {
                                setNgayHoanThanhHSTL(date.format("YYYY-MM-DD"));
                            } else {
                                setNgayHoanThanhHSTL(null);
                            }
                        }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày hoàn thành hồ sơ tài liệu"
                        className="mt-1 w-full"
                        disabled={isViewOnly}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left text-left">Trạng thái hoàn thành hồ sơ tài liệu</label>
                    <Select
                        options={formatOptions(processStatus, "value", "label")}
                        value={trangThaiHoanThanhHSTL ? processStatus.find(opt => opt.value === trangThaiHoanThanhHSTL) : null}
                        onChange={selectedOption => setTrangThaiHoanThanhHSTL(selectedOption?.value)}
                        placeholder="Chọn trạng thái hoàn thành hồ sơ vụ việc"
                        className="w-full mt-1 rounded-lg text-left"
                        isClearable
                        isDisabled={isViewOnly}
                    />
                </div>
            </div>
        </div>
    );
};

export default CompleteDocumentation;
