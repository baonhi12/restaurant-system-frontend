// src/pages/mobile/OrderedList.js
import React, { useState, useEffect } from 'react';
import '../../assets/css/OrderFood.css';
import { IoHomeOutline, IoMenu } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { IoMdQrScanner, IoIosArrowBack, IoMdMore, IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import axios from 'axios';

// Import OrderCard
import OrderCard from '../../components/mobilecomponent/OrderCard';

const OrderedList = () => {
    const navigate = useNavigate();
    const [orderedItems, setOrderedItems] = useState([]);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(open => !open);

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

    // Nếu bạn muốn ẩn luôn nút +/-, có thể truyền hàm no-op
    const noOp = () => {};

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
                <h3 className='order-cart-header-title'>Ordered List</h3>
                <IoMdMore size={28} onClick={handleBack} style={{ cursor: 'pointer', color: '#FF5B5B' }} />
            </div>

            <div className="content">
                {/* Sidebar */}
                <div className={`home-screen-navbar sidebar ${sidebarOpen ? 'open' : ''}`}>
                  <NavItem to="/homescreen" icon={<IoHomeOutline size={24} />} label="Home" />
                  <NavItem to="/notification" icon={<IoMdNotificationsOutline size={24} />} label="Notification" />
                  <NavItem to="/order-cart-screen" icon={<FiShoppingCart size={24} />} label="Cart" />
                  <NavItem to="/ordered-list-cart-screen" icon={<RiHistoryFill size={24} />} label="History" />
                </div>

                <div className='order-cart-card ordered-list-card'>
                    {orderedItems.length > 0 ? (
                        orderedItems.map((item) => {
                            // Map dữ liệu API thành props cho OrderCard, bao gồm trường image
                            const cardItem = {
                                id: item.mnuID,                      
                                foodName: item.mnuName || 'Unknown',
                                price: item.mnuPrice 
                                    ? `$ ${item.mnuPrice}` 
                                    : 'N/A',
                                description: item.mnuDescription || '',
                                quantity: item.odtQuantity || 1,
                                // Lấy URL ảnh từ API, nếu không có thì sử dụng placeholder
                                image: item.mnuImage || "https://via.placeholder.com/300?text=No+Image"
                            };
                            return (
                                <OrderCard
                                    key={cardItem.id}
                                    item={cardItem}
                                    onIncrease={noOp}  
                                    onDecrease={noOp}
                                />
                            );
                        })
                    ) : (
                        <p className='text-align-center'>No orders yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderedList;
