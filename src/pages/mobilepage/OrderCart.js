// src/pages/mobile/OrderCart.js
import React, { useState } from 'react';
import '../../assets/css/OrderFood.css';
import { IoHomeOutline, IoMenu } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { IoMdMore, IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate, useSearchParams } from 'react-router-dom'; 
import OrderCard from '../../components/mobilecomponent/OrderCard';
import Button from '../../components/admincomponent/Button';
import { useOrder } from '../../components/mobilecomponent/OrderContext';
import axios from 'axios';
import DeleteForm from '../../components/admincomponent/DeleteForm';
import swal from 'sweetalert';

const OrderCart = () => {
    const navigate = useNavigate();
    const { orderItems, increaseQuantity, decreaseQuantity, clearOrder, removeItem } = useOrder();

    // Lấy query params
    const [searchParams] = useSearchParams();
    // Lấy giá trị tableId từ URL, nếu không có thì để trống (hoặc fallback 1 giá trị)
    const tableId = searchParams.get("tableId") || "";

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(open => !open);

    const handleOrderNow = async () => {
        try {
            // Tạo body request với tableId lấy từ query param
            const requestBody = {
                tbiId: tableId,
                newOrderItems: orderItems.map(item => ({
                    mnuID: item.id,
                    odtQuantity: item.quantity
                }))
            };

            const response = await axios.post(
                'https://localhost:7115/api/Orders/process-order',
                requestBody
            );
            console.log("Order response:", response.data);

            // Lưu orderId vào localStorage, nếu API trả về
            if (response.data && response.data.ordID) {
                localStorage.setItem('orderId', response.data.ordID);
            }

            swal("Đặt món thành công!", "", "success");

            // Xóa giỏ hàng sau khi đặt
            if (clearOrder) {
                clearOrder();
            }

            // Điều hướng về trang bạn muốn (vd: /ordered-list-cart-screen)
            // navigate('/ordered-list-cart-screen');
        } catch (error) {
            console.error("Error ordering:", error);
            swal("Đặt món thất bại!", "", "error");
        }
    };

    // Hàm xóa toàn bộ món
    const handleClearAll = () => {
        swal({
            title: "Bạn có chắc?",
            text: "Bạn có muốn xóa toàn bộ món trong giỏ hàng không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                clearOrder();
                swal("Đã xóa toàn bộ món!", { icon: "success" });
            }
        });
    };

    // Quản lý xóa 1 món
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

    // NavItem
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
                <h3 className='order-cart-header-title'>Order Cart</h3>
                <IoMdMore 
                    size={28} 
                    onClick={handleClearAll} 
                    style={{ cursor: 'pointer', color: '#FF5B5B' }} 
                />
            </div>

            <div className="content">
                {/* Sidebar */}
                <div className={`home-screen-navbar sidebar ${sidebarOpen ? 'open' : ''}`}>
                    <NavItem to="/homescreen" icon={<IoHomeOutline size={24} />} label="Home" />
                    <NavItem to="/notification" icon={<IoMdNotificationsOutline size={24} />} label="Notification" />
                    <NavItem to="/order-cart-screen" icon={<FiShoppingCart size={24} />} label="Cart" />
                    <NavItem to="/ordered-list-cart-screen" icon={<RiHistoryFill size={24} />} label="History" />
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
                            <Button 
                                className='detail-food-card-action-btn' 
                                onClick={handleOrderNow}
                            >
                                Order Now
                            </Button>
                        </>
                    ) : (
                        <p className='text-align-center'>No order food</p>
                    )}
                </div>

                {/* Modal xác nhận xóa 1 món */}
                <DeleteForm 
                    open={deleteModalOpen} 
                    handleClose={handleCloseDelete} 
                    onDelete={handleDeleteConfirm} 
                />
            </div>
        </div>
    );
};

export default OrderCart;
