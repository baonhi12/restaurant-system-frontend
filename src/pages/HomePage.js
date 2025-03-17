// src/pages/HomePage.js
import React from 'react';
import Banner from '../components/HomePage/Banner'
import Features from '../components/HomePage/Features';
import MenuSection from '../components/HomePage/MenuSection';
import Testimonials from '../components/HomePage/Testimonials';
import FoodDiscountSection from '../components/HomePage/FoodDiscountSection';
import QrPhoneSection from '../components/HomePage/QrPhoneSection';

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
