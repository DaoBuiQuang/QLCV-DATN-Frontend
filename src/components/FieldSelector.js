import React from "react";

function FieldSelector({ 
    allFieldOptions, 
    selectedFields, 
    setSelectedFields, 
    onClose, 
    onConfirm 
}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
                    Chọn cột muốn hiển thị
                </h3>
                <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                    {allFieldOptions.map(field => (
                        <label key={field.key} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedFields.includes(field.key)}
                                onChange={() => {
                                    setSelectedFields(prev =>
                                        prev.includes(field.key)
                                            ? prev.filter(f => f !== field.key)
                                            : [...prev, field.key]
                                    );
                                }}
                            />
                            {field.label}
                        </label>
                    ))}
                </div>
                <div className="mt-5 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FieldSelector;
