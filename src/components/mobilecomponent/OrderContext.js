import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState([]);

  const addToOrder = (item) => {
    setOrderItems((prevItems) => {
      // Nếu món đã có trong giỏ, tăng số lượng
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // Nếu chưa có, thêm mới với số lượng khởi tạo là 1
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearOrder = () => {
    setOrderItems([]);
  };


  return (
    <OrderContext.Provider
      value={{ orderItems, addToOrder, increaseQuantity, decreaseQuantity, removeItem, clearOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);