import React from 'react';
import '../../assets/css/Navbar.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlinePayment } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { TbDeviceAnalytics } from "react-icons/tb";
import { LuPizza } from "react-icons/lu";
import { BiFoodMenu } from "react-icons/bi";


const Navbar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="" />
                <p>Pizza Restaurant Admin Dashboard</p>
            </div>

            <ul className="navbar-list">
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        <div className="nav-item-content">
                            <span className="nav-icon"><LuLayoutDashboard /></span>
                            <span className="nav-text">Dashboard</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin-menu"
                        className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        <div className="nav-item-content">
                            <span className="nav-icon"><LuPizza /></span>
                            <span className="nav-text">Menu</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin-reservation"
                        className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        <div className="nav-item-content">
                            <span className="nav-icon"><IoCartOutline /></span>
                            <span className="nav-text">Table Reservation</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/order-list"
                        className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        <div className="nav-item-content">
                            <span className="nav-icon"><BiFoodMenu /></span>
                            <span className="nav-text">Customer Order</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/payment" 
                        className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        <div className="nav-item-content">
                            <span className="nav-icon"><MdOutlinePayment /></span>
                            <span className="nav-text">Payment</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/report" 
                        className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        <div className="nav-item-content">
                            <span className="nav-icon"><TbDeviceAnalytics  /></span>
                            <span className="nav-text">Report</span>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;