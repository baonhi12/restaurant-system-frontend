// src/pages/HomePage.js
import React from 'react';
import Banner from '../../components/usercomponent/HomePage/Banner'
import Features from '../../components/usercomponent/HomePage/Features';
import MenuSection from '../../components/usercomponent/HomePage/MenuSection';
import Testimonials from '../../components/usercomponent/HomePage/Testimonials';
import FoodDiscountSection from '../../components/usercomponent/HomePage/FoodDiscountSection';
import QrPhoneSection from '../../components/usercomponent/HomePage/QrPhoneSection';

function HomePage() {
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

    </main>
  );
}

export default HomePage;
