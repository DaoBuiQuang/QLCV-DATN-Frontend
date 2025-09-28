import React, { useState, useEffect, use } from "react";
import AddDocumentModal from "../UpdateDocument/AddDocumentModal";
import callAPI from "../../utils/api";
import Select from "react-select";
const DocumentSection = ({ initialTaiLieus, onTaiLieuChange, isAddOnly, isViewOnly, maHoSoVuViec, giayUyQuyenGoc, setGiayUyQuyenGoc, maUyQuyen, setMaUyQuyen }) => {
    const [dsTaiLieu, setDsTaiLieu] = useState([]);
    const [soDons, setSoDons] = useState([]);
    const [modalState, setModalState] = useState({
        isOpen: false,
        fileName: "",
        file: null,
        status: "Đã nộp",
        editingIndex: null
    });
    // useEffect(() => {
    //     fetchSoDonByGiayUyQuyen();
    // }, []);
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

        // So sánh mảng hiện tại để tránh set lại gây loop
        const isSame =
            JSON.stringify(docs) === JSON.stringify(dsTaiLieu);

        if (!isSame) {
            setDsTaiLieu(docs);
            onTaiLieuChange?.(docs);
        }
    }, [initialTaiLieus, isAddOnly]);
    // const fetchSoDonByGiayUyQuyen = async () => {
    //     try {
    //         // Bước 1: Gọi API để lấy maKhachHang từ maHoSoVuViec
    //         const khachHangRes = await callAPI({
    //             method: "post",
    //             endpoint: "/application/getMaKhachHangByMaHoSoVuViec",
    //             data: { maHoSoVuViec }
    //         });

    //         const maKhachHang = khachHangRes?.maKhachHang;

    //         if (!maKhachHang) {
    //             console.warn("Không tìm thấy mã khách hàng từ mã hồ sơ vụ việc.");
    //             setSoDons([]); // clear nếu không có
    //             return;
    //         }

    //         // Bước 2: Gọi API để lấy danh sách số đơn có giấy ủy quyền gốc theo maKhachHang
    //         const soDonRes = await callAPI({
    //             method: "post",
    //             endpoint: "/application/getApplicationByGiayUyQuyenGoc",
    //             data: { maKhachHang }
    //         });

    //         setSoDons(soDonRes); // giả sử trả về mảng các đơn
    //     } catch (error) {
    //         console.error("Lỗi khi lấy số đơn theo giấy ủy quyền gốc:", error);
    //     }
    // };



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
    const formatOptions = (data, valueKey, labelKey) => {
        return data.map(item => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
    };

    return (
        <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Danh sách tài liệu</h3>
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">

                <div className="w-full md:w-1/2 flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={giayUyQuyenGoc}
                        onChange={(e) => {
                            setGiayUyQuyenGoc(e.target.checked);
                            if (e.target.checked) {
                                setMaUyQuyen(null); // reset nếu chọn lại là gốc
                            }
                        }}
                    />
                    <label className="text-sm font-medium">
                        Đây là giấy ủy quyền gốc
                    </label>
                </div>
                {!giayUyQuyenGoc && (
                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-700 text-left">
                            Nhập số đơn có giấy ủy quyền gốc
                        </label>
                        <input
                            type="text"
                            value={maUyQuyen || ""}
                            onChange={e => setMaUyQuyen(e.target.value)}
                            placeholder="Nhập số đơn"
                            className="w-full mt-1 rounded-lg text-left border p-2"
                        />
                    </div>
                )}

            </div>

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
                                            <button
                                                onClick={() => {
                                                    const link = document.createElement("a");
                                                    link.href = tl.linkTaiLieu; // chuỗi base64
                                                    link.download = tl.tenTaiLieu || "tai_lieu.docx";
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                }}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Tải tài liệu
                                            </button>


                                        ) : <span className="text-gray-400 italic">Không có</span>}
                                    </td>
                                    <td className="px-4 py-1 border text-center">
                                        <div className="flex justify-center gap-2">
                                            <label className="flex items-center gap-1">
                                                <input
                                                    type="radio"
                                                    name={`trangThai-${idx}`}
                                                    value="Đã nộp"
                                                    checked={tl.trangThai === "Đã nộp"}
                                                    onChange={() => {
                                                        const updatedList = [...dsTaiLieu];
                                                        updatedList[idx].trangThai = "Đã nộp";
                                                        updateTaiLieuList(updatedList);
                                                    }}
                                                    disabled={isViewOnly}
                                                />
                                                Đã nộp
                                            </label>

                                            <label className="flex items-center gap-1">
                                                <input
                                                    type="radio"
                                                    name={`trangThai-${idx}`}
                                                    value="Chưa nộp"
                                                    checked={tl.trangThai === "Chưa nộp"}
                                                    onChange={() => {
                                                        const updatedList = [...dsTaiLieu];
                                                        updatedList[idx].trangThai = "Chưa nộp";
                                                        updateTaiLieuList(updatedList);
                                                    }}
                                                    disabled={isViewOnly}
                                                />
                                                Chưa nộp
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-4 py-1 border text-center">
                                        <button
                                            onClick={() => handleEdit(idx)}
                                            className="text-yellow-600 hover:text-yellow-800 font-medium mr-3"
                                            title="Chỉnh sửa"
                                            disabled={isViewOnly}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(idx)}
                                            className="text-red-600 hover:text-red-800 font-medium"
                                            title="Xóa"
                                            disabled={isViewOnly}
                                        >
                                            Xóa
                                        </button>
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
