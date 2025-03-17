import React from 'react';
import '../../assets/css/OrderFood.css';
import { IoHomeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { IoMdQrScanner, IoIosArrowBack, IoMdMore, IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import OrderCard from '../../components/mobilecomponent/OrderCard';
import Badge from '@mui/material/Badge';

const OrderedList = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Điều hướng về trang trước đó
    };

    const NavItem = ({ icon, to }) => {
        return (
            <div onClick={() => navigate(to)} className="nav-icon" >
                {icon}
            </div>
        );
    };
    
    return (
        <div className='home-screen-container'>
            <div className='order-cart-header'>
                <IoIosArrowBack size={28} onClick={handleBack} style={{ cursor: 'pointer', color: '#FF5B5B' }}  />
                <h3 className='order-cart-header-title'>Ordered List</h3>
                <IoMdMore size={28} onClick={handleBack} style={{ cursor: 'pointer', color: '#FF5B5B' }}  />
            </div>

            <div className='order-cart-card ordered-list-card'>
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
            </div>


            {/* navbar */}
            <div className="home-screen-navbar bottom-navbar">
                {/* Các icon bên trái */}
                <div className="nav-icons-container left-icons">
                    <NavItem to="/homescreen" icon={<IoHomeOutline size={28} />} />
                    <Badge badgeContent={3} color="secondary"> 
                        <NavItem to="/detail-food-screen" icon={<IoMdNotificationsOutline size={28} />} />
                    </Badge>
                </div>

                {/* Nút chính nổi ở giữa */}
                <div className="center-button">
                    <IoMdQrScanner size={32} color="white" />
                </div>

                {/* Icon Phải */}
                <div className="nav-icons-container right-icons">
                    <NavItem to="/order-cart-screen" icon={<FiShoppingCart size={28} />} />
                    <NavItem to="/ordered-list-cart-screen" icon={<RiHistoryFill size={28} />} />                </div>
            </div>
        </div>
    );
}

export default OrderedList;