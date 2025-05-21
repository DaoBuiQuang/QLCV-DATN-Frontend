import React from "react";
import { Steps } from "antd";
// import "./DonProgress.css"; // đừng quên dòng này!

const { Step } = Steps;

const steps = [
  "Nộp đơn",
  "Hoàn thành hồ sơ tài liệu",
  "Thẩm định hình thức",
  "Công bố đơn",
  "Thẩm định nội dung",
  "Hoàn thành nhận bằng",
  "Gửi bằng cho khách hàng",
  "Đơn đăng ký thành công",
];

const DonProgress = ({ trangThaiDon }) => {
  const currentIndex = steps.indexOf(trangThaiDon);

  return (
    <div className="text-xs mt-0 mb-auto p-0 don-progress">
      <Steps
        direction="horizontal"
        size="small"
        current={currentIndex !== -1 ? currentIndex : 0}
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            title={
              <span className="text-xs break-words text-center leading-tight">
                {step}
              </span>
            }
          />
        ))}
      </Steps>
    </div>
  );
};

export default DonProgress;
