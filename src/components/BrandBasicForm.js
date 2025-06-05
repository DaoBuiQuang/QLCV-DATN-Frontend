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
  isEditOnly,
  isViewOnly,
}) {
  const [imageError, setImageError] = React.useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      setImageError("Ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn 2MB.");
      e.target.value = "";
      return;
    }

    setImageError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setLinkAnh(reader.result);
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
          disabled={isViewOnly || isEditOnly}
          placeholder="Nhập mã nhãn hiệu"
          className={`w-full p-2 mt-1 border rounded-lg text-input ${isViewOnly || isEditOnly ? 'bg-gray-200' : ''}`}
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
          disabled={isViewOnly}
          className={`w-full p-2 mt-1 border rounded-lg text-input ${isViewOnly ? 'bg-gray-200' : ''}`}
        />
        {errors?.tenNhanHieu && (
          <p className="text-red-500 text-xs mt-1 text-left">
            {errors.tenNhanHieu}
          </p>
        )}
      </div>

      {/* Ảnh */}
      <div className="col-span-2">

        {!isViewOnly && (
          <>
            <label className="block text-gray-700 text-left">Chọn ảnh</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </>
        )}
        {imageError && (
          <p className="text-red-500 text-xs mt-1 text-left">{imageError}</p>
        )}

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
