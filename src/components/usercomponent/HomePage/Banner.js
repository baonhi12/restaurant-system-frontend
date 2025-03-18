// src/components/HomePage/Banner.js
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import bigPizza from '../../../assets/images/pngwing 1.svg';
import pizzaSlice from '../../../assets/images/pngwing 2.svg';

function Banner() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    banner: {
      position: 'relative',
      backgroundColor: '#FFF7ED',
      minHeight: '600px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      width: '100%',
    },
    bigPizzaLeft: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '900px',
      zIndex: 0,
    },
    textBox: {
      position: 'relative',
      zIndex: 1,
      backgroundColor: 'rgba(255,255,255,0.6)',
      backdropFilter: 'blur(2px)',
      borderRadius: '15px',
      padding: '2rem',
      width: '60%',
      maxWidth: '700px',
      textAlign: 'left',
      margin: '0 auto',
      fontFamily: "'Poppins', sans-serif",
    },
    title: {
      fontWeight: 'bold',
      fontSize: '3rem',
      marginBottom: '1rem',
      color: '#FF5B5B',
      lineHeight: 1.2,
    },
    subtitle: {
      fontSize: '1.5rem',
      marginBottom: '0.5rem',
      color: '#FF5B5B',
      fontWeight: '600',
    },
    description: {
      fontSize: '1rem',
      marginBottom: '1.5rem',
      color: '#333',
      lineHeight: 1.4,
    },
    button: {
      width: '10rem',
      height: '3rem',
      border: 'none',
      borderRadius: '13px',
      backgroundColor: isHovered ? '#FF5B5B' : '#FFFFFF',
      color: isHovered ? '#FFFFFF' : '#FF5B5B',
      textAlign: 'center',
      cursor: 'pointer',
      transition: '0.3s',
      padding: '5px',
      fontSize: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pizzaRight: {
      position: 'absolute',
      right: '3rem',
      bottom: '3rem',
      width: '750px',
      zIndex: 1,
    },
  };
  
  const handleReserveClick = () => {
    // Thêm hash "#reservationSection" vào URL
    navigate('/reservation#reservationSection');
  };

  return (
    <section style={styles.banner}>
      <img src={bigPizza} alt="Big Pizza Left" style={styles.bigPizzaLeft} />

      <div style={styles.textBox}>
        <h1 style={styles.title}>
          Amazing <span style={{ display: 'block' }}>Pizza</span>
        </h1>
        <h2 style={styles.subtitle}>Your Slice of Happiness</h2>
        <p style={styles.description}>Deliciously irresistible Pizzas</p>
        <button style={styles.button} onClick={handleReserveClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          Reserve a Table
        </button>
      </div>

      <img src={pizzaSlice} alt="Pizza Slice Right" style={styles.pizzaRight} />
    </section>
  );
}

export default Banner;

