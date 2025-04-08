// src/components/mobilecomponent/FoodCard.js
import React from 'react';
import '../../assets/css/OrderFood.css';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useOrder } from './OrderContext';

const FoodCard = ({ food }) => {
    const navigate = useNavigate();
    const { addToOrder } = useOrder();
    const [value, setValue] = React.useState(4);

    // Hàm thêm vào giỏ
    const handleAddToCart = () => {
        // Tạo item để add, sử dụng dữ liệu động từ food object
        const item = {
          id: food?.id,             // Giả sử backend trả về id cho food
          foodName: food?.name,
          price: food?.price,
          description: food?.description,
          image: food?.image,       // Dùng URL ảnh động từ database/Cloudinary
        };
        addToOrder(item);
        alert(`Đã thêm món "${item.foodName}" vào giỏ hàng!`);
    };

    return (
        <div className='food-card'>
            {/* Phần ảnh, sử dụng ảnh động từ food.image */}
            <div className='food-card-img' style={{ cursor: 'pointer' }}>
                <img src={food?.image} alt='food' />
            </div>

            {/* Thông tin món */}
            <div className='food-card-info'>
                <h4>{food?.name}</h4>
                <p className='food-card-info-desc'>
                    {food?.description}
                </p>
                <p>Price: {food?.price}</p>
            </div>

            {/* Rating + Icon giỏ hàng */}
            <div className='food-card-action'>
                {/* Rating */}
                <Box sx={{ '& > legend': { mt: 2 } }}>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        size="small"
                    />
                </Box>

                {/* Icon giỏ hàng */}
                <div 
                    onClick={(e) => {
                        e.stopPropagation(); // Ngăn click nổi bọt lên cha
                        handleAddToCart();
                    }} 
                    style={{ cursor: 'pointer' }}
                >
                    <CiShoppingCart size={28} />
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
