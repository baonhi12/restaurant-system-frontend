// src/pages/mobile/OrderedList.js
import React, { useState, useEffect } from 'react';
import '../../assets/css/OrderFood.css';
import { IoHomeOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { IoMdQrScanner, IoIosArrowBack, IoMdMore, IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import axios from 'axios';
import OrderCard from '../../components/mobilecomponent/OrderCard';

const OrderedList = () => {
    const navigate = useNavigate();
    const [orderedItems, setOrderedItems] = useState([]);

    // Lấy orderId từ localStorage để gọi API
    useEffect(() => {
        const storedOrderId = localStorage.getItem('orderId');
        if (storedOrderId) {
            // Gọi API GET /api/Orders/{orderId}
            axios.get(`https://localhost:7115/api/Orders/${storedOrderId}`)
                .then((res) => {
                    console.log('OrderedList response:', res.data);
                    // Giả sử res.data có dạng { items: [ { mnuID, mnuName, mnuPrice, mnuDescription, odtQuantity, mnuImage }, ... ] }
                    if (res.data && res.data.items) {
                        setOrderedItems(res.data.items);
                    }
                })
                .catch((err) => {
                    console.error('OrderedList error:', err);
                });
        }
    }, []);

    const handleBack = () => {
        navigate(-1); // Quay về trang trước
    };

    // Nếu bạn muốn ẩn nút tăng giảm, có thể truyền các hàm no-op
    const noOp = () => {};

    const NavItem = ({ icon, to }) => {
        return (
            <div onClick={() => navigate(to)} className="nav-icon">
                {icon}
            </div>
        );
    };

    return (
        <div className='home-screen-container'>
            <div className='order-cart-header'>
                <IoIosArrowBack size={28} onClick={handleBack} style={{ cursor: 'pointer', color: '#FF5B5B' }} />
                <h3 className='order-cart-header-title'>Ordered List</h3>
                <IoMdMore size={28} onClick={handleBack} style={{ cursor: 'pointer', color: '#FF5B5B' }} />
            </div>

            <div className='order-cart-card ordered-list-card'>
                {orderedItems.length > 0 ? (
                    orderedItems.map((item) => {
                        // Chuyển dữ liệu API thành props phù hợp cho OrderCard
                        const cardItem = {
                            id: item.mnuID,                      // Hoặc item.mnuId
                            foodName: item.mnuName || 'Unknown', // Tuỳ backend
                            price: item.mnuPrice ? `$ ${item.mnuPrice}` : 'N/A',
                            description: item.mnuDescription || '',
                            quantity: item.odtQuantity || 1,
                            image: item.mnuImage || "https://via.placeholder.com/300?text=No+Image" // Thêm field image
                        };
                        return (
                            <OrderCard
                                key={cardItem.id}
                                item={cardItem}
                                onIncrease={noOp}    // Hoặc bỏ nếu không cần
                                onDecrease={noOp}    // ...
                            />
                        );
                    })
                ) : (
                    <p className='text-align-center'>No orders yet.</p>
                )}
            </div>

            {/* Navbar */}
            <div className="home-screen-navbar bottom-navbar">
                <div className="nav-icons-container left-icons">
                    <NavItem to="/homescreen" icon={<IoHomeOutline size={28} />} />
                    <Badge badgeContent={3} color="secondary">
                        <NavItem to="/notification" icon={<IoMdNotificationsOutline size={28} />} />
                    </Badge>
                </div>

                <div className="center-button">
                    <IoMdQrScanner size={32} color="white" />
                </div>

                <div className="nav-icons-container right-icons">
                    <NavItem to="/order-cart-screen" icon={<FiShoppingCart size={28} />} />
                    <NavItem to="/ordered-list-cart-screen" icon={<RiHistoryFill size={28} />} />
                </div>
            </div>
        </div>
    );
};

export default OrderedList;
