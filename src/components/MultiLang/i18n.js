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
                  
                },
            },
        },
    });

export default i18next;
