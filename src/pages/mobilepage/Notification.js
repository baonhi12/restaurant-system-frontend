import React, { useState } from 'react';
import '../../assets/css/OrderFood.css';
import { IoHomeOutline, IoMenu } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { IoMdMore, IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';


const Notification = () => {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(open => !open);
    
    const NavItem = ({ icon, to, label }) => {
        return (
          <div onClick={() => { navigate(to); setSidebarOpen(false); }} className="nav-item">
            {icon}
            <span className="nav-label">{label}</span>
          </div>
        );
    };

    return (
        <div className='home-screen-container'>
            <div className='order-cart-header'>
                <div className="hamburger" onClick={toggleSidebar}>
                    <IoMenu size={24} />
                </div>
                <h3 className='order-cart-header-title'>Notification</h3>
                <IoMdMore size={28} style={{ cursor: 'pointer', color: '#FF5B5B' }}  />
            </div>

            <div className="content">
                {/* Sidebar */}
                <div className={`home-screen-navbar sidebar ${sidebarOpen ? 'open' : ''}`}>
                  <NavItem to="/homescreen" icon={<IoHomeOutline size={24} />} label="Home" />
                  <NavItem to="/notification" icon={<IoMdNotificationsOutline size={24} />} label="Notification" />
                  <NavItem to="/order-cart-screen" icon={<FiShoppingCart size={24} />} label="Cart" />
                  <NavItem to="/ordered-list-cart-screen" icon={<RiHistoryFill size={24} />} label="History" />
                </div>

                <div className='notification-list'>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {/* Info Notifications */}
                        <Alert severity="info">
                            <AlertTitle>Buy 1 Get 1 Free!</AlertTitle>
                            Hurry and order now to enjoy our Buy 1 Get 1 Free offer for a limited time only. Limited quantities available – order today!
                        </Alert>
                        <Alert severity="info">
                            <AlertTitle>Special Offer</AlertTitle>
                            Enjoy 20% off all orders above $50. Order now
                        </Alert>
                        <Alert severity="info">
                            <AlertTitle>Join Our Pizza Party!</AlertTitle>
                            Come and celebrate with us at our Pizza Party this weekend! Enjoy special deals and win exciting prizes. Don’t miss out on the fun!
                        </Alert>

                        {/* Success Notifications */}
                        <Alert severity="success">
                            <AlertTitle>Order Confirmed</AlertTitle>
                            Your order has been confirmed. Thank you for choosing us!
                        </Alert>
                        <Alert severity="success">
                            <AlertTitle>Exclusive Offer for Our Loyal Customers</AlertTitle>
                            We appreciate your continuous support! Check out your exclusive rewards and special offers available only to our loyal customers.
                        </Alert>

                        {/* Error Notifications */}
                        <Alert severity="error">
                            <AlertTitle>Order Failed</AlertTitle>
                            We are sorry, but your order has failed. Please try again.
                        </Alert>
                    </Stack>
                </div>
            </div>
        </div>
    );
}

export default Notification;