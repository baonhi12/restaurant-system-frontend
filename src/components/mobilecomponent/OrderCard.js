// src/components/mobilecomponent/OrderCard.js
import React from 'react';
import '../../assets/css/OrderFood.css';
import Button from '../../components/admincomponent/Button';
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const OrderCard = ({ item, onIncrease, onDecrease, onRequestDelete }) => {
  const handleDecrease = () => {
    if (item.quantity === 1) {
      // Khi số lượng là 1, gọi callback yêu cầu xóa
      onRequestDelete(item.id);
    } else {
      onDecrease(item.id);
    }
  };

  return (
    <div className='order-cart'>
      <div className='order-cart-img'>
        {/* Lấy ảnh từ item.image, nếu không có thì dùng placeholder */}
        <img 
          src={item.image || "https://via.placeholder.com/300?text=No+Image"} 
          alt='food' 
        />
      </div>

      <div className='order-cart-container'> 
        <div className='order-cart-info'>
          <h4>{item.foodName}</h4>
          <p className='order-cart-info-price'>Price: {item.price}</p>
          <p className='order-cart-info-desc'>{item.description}</p>
        </div>

        <div className='order-cart-action-quantity'>
          <Button 
            className='order-cart-action-quantity-icon' 
            onClick={handleDecrease}
          >
            <IoMdRemove />
          </Button>
          <p className='order-cart-action-quantity-number'>{item.quantity}</p>
          <Button 
            className='order-cart-action-quantity-icon' 
            onClick={() => onIncrease(item.id)}
          >
            <IoMdAdd />
          </Button>
        </div>
      </div> 
    </div>
  );
};

export default OrderCard;
