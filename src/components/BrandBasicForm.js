import React from "react";
import Select from "react-select";

function BrandBasicForm({
  maNhanHieuOld,
  setMaNhanHieuOld,
  maNhanHieu,
  setMaNhanHieu,
  tenNhanHieu,
  setTenNhanHieu,
  linkAnh,
  setLinkAnh,
  errors,
  setErrors,
  validateField,
  isEditOnly,
  isViewOnly,
  brands = [],
}) {
  const [imageError, setImageError] = React.useState("");
  const [isReuseExisting, setIsReuseExisting] = React.useState(false);
  const [showSelectExisting, setShowSelectExisting] = React.useState(false);

  const [tenNhanHieuOld, setTenNhanHieuOld] = React.useState("");
  const [linkAnhOld, setLinkAnhOld] = React.useState("");

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

  const formatOptions = (data, valueField, labelField) =>
    data.map(item => ({
      value: item[valueField],
      label: item[labelField]
    }));

  const handleToggleMode = () => {
    const newMode = !showSelectExisting;
    setShowSelectExisting(newMode);
    setIsReuseExisting(false);

    if (newMode) {
      // Chuyển sang dùng lại → clear tạo mới
      setMaNhanHieu("");
      setTenNhanHieu("");
      setLinkAnh("");
      setErrors(prev => {
        const updated = { ...prev };
        delete updated.maNhanHieu;
        delete updated.tenNhanHieu;
        return updated;
      });
    } else {
      // Chuyển sang tạo mới → clear dùng lại
      setMaNhanHieuOld(null);
      setTenNhanHieuOld(null);
      setLinkAnhOld(null);

      // ✅ Xoá lỗi liên quan đến reuse
      setErrors(prev => {
        const updated = { ...prev };
        delete updated.maNhanHieuOld;
        return updated;
      });
    }
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Nút chuyển chế độ */}
      {!isViewOnly && !isEditOnly && (
        <div className="col-span-2">
          <button
            type="button"
            onClick={handleToggleMode}
            className="text-blue-600 underline text-sm"
          >
            {showSelectExisting ? "← Tạo nhãn hiệu mới" : "→ Chọn nhãn hiệu có sẵn?"}
          </button>
        </div>
      )}

      {/* Chọn nhãn hiệu có sẵn */}
      {showSelectExisting && !isViewOnly && !isEditOnly && (
        <div className="col-span-2">
          <label className="block text-gray-700 text-left mb-1">Chọn nhãn hiệu có sẵn <span className="text-red-500">*</span></label>
          <Select
            options={formatOptions(brands, "maNhanHieu", "tenNhanHieu")}
            value={
              maNhanHieuOld
                ? formatOptions(brands, "maNhanHieu", "tenNhanHieu").find(opt => opt.value === maNhanHieuOld)
                : null
            }
            onChange={(selectedOption) => {
              const value = selectedOption?.value || "";
              setMaNhanHieuOld(value);
              setIsReuseExisting(!!value);
              validateField("maNhanHieuOld", value);

              const found = brands.find(b => b.maNhanHieu === value);
              if (found) {
                setTenNhanHieuOld(found.tenNhanHieu);
                setLinkAnhOld(found.linkAnh || "");
              } else {
                setTenNhanHieuOld("");
                setLinkAnhOld("");
              }
            }}
            isClearable
            placeholder="Chọn nhãn hiệu"
            className="w-full mt-1"
          />
          {errors?.maNhanHieuOld && (
            <p className="text-red-500 text-xs mt-1 text-left">{errors.maNhanHieuOld}</p>
          )}

          {linkAnhOld && (
            <div className="mt-2">
              <img
                src={linkAnhOld}
                alt="Ảnh nhãn hiệu"
                className="h-32 object-contain rounded-lg border"
              />
            </div>
          )}
        </div>
      )}

      {/* Mã nhãn hiệu */}
      {!showSelectExisting && (
        <div>
          <label className="block text-gray-700 text-left">
            Mã nhãn hiệu <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={maNhanHieu}
            onChange={(e) => {
              setMaNhanHieu(e.target.value);
              if (!showSelectExisting) {
                validateField("maNhanHieu", e.target.value);
              }
            }}
            disabled={isViewOnly || isEditOnly}
            placeholder="Nhập mã nhãn hiệu"
            className={`w-full p-2 mt-1 border rounded-lg text-input ${isViewOnly || isEditOnly ? 'bg-gray-200' : ''}`}
          />
          {errors?.maNhanHieu && (
            <p className="text-red-500 text-xs mt-1 text-left">{errors.maNhanHieu}</p>
          )}
        </div>
      )}

      {/* Tên nhãn hiệu */}
      {!showSelectExisting && (
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
            <p className="text-red-500 text-xs mt-1 text-left">{errors.tenNhanHieu}</p>
          )}
        </div>
      )}

      {/* Ảnh */}
      <div className="col-span-2">
        {!isViewOnly && !showSelectExisting && (
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
        {!showSelectExisting && linkAnh && (
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
