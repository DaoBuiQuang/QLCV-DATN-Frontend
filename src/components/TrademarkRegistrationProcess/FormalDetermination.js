import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import 'dayjs/locale/vi';
const FormalDetermination = ({
    ngayKQThamDinhHinhThuc_DuKien,
    setNgayKQThamDinhHinhThuc_DuKien,
    ngayKQThamDinhHinhThuc,
    setNgayKQThamDinhHinhThuc,
    lichSuThamDinhHT,
    setLichSuThamDinhHT,
    isViewOnly
}) => {
    useEffect(() => {
        console.log(lichSuThamDinhHT)
    });

    const handleThatBaiure = () => {
        const today = dayjs();
        const hanTraLoi = today.add(2, 'month').format('YYYY-MM-DD');

        setLichSuThamDinhHT(prev => [
            ...prev,
            {
                loaiThamDinh: 'HinhThuc',
                lanThamDinh: prev.length + 1,
                ngayBiTuChoiTD: "",
                hanTraLoi: hanTraLoi,
                giaHan: false,
                ghiChu: ""
            }
        ]);
    };
    const testSubmit = () => {
        console.log("Submit", lichSuThamDinhHT);
    }

    const handleThanhCong = () => {
        const today = dayjs().format('YYYY-MM-DD');
        setNgayKQThamDinhHinhThuc(today);
    };

    const updateRefusal = (index, field, value) => {
        const updated = [...lichSuThamDinhHT];
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

        setLichSuThamDinhHT(updated);
    };

    const deleteRefusal = (index) => {
        const updated = lichSuThamDinhHT.filter((_, i) => i !== index);
        setLichSuThamDinhHT(updated);
    };
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
                        className="w-full p-2 mt-1 border rounded-lg text-input bg-gray-200"
                        disabled
                    />
                </div>
                <div>
                    <label className="block text-gray-700  text-left">Ngày chấp nhận đơn hợp lệ</label>
                    <DatePicker
                        value={ngayKQThamDinhHinhThuc ? dayjs(ngayKQThamDinhHinhThuc) : null}
                        onChange={(date) => {
                            if (dayjs.isDayjs(date) && date.isValid()) {
                                setNgayKQThamDinhHinhThuc(date.format("YYYY-MM-DD"));
                            } else {
                                setNgayKQThamDinhHinhThuc(null);
                            }
                        }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày chấp nhận đơn hợp lệ"
                        className="mt-1 w-full"
                    />
                </div>
            </div>
            {lichSuThamDinhHT.length === 0 && (
                <div className="mt-4 flex space-x-2">
                    <button
                        type="button"
                        onClick={handleThanhCong}
                        disabled={isViewOnly}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                        ✅ Đạt
                    </button>
                    <button
                        type="button"
                        onClick={handleThatBaiure}
                        disabled={isViewOnly}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                        ❌ Không đạt
                    </button>
                </div>
            )}

            {lichSuThamDinhHT.length > 0 && (
                <div className="mt-4 border">
                    {lichSuThamDinhHT.map((refusal, index) => {
                        const baseHanTraLoi = dayjs(refusal.ngayBiTuChoiTD).add(3, 'month');
                        const ngayTraLoi = refusal.ngayTraLoi;
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

                                <div className="grid grid-cols-1 md:grid-cols-10 gap-3 items-center">
                                    <div className="md:col-span-3">
                                        <label className="block text-gray-600">Ngày nhận thông báo từ từ chối</label>
                                        <DatePicker
                                            value={refusal.ngayBiTuChoiTD ? dayjs(refusal.ngayBiTuChoiTD) : null}
                                            onChange={(date) => {
                                                if (dayjs.isDayjs(date) && date.isValid()) {
                                                    updateRefusal(index, 'ngayBiTuChoiTD', date.format("YYYY-MM-DD"));
                                                } else {
                                                    updateRefusal(index, 'ngayBiTuChoiTD', null);
                                                }
                                            }}
                                            format="DD/MM/YYYY"
                                            placeholder="Chọn ngày nhận thông báo từ từ chối"
                                            disabled={isViewOnly}
                                            className="mt-1 w-full"
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-gray-600">Hạn trả lời</label>
                                        <input
                                            type="date"
                                            value={hanTraLoi}
                                            className="w-full p-2 mt-1 border rounded-md bg-gray-200"
                                            disabled
                                        />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label className="block text-gray-600">Ngày trả lời</label>
                                        <DatePicker
                                            value={refusal.ngayTraLoi ? dayjs(refusal.ngayTraLoi) : null}
                                            onChange={(date) => {
                                                if (dayjs.isDayjs(date) && date.isValid()) {
                                                    updateRefusal(index, 'ngayTraLoi', date.format("YYYY-MM-DD"));
                                                } else {
                                                    updateRefusal(index, 'ngayTraLoi', null);
                                                }
                                            }}
                                            format="DD/MM/YYYY"
                                            placeholder="Chọn trả lời"
                                            disabled={isViewOnly}
                                            className="mt-1 w-full"
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-gray-600">Ghi chú</label>
                                        <input
                                            type="text"
                                            value={refusal.ghiChu || ''}
                                            onChange={(e) => updateRefusal(index, 'ghiChu', e.target.value)}
                                            disabled={isViewOnly}
                                            className="w-full p-2 mt-1 border rounded-md"
                                        />
                                    </div>

                                    {!isViewOnly && refusal.ngayBiTuChoiTD && (
                                        <div className="md:col-span-1">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={refusal.giaHan}
                                                    onChange={(e) => updateRefusal(index, 'giaHan', e.target.checked)}
                                                    className="mr-2"
                                                />
                                                Gia hạn
                                            </label>
                                        </div>
                                    )}
                                </div>


                                {!isViewOnly && index === lichSuThamDinhHT.length - 1 && !refusal.showKhieuNaiForm && (
                                    <div className="flex space-x-2 mt-3">
                                        <button
                                            type="button"
                                            onClick={handleThanhCong}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs"
                                        >
                                            Đạt
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleThatBaiure}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                                        >
                                            Không đạt
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => updateRefusal(index, 'trangThaiBiNhanQuyetDinhTuChoi', true)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-xs"
                                        >
                                            Nhận quyết định từ chối
                                        </button>
                                    </div>
                                )}
                                {refusal.trangThaiBiNhanQuyetDinhTuChoi && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="mt-3">
                                            <label className="block text-gray-600">Ngày nhận quyết định từ chối</label>
                                            <DatePicker
                                                value={refusal.ngayNhanQuyetDinhTuChoi ? dayjs(refusal.ngayNhanQuyetDinhTuChoi) : null}
                                                onChange={(date) =>
                                                    updateRefusal(index, 'ngayNhanQuyetDinhTuChoi', date?.format('YYYY-MM-DD'))
                                                }
                                                format="DD/MM/YYYY"
                                                className="w-full"
                                            />
                                        </div>

                                        <div className="mt-8 flex justify-between items-center col-span-2">
                                            <button
                                                type="button"
                                                onClick={() => updateRefusal(index, 'showKhieuNaiCSHCTForm', true)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs"
                                            >
                                                Khiếu nại cục sở hữu trí tuệ
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    updateRefusal(index, 'trangThaiBiNhanQuyetDinhTuChoi', false);
                                                    updateRefusal(index, 'showKhieuNaiCSHCTForm', false);
                                                }}
                                                className="text-red-500 hover:text-red-700 text-xs ml-auto"
                                            >
                                                🗑 Xóa
                                            </button>

                                        </div>
                                    </div>
                                )}
                                {!isViewOnly && (
                                    <div className="mt-4">
                                        {refusal.showKhieuNaiCSHCTForm && (
                                            <div className="mt-3 p-3 border rounded bg-white shadow-sm">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block text-gray-600">Hạn khiếu nại CSHTT</label>
                                                        <DatePicker
                                                            value={refusal.hanKhieuNaiCSHTT ? dayjs(refusal.hanKhieuNaiCSHTT) : null}
                                                            onChange={(date) =>
                                                                updateRefusal(index, 'hanKhieuNaiCSHTT', date?.format('YYYY-MM-DD'))
                                                            }
                                                            format="DD/MM/YYYY"
                                                            className="w-full"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-600">Ngày khiếu nại CSHTT</label>
                                                        <DatePicker
                                                            value={refusal.ngayKhieuNaiCSHTT ? dayjs(refusal.ngayKhieuNaiCSHTT) : null}
                                                            onChange={(date) =>
                                                                updateRefusal(index, 'ngayKhieuNaiCSHTT', date?.format('YYYY-MM-DD'))
                                                            }
                                                            format="DD/MM/YYYY"
                                                            className="w-full"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => { updateRefusal(index, 'showKhieuNaiCSHCTForm', false); }}
                                                        className="text-red-500 hover:text-red-700 text-xs ml-auto"
                                                    >
                                                        🗑 Xóa
                                                    </button>
                                                </div>

                                                <div className="mt-3">

                                                    <div className="flex space-x-4 mt-1">
                                                        <label className="block text-gray-600">Kết quả khiếu nại CSHTT: </label>
                                                        <label className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                name={`ketQuaCSHTT-${index}`}
                                                                value="ThanhCong"
                                                                checked={refusal.ketQuaKhieuNaiCSHTT === 'ThanhCong'}
                                                                onChange={() => {
                                                                    updateRefusal(index, 'ketQuaKhieuNaiCSHTT', 'ThanhCong');
                                                                    updateRefusal(index, 'ngayNhanKetQuaThatBaiCSHTT', null); // reset nếu trước đó là thất bại
                                                                }}
                                                                className="mr-2"
                                                            />
                                                            Thành công
                                                        </label>
                                                        <label className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                name={`ketQuaCSHTT-${index}`}
                                                                value="ThatBai"
                                                                checked={refusal.ketQuaKhieuNaiCSHTT === 'ThatBai'}
                                                                onChange={() => updateRefusal(index, 'ketQuaKhieuNaiCSHTT', 'ThatBai')}
                                                                className="mr-2"
                                                            />
                                                            Thất bại
                                                        </label>
                                                    </div>
                                                    {refusal.ketQuaKhieuNaiCSHTT === 'ThatBai' && (
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            <div className="mt-3">
                                                                <label className="block text-gray-600">Ngày nhận kết quả thất bại từ Cục SHTT</label>
                                                                <DatePicker
                                                                    value={refusal.ngayNhanKQKNThatBaiCSHTT ? dayjs(refusal.ngayNhanKQKNThatBaiCSHTT) : null}
                                                                    onChange={(date) =>
                                                                        updateRefusal(index, 'ngayNhanKQKNThatBaiCSHTT', date?.format('YYYY-MM-DD'))
                                                                    }
                                                                    format="DD/MM/YYYY"
                                                                    className="w-full mt-1 "
                                                                />
                                                            </div>

                                                            <div className="mt-3">
                                                                <label className="block text-gray-600">Ghi chú kết quả thất bại</label>
                                                                <input
                                                                    value={refusal.ghiChuThatBaiCSHTT || ''}
                                                                    onChange={(e) => updateRefusal(index, 'ghiChuThatBaiCSHTT', e.target.value)}
                                                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                                                    rows={3}
                                                                    placeholder="Nhập ghi chú..."
                                                                />
                                                            </div>
                                                            <div className="mt-8 flex justify-between items-center col-span-1">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => updateRefusal(index, 'showKhieuNaiBKHCNForm', true)}
                                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs"
                                                                >
                                                                    Khiếu nại Bộ khoa học và công nghệ
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}

                                                </div>
                                                {refusal.showKhieuNaiBKHCNForm && (
                                                    <>

                                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            <div>
                                                                <label className="block text-gray-600">Hạn khiếu nại BKH&CN</label>
                                                                <DatePicker
                                                                    value={refusal.hanKhieuNaiBKHCN ? dayjs(refusal.hanKhieuNaiBKHCN) : null}
                                                                    onChange={(date) =>
                                                                        updateRefusal(index, 'hanKhieuNaiBKHCN', date?.format('YYYY-MM-DD'))
                                                                    }
                                                                    format="DD/MM/YYYY"
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-gray-600">Ngày khiếu nại BKH&CN</label>
                                                                <DatePicker
                                                                    value={refusal.ngayKhieuNaiBKHCN ? dayjs(refusal.ngayKhieuNaiBKHCN) : null}
                                                                    onChange={(date) =>
                                                                        updateRefusal(index, 'ngayKhieuNaiBKHCN', date?.format('YYYY-MM-DD'))
                                                                    }
                                                                    format="DD/MM/YYYY"
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    updateRefusal(index, 'showKhieuNaiBKHCNForm', false);
                                                                }}
                                                                className="text-red-500 hover:text-red-700 text-xs ml-auto"
                                                            >
                                                                🗑 Xóa
                                                            </button>
                                                        </div>
                                                        <div className="mt-3">
                                                            <div className="flex space-x-4 mt-1">
                                                                <label className="block text-gray-600">Kết quả khiếu nại BKH&CN</label>
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="radio"
                                                                        name={`ketQuaBKHCN-${index}`}
                                                                        value="ThanhCong"
                                                                        checked={refusal.ketQuaKhieuNaiBKHCN === 'ThanhCong'}
                                                                        onChange={() => updateRefusal(index, 'ketQuaKhieuNaiBKHCN', 'ThanhCong')}
                                                                        className="mr-2"
                                                                    />
                                                                    Thành công
                                                                </label>
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="radio"
                                                                        name={`ketQuaBKHCN-${index}`}
                                                                        value="ThatBai"
                                                                        checked={refusal.ketQuaKhieuNaiBKHCN === 'ThatBai'}
                                                                        onChange={() => updateRefusal(index, 'ketQuaKhieuNaiBKHCN', 'ThatBai')}
                                                                        className="mr-2"
                                                                    />
                                                                    Thất bại
                                                                </label>
                                                            </div>
                                                            {refusal.ketQuaKhieuNaiBKHCN === 'ThatBai' && (
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                    <div className="mt-3">
                                                                        <label className="block text-gray-600">Ngày nhận kết quả thất bại từ Cục SHTT</label>
                                                                        <DatePicker
                                                                            value={refusal.ngayNhanKQKNThatBaiBKHCN ? dayjs(refusal.ngayNhanKQKNThatBaiBKHCN) : null}
                                                                            onChange={(date) =>
                                                                                updateRefusal(index, 'ngayNhanKQKNThatBaiBKHCN', date?.format('YYYY-MM-DD'))
                                                                            }
                                                                            format="DD/MM/YYYY"
                                                                            className="w-full mt-1 "
                                                                        />
                                                                    </div>

                                                                    <div className="mt-3">
                                                                        <label className="block text-gray-600">Ghi chú kết quả thất bại</label>
                                                                        <input
                                                                            value={refusal.ghiChuThatBaiBKHCN || ''}
                                                                            onChange={(e) => updateRefusal(index, 'ghiChuThatBaiBKHCN', e.target.value)}
                                                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                                                            rows={3}
                                                                            placeholder="Nhập ghi chú..."
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}

                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                            </div>
                        );
                    })}
                </div>
            )}
            <button
                type="button"
                onClick={() => {
                    testSubmit();
                }}
             
            >
                test
            </button>
        </div>
    );
};

export default FormalDetermination;
