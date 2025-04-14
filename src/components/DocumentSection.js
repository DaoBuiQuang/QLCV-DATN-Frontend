import React, { useState } from "react";
import AddDocumentModal from "./AddDocumentModal";

const DocumentSection = ({ onTaiLieuChange }) => {
    const [dsTaiLieu, setDsTaiLieu] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("Đã tải lên");

    const updateTaiLieuList = (newList) => {
        setDsTaiLieu(newList);
        if (onTaiLieuChange) {
            onTaiLieuChange(newList); 
        }
    };

    const handleAddTaiLieu = () => {
        if (!fileName) return;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;

                const newList = [...dsTaiLieu, {
                    tenTaiLieu: fileName,
                    linkTaiLieu: base64String,
                    trangThai: status
                }];
                updateTaiLieuList(newList); 

                // Reset modal
                setFileName("");
                setFile(null);
                setStatus("Đã tải lên");
                setIsModalOpen(false);
            };
            reader.readAsDataURL(file);
        } else {
            const newList = [...dsTaiLieu, {
                tenTaiLieu: fileName,
                linkTaiLieu: null,
                trangThai: status
            }];
            updateTaiLieuList(newList); 

            // Reset modal
            setFileName("");
            setFile(null);
            setStatus("Đã tải lên");
            setIsModalOpen(false);
        }
    };

    const handleEdit = (index) => {
        alert("Chỉnh sửa chưa được cài đặt");
    };

    const handleDelete = (index) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa tài liệu này?");
        if (confirmDelete) {
            const newList = [...dsTaiLieu];
            newList.splice(index, 1);
            updateTaiLieuList(newList); // ✅ gọi hàm chung
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">📁 Danh sách tài liệu</h3>

            {dsTaiLieu.length === 0 ? (
                <p className="text-gray-500">Chưa có tài liệu nào.</p>
            ) : (
                <div className="overflow-x-auto mb-4">
                    <table className="min-w-full bg-white border border-gray-200 text-sm">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-4 py-2 border">Tên tài liệu</th>
                                <th className="px-4 py-2 border">Link tài liệu</th>
                                <th className="px-4 py-2 border">Trạng thái</th>
                                <th className="px-4 py-2 border text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dsTaiLieu.map((tl, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border">{tl.ten}</td>
                                    <td className="px-4 py-2 border">
                                        {tl.file ? (
                                            <a
                                                href={tl.file}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Xem file
                                            </a>

                                        ) : (
                                            <span className="text-gray-400 italic">Không có</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border text-green-600 font-medium">
                                        {tl.status}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        <button
                                            onClick={() => handleEdit(idx)}
                                            className="text-yellow-600 hover:text-yellow-800 text-xl mr-2"
                                            title="Chỉnh sửa"
                                        >
                                            📝
                                        </button>
                                        <button
                                            onClick={() => handleDelete(idx)}
                                            className="text-red-600 hover:text-red-800 text-xl"
                                            title="Xóa"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                onClick={() => setIsModalOpen(true)}
            >
                ➕ Thêm tài liệu
            </button>

            <AddDocumentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddTaiLieu}
                fileName={fileName}
                setFileName={setFileName}
                file={file}
                setFile={setFile}
                status={status}
                setStatus={setStatus}
            />
        </div>
    );
};

export default DocumentSection;
