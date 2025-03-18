import React from 'react';
import '../../assets/css/OrderFood.css';
import Button from '../../components/admincomponent/Button';
import { IoHomeOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { IoMdQrScanner, IoIosArrowBack, IoMdAdd, IoMdRemove, IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import burger01 from '../../assets/images/burger-02.svg';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Badge from '@mui/material/Badge';


const DetailFood = () => {
    const navigate = useNavigate();
    
    const handleBack = () => {
        navigate(-1); // Điều hướng về trang trước đó
    };

    const [value, setValue] = React.useState(4);

    const NavItem = ({ icon, to }) => {
        return (
            <div onClick={() => navigate(to)} className="nav-icon" >
                {icon}
            </div>
        );
    };
    
    return (
        <div className='home-screen-container'>
            <div className='detail-food-header'>
                <IoIosArrowBack size={28} onClick={handleBack} style={{ cursor: 'pointer', color: '#FF5B5B' }}  />
                <h3 className='detail-food-header-title'>Detail Food</h3>
            </div>

            <div className='detail-food-card'>
                <div className='detail-food-card-img'>
                    <img src={burger01} alt='food' />
                </div>

                <div className='detail-food-card-info'>
                    <h3>Food Name</h3>
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
                    <p>A visually distinct appearance for the rating icons. By default, the rating component uses both a difference of color and shape (filled and empty icons) to indicate the value. In the event that you are using color as the only means to indicate the value, the information should also be also displayed as text, as in this demo.</p>
                </div>

                <div className='detail-food-card-action'>
                    <p>Price: $10</p>
                    <div className='detail-food-card-action-quantity'>
                        <Button className='detail-food-card-action-quantity-icon'><IoMdRemove /></Button>
                        <p>2</p>
                        <Button className='detail-food-card-action-quantity-icon'><IoMdAdd /></Button>
                    </div>
                </div>
                
                <Button className='detail-food-card-action-btn'>Add to Cart</Button>
            </div>

            {/* navbar */}
            <div className="home-screen-navbar bottom-navbar">
                {/* Các icon bên trái */}
                <div className="nav-icons-container left-icons">
                    <NavItem to="/homescreen" icon={<IoHomeOutline size={28} />} />
                    <Badge badgeContent={3} color="secondary"> 
                        <NavItem to="/detail-food-screen" icon={<IoMdNotificationsOutline size={28} />} />
                    </Badge>
                </div>

                {/* Nút chính nổi ở giữa */}
                <div className="center-button">
                    <IoMdQrScanner size={32} color="white" />
                </div>

                {/* Icon Phải */}
                <div className="nav-icons-container right-icons">
                    <NavItem to="/order-cart-screen" icon={<FiShoppingCart size={28} />} />
                    <NavItem to="/ordered-list-cart-screen" icon={<RiHistoryFill size={28} />} />
                </div>
            </div>
        </div>
    );
}

export default DetailFood;