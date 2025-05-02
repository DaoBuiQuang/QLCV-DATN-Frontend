import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import callAPI from "../../utils/api";

function ApplicationTypeAdd() {
    const navigate = useNavigate();
    const [maLoaiDon, setMaLoaiDon] = useState("");
    const [tenLoaiDon, setTenLoaiDon] = useState("");
    const [moTa, setMoTa] = useState("");

    const handleAddCaseType = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/applicationtype/add",
                data: {
                    maLoaiDon,
                    tenLoaiDon,
                    moTa,
                },
            });
            alert("Thêm loại đơn đăng kí thành công!");
            setMaLoaiDon("");
            setTenLoaiDon("");
            setMoTa("");
        } catch (error) {
            console.error("Lỗi khi thêm loại đơn!", error);
        }
    };

    return (
        <div className="p-1 bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Thêm loại đơn mới</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 text-left">Mã loại đơn</label>
                        <input
                            type="text"
                            value={maLoaiDon}
                            onChange={(e) => setMaLoaiDon(e.target.value)}
                            placeholder="Nhập mã loại đơn"
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Tên loại đơn</label>
                        <input
                            type="text"
                            value={tenLoaiDon}
                            onChange={(e) => setTenLoaiDon(e.target.value)}
                            placeholder="Nhập tên loại đơn"
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-gray-700 text-left">Mô tả</label>
                        <textarea
                            value={moTa}
                            onChange={(e) => setMoTa(e.target.value)}
                            placeholder="Nhập mô tả loại vụ việc"
                            className="w-full p-2 mt-1 border rounded-lg h-24"
                        ></textarea>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg" onClick={() => navigate(-1)}>
                        Quay lại
                    </button>
                    <button
                        onClick={handleAddCaseType}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Thêm loại đơn
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ApplicationTypeAdd;
