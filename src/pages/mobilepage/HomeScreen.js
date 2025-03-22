import React, { useEffect, useState } from 'react';
import '../../assets/css/OrderFood.css';
import logo from '../../assets/images/logo.png';
import { IoIosSearch } from "react-icons/io";
import Button from '../../components/admincomponent/Button';
import FoodCard from '../../components/mobilecomponent/FoodCard';
import { IoHomeOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { IoMdQrScanner, IoMdNotificationsOutline  } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';

const HomeScreen = () => {
    const navigate = useNavigate();

    const NavItem = ({ icon, to }) => {
        return (
            <div onClick={() => navigate(to)} className="nav-icon" >
                {icon}
            </div>
        );
    };

    return (
        <div className='home-screen-container'>
            {/* logo and table id */}
            <div className='home-screen-header'>
                <img src={logo} alt='logo' />
                <h1>Table 1</h1>
            </div>

            {/* search bar */}
            <div class="home-screen-seacrh input-group rounded">
                <input type="search" class="form-control rounded" placeholder="Search here ..." aria-label="Search" aria-describedby="search-addon" />
                <span class="input-group-text border-0" id="search-addon">
                    <IoIosSearch />
                </span>
            </div>

            {/* categories filter */}
            <div className='home-screen-categories-filter'>
                <Button className='home-screen-categories-btn'>Pizza</Button>
                <Button className='home-screen-categories-btn'>Burger</Button>
                <Button className='home-screen-categories-btn'>Desserts</Button>
                <Button className='home-screen-categories-btn'>Beverages</Button>
                <Button className='home-screen-categories-btn'>Noodles</Button>
                <Button className='home-screen-categories-btn'>Salad</Button>
            </div>
            
            {/* food cards */}
            <div className='home-screen-food-cards'>
                <FoodCard 
                    food={{ 
                        id: '001', 
                        name: 'Burger', 
                        price: '$15', 
                        description: 'Delicious burger', 
                        image: undefined 
                    }} 
                />
                <FoodCard
                    food={{ 
                        id: '002', 
                        name: 'Pizza', 
                        price: '$20', 
                        description: 'Delicious pizza', 
                        image: undefined 
                    }}
                />
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
                    <NavItem to="/ordered-list-cart-screen" icon={<RiHistoryFill size={28} />} />
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;