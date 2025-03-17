import React from 'react';
import '../../assets/css/OrderFood.css';
import burger01 from '../../assets/images/burger-02.svg';
import Button from '../../components/admincomponent/Button';
import { IoMdAdd, IoMdRemove } from "react-icons/io";


const OrderCard = () =>{
    return (
        <div className='order-cart'>
            <div className='order-cart-img'>
                <img src={burger01} alt='food' />
            </div>

            <div className='order-cart-container'> 
                <div className='order-cart-info'>
                    <h4>Food Name</h4>
                    <p className='order-cart-info-price'>Price: $10</p>
                    <p className='order-cart-info-desc'>A visually distinct appearance for the rating icons.</p>
                </div>

                <div className='order-cart-action-quantity'>
                    <Button className='order-cart-action-quantity-icon'><IoMdRemove /></Button>
                    <p className='order-cart-action-quantity-number'>2</p>
                    <Button className='order-cart-action-quantity-icon'><IoMdAdd /></Button>
                </div>
            </div> 
        </div>
        
    );
}

export default OrderCard;