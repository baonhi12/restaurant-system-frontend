import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../assets/css/Dashboard.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import analysis_revenue from '../assets/images/analysis_revenue.png';
import analysis_sold from '../assets/images/analysis_sold.png';
import analysis_reserve from '../assets/images/analysis_reserve.png';
import analysis_customer from '../assets/images/analysis_customer.png';
import { PiChartLineDownLight, PiChartLineUpLight } from "react-icons/pi";
import Badge from '@mui/material/Badge';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import RevenueLineChart from '../components/RevenueLineChart';
import DishesBarChart from '../components/DishesBarChart';
import CustomerLineChart from '../components/CustomerLineChart';
import OrderedBarChart from '../components/OrderedBarChart';
import topdishes from '../assets/images/dishes01.jpg';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Navbar />

            <div className="dashboard-content">
                <div className="dashboard-header">
                    <div class="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="Search here ..." aria-label="Search" aria-describedby="search-addon" />
                        <span class="input-group-text border-0" id="search-addon">
                            <IoIosSearch />
                        </span>
                    </div>
                    <div className="header-center">
                        <Badge badgeContent={4} >
                            <IoMdSettings className="icon" />
                        </Badge>
                        <Badge badgeContent={4} >
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
                    <div className="stats-card">
                        <div className='stats-icon-container'>
                            <img src={analysis_revenue} />
                        </div>
                        <div className='stats-card-content'>
                            <h3>$1220</h3>
                            <h4>Total Revenue</h4>
                            <div className='stats-card-chart'>
                                <PiChartLineUpLight className='chart-icon up'/>
                                <p>15%</p>
                            </div>
                        </div>
                    </div>
                    <div className="stats-card">
                        <div className='stats-icon-container'>
                            <img src={analysis_sold} />
                        </div>
                        <div className='stats-card-content'>
                            <h3>420</h3>
                            <h4>Total Dishes sold</h4>
                            <div className='stats-card-chart'>
                                <PiChartLineDownLight className='chart-icon down'/>
                                <p>5%</p>
                            </div>
                        </div>
                    </div>
                    <div className="stats-card">
                        <div className='stats-icon-container'>
                            <img src={analysis_reserve} />
                        </div>
                        <div className='stats-card-content'>
                            <h3>60</h3>
                            <h4>Total Reservations</h4>
                            <div className='stats-card-chart'>
                                <PiChartLineDownLight className='chart-icon down'/>
                                <p>9%</p>
                            </div>
                        </div>
                    </div>
                    <div className="stats-card">
                        <div className='stats-icon-container'>
                            <img src={analysis_customer} />
                        </div>
                        <div className='stats-card-content'>
                            <h3>60</h3>
                            <h4>Total Customer</h4>
                            <div className='stats-card-chart'>
                                <PiChartLineUpLight className='chart-icon up'/>
                                <p>12%</p>
                            </div>
                        </div>
                    </div>
                </div>  

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
                                    {/* <Alert severity="success">
                                        <AlertTitle>Successful Payment</AlertTitle>
                                        Payment received from Michael Jackson
                                    </Alert> */}
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
                                        <img src={topdishes} />
                                    </div>
                                    <div className='dashboard-chart-dishes-content-detail-item-info'>
                                        <h4>Pepperoni Pizza</h4>
                                        <p>$12</p>
                                    </div>
                                    <div className='dashboard-chart-dishes-content-detail-item-chart'>
                                        <PiChartLineUpLight className='chart-icon up'/>
                                    </div>
                                </div>

                                <div className='dashboard-chart-dishes-content-detail-item'>
                                    <div className='dashboard-chart-dishes-content-detail-item-image'>
                                        <img src={topdishes} />
                                    </div>
                                    <div className='dashboard-chart-dishes-content-detail-item-info'>
                                        <h4>Pepperoni Pizza</h4>
                                        <p>$12</p>
                                    </div>
                                    <div className='dashboard-chart-dishes-content-detail-item-chart'>
                                        <PiChartLineDownLight className='chart-icon down'/>
                                    </div>
                                </div>
                                <div className='dashboard-chart-dishes-content-detail-item'>
                                    <div className='dashboard-chart-dishes-content-detail-item-image'>
                                        <img src={topdishes} />
                                    </div>
                                    <div className='dashboard-chart-dishes-content-detail-item-info'>
                                        <h4>Pepperoni Pizza</h4>
                                        <p>$12</p>
                                    </div>
                                    <div className='dashboard-chart-dishes-content-detail-item-chart'>
                                        <PiChartLineUpLight className='chart-icon up'/>
                                    </div>
                                </div>
                                <div className='dashboard-chart-dishes-content-detail-item'>
                                    <div className='dashboard-chart-dishes-content-detail-item-image'>
                                        <img src={topdishes} />
                                    </div>
                                    <div className='dashboard-chart-dishes-content-detail-item-info'>
                                        <h4>Pepperoni Pizza</h4>
                                        <p>$12</p>
                                    </div>
                                    <div className='dashboard-chart-dishes-content-detail-item-chart'>
                                        <PiChartLineUpLight className='chart-icon up'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;