import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import CustomDropdown from '../../admincomponent/CustomDropdown';
import '../../../assets/css/Dashboard.css';

const datasets = {
    Daily: [
        { page: '10 AM', value: 50 },
        { page: '11 AM', value: 60 },
        { page: '12 PM', value: 70 },
        { page: '1 PM', value: 80 },
        { page: '2 PM', value: 90 },
        { page: '3 PM', value: 100 },
        { page: '4 PM', value: 110 },
        { page: '5 PM', value: 120 },
        { page: '6 PM', value: 130 },
        { page: '7 PM', value: 140 },
        { page: '8 PM', value: 150 },
        { page: '9 PM', value: 160 },
    ],
    Weekly: [
        { page: 'Mon', value: 240 },
        { page: 'Tue', value: 138 },
        { page: 'Wed', value: 900 },
        { page: 'Thu', value: 908 },
        { page: 'Fri', value: 480 },
        { page: 'Sat', value: 380 },
        { page: 'Sun', value: 400 },
    ],
    Monthly: [
        { page: 'Week 1', value: 240 },
        { page: 'Week 2', value: 138 },
        { page: 'Week 3', value: 900 },
        { page: 'Week 4', value: 908 },
    ],
    Yearly: [
        { page: 'Jan', value: 240 },
        { page: 'Feb', value: 138 },
        { page: 'Mar', value: 900 },
        { page: 'Apr', value: 908 },
        { page: 'May', value: 480 },
        { page: 'Jun', value: 380 },
        { page: 'Jul', value: 400 },
        { page: 'Aug', value: 300 },
        { page: 'Sep', value: 500 },
        { page: 'Oct', value: 700 },
        { page: 'Nov', value: 200 },
        { page: 'Dec', value: 800 },
    ],
};
  
const valueFormatter = (value) => value;
  
const chartSetting = {
    xAxis: [
      {
        label: '', 
      },
    ],
    width: 500,
    height: 400,
};
  

const DishesBarChart = () => {  
    const [period, setPeriod] = useState('Weekly');
    const [currentDataset, setCurrentDataset] = useState(datasets['Weekly']);

    useEffect(() => {
        setCurrentDataset(datasets[period] || datasets['Weekly']);
    }, [period]);
    
    return (
    <>
        <div className='dashboard-chart-revenue-content'>
            <div className='dashboard-chart-revenue-content-left'>
                <h3>Total Dishes sold</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className='dashboard-chart-revenue-content-right'>
                <CustomDropdown selected={period} onChange={setPeriod} />
            </div>
        </div>
        <div className='dashboard-chart-revenue-barchart'>
            <BarChart
                dataset={currentDataset}
                yAxis={[{ scaleType: 'band', dataKey: 'page' }]} // Vì layout horizontal, nhãn hiển thị theo trục y
                series={[{ dataKey: 'value', valueFormatter, color: '#8EACCD' }]}
                layout="horizontal"
                grid={{ vertical: true }}
                {...chartSetting}
            />
        </div>
    </>
    );
}

export default DishesBarChart;