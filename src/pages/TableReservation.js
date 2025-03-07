import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../assets/css/Dashboard.css';
import '../assets/css/MenuManagement.css';
import '../assets/css/TableReservation.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import Button from '../components/Button';
import { IoIosAdd } from "react-icons/io";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const TableReservation = () => {
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
                        <Badge badgeContent={5} >
                            <IoMdSettings className="icon" />
                        </Badge>
                        <Badge badgeContent={3} >
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
                        <h2>Table Reservation</h2>
                        <p>Here is our reservation summary with graph view!</p>
                    </div>
                    <div className='table-reservation-availaible-seat'>
                        <p>20 Available seat</p>
                    </div>
                </div>

                <div className='table-reservation-content-filter'> 
                    <div class="table-reservation-filter-search">
                        <input type="search" class="form-control rounded" placeholder="Search customer ..." aria-label="Search" aria-describedby="search-addon" />
                        <span class="input-group-text border-0" id="search-addon">
                            <IoIosSearch />
                        </span>
                    </div>

                    <div class="table-reservation-filter-date">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker label="Search date time" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableReservation;