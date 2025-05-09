import React from "react";
import { Steps } from "antd";

const { Step } = Steps;

const steps = [
    "Nộp đơn",
    "Hoàn thành hồ sơ tài liệu",
    "Thẩm định hình thức",
    "Công bố đơn",
    "Thẩm định nội dung",
    "Trả lời thẩm định nội dung",
    "Hoàn thành nhận bằng",
    "Chờ nhận bằng",
];

const DonProgress = ({ trangThaiDon }) => {
    const currentIndex = steps.indexOf(trangThaiDon);

    return (
        <div className="text-xs mt-0 mb-auto p-0">
            <Steps
                direction="vertical"
                size="small"
                current={currentIndex !== -1 ? currentIndex : 0}
                className="don-progress"
            >
                {steps.map((step, index) => (
                    <Step key={index} title={<span className="text-xs">{step}</span>} />
                ))}
            </Steps>
        </div>

    );
};

export default DonProgress;
