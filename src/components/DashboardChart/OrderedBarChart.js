import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import CustomDropdown from '../CustomDropdown';
import '../../assets/css/Dashboard.css';

const orderedDataset = {
    Daily: {
      labels: ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'],
      pData: [2000, 1800, 2400, 2200, 2600, 2500, 2100],
      uData: [3000, 2800, 3200, 3100, 3300, 3000, 2900],
    },
    Weekly: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      pData: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
      uData: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
    },
    Monthly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      pData: [4000, 3500, 3800, 4200],
      uData: [2500, 2700, 3000, 3100],
    },
    Yearly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      pData: [2400, 1398, 9800, 3908, 4800, 3800, 4300, 3200, 3000, 4100, 3600, 4500],
      uData: [4000, 3000, 2000, 2780, 1890, 2390, 3490, 3600, 3700, 3500, 3400, 3800],
    },
  };
  
const chartSetting = {
    width: 600,
    height: 450,
};

const OrderedBarChart = () => {
    const [period, setPeriod] = useState('Weekly');
    const [chartData, setChartData] = useState(orderedDataset.Weekly);

    useEffect(() => {
        setChartData(orderedDataset[period] || orderedDataset.Weekly);
    }, [period]);

    return (
        <>
            <div className='dashboard-chart-revenue-content'>
                <div className='dashboard-chart-revenue-content-left'>
                    <h3>Number of Table Reservation Orders and Food Orders</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className='dashboard-chart-revenue-content-right'>
                    <CustomDropdown selected={period} onChange={setPeriod} />
                </div>
            </div>

            <div className='dashboard-chart-revenue-barchart'>
                <BarChart
                    width={chartSetting.width}
                    height={chartSetting.height}
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
}

export default OrderedBarChart;