import React, { useState, useEffect } from 'react';
import Navbar from '../../components/admincomponent/Navbar';
import '../../assets/css/Dashboard.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

const AllNotification = () => {
    const navigate = useNavigate();
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

                </div>
            </div>
        </div>
    );
}

export default AllNotification;