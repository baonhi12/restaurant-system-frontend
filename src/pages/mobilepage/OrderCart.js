// src/pages/mobile/OrderCart.js
import React, {useState} from 'react';
import '../../assets/css/OrderFood.css';
import { IoHomeOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { IoMdQrScanner, IoIosArrowBack, IoMdMore, IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import OrderCard from '../../components/mobilecomponent/OrderCard';
import Button from '../../components/admincomponent/Button';
import Badge from '@mui/material/Badge';
import { useOrder } from '../../components/mobilecomponent/OrderContext';
import axios from 'axios';
import DeleteForm from '../../components/admincomponent/DeleteForm';

const OrderCart = () => {
    const navigate = useNavigate();
    const { orderItems, increaseQuantity, decreaseQuantity, clearOrder, removeItem } = useOrder();

    // Table ID cố định (bàn 1)
    const fixedTableId = "86555039-6164-4096-92D0-C59C4EFA3FE7";

    const handleBack = () => {
        navigate(-1);
    };

    const handleOrderNow = async () => {
        try {
            const requestBody = {
                tbiId: fixedTableId,
                newOrderItems: orderItems.map(item => ({
                    mnuID: item.id,         // item.id là mnuID
                    odtQuantity: item.quantity
                }))
            };

            const response = await axios.post(
                'https://localhost:7115/api/Orders/process-order',
                requestBody
            );
            console.log("Order response:", response.data);

            // Lưu orderId vào localStorage, nếu API trả về trong ordID
            if (response.data && response.data.ordID) {
                localStorage.setItem('orderId', response.data.ordID);
            }

            alert("Đặt món thành công!");

            // Xóa giỏ hàng sau khi đặt
            if (clearOrder) {
                clearOrder();
            }

            // Điều hướng về trang HomeScreen, hoặc OrderedList, tuỳ ý
            // navigate('/ordered-list-cart-screen');
        } catch (error) {
            console.error("Error ordering:", error);
            alert("Đặt món thất bại!");
        }
    };

    const NavItem = ({ icon, to }) => {
        return (
            <div onClick={() => navigate(to)} className="nav-icon">
                {icon}
            </div>
        );
    };

    // State để quản lý modal delete của một món
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleRequestDelete = (id) => {
        setItemToDelete(id);
        setDeleteModalOpen(true);
    };

    const handleCloseDelete = () => {
        setDeleteModalOpen(false);
        setItemToDelete(null);
    };

    const handleDeleteConfirm = () => {
        if (itemToDelete) {
            removeItem(itemToDelete);
        }
        handleCloseDelete();
    };

    // Xử lý icon IoMdMore để xóa toàn bộ món (popup confirm)
    const handleClearAll = () => {
        const confirmClear = window.confirm("Do you want to remove all items from the cart?");
        if (confirmClear) {
            clearOrder();
        }
    };
    

    return (
        <div className='home-screen-container'>
            <div className='order-cart-header'>
                <IoIosArrowBack size={28} onClick={handleBack} style={{ cursor: 'pointer', color: '#FF5B5B' }}  />
                <h3 className='order-cart-header-title'>Order Cart</h3>
                <IoMdMore size={28} onClick={handleClearAll} style={{ cursor: 'pointer', color: '#FF5B5B' }}  />
            </div>

            <div className='order-cart-card'>
                {orderItems.length > 0 ? (
                    <>
                        {orderItems.map((item) => (
                            <OrderCard
                                key={item.id}
                                item={item}
                                onIncrease={increaseQuantity}
                                onDecrease={decreaseQuantity}
                                onRequestDelete={handleRequestDelete}
                            />
                        ))}
                        <Button className='detail-food-card-action-btn' onClick={handleOrderNow}>
                            Order Now
                        </Button>
                    </>
                ) : (
                    <p className='text-align-center'>No order food</p>
                )}
            </div>

            {/* Modal xác nhận xóa món */}
            <DeleteForm open={deleteModalOpen} handleClose={handleCloseDelete} onDelete={handleDeleteConfirm} />

            {/* Navbar */}
            <div className="home-screen-navbar bottom-navbar">
                <div className="nav-icons-container left-icons">
                    <NavItem to="/homescreen" icon={<IoHomeOutline size={28} />} />
                    <Badge badgeContent={3} color="secondary">
                        <NavItem to="/detail-food-screen" icon={<IoMdNotificationsOutline size={28} />} />
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

export default OrderCart;
