import React, { useState, useEffect } from "react";
import AddDocumentModal from "./TrademarkRegistrationProcess/AddDocumentModal";

const DocumentSection = ({ initialTaiLieus, onTaiLieuChange }) => {
    const [dsTaiLieu, setDsTaiLieu] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("Đã tải lên");
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        setDsTaiLieu(initialTaiLieus || []);
    }, [initialTaiLieus]);
    const updateTaiLieuList = (newList) => {
        setDsTaiLieu(newList);
        onTaiLieuChange && onTaiLieuChange(newList);
    };

    const handleAddTaiLieu = () => {
        if (!fileName) return;
    
        const handleAfterUpdate = (linkTaiLieu) => {
            const newTaiLieu = {
                tenTaiLieu: fileName,
                linkTaiLieu: linkTaiLieu,
                trangThai: status,
                maTaiLieu: editingIndex !== null ? dsTaiLieu[editingIndex].maTaiLieu : undefined, // Thêm maTaiLieu nếu đang chỉnh sửa
            };
    
            let newList;
            if (editingIndex !== null) {
                newList = [...dsTaiLieu];
                newList[editingIndex] = newTaiLieu;
            } else {
                newList = [...dsTaiLieu, newTaiLieu];
            }
    
            updateTaiLieuList(newList);
            setFileName("");
            setFile(null);
            setStatus("Đã tải lên");
            setEditingIndex(null);
            setIsModalOpen(false);
        };
    
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => handleAfterUpdate(reader.result);
            reader.readAsDataURL(file);
        } else {
            // Giữ nguyên link cũ nếu đang sửa mà không thay đổi file
            const oldLink = editingIndex !== null ? dsTaiLieu[editingIndex].linkTaiLieu : null;
            handleAfterUpdate(oldLink);
        }
    };
    
    

    const handleEdit = (index) => {
        const taiLieu = dsTaiLieu[index];
        setFileName(taiLieu.tenTaiLieu);
        setStatus(taiLieu.trangThai);
        setFile(null); 
        setEditingIndex(index);
        setIsModalOpen(true);
    };
    

    const handleDelete = (index) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa tài liệu này?");
        if (confirmDelete) {
            const newList = [...dsTaiLieu];
            newList.splice(index, 1);
            updateTaiLieuList(newList); 
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
                                    <td className="px-4 py-2 border">{tl.tenTaiLieu}</td>
                                    <td className="px-4 py-2 border">
                                        {tl.linkTaiLieu ? (
                                            <a
                                                href={tl.linkTaiLieu}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download={tl.tenTaiLieu} // tên file khi tải về
                                                className="text-blue-600 hover:underline"
                                            >
                                                Xem file
                                            </a>


                                        ) : (
                                            <span className="text-gray-400 italic">Không có</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border text-green-600 font-medium">
                                        {tl.trangThai}
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
                editingIndex={editingIndex}
            />
        </div>
    );
};

export default DocumentSection;
