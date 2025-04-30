import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import '../../../assets/css/Dashboard.css';
import CustomDropdown from '../../admincomponent/CustomDropdown';
import { LineChart } from '@mui/x-charts/LineChart';
import axiosInstance from '../../../api/axiosInstance';

const CustomerLineChart = () => {
  const [period, setPeriod] = useState('Weekly');
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  // Helper: chuyển "Monday" -> "Mon"
  const abbreviateDay = (day) => {
    const map = {
      Sunday: 'Sun',
      Monday: 'Mon',
      Tuesday: 'Tue',
      Wednesday: 'Wed',
      Thursday: 'Thu',
      Friday: 'Fri',
      Saturday: 'Sat',
    };
    return map[day] || day;
  };

  // Thứ tự hiển thị ngày
  const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Chuyển period sang giá trị API
  const mapPeriodToApi = (p) => {
    if (p === 'Daily') return 'day';
    if (p === 'Weekly') return 'week';
    if (p === 'Monthly') return 'month';
    if (p === 'Yearly') return 'year';
    return 'week';
  };

  // Tính startDate, endDate bằng dayjs
  const computeDates = (p) => {
    const now = dayjs();
    let start = dayjs();
    if (p === 'Daily') {
      start = now.subtract(1, 'day');
    } else if (p === 'Weekly') {
      start = now.subtract(6, 'day');
    } else if (p === 'Monthly') {
      start = now.subtract(1, 'month');
    } else if (p === 'Yearly') {
      start = now.subtract(1, 'year');
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
        // Mảng [{ time: "Monday", revenue:..., customers:..., ... }, ...]
        let newData = apiData.map((item) => ({
          label: abbreviateDay(item.time),
          value: item.customers,
        }));

        // Sắp xếp Mon -> Tue -> Wed -> ...
        newData.sort((a, b) => {
          const idxA = dayOrder.indexOf(a.label);
          const idxB = dayOrder.indexOf(b.label);
          return idxA - idxB;
        });

        setChartData({
          labels: newData.map((d) => d.label),
          data: newData.map((d) => d.value),
        });
      })
      .catch((err) => {
        console.error('Error fetching customer statistics:', err);
      });
  }, [period]);

  return (
    <>
      <div className="dashboard-chart-revenue-content">
        <div className="dashboard-chart-revenue-content-left">
          <h3>Total Customer</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="dashboard-chart-revenue-content-right">
          <CustomDropdown selected={period} onChange={setPeriod} />
        </div>
      </div>

      <div className="dashboard-chart-revenue-barchart">
        <LineChart
          width={600}
          height={400}
          xAxis={[{ scaleType: 'point', data: chartData.labels }]}
          series={[
            {
              data: chartData.data,
              color: '#C599B6',
              // area: true, // Tô màu dưới đường
              // Hiển thị các điểm
              showMark: true,
              // Tạo đường cong mượt (thay vì đường gấp khúc)
              curve: 'catmullRom',
            },
          ]}
        />
      </div>
    </>
  );
};

export default CustomerLineChart;
