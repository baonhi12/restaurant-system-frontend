// src/components/mobilecomponent/FoodCard.js
import React from 'react';
import '../../assets/css/OrderFood.css';
import burger01 from '../../assets/images/burger-02.svg';
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
        // Tạo item để add, tùy chỉnh theo cấu trúc giỏ hàng của bạn
        const item = {
          id: food?.id || '001',
          foodName: food?.name || 'Food Name',
          price: food?.price || '$10',
          description: food?.description || 'Some description',
          image: food?.image || burger01,
        };
        addToOrder(item);
        alert(`Đã thêm món "${item.foodName}" vào giỏ hàng!`);
    };

    return (
        <div className='food-card'>
            {/* Vùng ảnh (bấm vào sẽ chuyển trang detail, 
                nhưng sự kiện click thực tế do HomeScreen bọc bên ngoài) 
            */}
            <div className='food-card-img' style={{ cursor: 'pointer' }}>
                <img src={food?.image || burger01} alt='food' />
            </div>

            {/* Thông tin món */}
            <div className='food-card-info'>
                <h4>{food?.name || 'Food Name'}</h4>
                <p className='food-card-info-desc'>
                    {food?.description || 'A visually distinct appearance for the rating icons.'}
                </p>
                <p>Price: {food?.price || '$15'}</p>
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
