import React, { useState, useEffect } from 'react';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DetailNotice from '../../components/admincomponent/DetailNotice';

const AllNotification = ({ onFilterChange }) => {
    const navigate = useNavigate();

    const [filter, setFilter] = React.useState('all');

    const handleChange = (event) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
        if (onFilterChange) {
          onFilterChange(newFilter);
        }
    };

    const [selectedDate, setSelectedDate] = useState(dayjs());
    
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
                        <IoMdSettings className="icon" />
                        <IoMdNotifications 
                            className="icon" 
                            style={{ cursor: 'pointer' }} 
                            onClick={() => navigate('/dashboard/all-notification')} 
                        />
                    </div>

                    <div className="header-right">
                        <p>Hello Manager</p>
                        <FcBusinessman className="icon" />
                    </div>
                </div>

                <div className="dashboard-title">
                    <div className='dashboard-title-content'>
                        <h2>Admin Notification</h2>
                        <p>Here is our admin notification!</p>
                    </div>
                </div>

                <div className='dashboard-notification-container'>
                    <div className='dashboard-notification-header'>
                        <div className='dashboard-notification-header-filter'>
                            <FormControl sx={{ m: 1, minWidth: 160 }} >
                                <InputLabel id="notification-filter-label">Notification</InputLabel>
                                <Select
                                    labelId="notification-filter-label"
                                    id="notification-filter"
                                    value={filter}
                                    label="Notification Filter"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="unread">Unread</MenuItem>
                                    <MenuItem value="read">Read</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className='dashboard-notification-header-search'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                    label="Schedule"
                                    value={selectedDate}
                                    onChange={(newValue) => setSelectedDate(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                    
                    <div className='dashboard-notification-content'>
                        <div className='dashboard-notification-item'>
                            <DetailNotice filter={filter} title="Table Reservation" category="reserve" />
                        </div>

                        <div className='dashboard-notification-item'>
                            <DetailNotice filter={filter} title="Order Food" category="order" />
                        </div>

                        <div className='dashboard-notification-item'>
                            <DetailNotice filter={filter} title="Checkout and Payment" category="payment" />
                        </div>

                        <div className='dashboard-notification-item'>
                            <DetailNotice filter={filter} title="Statistics Report" category="statistics" />
                        </div>

                        <div className='dashboard-notification-item'>
                            <DetailNotice filter={filter} title="System & Maintenance" category="system" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllNotification;