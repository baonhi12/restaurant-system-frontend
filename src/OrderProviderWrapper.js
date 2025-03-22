import React from 'react';
import { Outlet } from 'react-router-dom';
import { OrderProvider } from './components/mobilecomponent/OrderContext';

const OrderProviderWrapper = () => {
    return (
        <OrderProvider>
            <Outlet />
        </OrderProvider>
    );
};

export default OrderProviderWrapper;