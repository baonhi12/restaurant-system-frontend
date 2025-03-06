import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../assets/css/Dashboard.css';
import '../assets/css/MenuManagement.css';
import { IoIosSearch, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import Button from '../components/Button';
import { IoIosAdd } from "react-icons/io";


const MenuManagement = () => {
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
                        <h2>Menu Management</h2>
                        <p>Here is our menu summary with graph view!</p>
                    </div>
                    <div className='dashboard-title-calendar'>
                        <Button><IoIosAdd className='dashboard-title-icon' /> New Food</Button>
                    </div>
                </div>

                <div className='dashboard-content-food-filter'> 
                    <h3>Food Filter</h3>
                </div>

            </div>
        </div>
    );
}

export default MenuManagement;