import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";
import { showSuccess, showError } from "../../components/commom/Notification";
function CountryAdd() {
  const navigate = useNavigate();
  const [maQuocGia, setMaQuocGia] = useState("");
  const [tenQuocGia, setTenQuocGia] = useState("");
  const [errors, setErrors] = useState({});
  const isFormValid = maQuocGia.trim() !== "" && tenQuocGia.trim() !== "";
  const validateField = (field, value) => {
    let error = "";
    if (!value.trim()) {
      if (field === "maQuocGia") error = "Mã quốc gia không được để trống";
      if (field === "tenQuocGia") error = "Tên quốc gia không được để trống";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const handleAddCountry = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/country/add",
        data: {
          maQuocGia,
          tenQuocGia,
        },
      });
      await showSuccess("Thành công!", "Thêm quốc gia thành công!");
      setMaQuocGia("");
      setTenQuocGia("");
      setErrors({});
    } catch (error) {
      showError("Thất bại!", "Đã xảy ra lỗi.", error);
      console.error("Lỗi khi thêm quốc gia!", error);
    }
  };

  return (
    <div className="p-1 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Thêm quốc gia mới</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-left">
              Mã quốc gia <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={maQuocGia}
              onChange={(e) => {
                setMaQuocGia(e.target.value);
                validateField("maQuocGia", e.target.value);
              }}
              placeholder="Nhập mã quốc gia"
              className={`w-full p-2 mt-1 border rounded-lg text-input ${errors.maQuocGia ? "border-red-500" : ""}`}
            />

            {errors.maQuocGia && (
              <p className="text-red-500 text-xs mt-1 text-left">{errors.maQuocGia}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-left">
              Tên quốc gia <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={tenQuocGia}
              onChange={(e) => {
                setTenQuocGia(e.target.value);
                validateField("tenQuocGia", e.target.value);
              }}
              placeholder="Nhập tên quốc gia"
              className={`w-full p-2 mt-1 border rounded-lg text-input focus:outline-none focus:border-blue-500 ${errors.tenQuocGia ? "border-red-500" : ""}`}
            />

            {errors.tenQuocGia && (
              <p className="text-red-500 text-xs mt-1 text-left">{errors.tenQuocGia}</p>
            )}
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
            onClick={handleAddCountry}
            disabled={!isFormValid}
            className={`px-4 py-2 rounded-lg text-white ${isFormValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-300 cursor-not-allowed"
              }`}
          >
            Thêm quốc gia
          </button>


        </div>
      </div>
    </div>
  );
}

export default CountryAdd;
