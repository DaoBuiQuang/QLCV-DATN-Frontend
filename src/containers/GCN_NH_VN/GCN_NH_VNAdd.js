import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import callAPI from "../../utils/api";
import { showSuccess, showError } from "../../components/commom/Notification";
import Select from "react-select";
function GCN_NH_VNAdd() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // State cho form GCN
    const [soBang, setSoBang] = useState("");
    const [soDon, setSoDon] = useState("");
    const [idKhachHang, setIdKhachHang] = useState("");
    const [idDoiTac, setIdDoiTac] = useState("");
    const [maKhachHang, setMaKhachHang] = useState(null);
    const [maDoiTac, setMaDoiTac] = useState(null);
    const [maHoSo, setMaHoSo] = useState("");
    const [ghiChu, setGhiChu] = useState("");
    const [quyetDinhSo, setQuyetDinhSo] = useState("");
    const [maUyQuyen, setMaUyQuyen] = useState("");
    const [anhBang, setAnhBang] = useState(null);

    const [customers, setCustomers] = useState([]);
    const [partners, setPartners] = useState([]);
    const [errors, setErrors] = useState({});
    const isFormValid =
        soBang.trim() !== "" &&
        soDon.trim() !== "" &&
        idKhachHang.trim() !== "" &&
        idDoiTac.trim() !== "";

    // Validate
    const validateField = (field, value) => {
        let error = "";
        if (!value.trim()) {
            if (field === "soBang") error = "Số bằng không được để trống";
            if (field === "soDon") error = "Số đơn không được để trống";
            if (field === "idKhachHang") error = "Khách hàng không được để trống";
            if (field === "idDoiTac") error = "Đối tác không được để trống";
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }));
    };

    // Submit
    const handleAddGCN = async () => {
        try {
            const formData = new FormData();
            formData.append("soBang", soBang);
            formData.append("soDon", soDon);
            formData.append("idKhachHang", idKhachHang);
            formData.append("idDoiTac", idDoiTac);
            formData.append("maHoSo", maHoSo);
            formData.append("ghiChu", ghiChu);
            formData.append("quyetDinhSo", quyetDinhSo);
            formData.append("maUyQuyen", maUyQuyen);
            if (anhBang) formData.append("anhBang", anhBang);

            await callAPI({
                method: "post",
                endpoint: "/gcn/add",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });

            await showSuccess("Thành công!", "Thêm giấy chứng nhận thành công!");
            navigate(-1);
        } catch (error) {
            showError("Thất bại!", "Đã xảy ra lỗi.", error);
            console.error("Lỗi khi thêm giấy chứng nhận!", error);
        }
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
    const formatOptions = (data, idKey, valueKey, labelKey) => {
        return data.map(item => ({
            id: item[idKey],
            value: valueKey ? item[valueKey] : item[idKey],
            label: labelKey ? item[labelKey] : item[idKey]
        }));
    };
    useEffect(() => {
        fetchPartners();
        fetchCustomers();
    }, []);

      const handleMaKhachHangChange = (selectedOption) => {
        if (selectedOption) {
            setMaKhachHang({ id: selectedOption.id, ma: selectedOption.value });
            setIdKhachHang(selectedOption.id);
        } else {
            setMaKhachHang(null);
            setIdKhachHang(null);
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
    return (
        <div className="p-1 bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    📌 Thêm Giấy chứng nhận (Văn bằng)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 text-left">
                            Số bằng <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={soBang}
                            onChange={(e) => {
                                setSoBang(e.target.value);
                                validateField("soBang", e.target.value);
                            }}
                            placeholder="Nhập số bằng"
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                        {errors.soBang && (
                            <p className="text-red-500 text-xs mt-1 text-left">
                                {errors.soBang}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">
                            Số đơn <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={soDon}
                            onChange={(e) => {
                                setSoDon(e.target.value);
                                validateField("soDon", e.target.value);
                            }}
                            placeholder="Nhập số đơn"
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                        {errors.soDon && (
                            <p className="text-red-500 text-xs mt-1 text-left">
                                {errors.soDon}
                            </p>
                        )}
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
                        <label className="block text-gray-700 text-left">
                            ID Đối tác <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={idDoiTac}
                            onChange={(e) => {
                                setIdDoiTac(e.target.value);
                                validateField("idDoiTac", e.target.value);
                            }}
                            placeholder="Nhập ID đối tác"
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                        {errors.idDoiTac && (
                            <p className="text-red-500 text-xs mt-1 text-left">
                                {errors.idDoiTac}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">Mã hồ sơ</label>
                        <input
                            type="text"
                            value={maHoSo}
                            onChange={(e) => setMaHoSo(e.target.value)}
                            placeholder="Nhập mã hồ sơ"
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">Quyết định số</label>
                        <input
                            type="text"
                            value={quyetDinhSo}
                            onChange={(e) => setQuyetDinhSo(e.target.value)}
                            placeholder="Nhập quyết định số"
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">Mã ủy quyền</label>
                        <input
                            type="text"
                            value={maUyQuyen}
                            onChange={(e) => setMaUyQuyen(e.target.value)}
                            placeholder="Nhập mã ủy quyền"
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">Ảnh bằng</label>
                        <input
                            type="file"
                            onChange={(e) => setAnhBang(e.target.files[0])}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-gray-700 text-left">Ghi chú</label>
                        <textarea
                            value={ghiChu}
                            onChange={(e) => setGhiChu(e.target.value)}
                            placeholder="Nhập ghi chú"
                            className="w-full p-2 mt-1 border rounded-lg"
                            rows="3"
                        ></textarea>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
                        onClick={() => navigate(-1)}
                    >
                        Quay lại
                    </button>
                    <button
                        onClick={handleAddGCN}
                        disabled={!isFormValid}
                        className={`px-4 py-2 rounded-lg text-white ${isFormValid
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-blue-300 cursor-not-allowed"
                            }`}
                    >
                        Thêm giấy chứng nhận
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GCN_NH_VNAdd;
