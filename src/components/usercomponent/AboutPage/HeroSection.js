import React from 'react';
import aboutBannerBg from '../../../assets/images/about-banner-bg.svg';

function HeroSection() {
  return (
    <section style={styles.heroContainer}>
      {/* Layer background có ảnh + blur */}
      <div style={styles.heroBg}></div>
      
      {/* Overlay mờ đen, giúp chữ nổi bật */}
      <div style={styles.overlay}></div>
      
      {/* Nội dung chữ (tiêu đề + mô tả) */}
      <div style={styles.heroContent}>
        <h1 style={styles.heroTitle}>
          Let&apos;s delve deeper into understanding Pizzateria
        </h1>
        <p style={styles.heroSubtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada 
          pellentesque turpis eget facilisis. Sed sit amet efficitur ex. Fusce dapibus 
          nulla vel ligula porttitor interdum. Cras vulputate bibendum velit.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;

const styles = {
  heroContainer: {
    position: 'relative',
    width: '100%',         // Full width
    minHeight: '600px',    // Chiều cao tối thiểu
    overflow: 'hidden',    // Ẩn phần blur bị tràn
    margin: 0,             // Đảm bảo không bị giới hạn bởi container nào
    padding: 0,
  },
  heroBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${aboutBannerBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    
    /* Làm mờ ảnh nền */
    filter: 'blur(8px)',
    /* Tăng scale một chút để tránh viền đen do blur */
    transform: 'scale(1.1)',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    /* Màu đen mờ phủ lên ảnh, giúp chữ dễ đọc */
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 2,
  },
  heroContent: {
    position: 'relative',
    zIndex: 3,              // Nội dung nằm trên overlay
    color: '#fff',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '4rem 1rem',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    lineHeight: 1.2,
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    lineHeight: 1.6,
  },
};
