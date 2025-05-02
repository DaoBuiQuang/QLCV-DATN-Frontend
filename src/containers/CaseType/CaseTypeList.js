import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import callAPI from "../../utils/api";
function CaseTypeList() {
  const [casetypes, setCaseTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [casetypeToDelete, setCaseTypeToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchCaseTypes = async (searchValue) => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/casetype/list",
        data: { search: searchValue },
      });
      setCaseTypes(response);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu loại nghề nghiệp:", error);
    }
  };

  useEffect(() => {
    fetchCaseTypes("");
  }, []);
  const handleDeleteCasetype = async () => {
    try {
      await callAPI({
        method: "post",
        endpoint: "/casetype/delete",
        data: { maLoaiVuViec: casetypeToDelete },
      });
      setShowDeleteModal(false);
      setCaseTypeToDelete(null);
      fetchCaseTypes(searchTerm); 
    } catch (error) {
      console.error("Lỗi khi xóa loại vụ việc:", error);
    }
  };
  return (
    <div className="p-1 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Danh sách loại vụ việc</h2>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Nhập tên ngành nghề"
            className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-3">
            <button
              onClick={() => fetchCaseTypes(searchTerm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              🔎 Tìm kiếm
            </button>
            <button
              onClick={() => navigate("/casetypeadd")}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              ➕ Thêm mới
            </button>
          </div>
        </div>


      </div>
      <table className="w-full border-collapse bg-white text-sm mt-4">
        <thead>
          <tr className="bg-[#EAECF0] text-[#667085] text-center font-normal">
            <th className="p-2 font-normal">STT</th>
            <th className="p-2 font-normal">Mã loại vụ việc</th>
            <th className="p-2 font-normal">Tên loại vụ việc</th>
            <th className="p-2 font-normal">Mô tả</th>
            <th className="p-2 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {casetypes.map((casetype, index) => (
            <tr
              key={casetype.id}
              className="hover:bg-gray-100 text-center border-b"
            >
              <td className="p-2">{index + 1}</td>
              <td
                className="p-2 text-blue-500 cursor-pointer hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/casetypedetail/${casetype.maLoaiVuViec}`);
                }}
              >
                {casetype.maLoaiVuViec}
              </td>
              <td className="p-2">{casetype.tenLoaiVuViec}</td>
              <td className="p-2">{casetype.moTa}</td>
              <td className="p-2">
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    onClick={() => navigate(`/casetypeedit/${casetype.maLoaiVuViec}`)}
                  >
                    📝
                  </button>
                  <button className="px-3 py-1 bg-red-200 text-red-600 rounded-md hover:bg-red-300"
                    onClick={() => {
                      setShowDeleteModal(true);
                      setCaseTypeToDelete(casetype.maLoaiVuViec);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-lg font-semibold mb-4 text-center">Xác nhận xóa</h3>
            <p className="mb-4 text-center">Bạn có chắc chắn muốn xóa loại vụ việc này không?</p>
            <div className="flex justify-between">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Hủy
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleDeleteCasetype}
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CaseTypeList;
