import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactECharts from "echarts-for-react";
import { Spin } from "antd";

const Dashboard = () => {
  const [statusChartData, setStatusChartData] = useState([]);
  const [hanXuLyChartData, setHanXuLyChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const statusRes = await axios.post(`${process.env.REACT_APP_API_URL}/application/statistics-by-status`);
        const hanXuLyRes = await axios.post(`${process.env.REACT_APP_API_URL}/application/statistics-by-han-xu-ly`);

        const formattedStatus = statusRes.data.map(item => ({
          name: item.trangThaiDon,
          value: item.count
        }));

        const labelMap = {
          under7Days: "< 7 ngày",
          under30Days: "< 30 ngày",
          overdue: "Quá hạn",
          over30Days: "> 30 ngày"
        };

        const formattedHanXuLy = Object.entries(hanXuLyRes.data).map(([key, value]) => ({
          name: labelMap[key] || key,
          value
        }));

        setStatusChartData(formattedStatus);
        setHanXuLyChartData(formattedHanXuLy);
      } catch (err) {
        console.error("Lỗi tải dữ liệu dashboard:", err);
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchData();
  }, []);

  const pieOption = {
    title: {
      text: "📌 Trạng thái đơn",
      left: "center"
    },
    tooltip: { trigger: "item" },
    legend: {
      bottom: 10,
      left: "center"
    },
    series: [
      {
        name: "Số lượng",
        type: "pie",
        radius: "55%",
        data: statusChartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };

  const barOption = {
    title: {
      text: "📅 Hạn xử lý",
      left: "center"
    },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: hanXuLyChartData.map(item => item.name)
    },
    yAxis: { type: "value" },
    series: [
      {
        data: hanXuLyChartData.map(item => item.value),
        type: "bar",
        itemStyle: { color: "#3398DB" }
      }
    ]
  };

  return (
    <div className="bg-white p-8">
      <h2 className="text-2xl font-semibold mb-6">📊 Dashboard Thống Kê</h2>

      <Spin spinning={loading} tip="Loading..." size="large">
        <div className="flex flex-wrap justify-around gap-8">
          <div className="w-[45%] min-w-[300px] h-[400px]">
            <ReactECharts option={pieOption} style={{ height: "100%" }} />
          </div>
          <div className="w-[45%] min-w-[300px] h-[400px]">
            <ReactECharts option={barOption} style={{ height: "100%" }} />
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Dashboard;
