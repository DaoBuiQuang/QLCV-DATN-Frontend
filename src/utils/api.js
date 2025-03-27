import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token"); 
            window.location.href = "/login"; 
        }
        return Promise.reject(error);
    }
);

/**
 * Gọi API linh hoạt
 * @param {string} method - Phương thức HTTP ('get', 'post', 'put', 'delete')
 * @param {string} endpoint - Đường dẫn API (ví dụ: '/users')
 * @param {Object} data - Dữ liệu gửi đi (dành cho post, put)
 * @param {Object} params - Tham số query (dành cho get, delete)
 * @returns {Promise} - Trả về kết quả API
 */
const callAPI = async ({ method = "get", endpoint, data = null, params = null }) => {
    try {
        const response = await api({
            method,
            url: endpoint,
            data,
            params,
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi API:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

export default callAPI;
