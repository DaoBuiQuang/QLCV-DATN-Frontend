import React, { useState, useEffect } from "react";
import AddDocumentModal from "../UpdateDocument/AddDocumentModal";

const DocumentSection = ({ initialTaiLieus, onTaiLieuChange, isAddOnly, isViewOnly }) => {
    const [dsTaiLieu, setDsTaiLieu] = useState([]);
    const [modalState, setModalState] = useState({
        isOpen: false,
        fileName: "",
        file: null,
        status: "Đã nộp",
        editingIndex: null
    });

    useEffect(() => {
        let docs = [];
        if (initialTaiLieus?.length) {
            docs = initialTaiLieus;
        } else if (isAddOnly) {
            docs = [
                { tenTaiLieu: "Giấy ủy quyền", linkTaiLieu: "", trangThai: "Chưa nộp" },
                { tenTaiLieu: "Tài liệu bổ sung", linkTaiLieu: "", trangThai: "Chưa nộp" },
            ];
        }
        setDsTaiLieu(docs);
        onTaiLieuChange?.(docs);
    }, [initialTaiLieus, isAddOnly]);


    const updateTaiLieuList = (newList) => {
        setDsTaiLieu(newList);
        onTaiLieuChange?.(newList);
    };

    const handleAfterUpdate = (link) => {
        const { fileName, status, editingIndex } = modalState;
        const newTaiLieu = {
            tenTaiLieu: fileName,
            linkTaiLieu: link,
            trangThai: status,
            maTaiLieu: editingIndex !== null ? dsTaiLieu[editingIndex].maTaiLieu : undefined
        };
        const updatedList = editingIndex !== null
            ? dsTaiLieu.map((tl, i) => i === editingIndex ? newTaiLieu : tl)
            : [...dsTaiLieu, newTaiLieu];

        updateTaiLieuList(updatedList);
        setModalState({ isOpen: false, fileName: "", file: null, status: "Đã nộp", editingIndex: null });
    };

    const handleAddTaiLieu = () => {
        const { file, fileName, editingIndex } = modalState;
        if (!fileName) return;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => handleAfterUpdate(reader.result);
            reader.readAsDataURL(file);
        } else {
            const oldLink = editingIndex !== null ? dsTaiLieu[editingIndex].linkTaiLieu : null;
            handleAfterUpdate(oldLink);
        }
    };

    const handleEdit = (idx) => {
        const { tenTaiLieu, trangThai } = dsTaiLieu[idx];
        setModalState({ isOpen: true, fileName: tenTaiLieu, file: null, status: trangThai, editingIndex: idx });
    };

    const handleDelete = (idx) => {
        if (window.confirm("Bạn có chắc muốn xóa tài liệu này?")) {
            const newList = dsTaiLieu.filter((_, i) => i !== idx);
            updateTaiLieuList(newList);
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Danh sách tài liệu</h3>

            {dsTaiLieu.length === 0 ? (
                <p className="text-sm text-gray-500">Chưa có tài liệu nào.</p>
            ) : (
                <div className="overflow-x-auto mb-2">
                    <table className="min-w-full bg-white borde text-xs overflow-hidden rounded-lg border shadow">
                        <thead>
                            <tr className="">
                                <th className="px-4 py-1 border">Tên tài liệu</th>
                                <th className="px-4 py-1 border">Link tài liệu</th>
                                <th className="px-4 py-1 border">Trạng thái</th>
                                <th className="px-4 py-1 border text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dsTaiLieu.map((tl, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-1 border">{tl.tenTaiLieu}</td>
                                    <td className="px-4 py-1 border">
                                        {tl.linkTaiLieu ? (
                                            <a href={tl.linkTaiLieu} target="_blank" rel="noopener noreferrer" download={tl.tenTaiLieu} className="text-blue-600 hover:underline">
                                                Xem file
                                            </a>
                                        ) : <span className="text-gray-400 italic">Không có</span>}
                                    </td>
                                    <td className="px-4 py-1 border text-center">
                                        <input
                                            type="checkbox"
                                            checked={tl.trangThai === "Đã nộp"}
                                            onChange={() => {
                                                const updatedList = [...dsTaiLieu];
                                                updatedList[idx].trangThai = tl.trangThai === "Đã nộp" ? "Chưa nộp" : "Đã nộp";
                                                updateTaiLieuList(updatedList);
                                            }}
                                            disabled={isViewOnly}
                                        />
                                    </td>

                                    <td className="px-4 py-1 border text-center">
                                        <button onClick={() => handleEdit(idx)} className="text-yellow-600 hover:text-yellow-800 text-xl mr-2" title="Chỉnh sửa" disabled={isViewOnly}>📝</button>
                                        <button onClick={() => handleDelete(idx)} className="text-red-600 hover:text-red-800 text-xl" title="Xóa" disabled={isViewOnly}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {!isViewOnly && (
                <button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-sm rounded" onClick={() => setModalState({ ...modalState, isOpen: true })}>
                    Thêm tài liệu
                </button>
            )}
            <AddDocumentModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                onAdd={handleAddTaiLieu}
                fileName={modalState.fileName}
                setFileName={(val) => setModalState({ ...modalState, fileName: val })}
                file={modalState.file}
                setFile={(val) => setModalState({ ...modalState, file: val })}
                status={modalState.status}
                setStatus={(val) => setModalState({ ...modalState, status: val })}
                editingIndex={modalState.editingIndex}
            />
        </div>
    );
};

export default DocumentSection;
