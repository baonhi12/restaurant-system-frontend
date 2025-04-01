import React, { useState, useEffect } from 'react';
import '../../../assets/css/Dashboard.css';
import CustomDropdown from '../../admincomponent/CustomDropdown';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import axiosInstance from '../../../api/axiosInstance';

const RevenueLineChart = () => {
  const [period, setPeriod] = useState('Weekly');
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  // Chuyển đổi period từ UI sang API
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

    axiosInstance
      .post('/Statistic/get-statistic', requestBody)
      .then((res) => {
        // res.data.data: [{ time, revenue, customers, dishes, reservations }, ...]
        const apiData = res.data.data;
        const labels = apiData.map((item) => item.time);
        const data = apiData.map((item) => item.revenue);
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
        sx={{
          [`& .${lineElementClasses.root}`]: {
            display: 'none',
          },
        }}
      />
    </>
  );
};

export default RevenueLineChart;
