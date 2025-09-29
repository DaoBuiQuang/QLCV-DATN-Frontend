import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";
import Select from "react-select";

import { showSuccess, showError } from "../../components/commom/Notification";
import { DatePicker } from 'antd';

import dayjs from 'dayjs';
import 'dayjs/locale/vi';

function FormHoSo({
    soDon, setSoDon,
    ngayNopDon, setNgayNopDon,
    maHoSoVuViec, setMaHoSoVuViec,
    idKhachHang, setIdKhachHang,
    maKhachHang, setMaKhachHang,
    idDoiTac, setIdDoiTac,
    maDoiTac, setMaDoiTac,
    clientsRef, setClientsRef,
    ngayTiepNhan, setNgayTiepNhan,
    ngayXuLy, setNgayXuLy,
    trangThaiVuViec, setTrangThaiVuViec,

    ngayDongHS, setNgayDongHS,
    ngayRutHS, setNgayRutHS,
    loaiDon, setLoaiDon,
}) {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [partners, setPartners] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        console.log("id khách hàng", idKhachHang)
    }, [idKhachHang]);
    // ID riêng để gửi API
    // const [idKhachHang, setIdKhachHang] = useState(null);
    // const [idDoiTac, setIdDoiTac] = useState(null);
    const statusOptions = [
        { value: "1", label: "Đang giải quyết" },
        { value: "2", label: "Cấp bằng" },
        { value: "3", label: "Từ chối" },
        { value: "4", label: "Rút đơn" }
    ];
    const isFormValid =
        idKhachHang;


    const validateField = (field, value) => {
        let error = "";
        if (!value || (typeof value === "string" && !value.trim())) {
            if (field === "maKhachHang") error = "Khách hàng không được để trống";
        }
        setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };

    const formatOptions = (data, idKey, valueKey, labelKey) => {
        return data.map(item => ({
            id: item[idKey],
            value: valueKey ? item[valueKey] : item[idKey],
            label: labelKey ? item[labelKey] : item[idKey]
        }));
    };

    const fetchPartners = async () => {
        try {
            const response = await callAPI({ method: "post", endpoint: "/partner/all", data: {} });
            setPartners(response);
        } catch (error) { console.error(error); }
    };

    const fetchCustomers = async () => {
        try {
            const response = await callAPI({ method: "post", endpoint: "/customers/by-name", data: {} });
            setCustomers(response);
        } catch (error) { console.error(error); }
    };

    const fetchStaffs = async () => {
        try {
            const response = await callAPI({ method: "post", endpoint: "/staff/basiclist", data: {} });
            setStaffs(response);
        } catch (error) { console.error(error); }
    };

    useEffect(() => {
        fetchPartners();
        fetchCustomers();
        fetchStaffs();
    }, []);

    // Select handlers
    const handleMaKhachHangChange = async (selectedOption) => {
        if (selectedOption) {
            setMaKhachHang({ id: selectedOption.id, ma: selectedOption.value });
            setIdKhachHang(selectedOption.id);
            validateField("maKhachHang", selectedOption.value);

            try {
                const response = await callAPI({
                    method: "post",
                    endpoint: "/case/generate-code-case",
                    data: { maKhachHang: selectedOption.value }
                });
                setMaHoSoVuViec(response.maHoSoVuViec);
            } catch (error) { console.error(error); }
        } else {
            setMaKhachHang(null);
            setIdKhachHang(null);
            setMaHoSoVuViec("");
            validateField("maKhachHang", "");
        }
    };

    const handleMaDoiTacChange = (selectedOption) => {
        if (selectedOption) {
            setMaDoiTac({ id: selectedOption.id, ma: selectedOption.value });
            setIdDoiTac(selectedOption.id);
        } else {
            setMaDoiTac(null);
            setIdDoiTac(null);
        }
    };
    const loaiDonOptions = [
        { value: 1, label: "Đơn gốc" },
        { value: 2, label: "Đơn sửa đổi" },
        { value: 3, label: "Đơn tách" },
        { value: 4, label: "Đơn chuyển nhượng" }
    ];
    // Thêm hồ sơ

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">

                <div className="flex-1">
                    <label className="block text-gray-700 text-left">Mã hồ sơ <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={maHoSoVuViec}
                        onChange={(e) => { setMaHoSoVuViec(e.target.value); validateField("maHoSoVuViec", e.target.value); }}
                        className="w-full p-2 mt-1 border rounded-lg text-input h-10"
                        placeholder="Chọn khách hàng để ra mã hồ sơ"
                    />
                    {errors.maHoSoVuViec && <p className="text-red-500 text-xs mt-1 text-left">{errors.maHoSoVuViec}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 text-left">Loại đơn <span className="text-red-500">*</span></label>
                    <Select
                        options={loaiDonOptions}
                        value={loaiDon ? loaiDonOptions.find(opt => opt.value === loaiDon) : null}
                        onChange={selectedOption => setLoaiDon(selectedOption?.value)}
                        placeholder="Chọn loại đơn"
                        className="w-full mt-1 rounded-lg text-left"
                        isClearable
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left">Client's Ref</label>
                    <input
                        type="text"
                        value={clientsRef}
                        onChange={(e) => {
                            setClientsRef(e.target.value)
                            validateField("clientsRef", e.target.value)
                        }}
                        placeholder="Nhập Client's Ref"
                        className="w-full p-2 mt-1 border rounded-lg text-input"
                    />
                    {/* {errors.noiDungVuViec && (
                        <p className="text-red-500 text-xs mt-1 text-left">{errors.noiDungVuViec}</p>
                    )} */}
                </div>
                {/* <div >
                    <label className="block text-gray-700 text-left ">Client's Ref</label>
                    <input
                        type="text"
                        value={soDon}
                        placeholder="Nhập số đơn"
                        onChange={(e) => setSoDon(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg text-input h-10"
                    />
                </div> */}
                <div >
                    <label className="block text-gray-700 text-left ">Số đơn</label>
                    <input
                        type="text"
                        value={soDon}
                        placeholder="Nhập số đơn"
                        onChange={(e) => setSoDon(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-lg text-input h-10"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-gray-700 text-left">Khách hàng <span className="text-red-500">*</span></label>
                    <Select
                        options={formatOptions(customers, "id", "maKhachHang", "tenKhachHang")}
                        value={idKhachHang ? formatOptions(customers, "id", "maKhachHang", "tenKhachHang").find(opt => opt.id === idKhachHang) : null}
                        onChange={handleMaKhachHangChange}
                        placeholder="Chọn khách hàng"
                        className="w-full mt-1 rounded-lg h-10 text-left"
                        isClearable
                    />
                    {errors.maKhachHang && <p className="text-red-500 text-xs mt-1 text-left">{errors.idKhachHang}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 text-left">Ngày nộp đơn</label>
                    <DatePicker
                        value={ngayNopDon ? dayjs(ngayNopDon) : null}
                        onChange={(date) => {
                            if (dayjs.isDayjs(date) && date.isValid()) {
                                setNgayNopDon(date.format("YYYY-MM-DD"));
                            } else {
                                setNgayNopDon(null);
                            }
                        }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày nộp đơn"
                        className="mt-1 w-full"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-left">Đối tác</label>
                    <Select
                        options={formatOptions(partners, "id", "maDoiTac", "tenDoiTac")}
                        value={idDoiTac ? formatOptions(partners, "id", "maDoiTac", "tenDoiTac").find(opt => opt.id === idDoiTac) : null}
                        onChange={handleMaDoiTacChange}
                        placeholder="Chọn đối tác"
                        className="w-full mt-1 rounded-lg text-left"
                        isClearable
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left">Ngày tiếp nhận</label>
                    <DatePicker
                        value={ngayTiepNhan ? dayjs(ngayTiepNhan) : null}
                        onChange={(date) => {
                            if (dayjs.isDayjs(date) && date.isValid()) {
                                setNgayTiepNhan(date.format("YYYY-MM-DD"));

                            } else {
                                setNgayTiepNhan(null);
                            }
                        }}

                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày tiếp nhận"
                        className=" mt-1 w-full"
                        disabledDate={(current) => {
                            return current && current > dayjs().endOf("day");
                        }}
                    />
                </div>
                {/* <div>
                    <label className="block text-gray-700 text-left">Ngày xử lý </label>
                    <DatePicker
                        value={ngayXuLy ? dayjs(ngayXuLy) : null}
                        onChange={(date) => {
                            if (dayjs.isDayjs(date) && date.isValid()) {
                                setNgayXuLy(date.format("YYYY-MM-DD"));
                            } else {
                                setNgayXuLy(null);
                            }
                        }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày xử lý"
                        className="mt-1 w-full"
                        style={{ height: "38px" }}
                        disabledDate={(current) => {
                            return current && current > dayjs().endOf("day");
                        }}
                    />
                </div> */}
                {/* <div>
                    <label className="block text-gray-700 text-left">Người xử lí chính</label>
                    <Select
                        options={formatOptions(staffs, "", "maNhanSu", "hoTen").filter(
                            (opt) => opt.value !== nguoiXuLyPhu
                        )}
                        value={formatOptions(staffs, "", "maNhanSu", "hoTen").find(
                            (opt) => opt.value === nguoiXuLyChinh
                        )}
                        onChange={(selectedOption) => setNguoiXuLyChinh(selectedOption?.value || null)}
                        placeholder="Chọn người xử lí chính"
                        className="w-full mt-1 rounded-lg text-left"
                        isClearable
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-left">Người xử lí phụ</label>
                    <Select
                        options={formatOptions(staffs, "", "maNhanSu", "hoTen").filter(
                            (opt) => opt.value !== nguoiXuLyChinh
                        )}
                        value={formatOptions(staffs, "", "maNhanSu", "hoTen").find(
                            (opt) => opt.value === nguoiXuLyPhu
                        )}
                        onChange={(selectedOption) => setNguoiXuLyPhu(selectedOption?.value || null)}
                        placeholder="Chọn người xử lí phụ"
                        className="w-full mt-1 rounded-lg text-left"
                        isClearable
                    />
                </div> */}
                <div>
                    <label className="block text-gray-700 text-left">Trạng thái hồ sơ <span className="text-red-500">*</span> </label>
                    <Select
                        options={formatOptions(statusOptions, "", "value", "label")}
                        value={trangThaiVuViec ? statusOptions.find(opt => opt.value === trangThaiVuViec) : null}
                        onChange={selectedOption => setTrangThaiVuViec(selectedOption?.value)}
                        placeholder="Chọn trạng thái"
                        className="w-full mt-1 rounded-lg text-left"
                        isClearable
                    />
                </div>
                {trangThaiVuViec === "dong" && (
                    <div>
                        <label className="block text-gray-700 text-left">Ngày đóng hồ sơ</label>
                        <DatePicker
                            value={ngayDongHS ? dayjs(ngayDongHS) : null}
                            onChange={(date) => {
                                if (dayjs.isDayjs(date) && date.isValid()) {
                                    setNgayDongHS(date.format("YYYY-MM-DD"));
                                } else {
                                    setNgayDongHS(null);
                                }
                            }}
                            format="DD/MM/YYYY"
                            placeholder="Chọn ngày đóng hồ sơ"
                            className="mt-1 w-full"
                            style={{ height: "38px" }}
                        />
                    </div>
                )}

                {trangThaiVuViec === "rut_don" && (
                    <div>
                        <label className="block text-gray-700 text-left">Ngày rút hồ sơ</label>
                        <DatePicker
                            value={ngayRutHS ? dayjs(ngayRutHS) : null}
                            onChange={(date) => {
                                if (dayjs.isDayjs(date) && date.isValid()) {
                                    setNgayRutHS(date.format("YYYY-MM-DD"));
                                } else {
                                    setNgayRutHS(null);
                                }
                            }}
                            format="DD/MM/YYYY"
                            placeholder="Chọn ngày rút hồ sơ"
                            className="mt-1 w-full"
                            style={{ height: "38px" }}
                        />
                    </div>
                )}

                {/* Các trường khác giữ nguyên (ngày tiếp nhận, ngày xử lý, người xử lý, trạng thái, ...) */}
            </div>

            {/* <div className="flex justify-center gap-4 mt-4">
                <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">Quay lại</button>
                <button onClick={handleAddCase} disabled={!isFormValid}
                    className={`px-4 py-2 rounded-lg text-white ${isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"}`}>
                    Thêm hồ sơ vụ việc
                </button>
            </div> */}
        </div>
    );
}

export default FormHoSo;
