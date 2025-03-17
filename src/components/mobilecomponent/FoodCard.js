import React from 'react';
import '../../assets/css/OrderFood.css';
import burger01 from '../../assets/images/burger-02.svg';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const FoodCard = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/detail-food-screen");
    };

    const [value, setValue] = React.useState(4);

    return (
        <div className='food-card'>
            <div className='food-card-img' onClick={handleClick} style={{ cursor: 'pointer' }}>
                <img src={burger01} alt='food' />
            </div>

            <div className='food-card-info'  >
                <h4>Food Name</h4>
                <p className='food-card-info-desc'>A visually distinct appearance for the rating icons.</p>
                <p>Price: $10</p>
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
                <CiShoppingCart />
            </div>
        </div>
    );
}

export default FoodCard;