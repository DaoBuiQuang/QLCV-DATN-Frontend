import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import callAPI from "../../utils/api";
import Select from "react-select";
function CaseEdit() {
    const navigate = useNavigate();
    const { maHoSoVuViec } = useParams();
    const [maKhachHang, setMaKhachHang] = useState("");
    const [maDoiTac, setMaDoiTac] = useState("");
    const [noiDungVuViec, setNoiDungVuViec] = useState("");
    const [ngayTiepNhan, setNgayTiepNhan] = useState(null);
    const [ngayXuLy, setNgayXuLy] = useState(null);
    const [maLoaiVuViec, setMaLoaiVuViec] = useState("");
    const [maLoaiDon, setMaLoaiDon] = useState("")
    const [maQuocGia, setMaQuocGia] = useState("");
    const [trangThaiVuViec, setTrangThaiVuViec] = useState("");
    // const [ngayTao, setNgayTao] = useState("");
    // const [ngayCapNhap, setNgayCapNhap] = useState("");
    const [buocXuLyHienTai, setBuocXuLyHienTai] = useState("");
    const [nhanSuVuViec, setNhanSuVuViec] = useState([]);
    const [nguoiXuLyChinh, setNguoiXuLyChinh] = useState(null);
    const [nguoiXuLyPhu, setNguoiXuLyPhu] = useState(null);

    const [casetypes, setCasetypes] = useState([]);
    const [countries, setCountries] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [partners, setPartners] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [applicationtypes, setApplicationTypes] = useState([]);
    const processSteps = [
        { value: "buoc_1", label: "Bước 1: Tiếp nhận" },
        { value: "buoc_2", label: "Bước 2: Xử lý" },
        { value: "buoc_3", label: "Bước 3: Hoàn tất" }
    ];
    const statusOptions = [
        { value: "dang_xu_ly", label: "Đang xử lý" },
        { value: "hoan_thanh", label: "Hoàn thành" },
        { value: "tam_dung", label: "Tạm dừng" }
    ];


    const formatOptions = (data, valueKey, labelKey) => {
        return data.map(item => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
    };
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString().split("T")[0]; 
    };

    const handleSelectChange = (selectedOption, vaiTro) => {
        setNhanSuVuViec(prevState => {
            const updatedList = prevState.filter(nhanSu => nhanSu.vaiTro !== vaiTro);
            if (selectedOption) {
                updatedList.push({ maNhanSu: selectedOption.value, vaiTro });
            }
            return updatedList;
        });
    };

    const fetchCaseDetail = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/case/detail",
                data: { maHoSoVuViec }
            });

            if (response) {

                setMaKhachHang(response.maKhachHang);
                setMaDoiTac(response.maDoiTac);
                setNoiDungVuViec(response.noiDungVuViec);
                setNgayTiepNhan(formatDate(response.ngayTiepNhan));
                setNgayXuLy(formatDate(response.ngayXuLy));
                setMaLoaiVuViec(response.maLoaiVuViec);
                setMaQuocGia(response.maQuocGiaVuViec);
                setTrangThaiVuViec(response.trangThaiVuViec);
                setBuocXuLyHienTai(response.buocXuLyHienTai);
                const nhanSuChinh = response.nhanSuXuLy.find(item => item.vaiTro === "Chính");
                const nhanSuPhu = response.nhanSuXuLy.find(item => item.vaiTro === "Phụ");

                // Set các giá trị của người xử lý chính và phụ
                setNguoiXuLyChinh(nhanSuChinh ? nhanSuChinh.maNhanSu : null);
                setNguoiXuLyPhu(nhanSuPhu ? nhanSuPhu.maNhanSu : null);

            }
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết hồ sơ vụ việc:", error);
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/country/list",
                data: {},
            });
            setCountries(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu quốc gia:", error);
        }
    };

    const fetchPartners = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/partner/list",
                data: {},
            });
            setPartners(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu quốc gia:", error);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/customers/by-name",
                data: {},
            });
            setCustomers(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu khách hàng", error);
        }
    };
    const fetchCaseTypes = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/casetype/list",
                data: {},
            });
            setCasetypes(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu loại nghề nghiệp:", error);
        }
    };
    const fetchStaffs = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/staff/basiclist",
                data: {},
            });
            setStaffs(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu nhân sự:", error);
        }
    };
    const fetchApplicationTypes = async () => {
        try {
            const response = await callAPI({
                method: "post",
                endpoint: "/applicationtype/all",
                data: {},
            });
            setApplicationTypes(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu loại đơn", error);
        }
    };
    useEffect(() => {
        fetchCaseDetail();
        fetchCountries();
        fetchPartners();
        fetchCustomers();
        fetchCaseTypes();
        fetchStaffs();
        fetchApplicationTypes();
    }, []);

    // Add case
    const handleEditCase = async () => {
        try {
            debugger
            await callAPI({
                method: "put",
                endpoint: "/case/edit",
                data: {
                    maHoSoVuViec,
                    maKhachHang,
                    noiDungVuViec,
                    ngayTiepNhan,
                    ngayXuLy,
                    maLoaiDon,
                    maLoaiVuViec,
                    maQuocGiaVuViec: maQuocGia,
                    trangThaiVuViec,
                    // ngayTao,
                    // ngayCapNhap,
                    buocXuLyHienTai,
                    nhanSuVuViec
                },
            });
            alert("Sửa hồ sơ vụ việc thành công!");
            navigate(-1);
        } catch (error) {
            console.error("Lỗi khi thêm hồ sơ vụ việc!", error);
        }
    };
    const handleApplicationAdd = () => {
        navigate("/applicationadd"); 
    };
    return (
        <div className="p-1 bg-gray-100 flex items-center justify-center">
            {console.log("người xử lí: ", nguoiXuLyChinh)}
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Sửa hồ sơ vụ việc</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 text-left">Mã hồ sơ vụ việc</label>
                        <input
                            type="text"
                            disabled

                            value={maHoSoVuViec}
                            className="w-full p-2 mt-1 border rounded-lg h-10 bg-gray-200"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block text-gray-700 text-left">Tên khách hàng </label>
                        <Select
                            options={formatOptions(customers, "maKhachHang", "tenKhachHang")}
                            value={maKhachHang ? formatOptions(customers, "maKhachHang", "tenKhachHang").find(opt => opt.value === maKhachHang) : null}
                            onChange={selectedOption => setMaKhachHang(selectedOption?.value)}
                            placeholder="Chọn khách hàng"
                            className="w-full mt-1 rounded-lg h-10"
                            isClearable
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">Nội dung vụ việc</label>
                        <input
                            type="text"
                            value={noiDungVuViec}
                            onChange={(e) => setNoiDungVuViec(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">Ngày tiếp nhận</label>
                        <input
                            type="date"
                            value={ngayTiepNhan}
                            onChange={(e) => setNgayTiepNhan(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">Ngày xử lý</label>
                        <input
                            type="date"
                            value={ngayXuLy}
                            onChange={(e) => setNgayXuLy(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">Loại vụ việc</label>
                        <Select
                            options={formatOptions(casetypes, "maLoaiVuViec", "tenLoaiVuViec")}
                            value={maLoaiVuViec ? formatOptions(casetypes, "maLoaiVuViec", "tenLoaiVuViec").find(opt => opt.value === maLoaiVuViec) : null}
                            onChange={selectedOption => setMaLoaiVuViec(selectedOption?.value)}
                            placeholder="Chọn loại vụ việc"
                            className="w-full  mt-1  rounded-lg"
                            isClearable
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 text-left">Loại đơn đăng kí</label>
                        <Select
                            options={formatOptions(applicationtypes, "maLoaiDon", "tenLoaiDon")}
                            value={maLoaiDon ? formatOptions(applicationtypes, "maLoaiDon", "tenLoaiDon").find(opt => opt.value === maLoaiDon) : null}
                            onChange={selectedOption => setMaLoaiDon(selectedOption?.value)}
                            placeholder="Chọn loại đơn đăng kí"
                            className="w-full mt-1 rounded-lg h-10"
                            isClearable
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Quốc gia vụ việc</label>
                        <Select
                            options={formatOptions(countries, "maQuocGia", "tenQuocGia")}
                            value={maQuocGia ? formatOptions(countries, "maQuocGia", "tenQuocGia").find(opt => opt.value === maQuocGia) : null}
                            onChange={selectedOption => setMaQuocGia(selectedOption?.value)}
                            placeholder="Chọn quốc gia"
                            className="w-full  mt-1  rounded-lg"
                            isClearable
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Đối tác</label>
                        <Select
                            options={formatOptions(partners, "maDoiTac", "tenDoiTac")}
                            value={maDoiTac ? formatOptions(partners, "maDoiTac", "tenDoiTac").find(opt => opt.value === maDoiTac) : null}
                            onChange={selectedOption => setMaDoiTac(selectedOption?.value)}
                            placeholder="Chọn đối tác"
                            className="w-full  mt-1  rounded-lg"
                            isClearable
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Trạng thái vụ việc</label>
                        <Select
                            options={formatOptions(statusOptions, "value", "label")}
                            value={trangThaiVuViec ? statusOptions.find(opt => opt.value === trangThaiVuViec) : null}
                            onChange={selectedOption => setTrangThaiVuViec(selectedOption?.value)}
                            placeholder="Chọn trạng thái"
                            className="w-full mt-1 rounded-lg"
                            isClearable
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-left">Bước xử lý hiện tại</label>
                        <Select
                            options={formatOptions(processSteps, "value", "label")}
                            value={buocXuLyHienTai ? processSteps.find(opt => opt.value === buocXuLyHienTai) : null}
                            onChange={selectedOption => setBuocXuLyHienTai(selectedOption?.value)}
                            placeholder="Chọn bước xử lý"
                            className="w-full mt-1 rounded-lg"
                            isClearable
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Người xử lí chính</label>
                        <Select
                            options={formatOptions(staffs, "maNhanSu", "hoTen")}
                            // value={maDoiTac ? formatOptions(partners, "maDoiTac", "tenDoiTac").find(opt => opt.value === maDoiTac) : null}
                            value={formatOptions(staffs, "maNhanSu", "hoTen").find(opt => opt.value === nguoiXuLyChinh)}
                            onChange={(selectedOption) => {
                                setNguoiXuLyChinh(selectedOption);
                                handleSelectChange(selectedOption, "Chính");
                            }}
                            placeholder="Chọn người xử lí chính"
                            className="w-full mt-1 rounded-lg"
                            isClearable
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-left">Người xử lí phụ</label>
                        <Select
                            options={formatOptions(staffs, "maNhanSu", "hoTen")}
                            value={formatOptions(staffs, "maNhanSu", "hoTen").find(opt => opt.value === nguoiXuLyPhu)}
                            onChange={(selectedOption) => {
                                setNguoiXuLyPhu(selectedOption);
                                handleSelectChange(selectedOption, "Phụ");
                            }}
                            placeholder="Chọn người xử lí phụ"
                            className="w-full mt-1 rounded-lg"
                            isClearable
                        />
                    </div>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">Quay lại</button>
                    <button onClick={handleEditCase} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Sửa hồ sơ vụ việc</button>
                    <button onClick={handleApplicationAdd} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                        Tạo đơn đăng kí
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CaseEdit;
