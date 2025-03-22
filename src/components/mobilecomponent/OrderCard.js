import React from 'react';
import '../../assets/css/OrderFood.css';
import burger01 from '../../assets/images/burger-02.svg';
import Button from '../../components/admincomponent/Button';
import { IoMdAdd, IoMdRemove } from "react-icons/io";


const OrderCard = ({ item, onIncrease, onDecrease }) =>{
    return (
        <div className='order-cart'>
            <div className='order-cart-img'>
                <img src={burger01} alt='food' />
            </div>

            <div className='order-cart-container'> 
                <div className='order-cart-info'>
                    <h4>{item.foodName}</h4>
                    <p className='order-cart-info-price'>Price: {item.price}</p>
                    <p className='order-cart-info-desc'>{item.description}</p>
                </div>

                <div className='order-cart-action-quantity'>
                    <Button className='order-cart-action-quantity-icon' onClick={() => onDecrease(item.id)}><IoMdRemove /></Button>
                    <p className='order-cart-action-quantity-number'>{item.quantity}</p>
                    <Button className='order-cart-action-quantity-icon' onClick={() => onIncrease(item.id)}><IoMdAdd /></Button>
                </div>
            </div> 
        </div>
        
    );
}

export default OrderCard;