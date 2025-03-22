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

    const handleClick = () => {
        navigate("/detail-food-screen");
    };

    const handleAddToCart = () => {
        // Giả sử food object chứa các thông tin cần thiết
        // Nếu bạn không có sẵn, bạn có thể fix cứng ví dụ dưới đây:
        const item = {
          id: food?.id || '001', // Ví dụ: table id '001' hoặc id của món ăn
          foodName: food?.name || 'Food Name',
          price: food?.price || '$10',
          description: food?.description || 'A visually distinct appearance for the rating icons.',
          image: food?.image || burger01,
        };
        addToOrder(item);
    };

    const [value, setValue] = React.useState(4);

    return (
        <div className='food-card'>
            <div className='food-card-img' onClick={handleClick} style={{ cursor: 'pointer' }}>
                <img src={burger01} alt='food' />
            </div>

            <div className='food-card-info'  >
                <h4>{food?.name || 'Food Name'}</h4>
                <p className='food-card-info-desc'>{food?.description || 'A visually distinct appearance for the rating icons.'}</p>
                <p>Price: {food?.price || '$15'}</p>
            </div>

            <div className='food-card-action'>
                {/* rating */}
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
                {/* add to card */}
                <div onClick={handleAddToCart} style={{ cursor: 'pointer' }}>
                    <CiShoppingCart size={28} />
                </div>
            </div>
        </div>
    );
}

export default FoodCard;