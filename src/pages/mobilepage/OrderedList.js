import React from 'react';
import '../../assets/css/OrderFood.css';
import { IoHomeOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { IoMdQrScanner, IoIosArrowBack, IoMdMore, IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import OrderCard from '../../components/mobilecomponent/OrderCard';
import Badge from '@mui/material/Badge';
import { useOrder } from '../../components/mobilecomponent/OrderContext';

const OrderedList = () => {
    const navigate = useNavigate();
    const { orderItems, increaseQuantity, decreaseQuantity } = useOrder(); // lấy danh sách order từ context

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
                {/* {orderItems && orderItems.length > 0 ? (
                    orderItems.map((item) => (
                        <OrderCard
                            key={item.id}
                            item={item}
                            onIncrease={increaseQuantity}
                            onDecrease={decreaseQuantity}
                        />
                    ))
                ) : (
                    <p className='text-align-center'>No orders yet.</p>
                )} */}
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