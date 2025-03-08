import React, { useState, useEffect } from 'react';
import '../../assets/css/Dashboard.css';
import CustomDropdown from '../CustomDropdown';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';


const RevenueLineChart = () => {
    const [period, setPeriod] = useState('Weekly');
    const [chartData, setChartData] = useState({ labels: [], data: [] });
        
    const dataset = {
        Daily: {
          labels: ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'],
          data: [150, 200, 250, 300, 350, 400, 500, 600, 700, 800, 900, 1000, 1100],
        },
        Weekly: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: [2852, 1690, 5408, 9310, 2774, 4799, 8507],
        },
        Monthly: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          data: [12000, 18000, 22000, 25000],
        },
        Yearly: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          data: [50000, 45000, 48000, 55000, 52000, 51000, 53000, 58000, 60000, 62000, 64000, 68000],
        },
    }
    
    useEffect(() => {
        setChartData(dataset[period] || { labels: [], data: [] });
    }, [period]);

    return (
        <>
            <div className='dashboard-chart-revenue-content'>
                <div className='dashboard-chart-revenue-content-left'>
                    <h3>Total Revenue</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className='dashboard-chart-revenue-content-right'>
                    <CustomDropdown selected={period} onChange={setPeriod} />
                </div>
            </div>
            <LineChart
                width={650}
                height={400}
                series={[{ data: chartData.data, area: true, showMark: false, color: '#A888B5' }]}
                xAxis={[{ scaleType: 'point', data: chartData.labels }]}
                sx={{
                    [`& .${lineElementClasses.root}`]: {
                        display: 'none',   
                    },
                }}
            />
        </>
    );
}

export default RevenueLineChart;