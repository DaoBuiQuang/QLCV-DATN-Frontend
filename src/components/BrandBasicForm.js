import React from "react";

function BrandBasicForm({
  maNhanHieu,
  setMaNhanHieu,
  tenNhanHieu,
  setTenNhanHieu,
  linkAnh,
  setLinkAnh,
  errors,
  validateField,
}) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLinkAnh(reader.result); // Base64 và preview
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Mã nhãn hiệu */}
      <div>
        <label className="block text-gray-700 text-left">
          Mã nhãn hiệu <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={maNhanHieu}
          onChange={(e) => {
            setMaNhanHieu(e.target.value);
            validateField("maNhanHieu", e.target.value);
          }}
          placeholder="Nhập mã nhãn hiệu"
          className="w-full p-2 mt-1 border rounded-lg text-input"
        />
        {errors?.maNhanHieu && (
          <p className="text-red-500 text-xs mt-1 text-left">
            {errors.maNhanHieu}
          </p>
        )}
      </div>

      {/* Tên nhãn hiệu */}
      <div>
        <label className="block text-gray-700 text-left">
          Tên nhãn hiệu <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={tenNhanHieu}
          onChange={(e) => {
            setTenNhanHieu(e.target.value);
            validateField("tenNhanHieu", e.target.value);
          }}
          placeholder="Nhập tên nhãn hiệu"
          className="w-full p-2 mt-1 border rounded-lg text-input"
        />
        {errors?.tenNhanHieu && (
          <p className="text-red-500 text-xs mt-1 text-left">
            {errors.tenNhanHieu}
          </p>
        )}
      </div>

      {/* Ảnh */}
      <div className="col-span-2">
        <label className="block text-gray-700 text-left">Chọn ảnh</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 mt-1 border rounded-lg"
        />
        {linkAnh && (
          <div className="mt-2">
            <img
              src={linkAnh}
              alt="Ảnh xem trước"
              className="h-32 object-contain rounded-lg border"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BrandBasicForm;
