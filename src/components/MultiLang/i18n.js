import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
const storedLang = localStorage.getItem("language") || "en";
i18next
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        lng: storedLang,
        resources: {
            en: {
                translation: {
                    greeting: "hello, Welcome!",
                    tellerPortal: "Teller Portal",
                    english: "English",
                    logoutTitle: "Logout",
                    vietnam: "Vietnameese",
                    confirmLogout: "Confirm Logout",
                    logout: "Logout",
                    cancel: "Cancel",
                      khachHang: "Customer",
                    hoSoVuViec: "Case File",
                    donDangKy: "Application",
                    nganhNghe: "Industry",
                    doiTac: "Instructing Firm",
                    quocGia: "Country",
                    loaiVuViec: "Case Type",
                    loaiDonDangKy: "Application Type",
                    nhanHieu: "Trademark",
                    sanPhamDichVu: "Products and Services",
                    nhanSu: "Personnel",
                    caiDat: "Settings",
                    doiMatKhau: "Change Password",
                    thongTinTaiKhoan: "Account Information",
                    dashboard: "Dashboard"
                },
            },
            vi: {
                translation: {
                    greeting: "Xin chào, Chào mừng!",
                    tellerPortal: "Cổng giao dịch viên",
                    english: "Tiếng Anh",
                    vietnam: "Tiếng Việt",
                    confirmLogout: "Xác nhận đăng xuất",
                    logoutTitle: "Đăng xuất",
                    logout: "Đăng xuất",
                    cancel: "Hủy",
                    khachHang: "Khách hàng",
                    hoSoVuViec: "Hồ sơ vụ việc",
                    donDangKy: "Đơn đăng ký",
                    nganhNghe: "Ngành nghề",
                    doiTac: "Đối tác",
                    quocGia: "Quốc gia",
                    loaiVuViec: "Loại vụ việc",
                    loaiDonDangKy: "Loại đơn đăng ký",
                    nhanHieu: "Nhãn hiệu",
                    sanPhamDichVu: "Sản phẩm và dịch vụ",
                    nhanSu: "Nhân sự",
                    caiDat: "Cài đặt",
                    doiMatKhau: "Đổi mật khẩu",
                    thongTinTaiKhoan: "Thông tin tài khoản",
                    dashboard: "Thống kê"
                },
            },
        },
    });

export default i18next;
