// src/pages/mobile/DetailFood.js
import React, { useEffect, useState } from 'react';
import '../../assets/css/OrderFood.css';
import Button from '../../components/admincomponent/Button';
import { IoHomeOutline, IoMenu } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { IoMdQrScanner, IoIosArrowBack, IoMdAdd, IoMdRemove, IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Badge from '@mui/material/Badge';
import axios from 'axios';
import burger01 from '../../assets/images/burger-02.svg';
import { useOrder } from '../../components/mobilecomponent/OrderContext';

const DetailFood = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(open => !open);

  const { id } = useParams(); // Lấy id của món ăn từ URL
  const [foodDetail, setFoodDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);  // Số lượng đặt
  const [rating, setRating] = useState(4);      // Giá trị rating

  // Lấy hàm addToOrder từ context
  const { addToOrder } = useOrder();

  // Khi component mount hoặc id thay đổi, gọi API lấy chi tiết món ăn
  useEffect(() => {
    const fetchFoodDetail = async () => {
      try {
        if (!id) return; // Nếu id không tồn tại thì không gọi API
        const response = await axios.get(`https://192.168.1.65:443/api/Menu/${id}`);
        setFoodDetail(response.data);
      } catch (error) {
        console.error("Error fetching food detail:", error);
      }
    };

    fetchFoodDetail();
  }, [id]);

  // Quay lại trang trước
  const handleBack = () => {
    navigate(-1);
  };

  // Tăng giảm số lượng
  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (!foodDetail) return;

    const item = {
      id: foodDetail.mnuId,            // id món ăn
      foodName: foodDetail.mnuName,    // tên món
      price: foodDetail.mnuPrice,      // giá
      description: foodDetail.mnuDescription,
      image: foodDetail.mnuImage || burger01,
      quantity: quantity,
    };

    addToOrder(item);
    alert(`Đã thêm món "${foodDetail.mnuName}" vào giỏ hàng!`);
  };

  // Nếu chưa load xong detail
  if (!foodDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className='home-screen-container'>
      {/* Header */}
      <div className='detail-food-header'>
        <IoIosArrowBack 
          size={28} 
          onClick={handleBack} 
          style={{ cursor: 'pointer', color: '#FF5B5B' }}  
        />
        <h3 className='detail-food-header-title'>Detail Food</h3>
      </div>

      {/* Card chi tiết món ăn */}
      <div className='detail-food-card'>
        <div className='detail-food-card-img'>
          {foodDetail.mnuImage ? (
            <img src={foodDetail.mnuImage} alt='food' />
          ) : (
            <img src={burger01} alt='food' />
          )}
        </div>

        <div className='detail-food-card-info'>
          <h3>{foodDetail.mnuName}</h3>
          <Box sx={{ '& > legend': { mt: 2 } }}>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size="small"
            />
          </Box>
          <p>{foodDetail.mnuDescription}</p>
        </div>

        <div className='detail-food-card-action'>
          <p>Price: ${foodDetail.mnuPrice}</p>
          <div className='detail-food-card-action-quantity'>
            <Button 
              className='detail-food-card-action-quantity-icon'
              onClick={handleDecrease}
            >
              <IoMdRemove />
            </Button>
            <p>{quantity}</p>
            <Button 
              className='detail-food-card-action-quantity-icon'
              onClick={handleIncrease}
            >
              <IoMdAdd />
            </Button>
          </div>
        </div>
        
        {/* Nút thêm vào giỏ */}
        <Button 
          className='detail-food-card-action-btn'
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default DetailFood;
