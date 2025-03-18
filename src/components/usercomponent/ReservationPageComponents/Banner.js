// src/components/ReservationPageComponents/Banner.js
import React from 'react';
import backgroundBanner from '../../../assets/images/pizza-bg-reservation.svg';
import pizzaIcon from '../../../assets/images/pizza-icon.svg';

function Banner() {
  // Hàm xử lý khi bấm nút: cuộn đến phần có id "reservationSection"
  const handleReserveClick = () => {
    const element = document.getElementById("reservationSection");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section style={styles.bannerSection}>
      <div style={styles.overlay}>
        {/* Subtitle (BEYOND SPEEDY + icon) */}
        <div style={styles.subTitleBox}>
          <span style={styles.subTitleText}>BEYOND SPEEDY</span>
          <img src={pizzaIcon} alt="Pizza icon" style={styles.icon} />
        </div>

        <h1 style={{ ...styles.title, whiteSpace: 'pre-wrap' }}>
          Best <span style={styles.highlight}>Food</span>{'\n'}for Best Restaurants
        </h1>

        {/* Mô tả */}
        <p style={styles.description}>
          Our mission is to satisfy your appetite with delectable dishes delivered swiftly and at no extra cost
        </p>

        {/* Nút kêu gọi hành động */}
        <button style={styles.button} onClick={handleReserveClick}>
          RESERVE A TABLE
        </button>
      </div>
    </section>
  );
}

export default Banner;

const styles = {
  bannerSection: {
    position: 'relative',
    width: '100%',
    minHeight: '600px',                
    backgroundImage: `url(${backgroundBanner})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    padding: '3rem 2rem',
    borderRadius: '12px',
    maxWidth: '90%',
  },
  subTitleBox: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#f4dcae',
    padding: '0.6rem 1.2rem',
    borderRadius: '20px',
    marginBottom: '1.5rem',
  },
  subTitleText: {
    color: '#b72a23',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  icon: {
    width: '22px',
    height: '22px',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    lineHeight: 1.2,
  },
  highlight: {
    color: '#b72a23',
  },
  description: {
    fontSize: '1.1rem',
    maxWidth: '700px',
    margin: '0 auto 2rem',
    lineHeight: 1.5,
  },
  button: {
    backgroundColor: '#fff',
    color: '#b72a23',
    border: 'none',
    padding: '1.2rem 2.5rem',
    borderRadius: '30px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    textTransform: 'uppercase',
  },
};
