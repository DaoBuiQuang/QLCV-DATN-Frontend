import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Modal, Radio, Button } from "antd";
import callAPI from "../../utils/api.js";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import CaseSelectModal from "../../components/commom/CaseSelectModal.js";
import { showSuccess, showError } from "../../components/commom/Notification";
function DebitNoteAdd() {
  const navigate = useNavigate();

  const location = useLocation();
  const { idDoiTac, idKhachHang, caseId, maHoSo, maQuocGia } = location.state || {};

  const [partner, setPartner] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [selectedCases, setSelectedCases] = useState([]);
  const [caseOptions, setCaseOptions] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState(null);
  const contactInfo = partner || customer;

  const [deBitNoteNo, setDeBitNoteNo] = useState(""); // debit note number
  const [matterName, setMatterName] = useState(""); // matter name
  const [ngayGui, setNgayGui] = useState(null);
  const [ngayThanhToan, setNgayThanhToan] = useState(null);
  const [ngayGuiHoaDon, setNgayGuiHoaDon] = useState(null);
  const [ngayXuat, setNgayXuat] = useState(null);
  const [ghiChu, setGhiChu] = useState("");

  const tableRef = useRef(null); // để scroll xuống bảng

  // ===== API helpers =====
  const fetchPartner = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/partner/detail",
        data: { id: idDoiTac },
      });
      setPartner(response);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin đối tác:", error);
    }
  };

  const fetchCustomer = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/customer/detail",
        data: { id: idKhachHang },
      });
      setCustomer(response);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin khách hàng:", error);
    }
  };

  // ✅ API lấy danh sách vụ việc theo hồ sơ để đổ vào Modal (không đụng đến selectedCases)
  const fetchCaseOptions = async () => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/case/getCaseByHoSo",
        data: { maHoSo: maHoSo },
      });
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Lỗi khi lấy danh sách vụ việc:", error);
      return [];
    }
  };

  // ✅ Lấy chi tiết vụ việc theo id (để thêm vào selectedCases)
  const fetchCaseDetail = async (cId) => {
    try {
      const response = await callAPI({
        method: "post",
        endpoint: "/case/detail",
        data: { id: cId }, // <— sửa lỗi: dùng cId truyền vào
      });
      return response;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin vụ việc:", error);
      return null;
    }
  };

  // ===== Effects =====
  useEffect(() => {
    if (idDoiTac) {
      fetchPartner();
    } else if (idKhachHang) {
      fetchCustomer();
    }

    // Nếu có caseId truyền vào, tự prefill 1 vụ việc ban đầu
    (async () => {
      if (caseId) {
        const firstCase = await fetchCaseDetail(caseId);
        if (firstCase) {
          setSelectedCases([firstCase]);
        }
      }
    })();
  }, [idDoiTac, idKhachHang, maHoSo, caseId]);

  // ===== Handlers =====
  const handleAddCaseClick = async () => {
    // Lấy tất cả case theo hồ sơ
    const allCases = await fetchCaseOptions();
    // Lọc bỏ những case đã nằm trong selectedCases
    const existingIds = new Set(selectedCases.map((c) => c.id));
    const options = allCases.filter((c) => !existingIds.has(c.id));
    setCaseOptions(options);
    setSelectedCaseId(null);
    setIsModalVisible(true);
  };

  const handleConfirmAddCase = async () => {
    if (!selectedCaseId) return;

    // Có thể dùng luôn bản trong options để đỡ call detail,
    // nhưng để chắc chắn dữ liệu mới nhất, mình vẫn gọi detail:
    const newCase = await fetchCaseDetail(selectedCaseId);
    if (!newCase) return;

    // Tránh trùng
    if (!selectedCases.some((c) => c.id === newCase.id)) {
      setSelectedCases((prev) => [...prev, newCase]);
      // Loại case vừa chọn khỏi caseOptions
      setCaseOptions((prev) => prev.filter((c) => c.id !== newCase.id));

      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }

    setSelectedCaseId(null);
    setIsModalVisible(false);
  };

  const handleRemoveCase = (id) => {
    // Khi xóa khỏi selectedCases, có thể đẩy lại vào caseOptions để có thể thêm lại sau
    const removed = selectedCases.find((c) => c.id === id);
    setSelectedCases((prev) => prev.filter((c) => c.id !== id));
    if (removed) {
      setCaseOptions((prev) => {
        // Tránh duplicate trong options
        if (prev.some((c) => c.id === removed.id)) return prev;
        return [...prev, removed];
      });
    }
  };

  const confirmDelete = () => {
    if (caseToDelete) {
      handleRemoveCase(caseToDelete);
      setCaseToDelete(null);
      setShowDeleteModal(false);
    }
  };

  // Tính tiền theo selectedCases
  const subtotal = selectedCases.reduce((sum, c) => sum + parseFloat(c.soTien || 0), 0);
  const vat = subtotal * 0.05;
  const total = subtotal + vat;

  // Lưu đề nghị thanh toán
  const saveDebitNote = async () => {
    try {
      const payload = {
        deBitNoteNo,
        idDoiTac: idDoiTac || null,
        idKhachHang: idKhachHang || null,
        maHoSo,
        matterName,
        maQuocGia,
        yourRef: selectedCases[0]?.clientsRef || "",
        contactInfo: {
          id: contactInfo?.id || null,
          nguoiLienHe: contactInfo?.nguoiLienHe || "",
          ten: contactInfo?.tenDoiTac || contactInfo?.tenKhachHang || "",
          diaChi: contactInfo?.diaChi || "",
          email: contactInfo?.email || "",
        },
        cases: selectedCases.map((c) => ({
          id: c.id,
          tenVuViec: c.tenVuViec,
          moTa: c.moTa,
          soTien: c.soTien,
          clientsRef: c.clientsRef || "",
        })),
        subtotal,
        vat,
        total,
        ngayGui,
        ngayThanhToan,
        ngayGuiHoaDon,
        ngayXuat,
        ghiChu,
      };

      const response = await callAPI({
        method: "post",
        endpoint: "/denghithanhtoan/add",
        data: payload,
      });

      console.log("Đã lưu đề nghị thanh toán:", response);
      await showSuccess("Thành công!", "Thêm đề nghị thanh toán thành công!");
      navigate(-1); // quay về trang trước
      // navigate("/debitnote/list");
    } catch (error) {
      console.error("Lỗi khi lưu đề nghị thanh toán:", error);
      showError("Thất bại!", "Đã xảy ra lỗi.", error);
    } finally {
     
    }
  };

  const handleSave = () => saveDebitNote();

  return (
    <div className="p-6 bg-gray-100 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl border border-gray-300">
        {/* Header và thông tin khách hàng */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <img
            src="https://ipac.vn/image/catalog/logo/rsz_1logo.jpg"
            alt="IPAC Logo"
            className="h-16"
          />
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-teal-700 uppercase">
              ĐỀ NGHỊ THANH TOÁN (DEBIT NOTE)
            </h1>
          </div>
        </div>

        {/* Thông tin khách hàng */}
        <div className="grid grid-cols-2 gap-8 mb-6 text-left">
          {/* Cột trái */}
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold">To:</span>
              <span className="col-span-2">{contactInfo?.nguoiLienHe}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold">Name:</span>
              <span className="col-span-2">
                {contactInfo?.tenDoiTac || contactInfo?.tenKhachHang}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold">Address:</span>
              <span className="col-span-2">{contactInfo?.diaChi}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold">Email:</span>
              <span className="col-span-2">{contactInfo?.email || "—"}</span>
            </div>
          </div>

          {/* Cột phải */}
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold">Date:</span>
              <input
                type="text"
                className="border-b border-gray-400 focus:outline-none col-span-2"
                value={new Date().toLocaleDateString("vi-VN")}
                readOnly
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold">Debit Note No:</span>
              <input
                type="text"
                className="border-b border-gray-400 focus:outline-none col-span-2"
                value={deBitNoteNo}
                onChange={(e) => setDeBitNoteNo(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold">Our Ref:</span>
              <input
                type="text"
                className="border-b border-gray-400 focus:outline-none col-span-2"
                value={maHoSo || ""}
                readOnly
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold">Your Ref:</span>
              <input
                type="text"
                className="border-b border-gray-400 focus:outline-none col-span-2"
                value={selectedCases[0]?.clientsRef || ""}
                onChange={(e) =>
                  setSelectedCases((prev) =>
                    prev.length
                      ? [{ ...prev[0], clientsRef: e.target.value }, ...prev.slice(1)]
                      : prev
                  )
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold">Country:</span>
              <span className="col-span-2">
                {contactInfo?.quocGia?.tenQuocGia || "—"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="font-semibold">Matter name:</span>
              <input
                type="text"
                className="border-b border-gray-400 focus:outline-none col-span-2"
                value={matterName}
                onChange={(e) => setMatterName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-4">
          <h3 className="text-center font-bold text-lg mb-4">PAYMENT INSTRUCTION</h3>
          <table className="mx-auto w-full max-w-3xl text-sm">
            <tbody>
              <tr>
                <td className="w-1/2 text-right pr-4 font-medium">Our bank account No.:</td>
                <td className="w-1/2 text-left pl-4">19037215199020</td>
              </tr>
              <tr>
                <td className="w-1/2 text-right pr-4 font-medium">Our bank:</td>
                <td className="w-1/2 text-left pl-4">
                  The Vietnam Technological and Commercial Joint Stock Bank (TECHCOMBANK)
                </td>
              </tr>
              <tr>
                <td className="w-1/2 text-right pr-4 font-medium">Branch:</td>
                <td className="w-1/2 text-left pl-4">Head Quarter</td>
              </tr>
              <tr>
                <td className="w-1/2 text-right pr-4 font-medium">Address:</td>
                <td className="w-1/2 text-left pl-4">
                  No. 82 Nguyen Tuan, Thanh Xuan Ward, Hanoi, Vietnam
                </td>
              </tr>
              <tr>
                <td className="w-1/2 text-right pr-4 font-medium">SWIFT Code:</td>
                <td className="w-1/2 text-left pl-4">VTCBVNVX</td>
              </tr>
              <tr>
                <td className="w-1/2 text-right pr-4 font-medium">Term of payment:</td>
                <td className="w-1/2 text-left pl-4">30 days from date of Debit Note</td>
              </tr>
              <tr>
                <td className="w-1/2 text-right pr-4 font-medium">Charges up to:</td>
                <td className="w-1/2 text-left pl-4">{new Date().toLocaleDateString("vi-VN")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bảng dịch vụ */}
        <table className="w-full border border-gray-400 text-sm mb-6">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="border border-gray-400 p-2">#</th>
              <th className="border border-gray-400 p-2">ITEM</th>
              <th className="border border-gray-400 p-2">Your Ref</th>
              <th className="border border-gray-400 p-2">QTY</th>
              <th className="border border-gray-400 p-2">SERVICE FEE (VND)</th>
              <th className="border border-gray-400 p-2">TOTAL (VND)</th>
              <th className="border border-gray-400 p-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {selectedCases.map((c, idx) => (
              <tr key={c.id} ref={idx === selectedCases.length - 1 ? tableRef : null}>
                <td className="border border-gray-400 p-2">{idx + 1}</td>
                <td className="border border-gray-400 p-2">{c.moTa}</td>
                <td className="border border-gray-400 p-2">{c.clientsRef || "..."}</td>
                <td className="border border-gray-400 p-2 text-center">1</td>
                <td className="border border-gray-400 p-2 text-center">
                  {parseFloat(c.soTien || 0).toLocaleString("vi-VN")}
                </td>
                <td className="border border-gray-400 p-2 text-center">
                  {parseFloat(c.soTien || 0).toLocaleString("vi-VN")}
                </td>
                <td className="border border-gray-400 p-2 text-center">
                  <div className="flex justify-center space-x-2">
                    <Button
                      type="primary"
                      danger
                      size="small"
                      className="rounded-md"
                      onClick={() => {
                        setCaseToDelete(c.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      Xóa
                    </Button>
                    <Button
                      type="default"
                      size="small"
                      className="rounded-md text-blue-600 border-blue-500 hover:bg-blue-50"
                      onClick={() => console.log("Sửa", c.id)}
                    >
                      Sửa
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Subtotal, VAT, Total */}
        <div className="text-right space-y-1 mb-6">
          <p>
            <span className="font-semibold">Subtotal amount (VND):</span>{" "}
            {subtotal.toLocaleString("vi-VN")}
          </p>
          <p>
            <span className="font-semibold">VAT (5%):</span>{" "}
            {vat.toLocaleString("vi-VN")}
          </p>
          <p className="text-lg font-bold text-red-600">
            TOTAL AMOUNT DUE (VND): {total.toLocaleString("vi-VN")}
          </p>
        </div>

        {/* Nút thêm vụ việc */}
        <div className="flex justify-end space-x-2">
          <Button type="default" className="rounded-md" onClick={() => navigate(-1)}>
            Quay lại
          </Button>

          <Button
            type="dashed"
            className="rounded-md"
            icon={<span style={{ fontWeight: "bold" }}>＋</span>}
            onClick={handleAddCaseClick}
          >
            Thêm ITEM
          </Button>

          <Button
            type="primary"
            className="rounded-md bg-teal-600 hover:bg-teal-700"
            onClick={handleSave}
          >
            Lưu
          </Button>
        </div>

        {/* Note & Contact */}
        <div className="mt-6 text-sm text-gray-700 leading-relaxed text-left">
          <p className="italic text-red-600 mb-2">
            * Note: The above fee excludes bank charges or PayPal fees.
            Please bear all related wire fees (including local bank fees and intermediary banking fees)
            so that we receive the payment in full to our account.
          </p>

          <p className="mb-2">
            <span className="font-semibold">For further information:</span>
            Email us at{" "}
            <a href="mailto:billing@ipac.vn" className="text-blue-600 underline">
              billing@ipac.vn
            </a>{" "}
            or call us at <span className="font-semibold">+84 24 6286 8888</span>.
          </p>

          <p className="font-semibold uppercase text-teal-700 mt-4">
            IPAC Intellectual Property Consultancy JSC
          </p>

          <p className="mt-1">
            <span className="font-semibold">Vietnam Office:</span>
            No. 17-LK3, 90 Nguyen Tuan Area, Nguyen Tuan Street, Thanh Xuan, Hanoi, Vietnam
          </p>

          <p className="mt-1">
            <span className="font-semibold">Cambodia Office:</span>
            No. 531, St. 128, Sangkat Psadepo I, Khan Toul Kork, Phnom Penh, Cambodia
          </p>
        </div>

        {/* Ngày tháng */}
        <div className="grid grid-cols-2 gap-8 mb-6 text-left">
          {/* Ngày gửi */}
          <div>
            <label className="block text-gray-700 text-left">Ngày gửi</label>
            <DatePicker
              value={ngayGui ? dayjs(ngayGui) : null}
              onChange={(date) => {
                if (dayjs.isDayjs(date) && date.isValid()) {
                  setNgayGui(date.format("YYYY-MM-DD"));
                } else {
                  setNgayGui(null);
                }
              }}
              format="DD/MM/YYYY"
              placeholder="Chọn ngày gửi"
              className="mt-1 w-full"
              style={{ height: "38px" }}
              disabledDate={(current) => current && current > dayjs().endOf("day")}
            />
          </div>

          {/* Ngày thanh toán */}
          <div>
            <label className="block text-gray-700 text-left">Ngày thanh toán</label>
            <DatePicker
              value={ngayThanhToan ? dayjs(ngayThanhToan) : null}
              onChange={(date) => {
                if (dayjs.isDayjs(date) && date.isValid()) {
                  setNgayThanhToan(date.format("YYYY-MM-DD"));
                } else {
                  setNgayThanhToan(null);
                }
              }}
              format="DD/MM/YYYY"
              placeholder="Chọn ngày thanh toán"
              className="mt-1 w-full"
              style={{ height: "38px" }}
              disabledDate={(current) => current && current > dayjs().endOf("day")}
            />
          </div>

          {/* Ngày gửi hóa đơn */}
          <div>
            <label className="block text-gray-700 text-left">Ngày gửi hóa đơn</label>
            <DatePicker
              value={ngayGuiHoaDon ? dayjs(ngayGuiHoaDon) : null}
              onChange={(date) => {
                if (dayjs.isDayjs(date) && date.isValid()) {
                  setNgayGuiHoaDon(date.format("YYYY-MM-DD"));
                } else {
                  setNgayGuiHoaDon(null);
                }
              }}
              format="DD/MM/YYYY"
              placeholder="Chọn ngày gửi hóa đơn"
              className="mt-1 w-full"
              style={{ height: "38px" }}
              disabledDate={(current) => current && current > dayjs().endOf("day")}
            />
          </div>

          {/* Ngày xuất */}
          <div>
            <label className="block text-gray-700 text-left">Ngày xuất</label>
            <DatePicker
              value={ngayXuat ? dayjs(ngayXuat) : null}
              onChange={(date) => {
                if (dayjs.isDayjs(date) && date.isValid()) {
                  setNgayXuat(date.format("YYYY-MM-DD"));
                } else {
                  setNgayXuat(null);
                }
              }}
              format="DD/MM/YYYY"
              placeholder="Chọn ngày xuất"
              className="mt-1 w-full"
              style={{ height: "38px" }}
              disabledDate={(current) => current && current > dayjs().endOf("day")}
            />
          </div>
        </div>

        {/* Ghi chú */}
        <div className="mb-6">
          <label className="block text-gray-700 text-left">Ghi chú</label>
          <textarea
            className="border border-gray-400 rounded-md p-2 w-full"
            rows={3}
            value={ghiChu}
            onChange={(e) => setGhiChu(e.target.value)}
            placeholder="Nhập ghi chú..."
          />
        </div>

        {/* Modal xác nhận xóa */}
        <CaseSelectModal
          open={isModalVisible}
          options={caseOptions}
          value={selectedCaseId}
          onChange={setSelectedCaseId}
          onOk={handleConfirmAddCase}
          onCancel={() => setIsModalVisible(false)}
        />
        <Modal
          title="Xác nhận xóa"
          open={showDeleteModal}
          onOk={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
          okText="Xác nhận xóa"
          cancelText="Hủy"
          okButtonProps={{
            className: "bg-red-500 hover:bg-red-600 text-white",
          }}
        >
          <p>Bạn có chắc chắn muốn xóa vụ việc này khỏi danh sách đề nghị thanh toán không?</p>
        </Modal>


        {/* Modal chọn vụ việc */}
        {/* <Modal
          title="Chọn vụ việc để thêm (cùng một khách hàng)"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={handleConfirmAddCase}
          okText="Thêm"
          cancelText="Hủy"
        >
          <Radio.Group
            value={selectedCaseId}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            style={{ width: "100%" }}
          >
            {caseOptions.map((item) => (
              <Radio key={item.id} value={item.id} style={{ display: "block", margin: "8px 0" }}>
                {item.tenVuViec} - {item.moTa} -{" "}
                {(parseFloat(item.soTien) || 0).toLocaleString("vi-VN")} VND
              </Radio>
            ))}
            {!caseOptions.length && <div>Không còn vụ việc nào để thêm.</div>}
          </Radio.Group>
        </Modal> */}
      </div>
    </div>
  );
}

export default DebitNoteAdd;
