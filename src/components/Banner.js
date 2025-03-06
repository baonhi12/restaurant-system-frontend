// src/components/Banner.js
import React from 'react';
import bigPizza from '../assets/images/pngwing 1.svg';  // Pizza lớn bên trái
import pizzaSlice from '../assets/images/pngwing 2.svg'; // Miếng pizza bên phải

function Banner() {
  return (
    <section style={styles.banner}>
      {/* Pizza lớn bên trái */}
      <img
        src={bigPizza}
        alt="Big Pizza Left"
        style={styles.bigPizzaLeft}
      />

      {/* Khối nội dung */}
      <div style={styles.textBox}>
        <h1 style={styles.title}>
          Amazing <span style={{ display: 'block' }}>Pizza</span>
        </h1>
        <h2 style={styles.subtitle}>Your slice of Happiness</h2>
        <p style={styles.description}>Deliciously irresistible Pizzas</p>
        <button style={styles.button}>Reserve a Table</button>
      </div>

      {/* Miếng pizza bên phải */}
      <img
        src={pizzaSlice}
        alt="Pizza Slice Right"
        style={styles.pizzaRight}
      />
    </section>
  );
}

export default Banner;

/* ---------------- Inline Styles ---------------- */
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
  },
  bigPizzaLeft: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '900px',    // Tuỳ chỉnh kích thước
    zIndex: 0,         // Ở dưới textBox
  },
  textBox: {
    position: 'relative',
    zIndex: 1,         // Nằm trên ảnh nền
    backgroundColor: 'rgba(255,255,255,0.6)', // Nền trắng mờ
    // Nếu muốn blur hẳn phía sau, bạn có thể thử:
    backdropFilter: 'blur(2px)',
    // WebKit prefix (nếu cần): WebkitBackdropFilter: 'blur(8px)',
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
    color: '#B32E2E',
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    color: '#f06e00',
    fontWeight: '600',
  },
  description: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#333',
    lineHeight: 1.4,
  },
  button: {
    backgroundColor: '#f06e00',
    color: '#fff',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
  pizzaRight: {
    position: 'absolute',
    right: '3rem',
    bottom: '3rem',
    width: '750px',
    zIndex: 1,
  },
};
