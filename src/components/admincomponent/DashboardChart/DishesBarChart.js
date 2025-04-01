import React, { useState, useEffect } from 'react';
import '../../../assets/css/Dashboard.css';
import CustomDropdown from '../../admincomponent/CustomDropdown';
import { BarChart } from '@mui/x-charts/BarChart';
import axiosInstance from '../../../api/axiosInstance';

const DishesBarChart = () => {
  const [period, setPeriod] = useState('Weekly');
  const [chartData, setChartData] = useState([]);

  // Hàm chuyển đổi tên ngày đầy đủ sang dạng viết tắt
  const abbreviateDay = (day) => {
    const map = {
      "Sunday": "Sun",
      "Monday": "Mon",
      "Tuesday": "Tue",
      "Wednesday": "Wed",
      "Thursday": "Thu",
      "Friday": "Fri",
      "Saturday": "Sat"
    };
    return map[day] || day;
  };

  // Thứ tự mong muốn hiển thị
  const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Chuyển đổi period từ giao diện sang giá trị cho API
  const mapPeriodToApi = (period) => {
    if (period === 'Daily') return 'day';
    if (period === 'Weekly') return 'week';
    if (period === 'Monthly') return 'month';
    if (period === 'Yearly') return 'year';
    return 'week';
  };

  // Tính toán startDate và endDate dựa vào period
  const computeDates = (period) => {
    const now = new Date();
    let start = new Date();
    if (period === 'Daily') {
      start = new Date(now);
    } else if (period === 'Weekly') {
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

    axiosInstance.post('/Statistic/get-statistic', requestBody)
      .then((res) => {
        const apiData = res.data.data;
        // Map dữ liệu: chuyển tên ngày đầy đủ sang viết tắt và lấy cột dishes
        let newData = apiData.map(item => ({
          page: abbreviateDay(item.time),
          value: item.dishes
        }));

        // Sắp xếp theo thứ tự mong muốn
        newData = newData.sort((a, b) => {
          const idxA = dayOrder.indexOf(a.page);
          const idxB = dayOrder.indexOf(b.page);
          return idxA - idxB;
        });
        setChartData(newData);
      })
      .catch(err => {
        console.error("Error fetching dishes statistics:", err);
      });
  }, [period]);

  return (
    <>
      <div className="dashboard-chart-revenue-content">
        <div className="dashboard-chart-revenue-content-left">
          <h3>Total Dishes sold</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="dashboard-chart-revenue-content-right">
          <CustomDropdown selected={period} onChange={setPeriod} />
        </div>
      </div>
      <div className="dashboard-chart-revenue-barchart">
        <BarChart
          dataset={chartData}
          yAxis={[{ scaleType: 'band', dataKey: 'page' }]}
          series={[{ dataKey: 'value', color: '#8EACCD' }]}
          layout="horizontal"
          grid={{ vertical: true }}
          width={500}
          height={400}
        />
      </div>
    </>
  );
};

export default DishesBarChart;
