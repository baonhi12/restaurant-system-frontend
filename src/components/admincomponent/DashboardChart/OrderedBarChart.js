import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import CustomDropdown from '../../admincomponent/CustomDropdown';
import '../../../assets/css/Dashboard.css';
import axiosInstance from '../../../api/axiosInstance';

const OrderedBarChart = () => {
  const [period, setPeriod] = useState('Weekly');
  const [chartData, setChartData] = useState({ labels: [], pData: [], uData: [] });

  const mapPeriodToApi = (period) => {
    if (period === 'Daily') return 'day';
    if (period === 'Weekly') return 'week';
    if (period === 'Monthly') return 'month';
    if (period === 'Yearly') return 'year';
    return 'week';
  };

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

  // Helper: chuyển đổi tên ngày đầy đủ sang dạng viết tắt
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

  const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    const apiPeriod = mapPeriodToApi(period);
    const { startDate, endDate } = computeDates(period);
    const requestBody = { period: apiPeriod, startDate, endDate };

    axiosInstance.post('/Statistic/get-statistic', requestBody)
      .then((res) => {
        const apiData = res.data.data;
        // Giả sử ta dùng trường "reservations" cho pData và không có data riêng cho uData (gán 0)
        let mappedData = apiData.map(item => ({
          label: abbreviateDay(item.time),
          pValue: item.reservations,
          uValue: 0
        }));
        // Sắp xếp theo thứ tự mong muốn
        mappedData.sort((a, b) => {
          const idxA = dayOrder.indexOf(a.label);
          const idxB = dayOrder.indexOf(b.label);
          return idxA - idxB;
        });
        setChartData({
          labels: mappedData.map(item => item.label),
          pData: mappedData.map(item => item.pValue),
          uData: mappedData.map(item => item.uValue)
        });
      })
      .catch(err => {
        console.error("Error fetching ordered statistics:", err);
      });
  }, [period]);

  return (
    <>
      <div className="dashboard-chart-revenue-content">
        <div className="dashboard-chart-revenue-content-left">
          <h3>Number of Table Reservation Orders and Food Orders</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="dashboard-chart-revenue-content-right">
          <CustomDropdown selected={period} onChange={setPeriod} />
        </div>
      </div>
      <div className="dashboard-chart-revenue-barchart">
        <BarChart
          height={450}
          series={[
            {
              data: chartData.pData,
              id: 'pvId',
              yAxisId: 'leftAxisId',
              color: '#FF5B5B',
            },
            {
              data: chartData.uData,
              id: 'uvId',
              yAxisId: 'rightAxisId',
              color: '#F0A04B',
            },
          ]}
          xAxis={[{ data: chartData.labels, scaleType: 'band' }]}
          yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
          rightAxis="rightAxisId"
        />
      </div>
    </>
  );
};

export default OrderedBarChart;
