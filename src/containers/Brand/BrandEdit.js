import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import callAPI from "../../utils/api";

function BrandEdit() {
    const navigate = useNavigate();
    const { maNhanHieu } = useParams();

    const [tenNhanHieu, setTenNhanHieu] = useState("");
    const [moTa, setMoTa] = useState("");
    const [linkAnh, setLinkAnh] = useState(""); // ảnh base64
    const [preview, setPreview] = useState(null); // xem trước ảnh

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setLinkAnh(reader.result); // Base64
            setPreview(reader.result); // Xem trước ảnh
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const response = await callAPI({
                    method: "post",
                    endpoint: "/brand/detail",
                    data: { maNhanHieu },
                });
                setTenNhanHieu(response.tenNhanHieu || "");
                setMoTa(response.moTa || "");
                setLinkAnh(response.linkAnh || "");
                setPreview(response.linkAnh || "");
            } catch (error) {
                console.error("Lỗi khi lấy thông tin nhãn hiệu!", error);
            }
        };
        fetchBrand();
    }, [maNhanHieu]);

    const handleEditBrand = async () => {
        try {
            await callAPI({
                method: "put",
                endpoint: "/brand/edit",
                data: {
                    maNhanHieu,
                    tenNhanHieu,
                    moTa,
                    linkAnh, // Gửi ảnh lên server
                },
            });
            alert("Cập nhật nhãn hiệu thành công!");
            navigate(-1);
        } catch (error) {
            console.error("Lỗi khi cập nhật nhãn hiệu!", error);
        }
    };

    return (
        <div className="p-1 bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">✏️ Chỉnh sửa nhãn hiệu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 text-left">Mã nhãn hiệu</label>
                        <input
                            type="text"
                            value={maNhanHieu}
                            readOnly
                            className="w-full p-2 mt-1 border rounded-lg bg-gray-200"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">Tên nhãn hiệu</label>
                        <input
                            type="text"
                            value={tenNhanHieu}
                            onChange={(e) => setTenNhanHieu(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-gray-700 text-left">Mô tả</label>
                        <textarea
                            value={moTa}
                            onChange={(e) => setMoTa(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg h-24"
                        ></textarea>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-gray-700 text-left">Chọn ảnh</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                        {preview && (
                            <div className="mt-2">
                                <img src={preview} alt="Ảnh xem trước" className="h-32 object-contain rounded-lg border" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg" onClick={() => navigate(-1)}>
                        Quay lại
                    </button>
                    <button
                        onClick={handleEditBrand}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BrandEdit;
