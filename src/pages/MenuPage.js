// src/pages/MenuPage.js
import React from 'react';
import MenuTopSection from '../components/MenuPage/MenuTopSection';
import MenuCategorySection from '../components/MenuPage/MenuCategorySection';

function MenuPage() {
  // Dữ liệu tạm
  const pizzas = [
    { id: 1, name: 'Cheese Overload', price: '$8', img: 'https://via.placeholder.com/200?text=Cheese+Pizza' },
    { id: 2, name: 'Pepperoni Deluxe', price: '$9', img: 'https://via.placeholder.com/200?text=Pepperoni' },
    { id: 3, name: 'Hawaiian Special', price: '$10', img: 'https://via.placeholder.com/200?text=Hawaiian' },
    // ... thêm nhiều nếu muốn
  ];

  return (
    <div>
      {/* Component Top Section */}
      <MenuTopSection />
      <MenuCategorySection />
    </div>
  );
}

export default MenuPage;
