import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker, Select, Radio } from 'antd';
import 'dayjs/locale/vi';

const { Option } = Select;

const DiphimaProcess = ({
    ngayThongBaoCapBang,
    setNgayThongBaoCapBang,
    ngayNopPhiCapBang,
    setNgayNopPhiCapBang,
    ngayNhanBang,
    setNgayNhanBang,
    isViewOnly,
    trangThaiCapBang,
    setTrangThaiCapBang,
    ngayNopYKien,
    setNgayNopYKien,
    ngayNhanKQYKien,
    setNgayNhanKQYKien,
    ketQuaYKien,
    setKetQuaYKien,
    ngayPhanHoiKQYKien,
    setNgayPhanHoiKQYKien,
}) => {
    useEffect(()=>{
        console.log("Trạng thái cấp bằng:", trangThaiCapBang)   
    }, [trangThaiCapBang])
    const showOptions = !!ngayThongBaoCapBang;

    const showNgayYKienVaKetQua = trangThaiCapBang === 'MOT_PHAN';
    const showNgayNopVaNhanBang =
        trangThaiCapBang === 'TOAN_BO' || (trangThaiCapBang === 'MOT_PHAN' && ketQuaYKien === 'THOA_DANG');

    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">📌 Hoàn tất nhận bằng</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Ngày thông báo cấp bằng */}
                <div>
                    <label className="block text-gray-700 text-left">Ngày thông báo cấp bằng</label>
                    <DatePicker
                        value={ngayThongBaoCapBang ? dayjs(ngayThongBaoCapBang) : null}
                        onChange={(date) => {
                            if (dayjs.isDayjs(date) && date.isValid()) {
                                setNgayThongBaoCapBang(date.format("YYYY-MM-DD"));
                            } else {
                                setNgayThongBaoCapBang(null);
                                setTrangThaiCapBang(null);
                                setNgayNopYKien(null);
                                setKetQuaYKien(null);
                            }
                        }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày thông báo cấp bằng"
                        disabled={isViewOnly}
                        className="mt-1 w-full"
                    />
                </div>

                {/* Chọn trạng thái cấp bằng */}
                {showOptions && (
                    <div>
                        <label className="block text-gray-700 text-left mt-2">Trạng thái đồng ý cấp bằng</label>
                        <Radio.Group
                            onChange={(e) => {
                                const value = e.target.value;
                                setTrangThaiCapBang(value);
                                if (value === 'TOAN_BO') {
                                    setNgayNopYKien(null);
                                    setKetQuaYKien(null);
                                }
                            }}
                            value={trangThaiCapBang}
                            className="mt-2"
                            disabled={isViewOnly}
                        >
                            <Radio value="TOAN_BO">Đồng ý toàn bộ</Radio>
                            <Radio value="MOT_PHAN">Đồng ý một phần</Radio>
                        </Radio.Group>
                    </div>
                )}


                {/* Ngày nộp ý kiến & kết quả ý kiến */}
                {showNgayYKienVaKetQua && (
                    <>
                        <div>
                            <label className="block text-gray-700 text-left">Ngày nộp ý kiến</label>
                            <DatePicker
                                value={ngayNopYKien ? dayjs(ngayNopYKien) : null}
                                onChange={(date) => {
                                    if (dayjs.isDayjs(date) && date.isValid()) {
                                        setNgayNopYKien(date.format("YYYY-MM-DD"));
                                    } else {
                                        setNgayNopYKien(null);
                                    }
                                }}
                                format="DD/MM/YYYY"
                                placeholder="Chọn ngày nộp ý kiến"
                                disabled={isViewOnly}
                                className="mt-1 w-full"
                            />
                        </div>
                         <div>
                            <label className="block text-gray-700 text-left">Ngày nhận kết quả ý kiến</label>
                            <DatePicker
                                value={ngayNhanKQYKien ? dayjs(ngayNhanKQYKien) : null}
                                onChange={(date) => {
                                    if (dayjs.isDayjs(date) && date.isValid()) {
                                        setNgayNhanKQYKien(date.format("YYYY-MM-DD"));
                                    } else {
                                        setNgayNhanKQYKien(null);
                                    }
                                }}
                                format="DD/MM/YYYY"
                                placeholder="Chọn ngày nộp ý kiến"
                                disabled={isViewOnly}
                                className="mt-1 w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-left">Kết quả ý kiến</label>
                            <Radio.Group
                                onChange={(e) => setKetQuaYKien(e.target.value)}
                                value={ketQuaYKien}
                                className="mt-2"
                                disabled={isViewOnly}
                            >
                                <Radio value="THOA_DANG">Thỏa đáng</Radio>
                                <Radio value="KHONG_THOA_DANG">Không thỏa đáng</Radio>
                            </Radio.Group>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-left">Ngày phản hồi kết quả ý kiến</label>
                            <DatePicker
                                value={ngayPhanHoiKQYKien ? dayjs(ngayPhanHoiKQYKien) : null}
                                onChange={(date) => {
                                    if (dayjs.isDayjs(date) && date.isValid()) {
                                        setNgayPhanHoiKQYKien(date.format("YYYY-MM-DD"));
                                    } else {
                                        setNgayPhanHoiKQYKien(null);
                                    }
                                }}
                                format="DD/MM/YYYY"
                                placeholder="Chọn phản hồi kết quả ý kiến"
                                disabled={isViewOnly}
                                className="mt-1 w-full"
                            />
                        </div>
                    </>
                )}

                {/* Ngày nộp phí cấp bằng & ngày nhận bằng */}
                {showNgayNopVaNhanBang && (
                    <>
                        <div>
                            <label className="block text-gray-700 text-left">Ngày nộp phí cấp bằng</label>
                            <DatePicker
                                value={ngayNopPhiCapBang ? dayjs(ngayNopPhiCapBang) : null}
                                onChange={(date) => {
                                    if (dayjs.isDayjs(date) && date.isValid()) {
                                        setNgayNopPhiCapBang(date.format("YYYY-MM-DD"));
                                    } else {
                                        setNgayNopPhiCapBang(null);
                                    }
                                }}
                                format="DD/MM/YYYY"
                                placeholder="Chọn ngày nộp phí cấp bằng"
                                disabled={isViewOnly}
                                className="mt-1 w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-left">Ngày nhận bằng</label>
                            <DatePicker
                                value={ngayNhanBang ? dayjs(ngayNhanBang) : null}
                                onChange={(date) => {
                                    if (dayjs.isDayjs(date) && date.isValid()) {
                                        setNgayNhanBang(date.format("YYYY-MM-DD"));
                                    } else {
                                        setNgayNhanBang(null);
                                    }
                                }}
                                format="DD/MM/YYYY"
                                placeholder="Chọn ngày nhận bằng"
                                disabled={isViewOnly}
                                className="mt-1 w-full"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DiphimaProcess;
