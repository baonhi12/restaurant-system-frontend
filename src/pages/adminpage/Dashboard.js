// src/pages/adminpage/Dashboard.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import analysis_revenue from '../../assets/images/analysis_revenue.png';
import analysis_sold from '../../assets/images/analysis_sold.png';
import analysis_reserve from '../../assets/images/analysis_reserve.png';
import analysis_customer from '../../assets/images/analysis_customer.png';
import { PiChartLineDownLight, PiChartLineUpLight } from "react-icons/pi";
import Badge from '@mui/material/Badge';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import RevenueLineChart from '../../components/admincomponent/DashboardChart/RevenueLineChart';
import DishesBarChart from '../../components/admincomponent/DashboardChart/DishesBarChart';
import CustomerLineChart from '../../components/admincomponent/DashboardChart/CustomerLineChart';
import OrderedBarChart from '../../components/admincomponent/DashboardChart/OrderedBarChart';
import topdishes from '../../assets/images/dishes01.jpg';

// Import axiosInstance
import axiosInstance from '../../api/axiosInstance';

const Dashboard = () => {
    // State lưu các giá trị thống kê
    const [stats, setStats] = useState({
        revenue: 0,
        dishesSold: 0,
        reservations: 0,
        customers: 0,
        trendRevenue: 0,
        trendDishes: 0,
        trendReservations: 0,
        trendCustomers: 0
    });

    useEffect(() => {
        // Gọi API lấy thống kê
        axiosInstance.get('/Dashboard/Summary') 
            .then(response => {
                // Ví dụ response.data = 
                // { revenue: 1220, dishesSold: 420, reservations: 60, customers: 60, trendRevenue: 15, ... }
                setStats(response.data);
            })
            .catch(error => {
                console.error('Lỗi lấy dữ liệu Dashboard:', error);
            });
    }, []);

    return (
        <div className="dashboard-container">
            <Navbar />

            <div className="dashboard-content">
                <div className="dashboard-header">
                    <div className="input-group rounded">
                        <input 
                            type="search" 
                            className="form-control rounded" 
                            placeholder="Search here ..." 
                            aria-label="Search" 
                            aria-describedby="search-addon" 
                        />
                        <span className="input-group-text border-0" id="search-addon">
                            <IoIosSearch />
                        </span>
                    </div>
                    <div className="header-center">
                        <Badge badgeContent={5}>
                            <IoMdSettings className="icon" />
                        </Badge>
                        <Badge badgeContent={3}>
                            <IoMdNotifications className="icon" />
                        </Badge>
                    </div>

                    <div className="header-right">
                        <p>Hello Manager</p>
                        <FcBusinessman className="icon" />
                    </div>
                </div>

                <div className="dashboard-title">
                    <div className='dashboard-title-content'>
                        <h2>Dashboard</h2>
                        <p>Hi, Manager. Welcome back to PizzaDaay Admin!</p>
                    </div>
                    <div className='dashboard-title-calendar'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Schedule" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>

                <div className="stats-grid">
                    {/* Total Revenue */}
                    <div className="stats-card">
                        <div className='stats-icon-container'>
                            <img src={analysis_revenue} alt="revenue" />
                        </div>
                        <div className='stats-card-content'>
                            <h3>${stats.revenue}</h3>
                            <h4>Total Revenue</h4>
                            <div className='stats-card-chart'>
                                {/* Xét xem trendRevenue dương hay âm để hiển thị icon phù hợp */}
                                {stats.trendRevenue >= 0 ? (
                                    <>
                                        <PiChartLineUpLight className='chart-icon up'/>
                                        <p>{stats.trendRevenue}%</p>
                                    </>
                                ) : (
                                    <>
                                        <PiChartLineDownLight className='chart-icon down'/>
                                        <p>{stats.trendRevenue}%</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Total Dishes sold */}
                    <div className="stats-card">
                        <div className='stats-icon-container'>
                            <img src={analysis_sold} alt="dishes-sold"/>
                        </div>
                        <div className='stats-card-content'>
                            <h3>{stats.dishesSold}</h3>
                            <h4>Total Dishes sold</h4>
                            <div className='stats-card-chart'>
                                {stats.trendDishes >= 0 ? (
                                    <>
                                        <PiChartLineUpLight className='chart-icon up'/>
                                        <p>{stats.trendDishes}%</p>
                                    </>
                                ) : (
                                    <>
                                        <PiChartLineDownLight className='chart-icon down'/>
                                        <p>{stats.trendDishes}%</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Total Reservations */}
                    <div className="stats-card">
                        <div className='stats-icon-container'>
                            <img src={analysis_reserve} alt="reserve"/>
                        </div>
                        <div className='stats-card-content'>
                            <h3>{stats.reservations}</h3>
                            <h4>Total Reservations</h4>
                            <div className='stats-card-chart'>
                                {stats.trendReservations >= 0 ? (
                                    <>
                                        <PiChartLineUpLight className='chart-icon up'/>
                                        <p>{stats.trendReservations}%</p>
                                    </>
                                ) : (
                                    <>
                                        <PiChartLineDownLight className='chart-icon down'/>
                                        <p>{stats.trendReservations}%</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Total Customer */}
                    <div className="stats-card">
                        <div className='stats-icon-container'>
                            <img src={analysis_customer} alt="customer"/>
                        </div>
                        <div className='stats-card-content'>
                            <h3>{stats.customers}</h3>
                            <h4>Total Customer</h4>
                            <div className='stats-card-chart'>
                                {stats.trendCustomers >= 0 ? (
                                    <>
                                        <PiChartLineUpLight className='chart-icon up'/>
                                        <p>{stats.trendCustomers}%</p>
                                    </>
                                ) : (
                                    <>
                                        <PiChartLineDownLight className='chart-icon down'/>
                                        <p>{stats.trendCustomers}%</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>  

                {/* Vùng chart: bạn có thể gọi các API khác để render chart */}
                <div className='dashboard-chart-total'>
                    <div className='dashboard-chart-total-revenue'>
                        <RevenueLineChart />
                    </div>
                    
                    <div className='dashboard-chart-notification'>
                        <div className='dashboard-chart-dishes-content'>
                            <h3>Quick Notifications</h3>
                            <div className='dashboard-chart-dishes-content-detail'>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="info">
                                        <AlertTitle>New Table Reservation</AlertTitle>
                                        John Doe reserved a table at 7:30 PM
                                    </Alert>
                                    <Alert severity="info">
                                        <AlertTitle>New Order</AlertTitle>
                                        Jane Smith placed an order 3 pizzas
                                    </Alert>
                                    <Alert severity="warning">
                                        <AlertTitle>Table Status</AlertTitle>
                                        Table 5 is still occupied. Please check
                                    </Alert>
                                    <Alert severity="error">
                                        <AlertTitle>Payment Issue</AlertTitle>
                                        Payment from John Doe was declined
                                    </Alert>
                                </Stack>
                            </div>
                        </div>
                    </div>

                    <div className='dashboard-chart-total-dishes-sold'>
                        <DishesBarChart />
                    </div>

                    <div className='dashboard-chart-total-customer'>
                        <CustomerLineChart />
                    </div>

                    <div className='dashboard-chart-total-reservation'>
                        <OrderedBarChart />
                    </div>

                    <div className='dashboard-chart-best-selling-dishes'>
                        <div className='dashboard-chart-dishes-content'>
                            <h3>Top Best-Selling Dishes</h3>
                            <div className='dashboard-chart-dishes-content-detail'>
                                <div className='dashboard-chart-dishes-content-detail-item'>
                                    <div className='dashboard-chart-dishes-content-detail-item-image'>
                                        <img src={topdishes} alt="dishes top"/>
                                    </div>
                                    <div className='dashboard-chart-dishes-content-detail-item-info'>
                                        <h4>Pepperoni Pizza</h4>
                                        <p>$12</p>
                                    </div>
                                    <div className='dashboard-chart-dishes-content-detail-item-chart'>
                                        <PiChartLineUpLight className='chart-icon up'/>
                                    </div>
                                </div>
                                {/* ...Các item khác... */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
