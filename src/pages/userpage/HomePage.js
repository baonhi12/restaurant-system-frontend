// src/pages/HomePage.js
import React from 'react';
import Banner from '../../components/usercomponent/Banner'
import Features from '../../components/usercomponent/Features';
import MenuSection from '../../components/usercomponent/MenuSection';
import Testimonials from '../../components/usercomponent/Testimonials';
import FoodDiscountSection from '../../components/usercomponent/FoodDiscountSection';
import QrPhoneSection from '../../components/usercomponent/QrPhoneSection';

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
