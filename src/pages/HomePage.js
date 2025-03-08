// src/pages/HomePage.js
import React from 'react';
import Banner from '../components/Banner'
import Features from '../components/Features';
import MenuSection from '../components/MenuSection';
import Testimonials from '../components/Testimonials';
import FoodDiscountSection from '../components/FoodDiscountSection';
import QrPhoneSection from '../components/QrPhoneSection';

function HomePage() {
  const headerStyle = {
    backgroundColor: '#ffefef',
    padding: '20px',
    textAlign: 'center',
  };

  return (
    <main>
      {/* Banner */}
      <Banner />

      {/* Features */}
      <Features />

      {/* Menu Section */}
      <MenuSection />

      {/* Testimonials (đỏ) */}
      <Testimonials />

      <FoodDiscountSection/>
      {/* Food Discount Section */} 
      <QrPhoneSection />
      {/* Bạn có thể thêm phần "Begin Your Pizza Day" hoặc Form đặt hàng 
          như thiết kế Figma vào đây (tạo component riêng) */}
    </main>
  );
}

export default HomePage;
