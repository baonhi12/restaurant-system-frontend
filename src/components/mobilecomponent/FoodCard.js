// src/components/mobilecomponent/FoodCard.js
import React from 'react';
import '../../assets/css/OrderFood.css';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useOrder } from './OrderContext';
// Import sweetalert
import swal from 'sweetalert';

const FoodCard = ({ food, status = 'active' }) => {
    const navigate = useNavigate();
    const { addToOrder } = useOrder();
    const [value, setValue] = React.useState(4);

    // Hàm thêm vào giỏ
    const handleAddToCart = () => {
        const item = {
          id: food?.id,
          foodName: food?.name,
          price: food?.price,
          description: food?.description,
          image: food?.image,
        };
        addToOrder(item);

        // Thay alert() thành sweetalert
        swal({
          title: "Item Added",
          text: `Đã thêm món "${item.foodName}" vào giỏ hàng!`,
          icon: "success",
          button: "OK" // có thể custom nhãn nút
        });
    };

    return (
        <div className='food-card'>
            <div className='food-card-img' style={{ cursor: 'pointer' }}>
                <img src={food?.image} alt='food' />
                {status === 'inactive' && (
                    <div className='sold-out-text-only'>
                        Sold Out
                    </div>
                )}
            </div>

            <div className='food-card-info'>
                <h4>{food?.name}</h4>
                <p className='food-card-info-desc'>
                    {food?.description}
                </p>
                <p>Price: {food?.price}</p>
            </div>

            <div className='food-card-action'>
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

                <div 
                    onClick={(e) => {
                        e.stopPropagation();
                        if (status === 'inactive') return;
                        handleAddToCart();
                    }} 
                    style={{ cursor: status === 'inactive' ? 'not-allowed' : 'pointer' }}
                >
                    <CiShoppingCart size={28} />
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
