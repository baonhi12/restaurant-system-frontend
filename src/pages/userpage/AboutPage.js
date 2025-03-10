// src/pages/AboutPage.js
import React from 'react';

// Import các section
import HeroSection from '../../components/usercomponent/AboutPage/HeroSection';
import AboutSection from '../../components/usercomponent/AboutPage/AboutSection';
import WhyChooseSection from '../../components/usercomponent/AboutPage/WhyChooseSection';
import ContactSection from '../../components/usercomponent/AboutPage/ContactSection';

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
