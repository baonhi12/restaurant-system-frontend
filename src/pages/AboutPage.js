// src/pages/AboutPage.js
import React from 'react';

// Import các section
import HeroSection from '../components/AboutPage/HeroSection';
import AboutSection from '../components/AboutPage/AboutSection';
import WhyChooseSection from '../components/AboutPage/WhyChooseSection';
import ContactSection from '../components/AboutPage/ContactSection';

function AboutPage() {
  return (
    <>
      {/* HeroSection nằm ngoài, sẽ full width */}
      <HeroSection />

      {/* Các section còn lại bọc trong container */}
      <div style={styles.container}>
        <AboutSection />
        <WhyChooseSection />
        <ContactSection />
      </div>
    </>
  );
}

export default AboutPage;

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
};
