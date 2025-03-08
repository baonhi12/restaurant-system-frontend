import React, { useState, useEffect } from 'react';
import '../../assets/css/Dashboard.css';
import CustomDropdown from '../CustomDropdown';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';

const CustomerLineChart = () => {
    const [period, setPeriod] = useState('Weekly');
    const [chartData, setChartData] = useState({ labels: [], data: [] });

    // Định nghĩa dữ liệu cho từng khoảng thời gian
    const customerDataset = {
        Daily: {
        labels: ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'],
        data: [10, 12, 15, 20, 18, 22, 16],
        },
        Weekly: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [100, 120, 150, 130, 170, 160, 190],
        },
        Monthly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [400, 450, 500, 480],
        },
        Yearly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [1200, 1100, 1300, 1250, 1400, 1500, 1600, 1550, 1700, 1650, 1800, 1900],
        },
    };

    // Cập nhật dữ liệu biểu đồ mỗi khi period thay đổi
    useEffect(() => {
        setChartData(customerDataset[period] || { labels: [], data: [] });
    }, [period]);
        
    return (
    <>
        <div className='dashboard-chart-revenue-content'>
            <div className='dashboard-chart-revenue-content-left'>
                <h3>Total Customer</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className='dashboard-chart-revenue-content-right'>
                <CustomDropdown selected={period} onChange={setPeriod} />
            </div>
        </div>

        <div className='dashboard-chart-revenue-barchart'>
            <LineChart
                xAxis={[{ scaleType: 'point', data: chartData.labels }]}
                series={[
                    {
                        data: chartData.data,
                        showMark: false,
                        color: '#C599B6',
                    },
                ]}
                width={500}
                height={400}
            />
        </div>
    </>
    );
}

export default CustomerLineChart;