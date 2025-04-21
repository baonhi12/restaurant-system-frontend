import React, { useState, useEffect } from 'react';
import '../../../assets/css/Dashboard.css';
import CustomDropdown from '../../admincomponent/CustomDropdown';
import { LineChart } from '@mui/x-charts/LineChart';
import axiosInstance from '../../../api/axiosInstance';

const RevenueLineChart = () => {
  // Nếu bạn muốn mặc định hiển thị weekly thì khởi tạo state là 'Weekly'
  const [period, setPeriod] = useState('Weekly');
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  // Map period từ UI sang giá trị API tương ứng
  const mapPeriodToApi = (period) => {
    if (period === 'Daily') return 'day';
    if (period === 'Weekly') return 'week';
    if (period === 'Monthly') return 'month';
    if (period === 'Yearly') return 'year';
    return 'week';
  };

  // Tính toán startDate và endDate dựa vào period được chọn
  const computeDates = (period) => {
    const now = new Date();
    let start = new Date();
    if (period === 'Daily') {
      // Đảm bảo lấy toàn bộ dữ liệu trong ngày hiện tại
      start.setHours(0, 0, 0, 0);
    } else if (period === 'Weekly') {
      // Trừ 6 ngày để có dữ liệu của một tuần
      start.setDate(now.getDate() - 6);
    } else if (period === 'Monthly') {
      start.setMonth(now.getMonth() - 1);
    } else if (period === 'Yearly') {
      start.setFullYear(now.getFullYear() - 1);
    }
    return { startDate: start.toISOString(), endDate: now.toISOString() };
  };

  useEffect(() => {
    const apiPeriod = mapPeriodToApi(period);
    const { startDate, endDate } = computeDates(period);
    const requestBody = { period: apiPeriod, startDate, endDate };

    axiosInstance
      .post('/Statistic/get-statistic', requestBody)
      .then((res) => {
        const apiData = res.data.data;
        let sortedData = [];

        if (apiPeriod === 'day') {
          // Với Daily, giả sử time có dạng "0h", "1h",...
          sortedData = apiData.slice().sort((a, b) => {
            const hourA = parseInt(a.time, 10);
            const hourB = parseInt(b.time, 10);
            return hourA - hourB;
          });
        } else if (apiPeriod === 'week') {
          // Với Weekly, sắp xếp theo thứ tự từ Monday -> Tuesday -> ... -> Sunday
          const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
          sortedData = apiData.slice().sort((a, b) => {
            return dayOrder.indexOf(a.time) - dayOrder.indexOf(b.time);
          });
        } else {
          // Các khoảng thời gian khác sử dụng dữ liệu trả về trực tiếp
          sortedData = apiData;
        }

        const labels = sortedData.map((item) => item.time);
        const data = sortedData.map((item) => item.revenue);
        setChartData({ labels, data });
      })
      .catch((err) => {
        console.error('Error fetching revenue statistics:', err);
      });
  }, [period]);

  return (
    <>
      <div className="dashboard-chart-revenue-content">
        <div className="dashboard-chart-revenue-content-left">
          <h3>Total Revenue</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="dashboard-chart-revenue-content-right">
          <CustomDropdown selected={period} onChange={setPeriod} />
        </div>
      </div>
      <LineChart
        width={700}
        height={400}
        series={[
          { data: chartData.data, area: true, showMark: false, color: '#A888B5' },
        ]}
        xAxis={[{ scaleType: 'point', data: chartData.labels }]}
      />
    </>
  );
};

export default RevenueLineChart;
